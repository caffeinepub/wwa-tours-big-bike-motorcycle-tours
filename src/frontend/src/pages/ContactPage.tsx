import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, Mail, MessageSquare, Phone } from "lucide-react";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { SiFacebook, SiX, SiYoutube } from "react-icons/si";
import { toast } from "sonner";
import type { Page } from "../App";
import Footer from "../components/Footer";
import { useSubmitInquiry } from "../hooks/useQueries";

interface ContactPageProps {
  onNavigate?: (page: Page) => void;
}

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  chatId: string;
  tourInterest: string;
  message: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const submitInquiry = useSubmitInquiry();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    chatId: "",
    tourInterest: "",
    message: "",
  });

  const setField =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitInquiry.mutateAsync({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        chatId: form.chatId,
        tourInterest: form.tourInterest || undefined,
        message: form.message,
      });
      setSubmitted(true);
      toast.success("Message sent! We'll reply within 24 hours.");
    } catch {
      toast.error("Failed to send. Please try again or email us directly.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
            Let's Talk
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 leading-tight"
          >
            Plan The Best Ever Motorcycle Guided Adventure Tour
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-md mx-auto"
          >
            Have questions? Ready to book? We'd love to hear from you.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-3 gap-10"
        >
          {/* Contact Info Card */}
          <motion.div variants={fadeUp} className="space-y-5">
            <div className="bg-card border border-border/60 rounded-sm p-6">
              <h2 className="font-display font-bold text-xs tracking-widest uppercase text-primary mb-5">
                Contact Information
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-primary/15 rounded-sm flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-xs tracking-wider uppercase text-muted-foreground mb-1">
                      Phone
                    </div>
                    <a
                      href="tel:+13108699142"
                      className="block text-sm text-foreground hover:text-primary transition-colors"
                    >
                      +1 310 869 9142 (USA)
                    </a>
                    <a
                      href="https://wa.me/13108699142"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors mb-2"
                    >
                      <SiWhatsapp className="w-3 h-3" />
                      WhatsApp
                    </a>
                    <a
                      href="tel:+41793511577"
                      className="block text-sm text-foreground hover:text-primary transition-colors"
                    >
                      +41 79 351 1577 (Switzerland)
                    </a>
                    <a
                      href="https://wa.me/41793511577"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <SiWhatsapp className="w-3 h-3" />
                      WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-primary/15 rounded-sm flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-xs tracking-wider uppercase text-muted-foreground mb-1">
                      Email
                    </div>
                    <a
                      href="mailto:wwatours@gmail.com"
                      className="text-sm text-foreground hover:text-primary transition-colors break-all"
                    >
                      wwatours@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-primary/15 rounded-sm flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-xs tracking-wider uppercase text-muted-foreground mb-1">
                      Response Time
                    </div>
                    <span className="text-sm text-foreground">
                      Within 24 hours
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-card border border-border/60 rounded-sm p-6">
              <h2 className="font-display font-bold text-xs tracking-widest uppercase text-primary mb-4">
                Follow Us
              </h2>
              <div className="space-y-3">
                <a
                  href="https://www.facebook.com/WWATour"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <SiFacebook className="w-4 h-4" />
                  facebook.com/WWATour
                </a>
                <a
                  href="https://www.youtube.com/channel/UC5oej0R0dhLwBoFhs-_uaPg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <SiYoutube className="w-4 h-4" />
                  YouTube Channel
                </a>
                <a
                  href="https://twitter.com/WWATcompany"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <SiX className="w-4 h-4" />
                  @WWATcompany
                </a>
              </div>
            </div>

            {/* Quick info */}
            <div className="bg-primary/8 border border-primary/20 rounded-sm p-5">
              <h3 className="font-display font-bold text-xs tracking-widest uppercase text-primary mb-3">
                Good to Know
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Tours depart from Chiang Mai, Zurich, or LA",
                  "Custom departures available anytime",
                  "All experience levels welcome",
                  "Deposit secures your spot",
                  "Full gear provided on all tours",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <div className="bg-card border border-border/60 rounded-sm p-8">
              <h2 className="font-display font-bold text-xs tracking-widest uppercase text-primary mb-1 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Send a Message
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Tell us about your dream tour and we'll get back to you within
                24 hours.
              </p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 bg-emerald-500/15 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="font-display font-black text-2xl text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground max-w-xs">
                    Thanks for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        chatId: "",
                        tourInterest: "",
                        message: "",
                      });
                    }}
                    variant="outline"
                    className="mt-6 border-primary/40 text-primary hover:bg-primary/10 font-display font-bold tracking-wider uppercase text-xs"
                  >
                    Send Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="contact-firstname"
                        className="font-display text-xs tracking-wider uppercase text-muted-foreground"
                      >
                        First Name *
                      </Label>
                      <Input
                        id="contact-firstname"
                        value={form.firstName}
                        onChange={setField("firstName")}
                        required
                        placeholder="John"
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary h-11"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="contact-lastname"
                        className="font-display text-xs tracking-wider uppercase text-muted-foreground"
                      >
                        Last Name *
                      </Label>
                      <Input
                        id="contact-lastname"
                        value={form.lastName}
                        onChange={setField("lastName")}
                        required
                        placeholder="Rider"
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary h-11"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="contact-email"
                        className="font-display text-xs tracking-wider uppercase text-muted-foreground"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={setField("email")}
                        required
                        placeholder="john@example.com"
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary h-11"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="contact-phone"
                        className="font-display text-xs tracking-wider uppercase text-muted-foreground"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        value={form.phone}
                        onChange={setField("phone")}
                        placeholder="+1 310 869 9142"
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary h-11"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="contact-chatid"
                        className="font-display text-xs tracking-wider uppercase text-muted-foreground"
                      >
                        Skype / Line / WeChat ID
                      </Label>
                      <Input
                        id="contact-chatid"
                        value={form.chatId}
                        onChange={setField("chatId")}
                        placeholder="Your Skype, Line or WeChat"
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary h-11"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="contact-tour"
                        className="font-display text-xs tracking-wider uppercase text-muted-foreground"
                      >
                        Tour Interest
                      </Label>
                      <Input
                        id="contact-tour"
                        value={form.tourInterest}
                        onChange={setField("tourInterest")}
                        placeholder="e.g. Northern Thailand Loop"
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-message"
                      className="font-display text-xs tracking-wider uppercase text-muted-foreground"
                    >
                      Message *
                    </Label>
                    <Textarea
                      id="contact-message"
                      value={form.message}
                      onChange={setField("message")}
                      required
                      rows={5}
                      placeholder="Tell us about your experience level, preferred dates, how many riders in your group, any specific questions..."
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitInquiry.isPending}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-black tracking-widest uppercase text-sm amber-glow"
                  >
                    {submitInquiry.isPending ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    We typically respond within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {onNavigate && <Footer onNavigate={onNavigate} />}
    </div>
  );
}
