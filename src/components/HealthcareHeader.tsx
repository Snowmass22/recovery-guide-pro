import { Heart, Shield, Clock } from "lucide-react";
import heroImage from "@/assets/healthcare-hero.jpg";

export const HealthcareHeader = () => {
  return (
    <header className="relative bg-gradient-hero text-primary-foreground">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90" />
      
      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-background/10">
                <Heart className="h-8 w-8" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold">
                HealthCare
                <span className="block text-2xl lg:text-3xl font-medium text-primary-foreground/90">
                  Recovery Assistant
                </span>
              </h1>
            </div>
            
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Your complete post-hospital care companion. Track medications, analyze meals, 
              and get personalized recovery guidance all in one place.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-background/10 backdrop-blur-sm">
                <Shield className="h-6 w-6 text-success" />
                <div>
                  <h3 className="font-semibold">Secure</h3>
                  <p className="text-sm text-primary-foreground/80">HIPAA Compliant</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-lg bg-background/10 backdrop-blur-sm">
                <Clock className="h-6 w-6 text-warning" />
                <div>
                  <h3 className="font-semibold">Smart Reminders</h3>
                  <p className="text-sm text-primary-foreground/80">Never miss a dose</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-lg bg-background/10 backdrop-blur-sm">
                <Heart className="h-6 w-6 text-accent" />
                <div>
                  <h3 className="font-semibold">AI Powered</h3>
                  <p className="text-sm text-primary-foreground/80">Personalized care</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-floating">
              <img 
                src={heroImage} 
                alt="Healthcare app interface" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};