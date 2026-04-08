import { useState } from "react";
import { MapPin, AlertCircle, Flame } from "lucide-react";

interface Region {
  name: string;
  waiting: number;
  lit: number;
  urgent: number;
  x: number; // % position on the map SVG
  y: number;
}

const regions: Region[] = [
  { name: "North Gaza", waiting: 45, lit: 120, urgent: 12, x: 48, y: 18 },
  { name: "Gaza City", waiting: 78, lit: 245, urgent: 22, x: 52, y: 35 },
  { name: "Deir al-Balah", waiting: 56, lit: 178, urgent: 10, x: 50, y: 52 },
  { name: "Khan Yunis", waiting: 67, lit: 142, urgent: 9, x: 46, y: 68 },
  { name: "Rafah", waiting: 34, lit: 73, urgent: 5, x: 42, y: 84 },
];

const totalUnlit = regions.reduce((s, r) => s + r.waiting, 0);
const totalLit = regions.reduce((s, r) => s + r.lit, 0);
const totalUrgent = regions.reduce((s, r) => s + r.urgent, 0);

const GazaMapSection = () => {
  const [selected, setSelected] = useState<Region | null>(null);

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Where Your Light Reaches
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See the approximate distribution of candles across Gaza's governorates. Each marker represents a community waiting for support.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Map */}
          <div className="lg:col-span-3 bg-background rounded-2xl border border-border/50 p-6 flex items-center justify-center min-h-[420px] relative">
            {/* Stylized Gaza strip shape */}
            <div className="relative w-full max-w-[280px] mx-auto" style={{ aspectRatio: "1/2.4" }}>
              <svg viewBox="0 0 100 240" className="w-full h-full" fill="none">
                {/* Gaza strip outline */}
                <path
                  d="M 35 10 C 30 10, 20 30, 22 60 C 24 90, 30 100, 35 120 C 40 140, 50 160, 52 180 C 54 200, 48 220, 50 230 C 52 235, 60 235, 62 230 C 64 220, 58 200, 60 180 C 62 160, 70 140, 72 120 C 74 100, 78 90, 76 60 C 74 30, 65 10, 60 10 Z"
                  fill="hsl(40 20% 94%)"
                  stroke="hsl(40 15% 82%)"
                  strokeWidth="1"
                />
              </svg>

              {/* Mediterranean Sea label */}
              <div
                className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 -rotate-90 text-xs text-muted-foreground/50 whitespace-nowrap tracking-widest uppercase"
                style={{ marginLeft: "-20px" }}
              >
                Mediterranean Sea
              </div>

              {/* Region markers */}
              {regions.map((region) => (
                <button
                  key={region.name}
                  onClick={() => setSelected(region)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 ${
                    selected?.name === region.name ? "scale-125 z-10" : "hover:scale-110"
                  }`}
                  style={{ left: `${region.x}%`, top: `${region.y}%` }}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                      selected?.name === region.name
                        ? "bg-amber text-amber-foreground border-amber shadow-lg"
                        : "bg-amber/20 text-amber border-amber/40 hover:bg-amber/30"
                    }`}
                  >
                    {region.waiting}
                  </div>
                  {selected?.name === region.name && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber rotate-45" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Stats sidebar */}
          <div className="lg:col-span-2 space-y-4">
            {/* Summary cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-background rounded-xl border border-border/50 p-4 text-center">
                <div className="mx-auto mb-2">
                  <svg width="28" height="40" viewBox="0 0 28 40" fill="none" className="mx-auto">
                    <line x1="14" y1="4" x2="14" y2="10" stroke="hsl(220 10% 50%)" strokeWidth="1.2" strokeLinecap="round" />
                    <rect x="6" y="10" width="16" height="24" rx="3" fill="hsl(220 10% 88%)" stroke="hsl(220 10% 78%)" strokeWidth="0.8" />
                  </svg>
                </div>
                <div className="font-heading text-2xl font-bold text-foreground">{totalUnlit}</div>
                <div className="text-xs text-muted-foreground">Unlit Candles</div>
              </div>
              <div className="bg-background rounded-xl border border-border/50 p-4 text-center">
                <Flame className="h-7 w-7 text-amber mx-auto mb-2 animate-flicker" />
                <div className="font-heading text-2xl font-bold text-foreground">{totalLit}</div>
                <div className="text-xs text-muted-foreground">Candles Lit</div>
              </div>
              <div className="bg-background rounded-xl border border-border/50 p-4 text-center">
                <AlertCircle className="h-7 w-7 text-urgent mx-auto mb-2" />
                <div className="font-heading text-2xl font-bold text-foreground">{totalUrgent}</div>
                <div className="text-xs text-muted-foreground">Urgent Cases</div>
              </div>
            </div>

            {/* Selected region detail */}
            <div className="bg-background rounded-xl border border-border/50 p-5">
              <h3 className="font-heading text-sm font-semibold text-foreground mb-3">Select a Region</h3>
              {selected ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-amber" />
                    <span className="font-heading text-lg font-semibold text-foreground">{selected.name}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-lg font-bold text-foreground">{selected.waiting}</div>
                      <div className="text-xs text-muted-foreground">Waiting</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-amber">{selected.lit}</div>
                      <div className="text-xs text-muted-foreground">Lit</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-urgent">{selected.urgent}</div>
                      <div className="text-xs text-muted-foreground">Urgent</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <MapPin className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Click on a marker to see regional details</p>
                </div>
              )}
            </div>

            {/* Region list */}
            <div className="space-y-2">
              {regions.map((region) => (
                <button
                  key={region.name}
                  onClick={() => setSelected(region)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                    selected?.name === region.name
                      ? "border-amber bg-amber/5"
                      : "border-border/50 bg-background hover:border-amber/30"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{region.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-muted-foreground">{region.waiting} waiting</span>
                    {region.urgent > 10 && (
                      <span className="text-urgent font-medium">Urgent</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GazaMapSection;
