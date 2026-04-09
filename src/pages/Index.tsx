import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle, Eye, Flame, Heart, MapPin, Play, Shield, Sparkles, TimerReset, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CandleCard from "@/components/CandleCard";
import { mockCandles } from "@/data/mockCandles";
import candlesCommunity from "@/assets/candles-community.jpg";
import CTASection from "@/components/landing/CTASection";
import SuccessStories from "@/components/landing/SuccessStories";
import GazaMapSection from "@/components/landing/GazaMapSection";
import { cn } from "@/lib/utils";

const fadeUp = {
  initial: { opacity: 0, y: 24, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  viewport: { once: true, amount: 0.2 },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any },
};

const steps = [
  {
    step: "01",
    title: "Urgency is submitted",
    desc: "A family or community request is documented as an unlit candle with context, evidence, and a specific target.",
  },
  {
    step: "02",
    title: "The case is checked",
    desc: "Moderators and field partners validate the need before it is shown publicly.",
  },
  {
    step: "03",
    title: "Donors light it together",
    desc: "Supporters fund part or all of the candle, seeing exactly how close it is to fulfillment.",
  },
  {
    step: "04",
    title: "Delivery is confirmed",
    desc: "Once fulfilled, proof and progress updates close the loop and protect trust.",
  },
];

