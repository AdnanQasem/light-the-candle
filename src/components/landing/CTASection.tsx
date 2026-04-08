import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";

const UnlitCandle = () => (
  <div className="flex flex-col items-center">
    <svg width="48" height="72" viewBox="0 0 48 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Wick */}
      <line x1="24" y1="8" x2="24" y2="18" stroke="hsl(220 10% 40%)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Candle body */}
      <rect x="12" y="18" width="24" height="44" rx="4" fill="hsl(220 10% 88%)" stroke="hsl(220 10% 78%)" strokeWidth="1" />
      {/* Base */}
      <rect x="8" y="58" width="32" height="8" rx="3" fill="hsl(220 10% 82%)" stroke="hsl(220 10% 72%)" strokeWidth="1" />
    </svg>
  </div>
);

const LitCandle = () => (
  <div className="flex flex-col items-center relative">
    {/* Glow circle */}
    <div className="absolute -inset-4 rounded-full bg-amber/10 blur-md" />
    <div className="relative">
      <svg width="56" height="88" viewBox="0 0 56 88" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Flame */}
        <ellipse cx="28" cy="14" rx="6" ry="10" fill="hsl(38 90% 55%)" className="animate-flicker origin-bottom" />
        <ellipse cx="28" cy="14" rx="3" ry="6" fill="hsl(43 95% 75%)" className="animate-flicker origin-bottom" />
        {/* Wick */}
        <line x1="28" y1="20" x2="28" y2="28" stroke="hsl(220 10% 30%)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Candle body */}
        <rect x="14" y="28" width="28" height="48" rx="4" fill="hsl(43 85% 78%)" stroke="hsl(43 60% 65%)" strokeWidth="1" />
        {/* Base */}
        <rect x="10" y="72" width="36" height="10" rx="3" fill="hsl(43 70% 72%)" stroke="hsl(43 50% 60%)" strokeWidth="1" />
      </svg>
    </div>
  </div>
);

const CTASection = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-4 max-w-3xl text-center">
      {/* Candle transformation illustration */}
      <div className="flex items-center justify-center gap-6 md:gap-10 mb-10">
        <div className="flex flex-col items-center gap-2">
          <UnlitCandle />
          <span className="text-xs text-muted-foreground font-medium mt-2">Unlit</span>
          <span className="text-xs text-muted-foreground">Waiting for support</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-12 md:w-20 h-px bg-amber/60" />
          <Heart className="h-5 w-5 text-amber/50" />
          <div className="w-12 md:w-20 h-px bg-amber/60" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="bg-amber/10 rounded-full p-3">
            <LitCandle />
          </div>
          <span className="text-xs text-amber font-semibold mt-2">Lit</span>
          <span className="text-xs text-muted-foreground">Life transformed</span>
        </div>
      </div>

      <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6">
        Ready to Light a Candle?
      </h2>
      <p className="text-muted-foreground mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
        Every donation, no matter how small, brings hope to someone in need.
        Join thousands of compassionate donors making a real difference.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="hero" size="lg" className="text-lg px-8 py-6" asChild>
          <Link to="/candles">
            <Heart className="h-5 w-5 mr-2" /> Browse Candles to Light <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
          <Link to="/donate">Donate to General Fund</Link>
        </Button>
      </div>
    </div>
  </section>
);

export default CTASection;
