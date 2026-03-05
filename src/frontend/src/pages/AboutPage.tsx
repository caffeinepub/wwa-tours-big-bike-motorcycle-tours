import { Award, Globe, MapPin, Shield, Users } from "lucide-react";
import { motion } from "motion/react";
import type { Page } from "../App";
import { GALLERY_9, GALLERY_13, GALLERY_2023_A } from "../assets/images";
import Footer from "../components/Footer";

interface AboutPageProps {
  onNavigate?: (page: Page) => void;
}

const guides = [
  {
    initials: "MS",
    name: "Marco S.",
    role: "Lead Guide — Switzerland / Thailand",
    bio: "20+ years riding experience across 40+ countries. Born in Switzerland, Marco brings Global Swissness to every tour — meticulous route planning, flawless logistics, and an infectious passion for the open road.",
    years: "20+ yrs experience",
    flag: "🇨🇭",
    photo: null,
  },
  {
    initials: "CW",
    name: "Chris W.",
    role: "USA Operations Lead",
    bio: "Pacific Coast and American Southwest specialist. Chris has ridden every major US route and knows the back roads that make the difference between a road trip and a life-changing adventure.",
    years: "15 yrs experience",
    flag: "🇺🇸",
    photo: null,
  },
  {
    initials: "AT",
    name: "Alex T.",
    role: "European Routes Director",
    bio: "Alpine passes expert. Alex has guided over 200 riders through the Swiss, French, and Italian Alps. His intimate knowledge of Europe's mountain roads turns every tour into a masterclass.",
    years: "12 yrs experience",
    flag: "🇪🇺",
    photo: null,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header / Hero Banner */}
      <div
        className="relative pt-32 pb-20 overflow-hidden"
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
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-5xl md:text-6xl text-foreground mb-4"
          >
            About World Wide Adventure Tours
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto text-lg"
          >
            Swiss precision meets global adventure. Creating extraordinary
            riding experiences since 2009.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Company Story */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-center"
        >
          <motion.div variants={fadeUp}>
            <p className="font-display font-bold text-xs tracking-widest uppercase text-primary mb-3">
              Who We Are
            </p>
            <h2 className="font-display font-black text-4xl text-foreground mb-6 leading-tight">
              Born From a Passion for Adventure
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
              <p>
                We are a Swiss/American operated guided motorcycle tour company
                dedicated to creating extraordinary riding experiences
                worldwide. Founded with a passion for adventure and a commitment
                to safety, we specialize in custom tours that turn your dream
                vacation into reality.
              </p>
              <p>
                Our motto — "Global Swissness" — captures everything we stand
                for. Swiss precision in planning, logistics, and safety. Global
                spirit in destination, culture, and experience. We research
                every tour in meticulous detail, personally riding every route
                before you do.
              </p>
              <p>
                From Northern Thailand's winding mountain roads to the legendary
                Alpine passes of Europe and the epic highways of the American
                Southwest — we bring the same uncompromising quality to every
                destination.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="relative">
            <div className="rounded-sm overflow-hidden aspect-[4/3] shadow-2xl">
              <img
                src={GALLERY_13}
                alt="WWA Tours crew on adventure"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground p-5 rounded-sm shadow-lg">
              <div className="font-display font-black text-3xl leading-none">
                15+
              </div>
              <div className="font-display font-bold text-xs tracking-widest uppercase mt-1">
                Years of Adventures
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Why Ride With Us */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mb-24"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <p className="font-display font-bold text-xs tracking-widest uppercase text-primary mb-3">
              Our Promise
            </p>
            <h2 className="font-display font-black text-4xl text-foreground">
              Why Ride With Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: Shield,
                title: "Safety First",
                desc: "Your safety is our absolute priority. All bikes are thoroughly serviced before every tour. Riders receive full safety briefings, proper gear, and are never pushed beyond their comfort level.",
              },
              {
                icon: Users,
                title: "Small Groups (Max 8)",
                desc: "Maximum 8 riders per tour — always. This isn't a marketing claim; it's our commitment to quality. Small groups mean personal attention, flexible routing, and genuine adventure.",
              },
              {
                icon: Award,
                title: "Premium Big Bikes",
                desc: "We ride BMW GS 850s, Honda Africa Twins, and Kawasaki Versys 650s. Top-of-the-line adventure machines, properly maintained, correctly sized for the terrain.",
              },
              {
                icon: Globe,
                title: "Custom Itineraries",
                desc: "Every tour is tailored to the group. We research every route personally. Our itineraries include roads, guesthouses, and experiences that simply don't exist in any guidebook.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="flex gap-4 p-6 bg-card border border-border/60 rounded-sm hover:border-primary/30 transition-colors"
              >
                <div className="w-11 h-11 bg-primary/15 rounded-sm flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-foreground mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Meet the Guides */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mb-24"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <p className="font-display font-bold text-xs tracking-widest uppercase text-primary mb-3">
              The Team
            </p>
            <h2 className="font-display font-black text-4xl text-foreground">
              Meet Your Guides
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <motion.div
                key={guide.name}
                variants={fadeUp}
                className="bg-card border border-border/60 rounded-sm p-7 text-center hover:border-primary/30 transition-colors group"
              >
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-4 group-hover:border-primary/60 transition-colors">
                  <span className="font-display font-black text-2xl text-primary">
                    {guide.initials}
                  </span>
                </div>
                <div className="font-display font-black text-xl text-foreground mb-1">
                  {guide.name}
                </div>
                <div className="font-display font-medium text-xs text-primary tracking-wider uppercase mb-2">
                  {guide.role}
                </div>
                <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mb-4">
                  <MapPin className="w-3 h-3 text-primary" />
                  {guide.years}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {guide.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact CTA */}
        {onNavigate && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-12 border-t border-border/30"
          >
            <h2 className="font-display font-black text-3xl text-foreground mb-4">
              Ready to Ride With Us?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Contact us to discuss your dream tour. We'll handle every detail
              so you can focus on the ride.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => onNavigate("contact")}
                className="inline-flex items-center justify-center rounded-sm px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 font-display font-black tracking-widest uppercase text-xs transition-all amber-glow"
              >
                Contact Us
              </button>
              <button
                type="button"
                onClick={() => onNavigate("tours")}
                className="inline-flex items-center justify-center rounded-sm px-8 py-3 border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 font-display font-bold tracking-widest uppercase text-xs transition-all"
              >
                Browse Tours
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {onNavigate && <Footer onNavigate={onNavigate} />}
    </div>
  );
}
