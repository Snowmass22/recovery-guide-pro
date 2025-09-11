import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Star, Truck, Store } from "lucide-react";

interface PharmacyOption {
  id: string;
  name: string;
  type: "online" | "local";
  rating: number;
  distance?: string;
  deliveryTime?: string;
  phone?: string;
  address?: string;
  features: string[];
  specialOffers?: string;
}

export const PharmacyOptions = () => {
  const pharmacyOptions: PharmacyOption[] = [
    {
      id: "1",
      name: "CVS Pharmacy",
      type: "local",
      rating: 4.2,
      distance: "0.8 miles",
      phone: "(555) 123-4567",
      address: "123 Main St, Your City, ST 12345",
      features: ["24/7 Available", "Insurance Accepted", "Flu Shots", "Prescription Delivery"],
      specialOffers: "Free delivery on orders over $35"
    },
    {
      id: "2", 
      name: "Amazon Pharmacy",
      type: "online",
      rating: 4.5,
      deliveryTime: "1-2 days",
      features: ["Prime Benefits", "Auto-Refill", "Price Matching", "Insurance Accepted"],
      specialOffers: "Free shipping for Prime members"
    },
    {
      id: "3",
      name: "Walgreens",
      type: "local", 
      rating: 4.1,
      distance: "1.2 miles",
      phone: "(555) 987-6543",
      address: "456 Oak Ave, Your City, ST 12345",
      features: ["Drive-Thru", "Photo Services", "Health Clinic", "Same-Day Delivery"],
      specialOffers: "20% off vitamins and supplements"
    },
    {
      id: "4",
      name: "PillPack (Amazon)",
      type: "online",
      rating: 4.7,
      deliveryTime: "Monthly delivery",
      features: ["Pre-sorted Packets", "Automatic Refills", "Insurance Coordination", "24/7 Support"],
      specialOffers: "First month free for new customers"
    },
    {
      id: "5",
      name: "Rite Aid",
      type: "local",
      rating: 3.9,
      distance: "2.1 miles", 
      phone: "(555) 456-7890",
      address: "789 Pine St, Your City, ST 12345",
      features: ["Wellness Rewards", "Immunizations", "Health Screenings", "Mobile App"],
      specialOffers: "Earn points on every purchase"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-warning fill-current' : 'text-muted-foreground'}`} 
      />
    ));
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/20">
            <Store className="h-6 w-6 text-success" />
          </div>
          <div>
            <CardTitle className="text-2xl">Pharmacy Options</CardTitle>
            <CardDescription>
              Find the best places to fill your prescriptions with convenient delivery and pickup options
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {pharmacyOptions.map((pharmacy) => (
          <div key={pharmacy.id} className="p-4 rounded-lg border border-border bg-card hover:shadow-button transition-all duration-300">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-lg">{pharmacy.name}</h3>
                  <Badge variant={pharmacy.type === "online" ? "secondary" : "outline"}>
                    {pharmacy.type === "online" ? (
                      <>
                        <Truck className="h-3 w-3 mr-1" />
                        Online
                      </>
                    ) : (
                      <>
                        <Store className="h-3 w-3 mr-1" />
                        Local
                      </>
                    )}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {renderStars(pharmacy.rating)}
                  </div>
                  <span className="text-sm text-muted-foreground">({pharmacy.rating})</span>
                </div>

                <div className="space-y-1 text-sm text-muted-foreground mb-3">
                  {pharmacy.distance && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{pharmacy.distance} away</span>
                    </div>
                  )}
                  
                  {pharmacy.deliveryTime && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Delivery: {pharmacy.deliveryTime}</span>
                    </div>
                  )}
                  
                  {pharmacy.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{pharmacy.phone}</span>
                    </div>
                  )}
                  
                  {pharmacy.address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5" />
                      <span>{pharmacy.address}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {pharmacy.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {pharmacy.specialOffers && (
                  <div className="p-2 rounded bg-success-light border border-success/20">
                    <p className="text-xs text-success-foreground font-medium">
                      🎉 {pharmacy.specialOffers}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 ml-4">
                <Button variant="medical" size="sm">
                  Visit {pharmacy.type === "online" ? "Website" : "Store"}
                </Button>
                
                {pharmacy.type === "local" && (
                  <Button variant="outline" size="sm">
                    Get Directions
                  </Button>
                )}
                
                {pharmacy.type === "online" && (
                  <Button variant="accent" size="sm">
                    Order Online
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="mt-6 p-4 rounded-lg bg-primary-light border border-primary/20">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary/20">
              <Store className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-1">Insurance & Savings Tips</h4>
              <ul className="text-sm text-primary space-y-1">
                <li>• Always check if your insurance is accepted before ordering</li>
                <li>• Compare prices between pharmacies for the best deal</li>
                <li>• Ask about generic alternatives to save money</li>
                <li>• Look for pharmacy loyalty programs and discounts</li>
                <li>• Consider 90-day supplies for maintenance medications</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};