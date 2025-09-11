import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Pill, Clock, CheckCircle, AlertTriangle, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  instructions: string;
  remindersEnabled: boolean;
  nextDose: Date;
}

export const MedicationTracker = () => {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "1",
      name: "Metoprolol",
      dosage: "50mg",
      frequency: "Twice daily",
      times: ["08:00", "20:00"],
      instructions: "Take with food",
      remindersEnabled: true,
      nextDose: new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours from now
    },
    {
      id: "2", 
      name: "Atorvastatin",
      dosage: "40mg",
      frequency: "Once daily",
      times: ["21:00"],
      instructions: "Take in the evening",
      remindersEnabled: true,
      nextDose: new Date(Date.now() + 6 * 60 * 60 * 1000) // 6 hours from now
    },
    {
      id: "3",
      name: "Aspirin",
      dosage: "81mg", 
      frequency: "Once daily",
      times: ["08:00"],
      instructions: "Take with food to prevent stomach upset",
      remindersEnabled: false,
      nextDose: new Date(Date.now() + 18 * 60 * 60 * 1000) // 18 hours from now
    }
  ]);

  const { toast } = useToast();

  const toggleReminder = (medicationId: string) => {
    setMedications(prev => prev.map(med => 
      med.id === medicationId 
        ? { ...med, remindersEnabled: !med.remindersEnabled }
        : med
    ));
    
    const medication = medications.find(med => med.id === medicationId);
    if (medication) {
      toast({
        title: `Reminders ${!medication.remindersEnabled ? 'Enabled' : 'Disabled'}`,
        description: `${medication.name} reminders have been ${!medication.remindersEnabled ? 'turned on' : 'turned off'}.`,
      });
    }
  };

  const markAsTaken = (medicationId: string) => {
    const medication = medications.find(med => med.id === medicationId);
    if (medication) {
      // Calculate next dose time based on frequency
      const hoursUntilNext = medication.frequency.includes("Twice") ? 12 : 24;
      const nextDose = new Date(Date.now() + hoursUntilNext * 60 * 60 * 1000);
      
      setMedications(prev => prev.map(med => 
        med.id === medicationId 
          ? { ...med, nextDose }
          : med
      ));

      toast({
        title: "Medication Taken",
        description: `${medication.name} ${medication.dosage} has been marked as taken.`,
      });
    }
  };

  const getTimeUntilNext = (nextDose: Date) => {
    const now = new Date();
    const diffMs = nextDose.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffMs < 0) return "Overdue";
    if (diffHours === 0) return `${diffMinutes}m`;
    return `${diffHours}h ${diffMinutes}m`;
  };

  const isDueNow = (nextDose: Date) => {
    const now = new Date();
    const diffMs = nextDose.getTime() - now.getTime();
    return diffMs <= 30 * 60 * 1000 && diffMs > -30 * 60 * 1000; // Within 30 minutes
  };

  const isOverdue = (nextDose: Date) => {
    return nextDose.getTime() < Date.now();
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-secondary/20">
              <Pill className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Medication Tracker</CardTitle>
              <CardDescription>
                Manage your medications and set up reminders
              </CardDescription>
            </div>
          </div>
          
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4" />
            Add Medication
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {medications.map((medication) => (
          <div 
            key={medication.id} 
            className={`p-4 rounded-lg border transition-all duration-300 ${
              isOverdue(medication.nextDose) 
                ? 'border-destructive/50 bg-destructive/5' 
                : isDueNow(medication.nextDose)
                ? 'border-warning/50 bg-warning/5'
                : 'border-border bg-card'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-lg">{medication.name}</h3>
                  <Badge variant="outline">{medication.dosage}</Badge>
                  {isOverdue(medication.nextDose) && (
                    <Badge variant="destructive" className="animate-pulse">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Overdue
                    </Badge>
                  )}
                  {isDueNow(medication.nextDose) && !isOverdue(medication.nextDose) && (
                    <Badge variant="default" className="bg-warning text-warning-foreground animate-pulse">
                      <Clock className="h-3 w-3 mr-1" />
                      Due Now
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p><strong>Frequency:</strong> {medication.frequency}</p>
                  <p><strong>Times:</strong> {medication.times.join(", ")}</p>
                  <p><strong>Instructions:</strong> {medication.instructions}</p>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Next dose in: {getTimeUntilNext(medication.nextDose)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Reminders</span>
                  <Switch
                    checked={medication.remindersEnabled}
                    onCheckedChange={() => toggleReminder(medication.id)}
                  />
                </div>
                
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => markAsTaken(medication.id)}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Mark as Taken
                </Button>
              </div>
            </div>
          </div>
        ))}

        {medications.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Pill className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No medications added yet</p>
            <p className="text-sm">Add your medications to start tracking</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};