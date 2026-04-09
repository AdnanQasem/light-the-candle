import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency, useLocale } from "@/lib/locale";

export interface CandleData {
  id: string;
  title: string;
  titleAr?: string;
  story: string;
  storyAr?: string;
  image: string;
  category: string;
  categoryAr?: string;
  urgency: "critical" | "high" | "medium" | "low";
  governorate: string;
  governorateAr?: string;
  targetAmount: number;
  fundedAmount: number;
  isVerified: boolean;
  isFulfilled: boolean;
  donorCount?: number;
  daysLeft?: number;
}

const urgencyStyles: Record<CandleData["urgency"], { bar: string; badge: string; track: string; fill: string }> = {
  critical: {
    bar: "bg-[#B42318]",
    badge: "bg-[#FEE4E2] text-[#B42318]",
    track: "bg-[#F4D6D4]",
    fill: "bg-[#B42318]",
  },
  high: {
    bar: "bg-[#C2410C]",
    badge: "bg-[#FFEDD5] text-[#9A3412]",
    track: "bg-[#F3DDCF]",
    fill: "bg-[#C2410C]",
  },
  medium: {
    bar: "bg-[#B54708]",
    badge: "bg-[#FEF0C7] text-[#92400E]",
    track: "bg-[#F0E0B7]",
    fill: "bg-[#B54708]",
  },
  low: {
    bar: "bg-[#166534]",
    badge: "bg-[#DCFCE7] text-[#166534]",
    track: "bg-[#D1E7D6]",
    fill: "bg-[#166534]",
  },
};

const CandleCard = ({
  candle,
  variant = "default",
}: {
  candle: CandleData;
  variant?: "default" | "featured" | "compact";
}) => {
  const { locale, dir } = useLocale();
  const progress = Math.min((candle.fundedAmount / candle.targetAmount) * 100, 100);
  const remaining = Math.max(candle.targetAmount - candle.fundedAmount, 0);
  const isCompact = variant === "compact";
  const isFeatured = variant === "featured";
  const localizedTitle = locale === "ar" ? candle.titleAr ?? candle.title : candle.title;
  const localizedStory = locale === "ar" ? candle.storyAr ?? candle.story : candle.story;
  const localizedGovernorate = locale === "ar" ? candle.governorateAr ?? candle.governorate : candle.governorate;

  const copy =
    locale === "ar"
      ? {
          urgency: {
            critical: "حرج",
            high: "عالٍ",
            medium: "متوسط",
            low: "منخفض",
          },
          verified: "موثقة",
          trusted: "شريك موثوق",
          location: "الموقع",
          funded: "تم جمعه",
          target: "الهدف",
          fundedPct: "ممولة",
          left: "متبقي",
          donate: "ساعد الآن",
          donateCompact: "تبرع",
          completed: "مكتملة",
          open: "نشطة",
        }
      : {
          urgency: {
            critical: "Critical",
            high: "High",
            medium: "Medium",
            low: "Low",
          },
          verified: "Verified",
          trusted: "Trusted partner",
          location: "Location",
          funded: "Funded",
          target: "Target",
          fundedPct: "funded",
          left: "left",
          donate: "Help Now",
          donateCompact: "Donate",
          completed: "Completed",
          open: "Open",
        };

  const style = urgencyStyles[candle.urgency];

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.22, ease: "easeOut" }}>
      <Link
        to={`/candles/${candle.id}`}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-border/80 bg-[linear-gradient(180deg,#fffdf9_0%,#f4efe7_100%)] shadow-[0_10px_28px_rgba(15,23,42,0.08)] transition-[transform,box-shadow] duration-300 hover:shadow-[0_18px_38px_rgba(15,23,42,0.12)]",
          isCompact && "rounded-[24px]",
        )}
        dir={dir}
      >
        <div className={cn("h-1.5 w-full", style.bar)} />

        <div
          className={cn(
            "relative overflow-hidden border-b border-white/55",
            isFeatured ? "aspect-[16/9]" : isCompact ? "aspect-[16/8.5]" : "aspect-[16/9.25]",
          )}
        >
          <img
            src={candle.image}
            alt={localizedTitle}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17212B]/72 via-[#17212B]/18 to-transparent" />
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 text-white">
            <span className="rounded-full bg-black/24 px-3 py-1 text-[11px] font-semibold backdrop-blur-sm">
              {localizedGovernorate}
            </span>
            {candle.isVerified && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/88 px-3 py-1 text-[11px] font-semibold text-[#027A48]">
                <ShieldCheck className="h-3.5 w-3.5" />
                {copy.verified}
              </span>
            )}
          </div>
        </div>

        <div className={cn("flex h-full flex-col space-y-4 p-4", isCompact ? "p-4" : "p-5", isFeatured && "p-6")}>
          <header className="flex items-start justify-between gap-3">
            <span className={cn("inline-flex min-h-8 items-center rounded-full px-3 text-[11px] font-bold", style.badge)}>
              {copy.urgency[candle.urgency]}
            </span>

            <span className="text-xs font-medium text-[#475467]">{candle.isVerified ? copy.trusted : copy.open}</span>
          </header>

          <div className="space-y-2">
            <h3
              className={cn(
                "line-clamp-2 text-start font-semibold leading-[1.35] text-card-foreground",
                isFeatured ? "text-2xl" : isCompact ? "text-[1.02rem]" : "text-[1.15rem]",
              )}
            >
              {localizedTitle}
            </h3>
            <p className={cn("line-clamp-2 text-start text-sm leading-6 text-muted-foreground", isCompact && "text-[13px]")}>
              {localizedStory}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-[#7A271A]" />
              <span className="font-medium">{localizedGovernorate}</span>
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
              {candle.category}
            </span>
          </div>

          <section className="rounded-[22px] border border-white/60 bg-white/72 p-4">
            <div className="mb-3 flex items-end justify-between gap-3">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{copy.funded}</div>
                <div className={cn("mt-1 font-semibold text-card-foreground", isFeatured ? "text-3xl" : "text-2xl")}>
                  {formatCurrency(candle.fundedAmount, locale)}
                </div>
              </div>
              <div className="text-start text-sm text-muted-foreground">
                <div>{copy.target}: {formatCurrency(candle.targetAmount, locale)}</div>
                <div>{formatCurrency(remaining, locale)} {copy.left}</div>
              </div>
            </div>

            <div className={cn("h-2.5 overflow-hidden rounded-full", style.track)}>
              <div
                className={cn("h-full rounded-full transition-[width] duration-500", style.fill)}
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="font-semibold text-foreground">
                {Math.round(progress)}% {copy.fundedPct}
              </span>
              <span className="text-muted-foreground">{candle.isFulfilled ? copy.completed : copy.open}</span>
            </div>
          </section>

          <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-muted-foreground">
              {copy.location}: {localizedGovernorate}
            </span>

            <span
              className={cn(
                "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors",
                candle.isFulfilled
                  ? "border border-border bg-background text-foreground"
                  : "bg-primary text-primary-foreground group-hover:bg-[#101A25]",
              )}
            >
              {isCompact ? copy.donateCompact : copy.donate}
              <ArrowRight className={cn("h-4 w-4 transition-transform duration-300", locale === "ar" ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1")} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CandleCard;
