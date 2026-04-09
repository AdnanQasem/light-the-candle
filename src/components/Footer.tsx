import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/BrandLogo";

const Footer = () => (
  <footer className="section-shell px-4 pb-6 pt-12 md:px-6">
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="dark-panel mx-auto max-w-7xl overflow-hidden rounded-[36px] px-6 py-10 md:px-10 md:py-12"
    >
      <div className="grid gap-8 lg:grid-cols-[1.25fr_0.8fr_0.8fr_1fr]">
        <div className="max-w-md">
          <BrandLogo size="lg" />
          <p className="mt-5 text-sm leading-7 text-primary-foreground/72">
            A dignified fundraising experience for urgent, verified needs in Gaza. Cases are presented with care, funded transparently, and followed through with proof.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { icon: ShieldCheck, text: "Reviewed before publishing" },
              { icon: Sparkles, text: "Outcome-first updates" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-primary-foreground/82">
                <Icon className="mb-2 h-4 w-4 text-amber" />
                {text}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary-foreground/56">Explore</h4>
          <div className="space-y-3">
            <Link to="/" className="block text-sm text-primary-foreground/72 transition-colors hover:text-amber">Home</Link>
            <Link to="/candles" className="block text-sm text-primary-foreground/72 transition-colors hover:text-amber">Browse Candles</Link>
            <Link to="/#how-it-works" className="block text-sm text-primary-foreground/72 transition-colors hover:text-amber">How It Works</Link>
            <Link to="/#stories" className="block text-sm text-primary-foreground/72 transition-colors hover:text-amber">Impact Stories</Link>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary-foreground/56">Trust</h4>
          <div className="space-y-3 text-sm text-primary-foreground/72">
            <div>Verification partners</div>
            <div>Donation transparency</div>
            <div>Proof of fulfillment</div>
            <div>Privacy-aware locations</div>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary-foreground/56">Take Action</h4>
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
            <p className="font-heading text-2xl leading-tight text-primary-foreground">
              Light a verified candle and follow it through delivery.
            </p>
            <p className="mt-3 text-sm leading-7 text-primary-foreground/66">
              Clear cases, visible progress, and a calmer donor experience from start to finish.
            </p>
            <Button variant="amber" className="mt-5 w-full justify-between candle-button-live" asChild>
              <Link to="/candles">
                Browse Cases
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="soft-divider my-8" />

      <div className="flex flex-col gap-3 text-xs text-primary-foreground/52 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Light The Candle. Built for careful, transparent giving.</p>
        <p className="flex items-center gap-1.5">
          Designed with <Heart className="h-3.5 w-3.5 text-amber" /> for dignity and clarity.
        </p>
      </div>
    </motion.div>
  </footer>
);

export default Footer;
