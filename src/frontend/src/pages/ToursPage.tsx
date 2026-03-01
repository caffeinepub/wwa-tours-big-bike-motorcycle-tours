import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Page } from "../App";
import { Destination } from "../backend.d";
import Footer from "../components/Footer";
import TourCard from "../components/TourCard";
import { useGetTours } from "../hooks/useQueries";

interface ToursPageProps {
  onSelectTour: (id: string) => void;
  onNavigate?: (page: Page) => void;
  initialDestinationFilter?: string | null;
}

type DestinationFilter = Destination | "all";

const filterOptions: { label: string; value: DestinationFilter }[] = [
  { label: "All Tours", value: "all" },
  { label: "Thailand", value: Destination.thailand },
  { label: "Europe", value: Destination.europe },
  { label: "USA", value: Destination.usa },
  { label: "Asia", value: Destination.asia },
];

const difficultyConfig = {
  easy: {
    label: "Easy",
    className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
  moderate: {
    label: "Moderate",
    className: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
  challenging: {
    label: "Challenging",
    className: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  },
  expert: {
    label: "Expert",
    className: "bg-red-500/20 text-red-400 border-red-500/30",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function ToursPage({
  onSelectTour,
  onNavigate,
  initialDestinationFilter,
}: ToursPageProps) {
  const { data: tours, isLoading } = useGetTours();
  const [filter, setFilter] = useState<DestinationFilter>("all");

  useEffect(() => {
    if (initialDestinationFilter) {
      const match = Object.values(Destination).find(
        (d) => d === initialDestinationFilter,
      );
      if (match) setFilter(match as DestinationFilter);
    }
  }, [initialDestinationFilter]);

  const filtered = (tours ?? []).filter(
    (t) => filter === "all" || t.destination === filter,
  );

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
            Adventure Awaits
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-5xl md:text-6xl text-foreground mb-4"
          >
            Our Tours
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-md mx-auto"
          >
            Guided big bike motorcycle tours across Thailand, Europe, USA, and
            beyond.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Destination Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center gap-2 mb-10"
        >
          <span className="font-display font-bold text-xs tracking-wider uppercase text-muted-foreground mr-2">
            Destination:
          </span>
          {filterOptions.map((opt) => (
            <Button
              key={opt.value}
              size="sm"
              variant={filter === opt.value ? "default" : "outline"}
              onClick={() => setFilter(opt.value)}
              className={
                filter === opt.value
                  ? "bg-primary text-primary-foreground font-display font-bold tracking-wider uppercase text-xs"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40 font-display font-medium tracking-wider uppercase text-xs"
              }
            >
              {opt.label}
            </Button>
          ))}
          {!isLoading && (
            <span className="ml-auto text-sm text-muted-foreground font-display">
              {filtered.length} tour{filtered.length !== 1 ? "s" : ""}
            </span>
          )}
        </motion.div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="space-y-3 bg-card border border-border rounded-sm p-5"
              >
                <Skeleton className="h-52 w-full bg-muted" />
                <Skeleton className="h-6 w-3/4 bg-muted" />
                <Skeleton className="h-4 w-1/2 bg-muted" />
                <Skeleton className="h-10 w-full bg-muted" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4 opacity-20">🏍️</div>
            <h3 className="font-display font-bold text-xl text-foreground mb-2">
              No tours found
            </h3>
            <p className="text-muted-foreground mb-6">
              No tours available for the selected destination.
            </p>
            <Button
              onClick={() => setFilter("all")}
              variant="outline"
              className="border-primary/40 text-primary hover:bg-primary/10 font-display font-bold tracking-wider uppercase text-xs"
            >
              Show All Tours
            </Button>
          </div>
        ) : (
          <motion.div
            key={filter}
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((tour) => (
              <motion.div
                key={tour.id.toString()}
                variants={fadeUp}
                className="flex"
              >
                <TourCard tour={tour} onSelect={onSelectTour} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Difficulty legend */}
        {!isLoading && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center gap-3 mt-12 pt-8 border-t border-border/40"
          >
            <span className="font-display font-bold text-xs tracking-wider uppercase text-muted-foreground">
              Difficulty:
            </span>
            {Object.entries(difficultyConfig).map(
              ([key, { label, className }]) => (
                <Badge
                  key={key}
                  className={`${className} border font-display text-xs`}
                >
                  {label}
                </Badge>
              ),
            )}
          </motion.div>
        )}
      </div>
      {onNavigate && <Footer onNavigate={onNavigate} />}
    </div>
  );
}
