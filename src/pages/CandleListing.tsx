import { useState } from "react";
import { Search, Filter, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CandleCard from "@/components/CandleCard";
import { mockCandles } from "@/data/mockCandles";

const categories = ["All", "Medical", "Food", "Shelter", "Education", "Water"];
const urgencies = ["All", "Critical", "High", "Medium"];
const governorates = ["All", "Gaza City", "Khan Yunis", "Rafah", "Deir al-Balah", "North Gaza"];

const CandleListing = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedUrgency, setSelectedUrgency] = useState("All");
  const [selectedGovernorate, setSelectedGovernorate] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = mockCandles.filter((c) => {
    if (selectedCategory !== "All" && c.category !== selectedCategory) return false;
    if (selectedUrgency !== "All" && c.urgency !== selectedUrgency.toLowerCase()) return false;
    if (selectedGovernorate !== "All" && c.governorate !== selectedGovernorate) return false;
    if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
              Browse <span className="text-gradient-amber">Candles</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Each candle represents a verified urgent need. Find one that speaks to you and help light it.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="max-w-4xl mx-auto mb-10 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search candles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground mr-2">Category:</span>
                {categories.map((cat) => (
                  <Badge
                    key={cat}
                    className={`cursor-pointer transition-colors ${
                      selectedCategory === cat
                        ? "bg-amber text-amber-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground ml-6 mr-2">Urgency:</span>
                {urgencies.map((u) => (
                  <Badge
                    key={u}
                    className={`cursor-pointer transition-colors ${
                      selectedUrgency === u
                        ? "bg-amber text-amber-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                    onClick={() => setSelectedUrgency(u)}
                  >
                    {u}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground mr-2">Location:</span>
                {governorates.map((g) => (
                  <Badge
                    key={g}
                    className={`cursor-pointer transition-colors ${
                      selectedGovernorate === g
                        ? "bg-amber text-amber-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                    onClick={() => setSelectedGovernorate(g)}
                  >
                    {g}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((candle) => (
              <CandleCard key={candle.id} candle={candle} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No candles match your filters.</p>
              <Button variant="amber" className="mt-4" onClick={() => {
                setSelectedCategory("All");
                setSelectedUrgency("All");
                setSelectedGovernorate("All");
                setSearchQuery("");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CandleListing;
