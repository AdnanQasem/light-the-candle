import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, MapPin, Clock, Shield, CheckCircle, ArrowLeft, Share2, Calendar, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockCandles } from "@/data/mockCandles";

const urgencyStyles: Record<string, string> = {
  critical: "bg-urgent text-urgent-foreground",
  high: "bg-amber text-amber-foreground",
  medium: "bg-muted text-muted-foreground",
};

const CandleDetails = () => {
  const { id } = useParams();
  const candle = mockCandles.find((c) => c.id === id);

  if (!candle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-4">Candle Not Found</h1>
          <Button variant="amber" asChild><Link to="/candles">Browse Candles</Link></Button>
        </div>
      </div>
    );
  }

  const progress = Math.min((candle.fundedAmount / candle.targetAmount) * 100, 100);

  const timeline = [
    { label: "Case Submitted", date: "Nov 12, 2024", done: true },
    { label: "Verified by NGO Partner", date: "Nov 14, 2024", done: true },
    { label: "Published & Open for Funding", date: "Nov 15, 2024", done: true },
    { label: "Fully Funded", date: candle.isFulfilled ? "Dec 1, 2024" : "Pending", done: candle.isFulfilled },
    { label: "Aid Delivered & Proof Submitted", date: candle.isFulfilled ? "Dec 5, 2024" : "Pending", done: candle.isFulfilled },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link to="/candles" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Candles
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <div className="relative rounded-xl overflow-hidden">
                <img src={candle.image} alt={candle.title} className="w-full h-72 md:h-96 object-cover" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className={urgencyStyles[candle.urgency]}>
                    <Clock className="h-3 w-3 mr-1" />{candle.urgency}
                  </Badge>
                  {candle.isVerified && <Badge className="bg-success text-success-foreground"><Shield className="h-3 w-3 mr-1" />Verified</Badge>}
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-amber uppercase tracking-wider">{candle.category}</span>
                <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-1 mb-2">{candle.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{candle.governorate}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />Nov 15, 2024</span>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border/50 p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">The Story</h3>
                <p className="text-muted-foreground leading-relaxed">{candle.story}</p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  This case has been verified by our NGO partners on the ground. All funds will be used exclusively for the stated need, and proof of delivery will be shared with donors.
                </p>
              </div>

              {/* Timeline */}
              <div className="bg-card rounded-xl border border-border/50 p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-6">Fulfillment Timeline</h3>
                <div className="space-y-4">
                  {timeline.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? "bg-success" : "bg-muted"}`}>
                        {item.done ? <CheckCircle className="h-4 w-4 text-success-foreground" /> : <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />}
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${item.done ? "text-foreground" : "text-muted-foreground"}`}>{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 space-y-6">
                <div className="bg-card rounded-xl border border-border/50 p-6 shadow-card">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-end">
                      <span className="font-heading text-3xl font-bold text-foreground">${candle.fundedAmount.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground">of ${candle.targetAmount.toLocaleString()}</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{Math.round(progress)}% funded</span>
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" /> 47 donors</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[25, 50, 100].map((amount) => (
                      <Button key={amount} variant="outline" className="w-full justify-between" asChild>
                        <Link to={`/donate/${candle.id}?amount=${amount}`}>
                          <span>Donate ${amount}</span>
                          <Heart className="h-4 w-4 text-amber" />
                        </Link>
                      </Button>
                    ))}
                    <Button variant="amber" className="w-full" size="lg" asChild>
                      <Link to={`/donate/${candle.id}`}>
                        <Heart className="h-5 w-5 mr-2" /> Custom Amount
                      </Link>
                    </Button>
                  </div>

                  <Button variant="ghost" className="w-full mt-3" size="sm">
                    <Share2 className="h-4 w-4 mr-2" /> Share This Candle
                  </Button>
                </div>

                <div className="bg-card rounded-xl border border-border/50 p-6">
                  <h4 className="font-heading font-semibold text-foreground mb-3">Verification</h4>
                  <div className="space-y-2">
                    {[
                      "Identity verified by partner NGO",
                      "Location confirmed (approximate)",
                      "Need assessment completed",
                      "Documentation reviewed",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CandleDetails;
