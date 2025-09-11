import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Utensils, Heart, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NutritionAnalysis {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number;
  healthScore: number;
  recommendations: string[];
  warnings: string[];
  positives: string[];
}

export const MealAnalyzer = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<NutritionAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeMeal = async () => {
    if (!selectedImage) {
      toast({
        title: "No Image Selected",
        description: "Please upload a photo of your meal first.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Simulate AI analysis (replace with actual AI service)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock analysis result
      const mockResult: NutritionAnalysis = {
        calories: 520,
        protein: 28,
        carbs: 45,
        fat: 18,
        fiber: 8,
        sodium: 680,
        healthScore: 75,
        recommendations: [
          "Great protein content for muscle recovery",
          "Consider reducing sodium intake for heart health",
          "Add more leafy greens for additional vitamins",
          "Good balance of complex carbohydrates"
        ],
        warnings: [
          "Sodium content is slightly high for cardiac recovery",
          "Consider smaller portion size if weight management is a goal"
        ],
        positives: [
          "Excellent protein for tissue repair",
          "Good fiber content for digestive health",
          "Balanced macronutrient profile",
          "Heart-healthy cooking method detected"
        ]
      };
      
      setAnalysisResult(mockResult);
      toast({
        title: "Analysis Complete",
        description: "Your meal has been analyzed for nutritional content.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your meal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getHealthScoreBg = (score: number) => {
    if (score >= 80) return "bg-success/10 border-success/20";
    if (score >= 60) return "bg-warning/10 border-warning/20";
    return "bg-destructive/10 border-destructive/20";
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/20">
            <Utensils className="h-6 w-6 text-accent" />
          </div>
          <div>
            <CardTitle className="text-2xl">Meal Analyzer</CardTitle>
            <CardDescription>
              Upload a photo of your meal for nutritional analysis and recovery recommendations
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Upload Section */}
        <div className="space-y-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          
          {selectedImage ? (
            <div className="relative">
              <img 
                src={selectedImage} 
                alt="Selected meal" 
                className="w-full h-64 object-cover rounded-lg border border-border"
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="absolute top-2 right-2"
              >
                <Upload className="h-4 w-4" />
                Change Photo
              </Button>
            </div>
          ) : (
            <div 
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Upload Meal Photo</h3>
              <p className="text-muted-foreground">Click to select an image of your meal</p>
            </div>
          )}
          
          <Button 
            onClick={analyzeMeal}
            disabled={!selectedImage || isAnalyzing}
            variant="accent"
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-accent-foreground border-t-transparent mr-2" />
                Analyzing Nutrition...
              </>
            ) : (
              <>
                <Heart className="h-4 w-4 mr-2" />
                Analyze Meal
              </>
            )}
          </Button>
        </div>

        {/* Results Section */}
        {analysisResult && (
          <div className="space-y-6 pt-6 border-t border-border">
            {/* Health Score */}
            <div className={`p-4 rounded-lg border ${getHealthScoreBg(analysisResult.healthScore)}`}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Health Score</h3>
                <div className={`text-2xl font-bold ${getHealthScoreColor(analysisResult.healthScore)}`}>
                  {analysisResult.healthScore}/100
                </div>
              </div>
              <div className="mt-2 bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    analysisResult.healthScore >= 80 ? 'bg-success' : 
                    analysisResult.healthScore >= 60 ? 'bg-warning' : 'bg-destructive'
                  }`}
                  style={{ width: `${analysisResult.healthScore}%` }}
                />
              </div>
            </div>

            {/* Nutrition Facts */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Nutrition Facts</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">Calories</p>
                  <p className="text-xl font-semibold">{analysisResult.calories}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">Protein</p>
                  <p className="text-xl font-semibold">{analysisResult.protein}g</p>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">Carbs</p>
                  <p className="text-xl font-semibold">{analysisResult.carbs}g</p>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">Fat</p>
                  <p className="text-xl font-semibold">{analysisResult.fat}g</p>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">Fiber</p>
                  <p className="text-xl font-semibold">{analysisResult.fiber}g</p>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">Sodium</p>
                  <p className="text-xl font-semibold">{analysisResult.sodium}mg</p>
                </div>
              </div>
            </div>

            {/* Positives */}
            {analysisResult.positives.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-success flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  What's Great
                </h3>
                <ul className="space-y-2">
                  {analysisResult.positives.map((positive, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{positive}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Warnings */}
            {analysisResult.warnings.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-warning flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Considerations
                </h3>
                <ul className="space-y-2">
                  {analysisResult.warnings.map((warning, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Recovery Recommendations</h3>
              <ul className="space-y-2">
                {analysisResult.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-sm">{recommendation}</span>
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