import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Award,
  ChevronDown,
  Globe,
  MapPin,
  Quote,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";
import type { Page } from "../App";
import {
  DEST_EUROPE,
  DEST_THAILAND,
  DEST_USA,
  GALLERY_1,
  GALLERY_4,
  GALLERY_8,
  GALLERY_13,
  GALLERY_16,
  GALLERY_2023_A,
  GALLERY_BIKES,
  GALLERY_FB_A,
  HERO_MAIN,
} from "../assets/images";
import Footer from "../components/Footer";
import TourCard from "../components/TourCard";
import { useGetTestimonials, useGetTours } from "../hooks/useQueries";

interface HomePageProps {
  onNavigate: (page: Page, filter?: string) => void;
  onSelectTour: (id: string) => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const destinations = [
  {
    name: "Thailand",
    tagline: "Northern Mountains & Golden Triangle",
    image: DEST_THAILAND,
    filter: "thailand",
  },
  {
    name: "Europe",
    tagline: "Swiss Alps & Alpine Passes",
    image: DEST_EUROPE,
    filter: "europe",
  },
  {
    name: "USA",
    tagline: "Pacific Coast & Monument Valley",
    image: DEST_USA,
    filter: "usa",
  },
];

const galleryImages = [
  {
    src: GALLERY_1,
    alt: "Riders on mountain road — Northern Thailand",
    className: "col-span-2 row-span-2",
  },
  {
    src: GALLERY_13,
    alt: "The WWA crew on tour — Thailand 2018",
    className: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_BIKES,
    alt: "Premium adventure bikes ready for the road",
    className: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_4,
    alt: "Group adventure stop — Northern Thailand",
    className: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_8,
    alt: "Riding through Northern Thailand mountains",
    className: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_16,
    alt: "Mountain pass — Thailand tour adventure",
    className: "col-span-2 row-span-1",
  },
];

const stories = [
  {
    title: "The Friendships We Make in Our Motorcycle Adventures",
    excerpt:
      "The friendships we make in our motorcycle adventures will last us a lifetime as we traveled in Northern Thailand for 2 weeks!",
    date: "Dec 9, 2019",
    tag: "Thailand",
  },
  {
    title: "Motorcycle RCMC European Tour June 17-30, 2019",
    excerpt:
      "A memorable 2-week journey through the European Alps, connecting riders from 6 countries on legendary mountain passes.",
    date: "Dec 28, 2019",
    tag: "Europe",
  },
];

export default function HomePage({ onNavigate, onSelectTour }: HomePageProps) {
  const { data: tours, isLoading: toursLoading } = useGetTours();
  const { data: testimonials, isLoading: testimonialsLoading } =
    useGetTestimonials();
  const toursRef = useRef<HTMLDivElement>(null);

  const scrollToTours = () => {
    toursRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const featuredTours =
    tours?.filter((t) => t.isFeatured).slice(0, 3) ?? tours?.slice(0, 3) ?? [];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${HERO_MAIN})`,
          }}
        />
        {/* Layered overlays */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 30%, oklch(0.72 0.19 52 / 0.25), transparent)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center pt-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeUp} className="mb-5">
              <Badge className="bg-primary/15 text-primary border-primary/40 font-display tracking-widest uppercase text-xs px-5 py-1.5 backdrop-blur-sm">
                Global Swissness · Adventure and Freedom
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground mb-4 leading-[0.9] tracking-tight"
            >
              Adventure <span className="hero-gradient-text">and Freedom</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-display font-medium text-xl md:text-2xl text-foreground/80 mb-3 tracking-wide"
            >
              Guided Big Bike Motorcycle Tours Worldwide
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-foreground/60 mb-10 max-w-xl mx-auto leading-relaxed"
            >
              Swiss precision meets global adventure. Creating your dream
              vacation since 2009.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                onClick={scrollToTours}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-black tracking-widest uppercase text-sm px-10 amber-glow"
              >
                Explore Tours
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate("contact")}
                className="border-foreground/40 text-foreground hover:bg-foreground/10 font-display font-bold tracking-widest uppercase text-sm px-10 backdrop-blur-sm"
              >
                Contact Us
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.button
            onClick={scrollToTours}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{
              delay: 1.5,
              duration: 2.2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-foreground/40 hover:text-primary transition-colors flex flex-col items-center gap-1"
            aria-label="Scroll down"
          >
            <span className="text-[10px] font-display tracking-widest uppercase">
              Scroll
            </span>
            <ChevronDown className="w-6 h-6" />
          </motion.button>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────── */}
      <section className="py-10 bg-muted/20 border-y border-border/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
            {[
              { value: "15+", label: "Years Experience" },
              { value: "500+", label: "Riders Guided" },
              { value: "3", label: "Continents" },
            ].map(({ value, label }) => (
              <div key={label} className="space-y-1">
                <div className="font-display font-black text-3xl md:text-4xl text-primary">
                  {value}
                </div>
                <div className="text-xs font-display font-semibold tracking-widest uppercase text-muted-foreground">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED TOURS ───────────────────────────────── */}
      <section ref={toursRef} className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="font-display font-bold text-xs tracking-widest uppercase text-primary mb-3"
            >
              Our Adventures
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display font-black text-4xl md:text-5xl text-foreground mb-4"
            >
              Featured Tours
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground max-w-lg mx-auto"
            >
              Carefully researched routes through the world's most spectacular
              motorcycle destinations.
            </motion.p>
          </motion.div>

          {toursLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
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
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {featuredTours.map((tour) => (
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

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Button
              onClick={() => onNavigate("tours")}
              variant="outline"
              size="lg"
              className="border-primary/40 text-primary hover:bg-primary/10 font-display font-bold tracking-widest uppercase text-xs"
            >
              View All Tours
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── DESTINATIONS ─────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="font-display font-bold text-xs tracking-widest uppercase text-primary mb-3"
            >
              Where We Ride
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display font-black text-4xl md:text-5xl text-foreground mb-4"
            >
              Our Destinations
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {destinations.map(({ name, tagline, image, filter }) => (
              <motion.div
                key={name}
                variants={fadeUp}
                onClick={() => {
                  onNavigate("tours", filter);
                }}
                className="group relative overflow-hidden rounded-sm cursor-pointer h-72"
              >
                <img
                  src={image}
                  alt={name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="font-display font-black text-2xl text-foreground group-hover:text-primary transition-colors">
                    {name}
                  </div>
                  <div className="text-sm text-foreground/70 mt-1 mb-3">
                    {tagline}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-display font-bold tracking-wider uppercase text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <MapPin className="w-3 h-3" />
                    Explore Tours
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT SNIPPET ─────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={fadeUp}>
                <p className="font-display font-bold text-xs tracking-widest uppercase text-primary mb-3">
                  Who We Are
                </p>
                <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mb-6 leading-tight">
                  Creating Your Dream Vacation
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Passionate and committed to offering an excellent tour
                  experience. We research every tour in detail with care. Your
                  safety and fun vacation is our priority.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  We are a Swiss/American operated guided motorcycle tour
                  company. Our motto: "Global Swissness" — Swiss precision,
                  global adventure.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => onNavigate("about")}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold tracking-widest uppercase text-xs amber-glow"
                  >
                    Learn More
                  </Button>
                  <Button
                    onClick={() => onNavigate("contact")}
                    variant="outline"
                    className="border-border text-muted-foreground hover:text-foreground hover:border-primary/40 font-display font-bold tracking-widest uppercase text-xs"
                  >
                    Contact Us
                  </Button>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: Globe,
                    title: "Global Swissness",
                    desc: "Swiss precision applied to adventure travel worldwide",
                  },
                  {
                    icon: Users,
                    title: "Small Groups",
                    desc: "Maximum 8 riders per tour for personal attention",
                  },
                  {
                    icon: Award,
                    title: "Premium Experience",
                    desc: "Top-of-the-line bikes and expert local guides",
                  },
                  {
                    icon: MapPin,
                    title: "Custom Routes",
                    desc: "Tailor-made itineraries for unforgettable journeys",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="p-4 bg-card border border-border rounded-sm hover:border-primary/30 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-primary mb-2" />
                    <div className="font-display font-bold text-sm text-foreground mb-1">
                      {title}
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed">
                      {desc}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="font-display font-bold text-xs tracking-widest uppercase text-primary mb-3"
            >
              Rider Stories
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display font-black text-4xl md:text-5xl text-foreground"
            >
              What Riders Say
            </motion.h2>
          </motion.div>

          {testimonialsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-sm p-6 space-y-3"
                >
                  <Skeleton className="h-4 w-full bg-muted" />
                  <Skeleton className="h-4 w-5/6 bg-muted" />
                  <Skeleton className="h-4 w-2/3 bg-muted" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {(testimonials ?? []).map((t) => (
                <motion.div
                  key={t.id.toString()}
                  variants={fadeUp}
                  className="bg-card border border-border/60 rounded-sm p-6 hover:border-primary/30 transition-colors flex flex-col"
                >
                  <Quote className="w-8 h-8 text-primary/30 mb-4 shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-4 flex-1">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: Number(t.rating) }, (_, i) => i).map(
                      (i) => (
                        <Star
                          key={`filled-${i}`}
                          className="w-4 h-4 text-primary fill-primary"
                        />
                      ),
                    )}
                    {Array.from(
                      { length: 5 - Number(t.rating) },
                      (_, i) => i,
                    ).map((i) => (
                      <Star
                        key={`empty-${i}`}
                        className="w-4 h-4 text-muted-foreground/40"
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display font-bold text-sm text-foreground">
                        {t.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t.country}
                      </div>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-display tracking-wide">
                      {t.tourName}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── GALLERY PREVIEW ───────────────────────────────── */}
      <section className="py-20 md:py-28 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="font-display font-bold text-xs tracking-widest uppercase text-primary mb-3"
            >
              Life on the Road
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display font-black text-4xl md:text-5xl text-foreground"
            >
              Gallery
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[200px]"
          >
            {galleryImages.map(({ src, alt, className }) => (
              <motion.div
                key={src}
                variants={fadeUp}
                className={`${className} relative overflow-hidden rounded-sm group cursor-pointer`}
                onClick={() => onNavigate("gallery")}
              >
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-8">
            <Button
              onClick={() => onNavigate("gallery")}
              variant="outline"
              size="lg"
              className="border-primary/40 text-primary hover:bg-primary/10 font-display font-bold tracking-widest uppercase text-xs"
            >
              View Full Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* ── STORIES TEASER ────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="font-display font-bold text-xs tracking-widest uppercase text-primary mb-3"
            >
              From the Road
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display font-black text-4xl md:text-5xl text-foreground"
            >
              Rider Stories
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          >
            {stories.map(({ title, excerpt, date, tag }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="bg-card border border-border/60 rounded-sm p-6 hover:border-primary/30 transition-colors cursor-pointer group"
                onClick={() => onNavigate("stories")}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-display">
                    {tag}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{date}</span>
                </div>
                <h3 className="font-display font-bold text-base text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {excerpt}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-8">
            <Button
              onClick={() => onNavigate("stories")}
              variant="outline"
              size="lg"
              className="border-primary/40 text-primary hover:bg-primary/10 font-display font-bold tracking-widest uppercase text-xs"
            >
              Read All Stories
            </Button>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <section
        className="py-24 md:py-32 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.16 0.04 45) 0%, oklch(0.2 0.06 50) 50%, oklch(0.15 0.03 40) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 80% at 50% 50%, oklch(0.72 0.19 52 / 0.3), transparent)",
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-10 max-w-2xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight"
            >
              Plan The Best Ever Motorcycle Guided Adventure Tour
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg text-foreground/70 mb-10"
            >
              Contact us today to start planning your custom tour or join one of
              our upcoming scheduled departures.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                onClick={() => onNavigate("contact")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-black tracking-widest uppercase text-sm px-10 amber-glow"
              >
                Contact Us
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate("tours")}
                className="border-foreground/30 text-foreground hover:bg-foreground/10 font-display font-bold tracking-widest uppercase text-sm px-10"
              >
                Browse Tours
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </>
  );
}
