import { useState } from "react";
import { Flame, Heart, Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
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
    description: "Fatima's three children needed urgent medication that was unavailable in Gaza. Through the collective support of 72 donors, we were able to secure and deliver the life-saving medicine within 5 days.",
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
    description: "A community of 200 people had no access to clean drinking water. Through 98 generous donors, a portable water filtration system was installed within a week.",
  },
  {
    quote: "My son walked for the first time in months. The donors gave him more than a prosthetic — they gave him his future back.",
    name: "Um Youssef",
    initial: "U",
    location: "Khan Yunis",
    category: "Medical",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=700&fit=crop",
    amountRaised: "$5,000",
    donors: 134,
    date: "March 2024",
    description: "A 14-year-old student lost his leg and dreamed of returning to school. With support from 134 donors, he received a prosthetic limb and is now back in class.",
  },
];

const SuccessStories = () => {
  const [current, setCurrent] = useState(0);
  const story = stories[current];

  const next = () => setCurrent((c) => (c + 1) % stories.length);
  const prev = () => setCurrent((c) => (c - 1 + stories.length) % stories.length);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Candles That Now Burn Bright
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every lit candle has a story. Here are just a few of the lives transformed through your compassion and generosity.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-h-[500px]">
              <img
                src={story.image}
                alt={story.name}
                className="w-full h-full object-cover transition-opacity duration-500"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4">
                <Badge className="bg-foreground/70 text-primary-foreground backdrop-blur-sm text-sm px-3 py-1">
                  {story.category}
                </Badge>
              </div>
              {/* Lit candle icon overlapping top-right */}
              <div className="absolute -top-2 -right-2 bg-amber/15 rounded-full p-3">
                <Flame className="h-6 w-6 text-amber animate-flicker" />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <span className="font-heading text-4xl md:text-5xl text-amber/30 leading-none">"</span>
                <p className="font-heading text-xl md:text-2xl text-foreground italic leading-relaxed -mt-6 ml-8">
                  {story.quote}
                </p>
              </div>

              {/* Avatar & name */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-amber/15 flex items-center justify-center">
                  <span className="font-heading text-lg font-semibold text-amber">{story.initial}</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{story.name}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {story.location}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {story.description}
              </p>

              <div className="border-t border-border pt-5">
                <div className="flex items-center gap-8">
                  <div>
                    <div className="font-heading text-xl font-bold text-amber">{story.amountRaised}</div>
                    <div className="text-xs text-muted-foreground">Raised</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-amber" />
                    <div>
                      <div className="font-heading text-xl font-bold text-foreground">{story.donors}</div>
                      <div className="text-xs text-muted-foreground">Donors</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium text-foreground">{story.date}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10">
            <div className="flex items-center gap-2">
              {stories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-amber" : "w-3 bg-border hover:bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
