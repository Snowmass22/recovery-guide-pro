import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Stethoscope, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DiagnosisResult {
  primaryDiagnosis: string;
  secondaryDiagnoses: string[];
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    instructions: string;
  }>;
  followUpInstructions: string[];
}

export const DischargeAnalyzer = () => {
  const [dischargeText, setDischargeText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<DiagnosisResult | null>(null);
  const { toast } = useToast();

  const analyzeDischargeSummary = async () => {
    if (!dischargeText.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your discharge summary text.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Simulate AI analysis (replace with actual AI service)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock analysis result
      const mockResult: DiagnosisResult = {
        primaryDiagnosis: "Acute Myocardial Infarction (Heart Attack)",
        secondaryDiagnoses: ["Type 2 Diabetes Mellitus", "Hypertension", "Hyperlipidemia"],
        medications: [
          {
            name: "Metoprolol",
            dosage: "50mg",
            frequency: "Twice daily",
            instructions: "Take with food"
          },
          {
            name: "Atorvastatin",
            dosage: "40mg",
            frequency: "Once daily",
            instructions: "Take in the evening"
          },
          {
            name: "Aspirin",
            dosage: "81mg",
            frequency: "Once daily",
            instructions: "Take with food to prevent stomach upset"
          },
          {
            name: "Metformin",
            dosage: "500mg",
            frequency: "Twice daily",
            instructions: "Take with meals"
          }
        ],
        followUpInstructions: [
          "Follow up with cardiologist in 2 weeks",
          "Monitor blood pressure daily",
          "Check blood glucose levels twice daily",
          "Cardiac rehabilitation program recommended"
        ]
      };
      
      setAnalysisResult(mockResult);
      toast({
        title: "Analysis Complete",
        description: "Your discharge summary has been successfully analyzed.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your discharge summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Discharge Summary Analyzer</CardTitle>
            <CardDescription>
              Upload or paste your hospital discharge summary for AI-powered analysis
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <label className="text-sm font-medium text-foreground">
            Discharge Summary Text
          </label>
          <Textarea
            placeholder="Paste your discharge summary here, or upload a document..."
            value={dischargeText}
            onChange={(e) => setDischargeText(e.target.value)}
            className="min-h-[150px] resize-none"
          />
          
          <div className="flex gap-3">
            <Button 
              onClick={analyzeDischargeSummary}
              disabled={isAnalyzing}
              variant="medical"
              className="flex-1"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Stethoscope className="h-4 w-4" />
                  Analyze Summary
                </>
              )}
            </Button>
            
            <Button variant="outline" className="flex-shrink-0">
              <Upload className="h-4 w-4" />
              Upload File
            </Button>
          </div>
        </div>

        {/* Results Section */}
        {analysisResult && (
          <div className="space-y-6 pt-6 border-t border-border">
            {/* Primary Diagnosis */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Primary Diagnosis
              </h3>
              <Badge variant="outline" className="text-base p-3 bg-primary/5 border-primary/20">
                {analysisResult.primaryDiagnosis}
              </Badge>
            </div>

            {/* Secondary Diagnoses */}
            {analysisResult.secondaryDiagnoses.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Secondary Diagnoses</h3>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.secondaryDiagnoses.map((diagnosis, index) => (
                    <Badge key={index} variant="secondary" className="text-sm p-2">
                      {diagnosis}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Medications */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">New Medications</h3>
              <div className="grid gap-3">
                {analysisResult.medications.map((med, index) => (
                  <div key={index} className="p-4 rounded-lg bg-secondary-light border border-secondary/20">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg">{med.name}</h4>
                      <Badge variant="outline">{med.dosage}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      <strong>Frequency:</strong> {med.frequency}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Instructions:</strong> {med.instructions}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Follow-up Instructions */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Follow-up Instructions</h3>
              <ul className="space-y-2">
                {analysisResult.followUpInstructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="text-sm">{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};