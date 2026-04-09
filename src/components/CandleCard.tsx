import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Clock, Flame, Heart, MapPin, ShieldCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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
  donorCount?: number;
  daysLeft?: number;
}

const urgencyStyles: Record<CandleData["urgency"], string> = {
  critical: "bg-urgent text-urgent-foreground",
  high: "bg-amber text-amber-foreground",
  medium: "bg-secondary text-secondary-foreground",
};

const CandleCard = ({
  candle,
  variant = "default",
}: {
  candle: CandleData;
  variant?: "default" | "featured" | "compact";
}) => {
  const progress = Math.min((candle.fundedAmount / candle.targetAmount) * 100, 100);
  const remaining = Math.max(candle.targetAmount - candle.fundedAmount, 0);
  const donorCount = candle.donorCount ?? Math.max(Math.round(candle.fundedAmount / 45), 12);
  const daysLeft = candle.daysLeft ?? (candle.isFulfilled ? 0 : Math.max(3, 18 - Number(candle.id)));
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(isFeatured && "md:col-span-2 md:row-span-2")}
    >
      <Link
        to={`/candles/${candle.id}`}
        className={cn(
          "group block h-full overflow-hidden border border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(247,240,230,0.9))] shadow-card transition-shadow duration-500 hover:shadow-card-hover",
          isCompact ? "rounded-[28px]" : "rounded-[24px]",
        )}
      >
        <div className={cn("relative overflow-hidden", isFeatured ? "h-64 lg:h-80" : isCompact ? "h-52" : "h-48")}>
          <img
            src={candle.image}
            alt={candle.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/10 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/20 to-transparent" />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <Badge className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.22em] ${urgencyStyles[candle.urgency]}`}>
              <Clock className="mr-1.5 h-3 w-3" />
              {candle.urgency}
            </Badge>
            {candle.isVerified && (
              <Badge className="rounded-full bg-white/85 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-foreground backdrop-blur-sm">
                <ShieldCheck className="mr-1.5 h-3 w-3 text-success" />
                Verified
              </Badge>
            )}
          </div>

          {candle.isFulfilled && (
            <div className="absolute inset-0 flex items-center justify-center bg-success/18 backdrop-blur-[2px]">
              <span className="rounded-full bg-success px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-success-foreground shadow-lg">
                Candle Lit
              </span>
            </div>
          )}

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary-foreground/86 backdrop-blur-sm">
                <Flame className="h-3 w-3 text-amber" />
                {candle.category}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-primary-foreground/80">
                <MapPin className="h-3.5 w-3.5 text-amber" />
                {candle.governorate}
              </div>
            </div>

            <div className="rounded-full bg-white/12 p-3 text-primary-foreground backdrop-blur-sm transition-colors duration-300 group-hover:bg-amber group-hover:text-amber-foreground">
              <Heart className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className={cn("space-y-4 p-4.5", isFeatured && "p-5 lg:p-6", isCompact && "space-y-5 p-5")}>
          <div>
            <h3
              className={cn(
                "font-heading font-bold leading-snug text-card-foreground transition-colors duration-300 group-hover:text-amber",
                isFeatured ? "text-2xl lg:text-[1.95rem]" : isCompact ? "text-[1.35rem] leading-[1.18]" : "text-xl",
              )}
            >
              {candle.title}
            </h3>
            <p
              className={cn(
                "mt-2 leading-relaxed text-muted-foreground",
                isFeatured ? "line-clamp-3 text-[14px] lg:text-[15px]" : isCompact ? "line-clamp-3 text-[13.5px]" : "line-clamp-2 text-[13px]",
              )}
            >
              {candle.story}
            </p>
          </div>

          <div className={cn("rounded-[24px] bg-background/80 p-4", isCompact && "rounded-[26px] border border-border/40 bg-background/85")}>
            <div className="mb-3 flex items-end justify-between gap-3">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70">Raised</div>
                <div className="font-heading text-2xl font-bold text-card-foreground">
                  ${candle.fundedAmount.toLocaleString()}
                </div>
              </div>
              <div className="text-right text-[11px] font-medium text-muted-foreground/80">
                <div>Goal ${candle.targetAmount.toLocaleString()}</div>
                <div>${remaining.toLocaleString()} left</div>
              </div>
            </div>

            <Progress value={progress} className="h-2.5 overflow-hidden rounded-full bg-secondary" />

            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="font-semibold text-foreground">{Math.round(progress)}% funded</span>
              <span className="text-muted-foreground">{candle.isFulfilled ? "Completed" : "Open case"}</span>
            </div>
          </div>

          {isCompact ? (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl border border-border/45 bg-white/55 px-4 py-3 text-center">
                <div className="inline-flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {donorCount} donors
                </div>
              </div>
              <div className="rounded-2xl border border-border/45 bg-white/55 px-4 py-3 text-center">
                <div className="inline-flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {daysLeft} days left
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4" />
                {donorCount} donors
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {daysLeft} days left
              </span>
            </div>
          )}

          <div
            className={cn(
              "flex items-center justify-between rounded-full px-4 py-3 text-sm font-semibold transition-colors duration-300",
              candle.isFulfilled
                ? "border border-border/70 bg-background/70 text-foreground group-hover:border-amber/40 group-hover:bg-amber/5"
                : "bg-gradient-to-r from-amber to-[hsl(45_82%_66%)] text-amber-foreground shadow-lg shadow-amber/20",
            )}
          >
            <span>{candle.isFulfilled ? "View fulfillment update" : "Light this candle"}</span>
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm">
              {candle.isFulfilled ? "See proof" : `$${remaining.toLocaleString()} needed`}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CandleCard;
