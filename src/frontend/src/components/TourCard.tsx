import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, DollarSign, MapPin, Users } from "lucide-react";
import type { Destination, Difficulty, Tour } from "../backend.d";

interface TourCardProps {
  tour: Tour;
  onSelect: (id: string) => void;
}

const difficultyConfig: Record<
  Difficulty,
  { label: string; className: string }
> = {
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

const destinationImages: Record<Destination, string> = {
  thailand: "/assets/IMG-20181123-WA0022.jpg",
  europe: "/assets/IMG-20230919-WA0003.jpg",
  usa: "/assets/IMG-20260221-WA0007.jpg",
  asia: "/assets/IMG-20181125-WA0027.jpg",
};

export default function TourCard({ tour, onSelect }: TourCardProps) {
  const diff = difficultyConfig[tour.difficulty] ?? difficultyConfig.moderate;
  const imgSrc = destinationImages[tour.destination];

  return (
    <Card className="bg-card border-border card-hover cursor-pointer overflow-hidden group flex flex-col h-full">
      {/* Image */}
      <div className="relative h-52 overflow-hidden shrink-0">
        <img
          src={imgSrc}
          alt={tour.destination}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        {/* Difficulty badge */}
        <div className="absolute top-3 right-3">
          <Badge
            className={`${diff.className} border font-display font-bold text-xs tracking-wider uppercase backdrop-blur-sm`}
          >
            {diff.label}
          </Badge>
        </div>
        {/* Destination pill */}
        <div className="absolute bottom-3 left-3">
          <span className="text-xs font-display font-bold tracking-widest uppercase text-foreground/80 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-sm">
            {tour.destination.toUpperCase()}
          </span>
        </div>
      </div>

      <CardContent className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {tour.name}
        </h3>

        <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 mb-3">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="text-xs font-medium">
              {tour.duration.toString()} days
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="text-xs font-medium">
              Max {tour.maxGroupSize.toString()}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground col-span-2">
            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="text-xs font-medium truncate">{tour.route}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed flex-1">
          {tour.shortDescription}
        </p>

        {/* Upcoming dates */}
        {tour.tourDates.length > 0 && (
          <div className="flex items-center gap-1.5 mb-3">
            <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="text-xs text-muted-foreground">
              Next:{" "}
              <span className="text-foreground/80">{tour.tourDates[0]}</span>
            </span>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="font-display font-black text-xl text-primary">
              {Number(tour.priceUSD).toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              USD
            </span>
          </div>
          <Button
            size="sm"
            onClick={() => onSelect(tour.id.toString())}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold tracking-wider uppercase text-xs"
          >
            View Tour
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
