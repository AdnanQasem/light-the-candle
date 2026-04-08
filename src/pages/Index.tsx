import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Eye, Users, ArrowRight, Flame, CheckCircle, MapPin, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CandleCard from "@/components/CandleCard";
import { mockCandles } from "@/data/mockCandles";
import heroImage from "@/assets/hero-candle.jpg";
import candlesCommunity from "@/assets/candles-community.jpg";
import CTASection from "@/components/landing/CTASection";
import SuccessStories from "@/components/landing/SuccessStories";
import GazaMapSection from "@/components/landing/GazaMapSection";

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroImage} alt="A candle of hope" className="w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/70 to-foreground/50" />
    </div>
    <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl" style={{ animationDelay: "0.2s" }}>
      <div className="inline-flex items-center gap-2 bg-amber/20 border border-amber/30 rounded-full px-4 py-1.5 mb-8">
        <Flame className="h-4 w-4 text-amber animate-flicker" />
        <span className="text-sm font-medium text-amber">Every candle tells a story of hope</span>
      </div>
      <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
        Light a Candle,<br />
        <span className="text-gradient-amber">Change a Life</span>
      </h1>
      <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed font-body">
        A trusted humanitarian platform connecting verified urgent needs in Gaza with compassionate donors worldwide. Every donation is tracked, verified, and proven.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="hero" size="lg" className="text-lg px-8 py-6" asChild>
          <Link to="/candles">
            <Heart className="h-5 w-5 mr-2" /> Browse Candles
          </Link>
        </Button>
        <Button variant="amber-outline" size="lg" className="text-lg px-8 py-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
          <Link to="/#how-it-works">
            How It Works <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

const TrustBar = () => (
  <section className="bg-card border-y border-border/50 py-6">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
        {[
          { icon: Shield, label: "Verified Cases" },
          { icon: Eye, label: "Full Transparency" },
          { icon: CheckCircle, label: "Proof of Fulfillment" },
          { icon: Users, label: "NGO Partners" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-muted-foreground">
            <Icon className="h-5 w-5 text-amber" />
            <span className="text-sm font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ImpactStats = () => (
  <section className="py-20 bg-card">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Our Impact So Far</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Every number represents a real person whose life was touched by the generosity of donors like you.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {[
          { number: "1,247", label: "Candles Lit", icon: Flame },
          { number: "$892K", label: "Funds Raised", icon: TrendingUp },
          { number: "4,600+", label: "Lives Impacted", icon: Heart },
          { number: "98%", label: "Verified Cases", icon: Shield },
        ].map(({ number, label, icon: Icon }) => (
          <div key={label} className="text-center p-6 rounded-xl bg-background shadow-card border border-border/50">
            <Icon className="h-8 w-8 text-amber mx-auto mb-3" />
            <div className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-1">{number}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section id="how-it-works" className="py-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          From submission to fulfillment — complete transparency at every step.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {[
          { step: "01", title: "Submit a Need", desc: "A person in Gaza submits their urgent need as an 'unlit candle' with details and evidence." },
          { step: "02", title: "Verify & Publish", desc: "NGO partners and moderators verify the case for authenticity before publishing." },
          { step: "03", title: "Donors Contribute", desc: "Donors browse verified cases, choose a candle, and contribute securely." },
          { step: "04", title: "Candle Lit ✨", desc: "Once fully funded, aid is delivered with proof submitted. The candle is lit!" },
        ].map(({ step, title, desc }) => (
          <div key={step} className="relative text-center">
            <div className="w-16 h-16 rounded-full bg-amber/10 border-2 border-amber flex items-center justify-center mx-auto mb-4">
              <span className="font-heading text-xl font-bold text-amber">{step}</span>
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FeaturedCandles = () => (
  <section className="py-20 bg-card">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-end justify-between mb-12">
        <div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Candles</h2>
          <p className="text-muted-foreground max-w-xl">
            These verified cases need your support the most. Every contribution brings light.
          </p>
        </div>
        <Button variant="amber-outline" className="mt-4 md:mt-0" asChild>
          <Link to="/candles">View All Candles <ArrowRight className="h-4 w-4 ml-2" /></Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCandles.slice(0, 3).map((candle) => (
          <CandleCard key={candle.id} candle={candle} />
        ))}
      </div>
    </div>
  </section>
);

const MissionSection = () => (
  <section id="about" className="py-20">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        <div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
            Dignity, Transparency,<br />
            <span className="text-gradient-amber">Real Impact</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Light The Candle was born from a simple belief: every person in crisis deserves to be seen, heard, and helped with dignity. We don't just raise funds — we verify needs, ensure delivery, and prove impact.
          </p>
          <div className="space-y-4">
            {[
              { icon: Shield, text: "Every case verified by trusted NGO partners" },
              { icon: Eye, text: "Full transparency from donation to delivery" },
              { icon: MapPin, text: "Approximate locations for privacy and safety" },
              { icon: CheckCircle, text: "Proof of fulfillment for every lit candle" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3">
                <Icon className="h-5 w-5 text-amber mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img
            src={candlesCommunity}
            alt="Community of candles representing collective hope"
            className="rounded-2xl shadow-card-hover"
            loading="lazy"
            width={800}
            height={600}
          />
          <div className="absolute -bottom-6 -left-6 bg-amber text-amber-foreground rounded-xl p-5 shadow-lg">
            <div className="font-heading text-2xl font-bold">1,247</div>
            <div className="text-sm font-medium">Candles Lit</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const SuccessStories = () => (
  <section className="py-20 bg-primary text-primary-foreground">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Stories of Light</h2>
        <p className="text-primary-foreground/70 max-w-xl mx-auto">
          Real stories from real people whose candles were lit by generous donors.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[
          { quote: "When I saw the medical supplies arrive, I cried. My children can finally get the treatment they need. Thank you for seeing us.", name: "Um Ahmad", location: "Gaza City" },
          { quote: "The water filter changed everything for our community. Clean water seemed impossible, but generous hearts made it real.", name: "Abu Khalil", location: "North Gaza" },
          { quote: "My son received a prosthetic and walked for the first time in months. The donors gave him more than mobility — they gave him hope.", name: "Fatima H.", location: "Khan Yunis" },
        ].map((story) => (
          <div key={story.name} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-6">
            <Flame className="h-6 w-6 text-amber mb-4" />
            <p className="text-sm text-primary-foreground/80 leading-relaxed mb-6 italic">
              "{story.quote}"
            </p>
            <div>
              <div className="font-semibold text-primary-foreground">{story.name}</div>
              <div className="text-xs text-primary-foreground/50">{story.location}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-20 text-center">
    <div className="container mx-auto px-4 max-w-3xl">
      <Flame className="h-12 w-12 text-amber mx-auto mb-6 animate-flicker" />
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
        Be the Light Someone<br />Is Waiting For
      </h2>
      <p className="text-muted-foreground mb-8 text-lg">
        Browse verified cases, choose a candle, and make a difference that you can see and track.
      </p>
      <Button variant="hero" size="lg" className="text-lg px-10 py-6" asChild>
        <Link to="/candles">
          <Heart className="h-5 w-5 mr-2" /> Browse Candles Now
        </Link>
      </Button>
    </div>
  </section>
);

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <TrustBar />
    <ImpactStats />
    <FeaturedCandles />
    <HowItWorks />
    <MissionSection />
    <SuccessStories />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
