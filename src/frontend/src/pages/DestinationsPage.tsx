import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin } from "lucide-react";
import { motion } from "motion/react";
import type { Page } from "../App";
import { Destination } from "../backend.d";
import Footer from "../components/Footer";
import TourCard from "../components/TourCard";
import { useGetTours } from "../hooks/useQueries";

interface DestinationsPageProps {
  onNavigate: (page: Page) => void;
  onSelectTour: (id: string) => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const destinationData = [
  {
    key: Destination.thailand,
    name: "Thailand",
    subtitle: "Northern Mountains & Golden Triangle",
    image: "/assets/generated/dest-thailand.dim_900x600.jpg",
    description:
      "Northern Thailand is one of the world's most spectacular motorcycle destinations — winding mountain roads, ancient temples, hill tribe villages, and breathtaking scenery. Ride the legendary Mae Hong Son Loop, explore the Golden Triangle, and discover hidden jungle tracks that most tourists never see.",
    highlights: [
      "Mae Hong Son Loop — 2,000km of winding mountain roads",
      "Golden Triangle — Thailand, Laos & Myanmar border",
      "Ancient Lanna Kingdom temples and hill tribe villages",
      "Chiang Rai's White Temple and Blue Temple",
      "Remote jungle tracks and mountain passes",
    ],
  },
  {
    key: Destination.europe,
    name: "Europe",
    subtitle: "Swiss Alps & Alpine Passes",
    image: "/assets/generated/dest-europe.dim_900x600.jpg",
    description:
      "Ride the legendary Alpine passes of Switzerland, France, Italy and beyond. Precision-crafted routes with Global Swissness at the heart of every mile. From the Gotthard Pass to the Col de la Bonnette, Europe's motorcycle roads are second to none.",
    highlights: [
      "Iconic Swiss Alpine passes — Gotthard, Furka, Grimsel",
      "French Riviera coastal roads and Col d'Izoard",
      "Italian Dolomites — a UNESCO World Heritage landscape",
      "Black Forest and romantic Rhine Valley Germany",
      "Luxury accommodation and fine European cuisine",
    ],
  },
  {
    key: Destination.usa,
    name: "USA",
    subtitle: "Pacific Coast & American Southwest",
    image: "/assets/generated/dest-usa.dim_900x600.jpg",
    description:
      "From the Pacific Coast Highway to Monument Valley — America's epic roads await. Experience the freedom of the open road on premium big bikes. Ride legendary routes through the American Southwest, Coastal California, and the iconic desert landscapes of the West.",
    highlights: [
      "Pacific Coast Highway — Highway 1 from LA to San Francisco",
      "Monument Valley and Utah's Mighty 5 National Parks",
      "Route 66 — the Mother Road across the Southwest",
      "Sedona's red rock canyons and Arizona desert",
      "Las Vegas to Grand Canyon epic desert loop",
    ],
  },
];

export default function DestinationsPage({
  onNavigate,
  onSelectTour,
}: DestinationsPageProps) {
  const { data: tours, isLoading } = useGetTours();

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div
        className="relative pt-32 pb-16 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.15 0.02 40) 0%, oklch(0.12 0.008 30) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 50% 0%, oklch(0.72 0.19 52 / 0.3), transparent)",
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-xs tracking-widest uppercase text-primary mb-3"
          >
            Where We Ride
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-5xl md:text-6xl text-foreground mb-4"
          >
            Our Destinations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-lg mx-auto"
          >
            Three incredible regions. Countless unforgettable roads. Each
            destination is handpicked for its spectacular riding.
          </motion.p>
        </div>
      </div>

      {/* Destination sections */}
      <div className="container mx-auto px-4 py-16">
        {destinationData.map((dest, idx) => {
          const destTours = (tours ?? []).filter(
            (t) => t.destination === dest.key,
          );

          return (
            <motion.section
              key={dest.key}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className={`mb-24 pb-24 ${idx < destinationData.length - 1 ? "border-b border-border/30" : ""}`}
            >
              {/* Destination Hero */}
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12 ${idx % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
              >
                <motion.div
                  variants={fadeUp}
                  className={idx % 2 === 1 ? "lg:col-start-2" : ""}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="font-display font-bold text-xs tracking-widest uppercase text-primary">
                      {dest.subtitle}
                    </span>
                  </div>
                  <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mb-5 leading-tight">
                    {dest.name}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {dest.description}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {dest.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => onNavigate("tours")}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold tracking-widest uppercase text-xs amber-glow"
                  >
                    View {dest.name} Tours
                  </Button>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className={`relative ${idx % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}
                >
                  <div className="relative overflow-hidden rounded-sm aspect-[4/3] shadow-2xl">
                    <img
                      src={dest.image}
                      alt={`Motorcycle touring in ${dest.name}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-4 py-3 rounded-sm shadow-lg">
                    <div className="font-display font-black text-sm tracking-wider uppercase">
                      {dest.name}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Destination Tours */}
              <motion.div variants={fadeUp}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-bold text-lg text-foreground">
                    {dest.name} Tours
                  </h3>
                  {destTours.length > 3 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onNavigate("tours")}
                      className="text-primary hover:text-primary/80 font-display font-bold tracking-wider uppercase text-xs"
                    >
                      View All ({destTours.length})
                    </Button>
                  )}
                </div>

                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="bg-card border border-border rounded-sm p-5 space-y-3"
                      >
                        <Skeleton className="h-40 w-full bg-muted" />
                        <Skeleton className="h-5 w-3/4 bg-muted" />
                        <Skeleton className="h-4 w-1/2 bg-muted" />
                      </div>
                    ))}
                  </div>
                ) : destTours.length === 0 ? (
                  <div className="bg-card border border-border/50 rounded-sm p-8 text-center">
                    <p className="text-muted-foreground text-sm">
                      Tours coming soon. Contact us to plan a custom {dest.name}{" "}
                      adventure.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onNavigate("contact")}
                      className="mt-4 border-primary/40 text-primary hover:bg-primary/10 font-display font-bold tracking-wider uppercase text-xs"
                    >
                      Inquire Now
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {destTours.slice(0, 3).map((tour) => (
                      <div key={tour.id.toString()} className="flex">
                        <TourCard tour={tour} onSelect={onSelectTour} />
                      </div>
                    ))}
                  </div>
                )}

                {destTours.length > 0 && (
                  <div className="mt-4 flex items-center gap-2">
                    {destTours.slice(0, 3).map((t) => (
                      <Badge
                        key={t.id.toString()}
                        className="bg-muted text-muted-foreground border-border font-display text-xs hidden"
                      >
                        {t.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.section>
          );
        })}
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
