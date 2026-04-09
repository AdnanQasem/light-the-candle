import { useEffect, useState } from "react";
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
                  <span className="absolute inset-0 w-full translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
                  <Heart className="h-5 w-5 fill-current" />
                  Light a Candle
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1.5" />
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

const FeaturedCandles = () => (
  <section className="section-shell uniform-section overflow-hidden bg-secondary/30 px-4 md:px-6">
    <div className="mx-auto max-w-7xl">
      <div className="relative overflow-hidden rounded-[40px] border border-white/60 bg-[linear-gradient(180deg,rgba(255,252,246,0.92),rgba(245,236,223,0.88))] px-5 py-6 shadow-[0_28px_90px_rgba(28,43,64,0.08)] backdrop-blur-xl md:px-8 md:py-8 xl:px-10 xl:py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,179,65,0.16),transparent_32%),radial-gradient(circle_at_100%_35%,rgba(28,43,64,0.08),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.18),transparent_100%)]" />
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
            <filter id="noiseFilterFeatured">
              <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilterFeatured)" />
          </svg>
        </div>

        <div className="relative">
          <motion.div {...fadeUp} className="mb-8 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <div className="section-kicker mb-4">
                <Heart className="h-3.5 w-3.5" />
                Featured candles
              </div>
              <h2 className="editorial-title max-w-3xl">Support the cases that are both urgent and already moving.</h2>
              <p className="editorial-copy mt-4 max-w-2xl">
                The lead candle shows where momentum is strongest right now. Supporting cases stay compact and scannable so donors can compare urgency, progress, and remaining need in a few seconds.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row xl:items-center">
              <div className="grid grid-cols-2 gap-3 sm:min-w-[22rem]">
                {[
                  { icon: Shield, label: "Verified first", value: "4 active cases" },
                  { icon: TimerReset, label: "Critical window", value: "4-11 days left" },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="rounded-[24px] border border-white/70 bg-white/72 px-4 py-3 shadow-[0_12px_30px_rgba(28,43,64,0.05)] backdrop-blur-md"
                  >
                    <div
                      className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-amber/15"
                      style={{ color: "hsl(var(--amber-dark))" }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">{label}</div>
                    <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
                  </div>
                ))}
              </div>
              <Button variant="amber-outline" className="self-start bg-background/60" asChild>
                <Link to="/candles">
                  Browse all cases
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(22rem,0.75fr)]"
          >
            <motion.div variants={staggerItem} className="space-y-5">
              <div className="flex items-center justify-between rounded-[26px] border border-amber/20 bg-[linear-gradient(135deg,rgba(245,179,65,0.14),rgba(255,255,255,0.72))] px-5 py-4">
                <div>
                  <div
                    className="text-[10px] font-bold uppercase tracking-[0.24em]"
                    style={{ color: "hsl(var(--amber-dark) / 0.8)" }}
                  >
                    Lead priority
                  </div>
                  <div className="mt-1 text-sm font-semibold text-foreground">Best next action for first-time donors</div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/75 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/70">
                  <Flame className="h-3.5 w-3.5 text-amber" />
                  Live now
                </div>
              </div>
              <CandleCard candle={mockCandles[0]} variant="featured" />
            </motion.div>

            <motion.div variants={staggerItem} className="flex h-full flex-col gap-4 rounded-[32px] border border-white/60 bg-white/55 p-4 shadow-[0_20px_60px_rgba(28,43,64,0.05)] backdrop-blur-xl md:p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">Next in line</div>
                  <h3 className="mt-2 font-heading text-[1.75rem] font-bold tracking-tight text-foreground">Compare by need, not by guesswork.</h3>
                </div>
                <div className="hidden rounded-full border border-border/60 bg-background/80 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground md:block">
                  3 cases
                </div>
              </div>

              <div className="grid gap-4">
                {mockCandles.slice(1, 4).map((candle) => (
                  <CandleCard key={candle.id} candle={candle} variant="compact" />
                ))}
              </div>

              <div className="rounded-[28px] border border-dashed border-amber/35 bg-[linear-gradient(180deg,rgba(245,179,65,0.08),rgba(255,255,255,0.7))] p-5">
                <p className="text-[14px] leading-7 text-muted-foreground">
                  Can&apos;t choose one case? The general fund routes support to the most time-sensitive verified requests without slowing down delivery.
                </p>
                <Button variant="amber" size="lg" className="mt-4 w-full sm:w-auto">
                  Donate to General Fund
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

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
