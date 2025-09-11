import { HealthcareHeader } from "@/components/HealthcareHeader";
import { DischargeAnalyzer } from "@/components/DischargeAnalyzer";
import { MedicationTracker } from "@/components/MedicationTracker";
import { MealAnalyzer } from "@/components/MealAnalyzer";
import { PharmacyOptions } from "@/components/PharmacyOptions";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HealthcareHeader />
      
      <main className="container mx-auto px-6 py-12 space-y-12">
        <section id="discharge-analyzer">
          <DischargeAnalyzer />
        </section>
        
        <section id="medication-tracker">
          <MedicationTracker />
        </section>
        
        <section id="meal-analyzer">
          <MealAnalyzer />
        </section>
        
        <section id="pharmacy-options">
          <PharmacyOptions />
        </section>
      </main>
      
      <footer className="bg-muted py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            Your health information is secure and private. This app is for informational purposes only and should not replace professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;