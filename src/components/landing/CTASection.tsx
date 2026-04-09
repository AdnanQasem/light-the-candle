import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Flame, Heart, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => (
  <section className="section-shell uniform-section px-4 md:px-6">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative mx-auto max-w-7xl overflow-hidden rounded-[48px] bg-[#1a1f26] px-6 py-12 md:px-12 md:py-16 shadow-[0_40px_100px_rgba(0,0,0,0.2)]"
    >
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <filter id="noiseFilterCTA">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilterCTA)" />
        </svg>
      </div>
      <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-amber/12 blur-[100px]" />
      <div className="absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-primary/20 blur-[100px]" />
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative flex min-h-[320px] items-center justify-center rounded-[40px] border border-white/10 bg-white/5 p-8 shadow-inner">
          <div className="absolute h-64 w-64 rounded-full bg-amber/14 blur-[80px]" />
          <div className="relative flex items-center gap-6 md:gap-10">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-10 text-center backdrop-blur-md"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white/40">
                <Flame className="h-8 w-8" />
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">Unlit</div>
              <div className="mt-3 text-[13px] font-medium text-white/50 leading-relaxed">Waiting<br/>to be met</div>
            </motion.div>

            <div className="flex flex-col items-center gap-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent via-white/20 to-transparent md:w-16" />
              <div className="rounded-full bg-amber p-4 text-amber-foreground shadow-[0_10px_25px_rgba(245,179,65,0.4)]">
                <Heart className="h-6 w-6 fill-current" />
              </div>
              <div className="h-px w-8 bg-gradient-to-r from-transparent via-white/20 to-transparent md:w-16" />
            </div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="rounded-[32px] border border-amber/40 bg-amber/12 px-6 py-10 text-center backdrop-blur-md shadow-[0_20px_50px_rgba(245,179,65,0.1)]"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber/20 glow-amber-lg">
                <Flame className="h-8 w-8 animate-flicker text-amber" />
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber">Lit</div>
              <div className="mt-3 text-[13px] font-medium text-white/70 leading-relaxed">Delivered<br/>with proof</div>
            </motion.div>
          </div>
        </div>

        <div>
          <div className="section-kicker mb-4 bg-amber/12 text-amber">
            <ShieldCheck className="h-3.5 w-3.5" />
            Final call to action
          </div>
          <h2 className="font-heading text-4xl font-bold leading-[1.1] text-white md:text-6xl tracking-tight">
            Help move a candle from waiting to fulfilled.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-primary-foreground/74 md:text-base">
            Choose a verified case, contribute clearly, and follow the progress through delivery.
          </p>

          <div className="mt-10 flex flex-col gap-5 sm:flex-row">
            <Button variant="amber" size="lg" className="group h-14 w-full overflow-hidden rounded-full px-10 text-[16px] font-bold shadow-lg shadow-amber/20 sm:w-auto" asChild>
              <Link to="/candles" className="relative flex items-center gap-2">
                <span className="absolute inset-0 w-full translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
                Browse Candles to Light
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1.5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 w-full rounded-full border-white/10 bg-white/5 text-[16px] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/10 sm:w-auto"
              asChild
            >
              <Link to="/#stories">Read Impact Stories</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

export default CTASection;
