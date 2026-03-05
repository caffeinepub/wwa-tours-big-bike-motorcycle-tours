import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { motion } from "motion/react";
import type { Page } from "../App";
import {
  DEST_THAILAND,
  GALLERY_11,
  GALLERY_13,
  GALLERY_2023_A,
  GALLERY_EUROPE,
  GALLERY_RIDERS,
} from "../assets/images";
import Footer from "../components/Footer";

interface StoriesPageProps {
  onNavigate: (page: Page) => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const stories = [
  {
    title: "The Friendships We Make in Our Motorcycle Adventures",
    excerpt:
      "The friendships we make in our motorcycle adventures will last us a lifetime as we traveled in Northern Thailand for 2 weeks! There is something deeply bonding about sharing the open road, navigating mountain passes together, and discovering remote hill tribe villages side by side.",
    body: `When you spend two weeks riding through the mountains of Northern Thailand with a group of strangers, something remarkable happens. The shared challenges — steep mountain passes, unexpected rain, navigating remote tracks — these become the stories you tell for decades.

Our December 2019 Thailand tour brought together riders from six different countries. By day three, we weren't strangers anymore. By day seven, we were family. By the end of two weeks, leaving was genuinely hard.

That's the magic of motorcycle travel. The road strips away pretense. Everyone is equal at a hairpin bend. Everyone celebrates the same summit. Everyone shares the same cold beer at the end of a long, beautiful day.

The Northern Thailand loop we rode took us through Chiang Mai, up into the misty mountains near Pai, across to Mae Hong Son, down through the Golden Triangle, and back through Chiang Rai. Every day brought new scenery, new villages, new experiences.

Our guides Marco and the team knew every back road, every hidden waterfall, every family-run guesthouse that serves the best khao soy you've ever tasted. That local knowledge — that's what transforms a motorcycle trip into a motorcycle adventure.`,
    date: "December 9, 2019",
    tag: "Thailand",
    readTime: "5 min read",
    image: GALLERY_13,
  },
  {
    title: "Motorcycle RCMC European Tour June 17-30, 2019",
    excerpt:
      "A memorable 2-week journey through the European Alps, connecting riders from 6 countries on legendary mountain passes. The RCMC European Tour was a celebration of everything that makes motorcycle travel so extraordinary.",
    body: `The Gotthard Pass. The Furka Pass. The Grimsel Pass. These are names that motorcycle riders whisper with reverence. In June 2019, our RCMC group got to ride them all — and a dozen more besides.

Starting in Zurich, we carved our way through Switzerland's most dramatic mountain scenery, then crossed into France to tackle the legendary Col de l'Iseran and Col du Galibier. Each pass brought fresh views, fresh challenges, and fresh reasons to be grateful you chose two wheels over four.

The group — 8 riders from Switzerland, Germany, USA, Philippines, Thailand, and Australia — had connected through motorcycle forums and social media. Most had never met in person. By the end of day two, you couldn't tell.

What made this tour special, beyond the roads, was the infrastructure. Every night in carefully selected hotels where the bikes were secure, the food was exceptional, and the conversation over dinner stretched long into the evening. Swiss precision in planning means no wasted miles, no wrong turns, no disappointing stops.

The final day — a sweeping ride through the Bavarian Alps into Munich — was one of those experiences that doesn't need any embellishment. The roads speak for themselves.`,
    date: "December 28, 2019",
    tag: "Europe",
    readTime: "6 min read",
    image: GALLERY_11,
  },
  {
    title: "Thailand Golden Triangle — Riding the Roads Less Traveled",
    excerpt:
      "Our latest Thailand adventure through the Golden Triangle region, ancient temples and mountain passes. Crossing the borders of Thailand, Laos, and Myanmar by motorcycle is an experience unlike any other.",
    body: `The Golden Triangle — where Thailand, Laos, and Myanmar converge at the Mekong River — has captured imaginations for centuries. To arrive there by motorcycle, after three days of riding through Northern Thailand's mountain roads, is to fully appreciate the journey as much as the destination.

Our November 2023 tour explored not just the famous triangle viewpoint, but the roads that surround it. Hill tribe villages where trekkers never reach because the paths are too rough for anything but two wheels. Ancient temples hidden in forest clearings. Border crossings where the formalities are casual and the views are extraordinary.

Riding in this region is an exercise in mindfulness. The roads demand your full attention — they reward it with scenery that stops your breath. A hairpin opening onto a valley vista. A straight stretch through bamboo forest. A village market spilling onto the road, forcing a slow-down that becomes its own kind of gift.

This is why we ride. Not for speed. Not for distance. For this: the connection between movement and landscape, between human and place, that only motorcycles create.

Our next Golden Triangle tour departs in February 2025. Contact us to secure your spot.`,
    date: "November 2023",
    tag: "Thailand",
    readTime: "7 min read",
    image: GALLERY_2023_A,
  },
];

export default function StoriesPage({ onNavigate }: StoriesPageProps) {
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
            From the Road
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-5xl md:text-6xl text-foreground mb-4"
          >
            Rider Stories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-md mx-auto"
          >
            Real experiences from real riders. The adventures that make
            motorcycle travel unforgettable.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="space-y-16"
        >
          {stories.map((story, idx) => (
            <motion.article
              key={story.title}
              variants={fadeUp}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-start pb-16 ${
                idx < stories.length - 1 ? "border-b border-border/30" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`relative overflow-hidden rounded-sm aspect-[4/3] ${
                  idx % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-display">
                    {story.tag}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {story.date}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {story.readTime}
                  </span>
                </div>

                <h2 className="font-display font-black text-2xl md:text-3xl text-foreground mb-4 leading-tight">
                  {story.title}
                </h2>

                <p className="text-muted-foreground leading-relaxed mb-4 text-sm font-medium italic">
                  {story.excerpt}
                </p>

                <div className="space-y-3">
                  {story.body
                    .split("\n\n")
                    .slice(0, 2)
                    .map((para) => (
                      <p
                        key={para.slice(0, 30)}
                        className="text-sm text-muted-foreground leading-relaxed"
                      >
                        {para}
                      </p>
                    ))}
                </div>

                {story.body.split("\n\n").length > 2 && (
                  <details className="mt-4 group">
                    <summary className="cursor-pointer font-display font-bold text-xs tracking-wider uppercase text-primary hover:text-primary/80 transition-colors list-none flex items-center gap-1">
                      <span>Read More</span>
                      <span className="group-open:rotate-180 transition-transform inline-block">
                        ↓
                      </span>
                    </summary>
                    <div className="mt-4 space-y-3">
                      {story.body
                        .split("\n\n")
                        .slice(2)
                        .map((para) => (
                          <p
                            key={para.slice(0, 30)}
                            className="text-sm text-muted-foreground leading-relaxed"
                          >
                            {para}
                          </p>
                        ))}
                    </div>
                  </details>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-16"
        >
          <p className="font-display font-bold text-xs tracking-widest uppercase text-primary mb-3">
            Write Your Own Story
          </p>
          <h2 className="font-display font-black text-4xl text-foreground mb-6">
            Your Adventure Awaits
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Every great story starts with a single decision. Contact us to begin
            planning your motorcycle adventure.
          </p>
          <button
            type="button"
            onClick={() => onNavigate("contact")}
            className="inline-flex items-center justify-center rounded-sm px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 font-display font-black tracking-widest uppercase text-sm transition-all amber-glow"
          >
            Plan Your Tour
          </button>
        </motion.div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
