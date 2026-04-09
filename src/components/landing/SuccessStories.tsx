import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Calendar, ChevronLeft, ChevronRight, Flame, Heart, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Story {
  quote: string;
  name: string;
  initial: string;
  location: string;
  category: string;
  image: string;
  amountRaised: string;
  donors: number;
  date: string;
  description: string;
}

const stories: Story[] = [
  {
    quote: "When I saw the medicine arrive, I cried tears of joy. My children will live. Thank you to everyone who lit our candle.",
    name: "Fatima A.",
    initial: "F",
    location: "Gaza City",
    category: "Medical",
    image: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=600&h=700&fit=crop",
    amountRaised: "$3,500",
    donors: 72,
    date: "January 2024",
    description: "Fatima's three children needed urgent medication that was unavailable in Gaza. Through the collective support of 72 donors, life-saving medicine was secured and delivered within days.",
  },
  {
    quote: "The water filter changed everything for our community. Clean water seemed impossible, but generous hearts made it real.",
    name: "Abu Khalil",
    initial: "A",
    location: "North Gaza",
    category: "Water",
    image: "https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?w=600&h=700&fit=crop",
    amountRaised: "$4,500",
    donors: 98,
    date: "February 2024",
    description: "A community of 200 people had no access to clean drinking water. Through 98 donors, a portable filtration system was installed and documented within a week.",
  },
  {
    quote: "My son walked for the first time in months. The donors gave him more than a prosthetic. They gave him his future back.",
    name: "Um Youssef",
    initial: "U",
    location: "Khan Yunis",
    category: "Medical",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=700&fit=crop",
    amountRaised: "$5,000",
    donors: 134,
    date: "March 2024",
    description: "A 14-year-old student lost his leg and wanted to return to school. Support from 134 donors funded a prosthetic limb and restored mobility.",
  },
];

const SuccessStories = () => {
  const [current, setCurrent] = useState(0);
  const story = stories[current];

  const next = () => setCurrent((value) => (value + 1) % stories.length);
  const prev = () => setCurrent((value) => (value - 1 + stories.length) % stories.length);

  return (
    <section id="stories" className="section-shell uniform-section px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 max-w-3xl"
        >
          <div className="section-kicker mb-4">
            <Flame className="h-3.5 w-3.5" />
            Fulfilled stories
          </div>
          <h2 className="editorial-title">Stories of support that reached real people.</h2>
          <p className="editorial-copy mt-4">
            Each story shows the outcome, the scale of support, and the human impact behind a fulfilled candle.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={story.image}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative overflow-hidden rounded-[42px] border border-white/60 shadow-2xl"
            >
              <img src={story.image} alt={story.name} className="h-full min-h-[520px] w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />
              <div className="absolute left-8 top-8">
                <Badge className="rounded-full bg-white/90 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-foreground backdrop-blur-md shadow-lg">
                  {story.category}
                </Badge>
              </div>
              <div className="absolute right-8 top-8 rounded-2xl bg-amber/95 p-4 text-amber-foreground shadow-[0_15px_35px_rgba(245,179,65,0.4)]">
                <Flame className="h-6 w-6 animate-flicker" />
              </div>
              <div className="absolute bottom-8 left-8 right-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-[28px] border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
                  <div className="text-[10px] uppercase tracking-[0.24em] text-white/60 font-medium">Raised</div>
                  <div className="mt-1 font-heading text-2xl font-bold text-white">{story.amountRaised}</div>
                </div>
                <div className="rounded-[28px] border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
                  <div className="text-[10px] uppercase tracking-[0.24em] text-white/60 font-medium">Donors</div>
                  <div className="mt-1 font-heading text-2xl font-bold text-white">{story.donors}</div>
                </div>
                <div className="rounded-[28px] border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
                  <div className="text-[10px] uppercase tracking-[0.24em] text-white/60 font-medium">Delivered</div>
                  <div className="mt-1 text-sm font-bold text-white uppercase tracking-wider">{story.date}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="relative rounded-[42px] border border-white/60 bg-white/45 p-10 shadow-xl backdrop-blur-xl md:p-12">
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                <filter id="noiseFilterStories">
                  <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilterStories)" />
              </svg>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className="text-7xl leading-none text-amber/20 font-serif font-bold">"</div>
                <p className="-mt-8 max-w-2xl font-heading text-2xl font-bold leading-[1.2] text-foreground md:text-4xl tracking-tight">
                  {story.quote}
                </p>

                <div className="mt-10 flex items-center gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber/12 text-2xl font-bold text-amber shadow-inner">
                    {story.initial}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">{story.name}</div>
                    <div className="mt-1 flex items-center gap-5 text-sm font-medium text-muted-foreground/80">
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-amber" />
                        {story.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-amber" />
                        {story.date}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-10 max-w-2xl text-[15px] font-medium leading-[1.8] text-muted-foreground/90 md:text-[17px]">
                  {story.description}
                </p>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Raised", value: story.amountRaised, icon: Flame },
                    { label: "Donors", value: `${story.donors}`, icon: Heart },
                    { label: "Location", value: story.location, icon: MapPin },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="group rounded-[28px] border border-white/60 bg-white/50 p-5 transition-all duration-300 hover:bg-white/80">
                      <Icon className="mb-3 h-5 w-5 text-amber transition-transform group-hover:scale-110" />
                      <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground/70 font-bold">{label}</div>
                      <div className="mt-1 text-sm font-bold text-foreground">{value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="soft-divider my-10 opacity-40" />

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                {stories.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => setCurrent(index)}
                    aria-label={`Show story from ${item.name}`}
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      index === current ? "w-12 bg-amber shadow-[0_0_15px_rgba(245,179,65,0.4)]" : "w-3 bg-foreground/10 hover:bg-foreground/20"
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={prev}
                  className="group flex h-14 w-14 items-center justify-center rounded-2xl border border-white/60 bg-white/50 text-foreground transition-all duration-300 hover:bg-amber hover:text-amber-foreground hover:shadow-lg"
                  aria-label="Previous story"
                >
                  <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-0.5" />
                </button>
                <button
                  onClick={next}
                  className="group flex h-14 w-14 items-center justify-center rounded-2xl border border-white/60 bg-white/50 text-foreground transition-all duration-300 hover:bg-amber hover:text-amber-foreground hover:shadow-lg"
                  aria-label="Next story"
                >
                  <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
