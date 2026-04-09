import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Filter, MapPin, Search, Sparkles } from "lucide-react";
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

  const filtered = useMemo(
    () =>
      mockCandles.filter((candle) => {
        if (selectedCategory !== "All" && candle.category !== selectedCategory) return false;
        if (selectedUrgency !== "All" && candle.urgency !== selectedUrgency.toLowerCase()) return false;
        if (selectedGovernorate !== "All" && candle.governorate !== selectedGovernorate) return false;
        if (searchQuery && !`${candle.title} ${candle.story}`.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
      }),
    [searchQuery, selectedCategory, selectedGovernorate, selectedUrgency],
  );

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedUrgency("All");
    setSelectedGovernorate("All");
    setSearchQuery("");
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
                delayChildren: 0.05,
              },
            },
          }}
          className="mx-auto max-w-7xl"
        >
          <motion.section
            variants={{
              initial: { opacity: 0, y: 28, filter: "blur(6px)" },
              animate: { opacity: 1, y: 0, filter: "blur(0px)" },
            }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="dark-panel overflow-hidden rounded-[40px] px-6 py-10 md:px-10 md:py-14"
          >
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div>
                <div className="section-kicker mb-4 bg-amber/12 text-amber">
                  <Sparkles className="h-3.5 w-3.5" />
                  Refined browsing
                </div>
                <h1 className="font-heading text-5xl font-semibold leading-[0.95] text-primary-foreground md:text-7xl">
                  Browse candles with better visual rhythm and faster filtering.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-primary-foreground/74 md:text-lg">
                  The listing page now leads with a stronger overview, a clearer filter block, and cards that feel premium without obscuring urgency.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Open cases", value: mockCandles.length.toString() },
                  { label: "Critical", value: mockCandles.filter((item) => item.urgency === "critical").length.toString() },
                  { label: "Verified", value: `${Math.round((mockCandles.filter((item) => item.isVerified).length / mockCandles.length) * 100)}%` },
                ].map((item) => (
                  <div key={item.label} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <div className="text-xs uppercase tracking-[0.24em] text-primary-foreground/50">{item.label}</div>
                    <div className="mt-2 font-heading text-4xl font-semibold text-primary-foreground">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={{
              initial: { opacity: 0, y: 24, filter: "blur(4px)" },
              animate: { opacity: 1, y: 0, filter: "blur(0px)" },
            }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel mt-8 rounded-[36px] p-5 md:p-6"
          >
            <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by family need, category, or story detail"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="h-12 rounded-full border-border/70 bg-background/72 pl-11 shadow-none"
                />
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full bg-background/72 px-4 py-3">
                  <Filter className="h-4 w-4 text-amber" />
                  {filtered.length} results
                </span>
                <Button variant="amber-outline" className="bg-background/72" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              <div className="rounded-[26px] bg-background/70 p-4">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  <Filter className="h-3.5 w-3.5 text-amber" />
                  Category
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      className={`cursor-pointer rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] transition-all ${
                        selectedCategory === category
                          ? "bg-amber text-amber-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="rounded-[26px] bg-background/70 p-4">
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Urgency</div>
                <div className="flex flex-wrap gap-2">
                  {urgencies.map((urgency) => (
                    <Badge
                      key={urgency}
                      className={`cursor-pointer rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] transition-all ${
                        selectedUrgency === urgency
                          ? "bg-amber text-amber-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                      onClick={() => setSelectedUrgency(urgency)}
                    >
                      {urgency}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="rounded-[26px] bg-background/70 p-4">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-amber" />
                  Location
                </div>
                <div className="flex flex-wrap gap-2">
                  {governorates.map((governorate) => (
                    <Badge
                      key={governorate}
                      className={`cursor-pointer rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] transition-all ${
                        selectedGovernorate === governorate
                          ? "bg-amber text-amber-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                      onClick={() => setSelectedGovernorate(governorate)}
                    >
                      {governorate}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          <section className="mt-10">
            {filtered.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((candle, index) => (
                  <motion.div
                    key={candle.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <CandleCard candle={candle} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="warm-panel rounded-[34px] py-16 text-center"
              >
                <div className="mx-auto max-w-xl px-6">
                  <h2 className="font-heading text-4xl font-semibold text-foreground">No candles match these filters.</h2>
                  <p className="mt-3 text-base leading-8 text-muted-foreground">
                    The empty state now gives the user a clean reset path instead of leaving the page visually dead.
                  </p>
                  <Button variant="amber" className="mt-6" onClick={resetFilters}>
                    Clear Filters
                  </Button>
                </div>
              </motion.div>
            )}
          </section>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default CandleListing;
