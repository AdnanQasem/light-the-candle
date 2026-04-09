import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Heart,
  MapPin,
  Camera,
  Share2,
  Shield,
  Users,
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockCandles } from "@/data/mockCandles";

const urgencyStyles = {
  critical: "bg-urgent text-urgent-foreground",
  high: "bg-amber text-amber-foreground",
  medium: "bg-secondary text-secondary-foreground",
} as const;

const CandleDetails = () => {
  const { id } = useParams();
  const candle = mockCandles.find((item) => item.id === id);

  if (!candle) {
    return (
      <div className="page-shell min-h-screen">
        <Navbar />
        <div className="section-shell flex min-h-screen items-center justify-center px-4">
          <div className="warm-panel rounded-[34px] px-8 py-12 text-center">
            <h1 className="font-heading text-4xl font-semibold text-foreground">Candle not found</h1>
            <p className="mt-3 text-muted-foreground">This route exists, but the case does not.</p>
            <Button variant="amber" className="mt-6" asChild>
              <Link to="/candles">Browse candles</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const progress = Math.min((candle.fundedAmount / candle.targetAmount) * 100, 100);
  const remaining = Math.max(candle.targetAmount - candle.fundedAmount, 0);
  const donorCount = candle.donorCount ?? Math.max(Math.round(candle.fundedAmount / 45), 12);
  const daysLeft = candle.daysLeft ?? (candle.isFulfilled ? 0 : Math.max(3, 18 - Number(candle.id)));

  const timeline = [
    { label: "Case submitted", date: "November 12, 2024", done: true },
    { label: "Verified by partner", date: "November 14, 2024", done: true },
    { label: "Published for funding", date: "November 15, 2024", done: true },
    { label: "Fully funded", date: candle.isFulfilled ? "December 1, 2024" : "Pending", done: candle.isFulfilled },
    { label: "Aid delivered", date: candle.isFulfilled ? "December 5, 2024" : "Pending", done: candle.isFulfilled },
  ];

  const proofUpdates = [
    {
      title: "Partner verification completed",
      detail: "A local humanitarian partner reviewed identity documents, need assessment notes, and supporting materials before publishing.",
    },
    {
      title: candle.isFulfilled ? "Delivery confirmation received" : "Funding progress update posted",
      detail: candle.isFulfilled
        ? "Field confirmation and delivery images were attached after the case reached its funding goal."
        : "Donors can follow milestone updates here until the candle is fully lit.",
    },
  ];

  const handleDonate = (amount?: number) => {
    toast.success("Donation flow is not implemented in this demo yet.", {
      description: amount ? `Selected amount: $${amount}.` : "Use this screen as the final step before wiring a real checkout flow.",
    });
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: candle.title,
          text: "View this verified candle on Light The Candle.",
          url: shareUrl,
        });
        return;
      } catch {
        return;
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Case link copied to clipboard.");
    } catch {
      toast.error("Could not copy the link.");
    }
  };

  return (
    <div className="page-shell min-h-screen">
      <Navbar />
      <div className="section-shell px-4 pb-16 pt-28 md:px-6 md:pb-20 md:pt-32">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.04,
              },
            },
          }}
          className="mx-auto max-w-7xl"
        >
          <motion.div
            variants={{
              initial: { opacity: 0, y: 20, filter: "blur(4px)" },
              animate: { opacity: 1, y: 0, filter: "blur(0px)" },
            }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/candles"
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/72 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to candles
            </Link>
          </motion.div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <motion.section
              variants={{
                initial: { opacity: 0, x: -24, filter: "blur(6px)" },
                animate: { opacity: 1, x: 0, filter: "blur(0px)" },
              }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="relative overflow-hidden rounded-[40px] border border-white/45 shadow-card-hover">
                <img src={candle.image} alt={candle.title} className="h-[460px] w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/92 via-foreground/22 to-transparent" />

                <div className="absolute left-6 top-6 flex flex-wrap gap-2">
                  <Badge className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.24em] ${urgencyStyles[candle.urgency]}`}>
                    <Clock className="mr-1.5 h-3 w-3" />
                    {candle.urgency}
                  </Badge>
                  {candle.isVerified && (
                    <Badge className="rounded-full bg-white/85 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-foreground backdrop-blur-sm">
                      <Shield className="mr-1.5 h-3 w-3 text-success" />
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="absolute bottom-6 left-6 right-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
                  <div className="glass-panel rounded-[30px] p-6">
                    <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{candle.category}</div>
                    <h1 className="mt-2 font-heading text-4xl font-semibold leading-tight text-foreground md:text-5xl">{candle.title}</h1>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-amber" />
                        Approx. {candle.governorate}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-amber" />
                        November 15, 2024
                      </span>
                    </div>
                  </div>

                  <div className="rounded-[28px] bg-amber px-6 py-5 text-amber-foreground shadow-lg shadow-amber/25">
                    <div className="text-xs uppercase tracking-[0.24em]">Still needed</div>
                    <div className="mt-2 font-heading text-4xl font-semibold">${remaining.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <div className="glass-panel rounded-[34px] p-6 md:p-8">
                <div className="mb-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">Case narrative</div>
                <p className="text-base leading-8 text-foreground/90">{candle.story}</p>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">
                  This candle represents one verified humanitarian case. Location is shown only at area level for family safety.
                </p>
              </div>

              <div className="glass-panel rounded-[34px] p-6 md:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <span className="rounded-full bg-amber/12 p-3 text-amber">
                    <Camera className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Proof and updates</div>
                    <div className="font-heading text-4xl font-semibold text-foreground">
                      {candle.isFulfilled ? "Candle Lit" : "Track this case"}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {proofUpdates.map((update) => (
                    <div key={update.title} className="rounded-[24px] bg-background/70 p-5">
                      <div className="text-sm font-semibold text-foreground">{update.title}</div>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{update.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="warm-panel rounded-[34px] p-6 md:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <span className="rounded-full bg-amber/12 p-3 text-amber">
                    <CheckCircle className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Fulfillment timeline</div>
                    <div className="font-heading text-4xl font-semibold text-foreground">What happens next</div>
                  </div>
                </div>

                <div className="space-y-5">
                  {timeline.map((item, index) => (
                    <div key={item.label} className="grid gap-4 md:grid-cols-[auto_1fr]">
                      <div className="flex items-start gap-4">
                        <div className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full ${item.done ? "bg-success text-success-foreground" : "bg-secondary text-muted-foreground"}`}>
                          {item.done ? <CheckCircle className="h-4 w-4" /> : <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/45" />}
                        </div>
                        {index < timeline.length - 1 && (
                          <div className="ml-5 mt-1 hidden h-16 w-px bg-border/70 md:block" />
                        )}
                      </div>
                      <div className="pb-2">
                        <div className={`text-lg font-semibold ${item.done ? "text-foreground" : "text-muted-foreground"}`}>{item.label}</div>
                        <div className="mt-1 text-sm text-muted-foreground">{item.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            <motion.aside
              variants={{
                initial: { opacity: 0, x: 24, filter: "blur(6px)" },
                animate: { opacity: 1, x: 0, filter: "blur(0px)" },
              }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="sticky top-28 space-y-6">
                <div className="dark-panel rounded-[34px] p-6 md:p-8">
                  <div className="text-xs uppercase tracking-[0.24em] text-primary-foreground/50">Funding progress</div>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <div>
                      <div className="font-heading text-5xl font-semibold text-primary-foreground">${candle.fundedAmount.toLocaleString()}</div>
                      <div className="mt-1 text-sm text-primary-foreground/66">raised so far</div>
                    </div>
                    <div className="text-right text-sm text-primary-foreground/62">
                      <div>Goal ${candle.targetAmount.toLocaleString()}</div>
                      <div>{Math.round(progress)}% funded</div>
                    </div>
                  </div>

                  <Progress value={progress} className="mt-5 h-3 bg-white/10" />

                  <div className="mt-4 flex items-center justify-between text-sm text-primary-foreground/68">
                    <span>${remaining.toLocaleString()} remaining</span>
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-amber" />
                      {donorCount} donors
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-primary-foreground/72">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2">
                        <Shield className="h-4 w-4 text-amber" />
                        Secure payment
                      </span>
                      <span>{daysLeft} days left</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span>Step 1: choose amount</span>
                      <span>Step 2: confirm payment</span>
                    </div>
                    <div className="text-xs uppercase tracking-[0.22em] text-primary-foreground/45">
                      Minimal checkout. Donation tracking begins after payment confirmation.
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {[25, 50, 100].map((amount) => (
                      <Button key={amount} variant="amber-outline" className="w-full border-white/15 bg-white/5 text-primary-foreground hover:bg-white hover:text-foreground" onClick={() => handleDonate(amount)}>
                        Donate ${amount}
                      </Button>
                    ))}
                    <Button variant="hero" className="w-full" size="lg" onClick={() => handleDonate()}>
                      <Heart className="h-4 w-4" />
                      Contribute custom amount
                    </Button>
                  </div>

                  <Button variant="ghost" className="mt-3 w-full text-primary-foreground/76 hover:bg-white/10 hover:text-primary-foreground" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                    Share this candle
                  </Button>
                </div>

                <div className="glass-panel rounded-[34px] p-6">
                  <div className="mb-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">Verification checklist</div>
                  <div className="space-y-3">
                    {[
                      "Identity verified by a partner NGO",
                      "Published as one verified candle for donor tracking",
                      "Approximate location confirmed for safety",
                      "Need assessment documented",
                      "Case materials and proof updates reviewed before publishing",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-[20px] bg-background/55 px-4 py-3">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                        <span className="text-sm leading-7 text-foreground/88">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default CandleDetails;