const HeroSection = () => {
  const [litCandles, setLitCandles] = useState<number[]>([]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLitCandles((prev) => {
        if (prev.length >= 7) return prev;
        return [...prev, prev.length];
      });
    }, 320);

    return () => window.clearInterval(interval);
  }, []);

  const heroStats = [
    { value: "2,847", label: "Candles Lit", icon: Heart },
    { value: "$1.2M", label: "Funds Raised", icon: Shield },
    { value: "15K+", label: "Donors Worldwide", icon: Users },
  ];

  return (
    <section className="uniform-section relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,246,239,0.98)_0%,rgba(244,236,224,0.85)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,179,65,0.22),transparent_35%),radial-gradient(circle_at_85%_22%,rgba(28,43,64,0.12),transparent_28%),radial-gradient(circle_at_70%_78%,rgba(245,179,65,0.15),transparent_25%)]" />
      
      {/* Noise Texture Layer */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "linear-gradient(rgba(28,43,64,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(28,43,64,0.15) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(circle at center, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at center, black, transparent 80%)",
        }}
      />
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute -left-20 top-20 h-96 w-96 rounded-full bg-amber/16 blur-[100px]"
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute right-0 top-24 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="container relative mx-auto px-4 py-12 lg:px-8 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-amber/25 bg-white/70 px-4 py-2 text-xs text-foreground shadow-[0_12px_40px_rgba(28,43,64,0.08)] backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber" />
              </span>
              <span className="font-semibold tracking-wide">Verified Humanitarian Platform</span>
            </div>

            <h1 className="max-w-2xl font-heading text-[2.7rem] font-bold leading-[0.98] text-balance text-foreground md:text-[3.45rem] xl:text-[4rem]">
              <span className="block tracking-[-0.04em]">Illuminate</span>
              <span className="mt-2 block text-gradient-amber drop-shadow-[0_0_24px_rgba(245,179,65,0.25)]">
                Hope in Gaza
              </span>
            </h1>

            <p className="mx-auto mb-9 mt-6 max-w-xl text-[14.5px] leading-8 text-muted-foreground lg:mx-0 lg:text-[16px]">
              Every unlit candle represents an urgent need. Every donation lights a flame of hope. <span className="font-medium text-foreground/80">Join compassionate donors making a real difference.</span>
            </p>

            <div className="mb-12 flex flex-col items-center justify-center gap-5 sm:flex-row lg:justify-start">
              <Button variant="amber" size="lg" className="group h-[52px] w-full overflow-hidden rounded-full px-8 text-[15px] font-semibold transition-all duration-300 hover:shadow-[0_20px_40px_rgba(245,179,65,0.3)] sm:w-auto" asChild>
                <Link to="/candles" className="relative flex items-center gap-2">
                  <span className="pointer-events-none absolute inset-0 w-full translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
                  <Heart className="relative z-10 h-5 w-5 fill-current" />
                  <span className="relative z-10">Light a Candle</span>
                  <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1.5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-[52px] w-full rounded-full border-foreground/15 bg-white/60 px-8 text-[15px] font-medium text-foreground shadow-[0_15px_30px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 hover:border-foreground/30 hover:bg-white/90 sm:w-auto"
                asChild
              >
                <Link to="/#how-it-works" className="flex items-center gap-2">
                  <Play className="h-5 w-5 fill-current" />
                  Watch Process
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-sm text-muted-foreground lg:justify-start">
              {[
                { icon: Shield, text: "100% Transparent" },
                { icon: CheckCircle, text: "Verified Cases" },
                { icon: Sparkles, text: "Secure Giving" }
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 rounded-full border border-white/40 bg-white/45 px-4 py-2 shadow-[0_4px_12px_rgba(0,0,0,0.02)] backdrop-blur-md transition-all duration-300 hover:bg-white/60 hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
                  <Icon className="h-4 w-4 text-amber" />
                  <span className="font-medium text-foreground/72 tracking-tight">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            <div className="relative rounded-[40px] border border-white/60 bg-white/45 p-8 shadow-[0_40px_100px_rgba(28,43,64,0.08)] backdrop-blur-2xl">
              <div className="absolute inset-0 rounded-[40px] bg-[radial-gradient(circle_at_top_right,rgba(245,179,65,0.12),transparent_45%)]" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={{
                    scale: litCandles.length > 3 ? [1, 1.08, 1] : 1,
                    opacity: litCandles.length > 3 ? [0.6, 0.8, 0.6] : 0.4,
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="h-72 w-72 rounded-full bg-amber/15 blur-[80px]"
                />
              </div>

              <div className="relative flex items-end justify-center gap-4 md:gap-6">
                {[0, 1, 2, 3, 4, 5, 6].map((index) => {
                  const heights = [40, 60, 80, 100, 80, 60, 40];
                  const isLit = litCandles.includes(index);
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.06 }}
                      className="flex flex-col items-center"
                      style={{ height: `${heights[index]}px` }}
                    >
                      <div className="relative flex flex-col items-center justify-end">
                        <motion.div
                          animate={{
                            opacity: isLit ? 1 : 0,
                            scale: isLit ? 1 : 0.7,
                          }}
                          transition={{ duration: 0.4 }}
                          className="absolute -top-5 h-6 w-4 rounded-[999px_999px_999px_999px/70%_70%_100%_100%] bg-amber blur-[0.2px]"
                          style={{ clipPath: "polygon(50% 0%, 100% 55%, 68% 100%, 50% 86%, 32% 100%, 0% 55%)" }}
                        />
                        <div className={`w-[3px] rounded-full ${isLit ? "bg-foreground/70" : "bg-muted-foreground/70"}`} style={{ height: 10 }} />
                        <div
                          className={`rounded-t-[10px] rounded-b-[6px] border ${
                            isLit ? "border-amber/40 bg-[hsl(42_74%_82%)]" : "border-border bg-[hsl(33_12%_82%)]"
                          } ${index === 3 ? "w-12" : "w-10"}`}
                          style={{ height: `${heights[index]}px` }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div 
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="mt-10 grid grid-cols-3 gap-4"
              >
                {heroStats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={staggerItem}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group relative rounded-2xl border border-white/60 bg-white/80 p-4 text-center shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)]"
                  >
                    <div className="absolute inset-0 rounded-2xl border border-white/40 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                    <stat.icon className="mx-auto mb-2 h-6 w-6 text-amber transition-transform duration-300 group-hover:scale-110" />
                    <div className="text-lg font-bold tracking-tight text-foreground md:text-xl">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs">Scroll to explore</span>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

const FeaturedCandles = () => {
  const [activeFilter, setActiveFilter] = useState<"All" | "Critical" | "Medical" | "Shelter" | "Food">("All");
  const filterOptions: Array<"All" | "Critical" | "Medical" | "Shelter" | "Food"> = ["All", "Critical", "Medical", "Shelter", "Food"];

  const featuredCandles = useMemo(() => {
    const urgencyRank = { critical: 0, high: 1, medium: 2 } as const;

    return mockCandles
      .filter((candle) => {
        if (activeFilter === "All") return true;
        if (activeFilter === "Critical") return candle.urgency === "critical";
        return candle.category === activeFilter;
      })
      .sort((a, b) => urgencyRank[a.urgency] - urgencyRank[b.urgency]);
  }, [activeFilter]);

  const urgencyUI = {
    critical: {
      label: "Critical",
      badge: "border-[#E24B4A] bg-[#FCEBEB] text-[#A32D2D]",
      progress: "bg-[#E24B4A]",
      cardBorder: "border-[1.5px] border-[#E24B4A]",
      button: "bg-[#E24B4A] text-white",
    },
    high: {
      label: "High",
      badge: "border-[#BA7517] bg-[#FAEEDA] text-[#854F0B]",
      progress: "bg-[#BA7517]",
      cardBorder: "border border-border",
      button: "bg-[#17212B] text-white",
    },
    medium: {
      label: "Active",
      badge: "border-[#7BA34D] bg-[#EAF3DE] text-[#3B6D11]",
      progress: "bg-[#1D9E75]",
      cardBorder: "border border-border",
      button: "bg-[#17212B] text-white",
    },
  } as const;

  const donorInitials = [
    ["AN", "LM", "SR"],
    ["MH", "RA", "DK"],
    ["YA", "NO", "EM"],
    ["AL", "MS", "HN"],
    ["FA", "RM", "IS"],
    ["SA", "TJ", "HB"],
  ];

  return (
    <section className="section-shell overflow-hidden bg-secondary/30 px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mb-5">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Featured candles</div>
          <h2 className="mt-2 text-[18px] font-medium text-foreground">Cases that need your light</h2>
          <p className="mt-1 text-[13px] text-muted-foreground">Every case is field-verified. Updated daily.</p>
        </motion.div>

        <div className="mb-6 flex flex-wrap gap-2">
          {filterOptions.map((filter) => (
            <motion.button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className={
                activeFilter === filter
                  ? "rounded-full bg-[#17212B] px-4 py-2 text-sm font-medium text-white shadow-[0_10px_24px_rgba(23,33,43,0.18)]"
                  : "rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground shadow-[0_6px_16px_rgba(23,33,43,0.08)]"
              }
            >
              {filter}
            </motion.button>
          ))}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.08 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {featuredCandles.map((candle, index) => {
            const progress = Math.min((candle.fundedAmount / candle.targetAmount) * 100, 100);
            const remaining = Math.max(candle.targetAmount - candle.fundedAmount, 0);
            const donorCount = candle.donorCount ?? Math.max(Math.round(candle.fundedAmount / 45), 12);
            const daysLeft = candle.daysLeft ?? Math.max(3, 12 - Number(candle.id));
            const ui = urgencyUI[candle.urgency];
            const ctaText =
              candle.urgency === "critical"
                ? `Donate now  ${remaining.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })} still needed`
                : candle.urgency === "high"
                  ? `Light this candle  ${remaining.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })} to go`
                  : "Support this family";

            return (
              <motion.article
                key={candle.id}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className={`overflow-hidden rounded-[12px] bg-white shadow-[0_14px_32px_rgba(23,33,43,0.10)] hover:shadow-[0_18px_40px_rgba(23,33,43,0.14)] ${ui.cardBorder}`}
              >
                <Link to={`/candles/${candle.id}`} className="block">
                  <div className="relative h-[130px] overflow-hidden bg-[#E5E7EB]">
                    <motion.img
                      src={candle.image}
                      alt={candle.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    />
                    <div className="absolute left-3 top-3">
                      <motion.span
                        animate={candle.urgency === "critical" ? { scale: [1, 1.03, 1] } : undefined}
                        transition={candle.urgency === "critical" ? { duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" } : undefined}
                        className={`inline-flex rounded-[20px] border px-2.5 py-1 text-[11px] font-semibold ${ui.badge}`}
                      >
                        {ui.label}
                      </motion.span>
                    </div>
                    <div className="absolute right-3 top-3">
                      <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.22, delay: 0.08 }}
                        className="inline-flex rounded-[20px] border border-[#7BA34D] bg-[#EAF3DE] px-2.5 py-1 text-[11px] font-semibold text-[#3B6D11]"
                      >
                        Verified
                      </motion.span>
                    </div>
                  </div>

                  <div className="p-[14px]">
                    <div className="text-[12px] text-muted-foreground">
                      {candle.category} • {candle.governorate}
                    </div>
                    <h3 className="mt-2 line-clamp-2 text-[15px] font-semibold leading-5 text-foreground">{candle.title}</h3>
                    <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-muted-foreground">{candle.story}</p>

                    <div className="mt-4">
                      <div className="flex items-end justify-between gap-3">
                        <div className="text-[15px] font-bold text-foreground">
                          {candle.fundedAmount.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}
                        </div>
                        <div className="text-[12px] text-muted-foreground">
                          of {candle.targetAmount.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}
                        </div>
                      </div>
                      <div className="mt-2 h-[5px] rounded-full bg-[#E7E5E4]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${progress}%` }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                          className={`h-[5px] rounded-full ${ui.progress}`}
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3 text-[12px] text-muted-foreground">
                      <span className={`inline-flex items-center gap-1.5 ${daysLeft <= 3 ? "font-bold text-[#A32D2D]" : ""}`}>
                        <TimerReset className="h-3.5 w-3.5" />
                        {daysLeft} days left
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        {donorCount} donors
                      </span>
                    </div>

                    <div className="mt-4 flex items-center">
                      {(donorInitials[index % donorInitials.length] ?? ["AA", "BB", "CC"]).map((initials, avatarIndex) => (
                        <div
                          key={`${candle.id}-${initials}`}
                          className={`flex h-5 w-5 items-center justify-center rounded-full border border-white bg-[#D9E2EC] text-[9px] font-semibold text-[#17212B] ${avatarIndex > 0 ? "-ml-1.5" : ""}`}
                        >
                          {initials}
                        </div>
                      ))}
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className={`mt-4 rounded-[12px] px-3 py-[9px] text-center text-[12px] font-semibold shadow-[0_10px_22px_rgba(23,33,43,0.12)] ${ui.button}`}
                    >
                      {ctaText}
                    </motion.div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const HowItWorks = () => (
  <section id="how-it-works" className="section-shell uniform-section px-4 md:px-6">
    <div className="mx-auto max-w-7xl">
      <motion.div {...fadeUp} className="mb-12 text-center">
        <div className="section-kicker mb-4">
          <Shield className="h-3.5 w-3.5" />
          Proof-based flow
        </div>
        <h2 className="editorial-title mx-auto max-w-4xl">A simple flow from urgent need to verified delivery.</h2>
        <p className="editorial-copy mx-auto mt-4 max-w-2xl">
          Each stage is framed as a clear operational step so the donor understands exactly how a candle moves from request to fulfillment.
        </p>
      </motion.div>

      <motion.div 
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        {steps.map((item) => (
          <motion.div
            key={item.step}
            variants={staggerItem}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative overflow-hidden rounded-[36px] border border-white/60 bg-white/45 p-8 shadow-[0_20px_40px_rgba(0,0,0,0.03)] backdrop-blur-md transition-all duration-300 hover:bg-white/70 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)]"
          >
            <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-amber/5 blur-3xl transition-all group-hover:bg-amber/15" />
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground text-xl font-bold text-primary-foreground shadow-lg transition-transform group-hover:rotate-3">
              {item.step}
            </div>
            <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground">{item.title}</h3>
            <p className="mt-4 text-[15px] font-medium leading-[1.8] text-muted-foreground/85">{item.desc}</p>
            <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-amber transition-all duration-500 group-hover:w-full" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

const MissionSection = () => (
  <section id="about" className="section-shell uniform-section px-4 md:px-6">
    <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
      <motion.div {...fadeUp} className="relative rounded-[42px] border border-white/60 bg-white/45 p-10 shadow-xl backdrop-blur-xl md:p-12">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
            <filter id="noiseFilterMission">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilterMission)" />
          </svg>
        </div>
        <div className="section-kicker mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          Product principle
        </div>
        <h2 className="editorial-title text-balance">Dignity, transparency, and clarity stay visible at every step.</h2>
        <p className="editorial-copy mt-6 text-lg leading-relaxed">
          The platform keeps the story human, the process visible, and the call to action direct.
        </p>

        <div className="mt-10 space-y-5">
          {[
            { icon: Shield, text: "Every case is framed around verification, not hype." },
            { icon: Eye, text: "Progress and proof remain visible throughout the journey." },
            { icon: MapPin, text: "Locations are approximate to protect safety and privacy." },
            { icon: CheckCircle, text: "Fulfillment language is explicit and outcome-oriented." },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="group flex items-center gap-5 rounded-[24px] border border-white/60 bg-white/50 px-5 py-4 transition-all duration-300 hover:bg-white/80 hover:shadow-md">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber/12 text-amber transition-transform group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-[15px] font-medium leading-[1.6] text-foreground/85">{text}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div {...fadeUp} className="relative overflow-hidden rounded-[36px] border border-white/45 shadow-card-hover">
        <img
          src={candlesCommunity}
          alt="Community of candles representing collective hope"
          className="h-full min-h-[560px] w-full object-cover"
          loading="lazy"
          width={1000}
          height={900}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/92 via-foreground/30 to-transparent" />
        <div className="absolute inset-x-6 bottom-6 grid gap-4 md:grid-cols-[1fr_0.78fr]">
          <div className="glass-panel rounded-[30px] p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Mission in practice</div>
            <p className="mt-3 font-heading text-3xl font-semibold leading-tight text-foreground">
              Organized, respectful giving helps donors act with confidence.
            </p>
          </div>
          <div className="rounded-[30px] bg-amber p-6 text-amber-foreground shadow-lg shadow-amber/30">
            <div className="text-xs font-semibold uppercase tracking-[0.24em]">Platform momentum</div>
            <div className="mt-2 font-heading text-4xl font-semibold">1,247</div>
            <div className="mt-1 text-sm leading-6">Candles already lit through collective donor action.</div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Index = () => (
  <div className="page-shell min-h-screen">
    <Navbar />
    <HeroSection />
    <FeaturedCandles />
    <HowItWorks />
    <GazaMapSection />
    <MissionSection />
    <SuccessStories />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
