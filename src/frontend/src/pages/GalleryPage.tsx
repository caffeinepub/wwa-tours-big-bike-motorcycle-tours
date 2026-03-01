import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, ZoomIn } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Page } from "../App";
import Footer from "../components/Footer";

interface GalleryPageProps {
  onNavigate: (page: Page) => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const tourGallery = [
  {
    src: "/assets/IMG-20181121-WA0002.jpg",
    alt: "Motorcycle tour riders on the road",
    caption: "On the Road — Thailand Adventure",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/assets/IMG-20181122-WA0020.jpg",
    alt: "Scenic mountain ride",
    caption: "Mountain Roads — Northern Thailand",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/assets/IMG-20181123-WA0022.jpg",
    alt: "Group of riders",
    caption: "Group Ride — Thailand Tour",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/assets/IMG-20181124-WA0002.jpg",
    alt: "Motorcycle adventure",
    caption: "Adventure Awaits",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/assets/IMG-20181125-WA0027.jpg",
    alt: "Riders at a scenic viewpoint",
    caption: "Scenic Viewpoint Stop",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/assets/IMG-20181127-WA0003.jpg",
    alt: "Winding mountain road",
    caption: "Winding Roads — Northern Loop",
    span: "col-span-2 row-span-1",
  },
  {
    src: "/assets/IMG-20181128-WA0090.jpg",
    alt: "Tour group photo",
    caption: "The WWA Crew",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/assets/IMG-20181129-WA0046.jpg",
    alt: "Riding through the countryside",
    caption: "Countryside Ride",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/assets/IMG-20181129-WA0058.jpg",
    alt: "Motorcycle tour highlight",
    caption: "Tour Highlights",
    span: "col-span-2 row-span-1",
  },
  {
    src: "/assets/IMG-20230919-WA0002.jpg",
    alt: "Recent tour adventure",
    caption: "2023 Tour Season",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/assets/IMG-20230919-WA0003.jpg",
    alt: "Tour riders 2023",
    caption: "2023 Riders",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/assets/IMG-20260221-WA0006.jpg",
    alt: "Latest tour photo",
    caption: "Latest Adventures",
    span: "col-span-2 row-span-1",
  },
];

const bikeGallery = [
  {
    src: "/assets/FB_IMG_1679460916886.jpg",
    alt: "Big bikes on tour",
    caption: "Our Fleet in Action",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/assets/FB_IMG_1679460884998.jpg",
    alt: "Adventure motorcycles",
    caption: "Premium Adventure Bikes",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/assets/FB_IMG_1679460653634.jpg",
    alt: "Motorcycle lineup",
    caption: "Ready to Ride",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/assets/FB_IMG_1679460599535.jpg",
    alt: "Bikes at rest stop",
    caption: "Rest Stop — Thailand",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/assets/Screenshot_20220510-001212_Facebook.jpg",
    alt: "Tour photo",
    caption: "WWA Tours in Action",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/assets/IMG-20181125-WA0096.jpg",
    alt: "Bikes on mountain road",
    caption: "Bikes on the Mountain",
    span: "col-span-2 row-span-1",
  },
];

interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  span: string;
}

function GalleryGrid({
  items,
  onOpen,
}: {
  items: GalleryItem[];
  onOpen: (item: GalleryItem) => void;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[160px] md:auto-rows-[180px]"
    >
      {items.map((item) => (
        <motion.div
          key={item.src}
          variants={fadeUp}
          className={`${item.span} relative overflow-hidden rounded-sm group cursor-pointer`}
          onClick={() => onOpen(item)}
        >
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-white" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-xs font-display font-medium text-white/90">
              {item.caption}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function GalleryPage({ onNavigate }: GalleryPageProps) {
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

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
            Life on the Road
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-5xl md:text-6xl text-foreground mb-4"
          >
            Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-md mx-auto"
          >
            A glimpse into the adventures that await. From Thailand's mountain
            roads to Europe's Alpine passes.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="tours" className="w-full">
          <TabsList className="mb-8 bg-muted/50 border border-border/50 p-1">
            <TabsTrigger
              value="tours"
              className="font-display font-bold text-xs tracking-wider uppercase data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Tour Gallery
            </TabsTrigger>
            <TabsTrigger
              value="bikes"
              className="font-display font-bold text-xs tracking-wider uppercase data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Bike Gallery
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tours">
            <GalleryGrid items={tourGallery} onOpen={setLightboxItem} />
          </TabsContent>
          <TabsContent value="bikes">
            <GalleryGrid items={bikeGallery} onOpen={setLightboxItem} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={lightboxItem.src}
                alt={lightboxItem.alt}
                className="w-full h-auto rounded-sm shadow-2xl"
              />
              <p className="text-sm font-display text-white/70 text-center mt-4">
                {lightboxItem.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
