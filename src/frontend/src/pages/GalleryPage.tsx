import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, ZoomIn } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Page } from "../App";
import {
  GALLERY_1,
  GALLERY_2,
  GALLERY_3,
  GALLERY_4,
  GALLERY_5,
  GALLERY_6,
  GALLERY_7,
  GALLERY_8,
  GALLERY_9,
  GALLERY_10,
  GALLERY_11,
  GALLERY_12,
  GALLERY_13,
  GALLERY_14,
  GALLERY_15,
  GALLERY_16,
  GALLERY_17,
  GALLERY_18,
  GALLERY_19,
  GALLERY_20,
  GALLERY_21,
  GALLERY_22,
  GALLERY_2023_A,
  GALLERY_2023_B,
  GALLERY_2026_A,
  GALLERY_2026_B,
  GALLERY_BIKES,
  GALLERY_FB_A,
  GALLERY_FB_B,
  GALLERY_FB_C,
  GALLERY_FB_D,
  GALLERY_FB_E,
} from "../assets/images";
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
  visible: { transition: { staggerChildren: 0.06 } },
};

const tourGallery = [
  {
    src: GALLERY_1,
    alt: "Riders on scenic mountain road — Northern Thailand 2018",
    caption: "Mountain Roads — Northern Thailand",
    span: "col-span-2 row-span-2",
  },
  {
    src: GALLERY_2,
    alt: "Tour group on the road — Northern Thailand",
    caption: "On the Road Together",
    span: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_3,
    alt: "Beautiful scenery — Northern Thailand ride",
    caption: "Northern Thailand Scenery",
    span: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_4,
    alt: "Group adventure — WWA Tours Thailand",
    caption: "Group Adventure",
    span: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_5,
    alt: "Riding through Thailand landscape",
    caption: "Thailand Landscape Ride",
    span: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_6,
    alt: "Tour stop — local culture exploration",
    caption: "Local Culture Stop",
    span: "col-span-2 row-span-1",
  },
  {
    src: GALLERY_7,
    alt: "Group photo — WWA Tours Thailand adventure",
    caption: "WWA Tours — Thailand Adventure",
    span: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_8,
    alt: "Riding through Northern Thailand mountains",
    caption: "Mountain Riding — Thailand",
    span: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_9,
    alt: "Scenic route — Big bike adventure tour",
    caption: "Scenic Route",
    span: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_10,
    alt: "Adventure riders — Thailand tour 2018",
    caption: "Adventure Riders",
    span: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_11,
    alt: "Morning ride — Northern Thailand",
    caption: "Morning Ride",
    span: "col-span-2 row-span-1",
  },
  {
    src: GALLERY_12,
    alt: "Bikes lined up for departure — Thailand",
    caption: "Ready to Ride",
    span: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_13,
    alt: "The WWA crew — Thailand 2018",
    caption: "The WWA Crew 2018",
    span: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_14,
    alt: "Countryside ride — Northern Thailand",
    caption: "Countryside Roads",
    span: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_15,
    alt: "Hill tribe villages — Northern Thailand",
    caption: "Hill Tribe Villages",
    span: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_16,
    alt: "Thailand mountain pass adventure",
    caption: "Mountain Pass",
    span: "col-span-2 row-span-1",
  },
  {
    src: GALLERY_17,
    alt: "Riders — WWA Tours adventure",
    caption: "Riders on Tour",
    span: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_18,
    alt: "Group stop — Northern Thailand",
    caption: "Group Stop",
    span: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_19,
    alt: "Exploring Thailand on big bikes",
    caption: "Exploring Thailand",
    span: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_20,
    alt: "WWA Tours — Big bike adventure Thailand",
    caption: "Big Bike Adventure",
    span: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_21,
    alt: "Riders at scenic viewpoint — Thailand",
    caption: "Scenic Viewpoint",
    span: "col-span-2 row-span-1",
  },
  {
    src: GALLERY_22,
    alt: "Riding through Thailand valleys",
    caption: "Valley Roads — Thailand",
    span: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_2023_A,
    alt: "2023 Tour Season — Thailand adventure",
    caption: "2023 Tour Season",
    span: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_2023_B,
    alt: "Recent adventures — WWA Tours 2023",
    caption: "Recent Adventures 2023",
    span: "col-span-2 row-span-1",
  },
  {
    src: GALLERY_2026_A,
    alt: "Latest tour adventures 2026",
    caption: "Latest Adventures 2026",
    span: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_2026_B,
    alt: "WWA Tours — 2026 Season",
    caption: "2026 Season",
    span: "col-span-1 row-span-1",
  },
];

const bikeGallery = [
  {
    src: GALLERY_BIKES,
    alt: "Premium big bikes — WWA Tours fleet",
    caption: "Our Premium Fleet",
    span: "col-span-2 row-span-2",
  },
  {
    src: GALLERY_FB_A,
    alt: "Big bikes on tour — WWA Adventures",
    caption: "Big Bikes on Tour",
    span: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_FB_B,
    alt: "Adventure motorcycles — WWA Tours",
    caption: "Adventure Motorcycles",
    span: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_FB_C,
    alt: "Riders and bikes — group adventure",
    caption: "Riders and Bikes",
    span: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_FB_D,
    alt: "WWA Tours fleet ready for departure",
    caption: "Ready for Departure",
    span: "col-span-1 row-span-1",
  },
  {
    src: GALLERY_FB_E,
    alt: "WWA Tours in action — big bikes",
    caption: "WWA Tours in Action",
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
            Real photos from real tours. Thailand's mountain roads, the Alps,
            and the open highways of the world.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="tours" className="w-full">
          <TabsList className="mb-8 bg-muted/50 border border-border/50 p-1">
            <TabsTrigger
              value="tours"
              data-ocid="gallery.tours.tab"
              className="font-display font-bold text-xs tracking-wider uppercase data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Tour Gallery
            </TabsTrigger>
            <TabsTrigger
              value="bikes"
              data-ocid="gallery.bikes.tab"
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
                data-ocid="gallery.lightbox.close_button"
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
