import { Link } from "react-router-dom";
import { MapPin, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export interface CandleData {
  id: string;
  title: string;
  story: string;
  image: string;
  category: string;
  urgency: "critical" | "high" | "medium";
  governorate: string;
  targetAmount: number;
  fundedAmount: number;
  isVerified: boolean;
  isFulfilled: boolean;
}

const urgencyStyles: Record<string, string> = {
  critical: "bg-urgent text-urgent-foreground",
  high: "bg-amber text-amber-foreground",
  medium: "bg-muted text-muted-foreground",
};

const CandleCard = ({ candle }: { candle: CandleData }) => {
  const progress = Math.min((candle.fundedAmount / candle.targetAmount) * 100, 100);

  return (
    <Link
      to={`/candles/${candle.id}`}
      className="group block rounded-xl overflow-hidden bg-card shadow-card hover:shadow-card-hover transition-all duration-500 border border-border/50"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={candle.image}
          alt={candle.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className={urgencyStyles[candle.urgency]}>
            <Clock className="h-3 w-3 mr-1" />
            {candle.urgency}
          </Badge>
          {candle.isVerified && (
            <Badge className="bg-success text-success-foreground">Verified</Badge>
          )}
        </div>

        {candle.isFulfilled && (
          <div className="absolute inset-0 bg-success/20 flex items-center justify-center">
            <span className="bg-success text-success-foreground px-4 py-2 rounded-full font-heading font-semibold text-lg">
              🕯 Candle Lit!
            </span>
          </div>
        )}

        <div className="absolute bottom-3 left-3">
          <span className="text-sm text-primary-foreground/90 flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {candle.governorate}
          </span>
        </div>
      </div>

      <div className="p-5">
        <span className="text-xs font-medium text-amber uppercase tracking-wider">
          {candle.category}
        </span>
        <h3 className="font-heading text-lg font-semibold text-card-foreground mt-1 mb-2 line-clamp-2 group-hover:text-amber transition-colors">
          {candle.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {candle.story}
        </p>

        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-card-foreground">${candle.fundedAmount.toLocaleString()}</span>
            <span className="text-muted-foreground">of ${candle.targetAmount.toLocaleString()}</span>
          </div>
        </div>

        <Button variant="amber" className="w-full mt-4" size="sm">
          <Heart className="h-4 w-4 mr-1" /> Light This Candle
        </Button>
      </div>
    </Link>
  );
};

export default CandleCard;
