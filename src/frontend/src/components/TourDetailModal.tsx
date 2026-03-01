import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  MapPin,
  MessageSquare,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Difficulty } from "../backend.d";
import { useGetTour, useSubmitInquiry } from "../hooks/useQueries";

interface TourDetailModalProps {
  tourId: string;
  onClose: () => void;
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

interface InquiryForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  chatId: string;
  message: string;
}

export default function TourDetailModal({
  tourId,
  onClose,
}: TourDetailModalProps) {
  const { data: tour, isLoading, error } = useGetTour(tourId);
  const submitInquiry = useSubmitInquiry();
  const [form, setForm] = useState<InquiryForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    chatId: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const diff = tour
    ? (difficultyConfig[tour.difficulty] ?? difficultyConfig.moderate)
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tour) return;
    try {
      await submitInquiry.mutateAsync({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        chatId: form.chatId,
        message: form.message,
        tourInterest: tour.name,
      });
      setSubmitted(true);
      toast.success("Inquiry sent! We'll be in touch within 24 hours.");
    } catch {
      toast.error("Failed to send inquiry. Please try again.");
    }
  };

  const setField =
    (field: keyof InquiryForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="bg-card border border-border/70 rounded-lg w-full max-w-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div
            className="relative border-b border-border/50 p-6"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.18 0.02 40) 0%, oklch(0.16 0.01 30) 100%)",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-muted rounded-sm transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-8 w-2/3 bg-muted" />
                <Skeleton className="h-5 w-1/2 bg-muted" />
              </div>
            ) : error ? (
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="w-5 h-5" />
                <span>Failed to load tour details</span>
              </div>
            ) : tour ? (
              <>
                <div className="flex items-start gap-3 mb-4 pr-12">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      {diff && (
                        <Badge
                          className={`${diff.className} border font-display font-bold text-xs tracking-wider uppercase`}
                        >
                          {diff.label}
                        </Badge>
                      )}
                      <span className="text-xs font-display font-bold tracking-widest uppercase text-primary">
                        {tour.destination.toUpperCase()}
                      </span>
                    </div>
                    <h2 className="font-display font-black text-2xl md:text-3xl text-foreground">
                      {tour.name}
                    </h2>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    {
                      icon: Clock,
                      label: `${tour.duration} days`,
                    },
                    { icon: MapPin, label: tour.route },
                    {
                      icon: Users,
                      label: `Max ${tour.maxGroupSize}`,
                    },
                    {
                      icon: DollarSign,
                      label: `$${Number(tour.priceUSD).toLocaleString()} USD`,
                    },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Icon className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-muted-foreground text-xs truncate">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Upcoming dates */}
                {tour.tourDates.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      Upcoming dates:
                    </span>
                    {tour.tourDates.slice(0, 3).map((d) => (
                      <Badge
                        key={d}
                        className="bg-primary/10 text-primary border-primary/20 text-xs font-display"
                      >
                        {d}
                      </Badge>
                    ))}
                  </div>
                )}
              </>
            ) : null}
          </div>

          {/* Body */}
          {tour && (
            <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
              {/* Description */}
              <div>
                <h3 className="font-display font-bold text-xs tracking-widest uppercase text-primary mb-3">
                  About This Tour
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {tour.fullDescription}
                </p>
              </div>

              {/* Highlights */}
              {tour.highlights.length > 0 && (
                <div>
                  <h3 className="font-display font-bold text-xs tracking-widest uppercase text-primary mb-3">
                    Tour Highlights
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {tour.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Itinerary */}
              {tour.itinerary.length > 0 && (
                <div>
                  <h3 className="font-display font-bold text-xs tracking-widest uppercase text-primary mb-4">
                    Day-by-Day Itinerary
                  </h3>
                  <Accordion type="single" collapsible className="space-y-2">
                    {tour.itinerary.map((day) => (
                      <AccordionItem
                        key={day.day.toString()}
                        value={`day-${day.day}`}
                        className="border border-border/60 rounded-sm bg-background/50 px-4 data-[state=open]:border-primary/30"
                      >
                        <AccordionTrigger className="font-display font-bold text-sm text-foreground hover:text-primary hover:no-underline py-3">
                          <span className="flex items-center gap-3">
                            <span className="w-6 h-6 bg-primary/20 rounded-sm flex items-center justify-center shrink-0 text-xs text-primary font-black">
                              {day.day.toString()}
                            </span>
                            {day.title}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-3 pl-9">
                          {day.description}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}

              {/* Inquiry Form */}
              <div className="border-t border-border/50 pt-6">
                <h3 className="font-display font-bold text-xs tracking-widest uppercase text-primary mb-4 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Inquire About This Tour
                </h3>
                {submitted ? (
                  <div className="flex items-center gap-3 p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-sm">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <p className="font-display font-bold text-sm text-foreground">
                        Inquiry Sent!
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        We'll get back to you within 24 hours about {tour.name}.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="modal-firstname"
                          className="font-display text-xs tracking-wider uppercase text-muted-foreground"
                        >
                          First Name *
                        </Label>
                        <Input
                          id="modal-firstname"
                          value={form.firstName}
                          onChange={setField("firstName")}
                          required
                          placeholder="John"
                          className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="modal-lastname"
                          className="font-display text-xs tracking-wider uppercase text-muted-foreground"
                        >
                          Last Name *
                        </Label>
                        <Input
                          id="modal-lastname"
                          value={form.lastName}
                          onChange={setField("lastName")}
                          required
                          placeholder="Rider"
                          className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="modal-email"
                          className="font-display text-xs tracking-wider uppercase text-muted-foreground"
                        >
                          Email *
                        </Label>
                        <Input
                          id="modal-email"
                          type="email"
                          value={form.email}
                          onChange={setField("email")}
                          required
                          placeholder="john@example.com"
                          className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="modal-phone"
                          className="font-display text-xs tracking-wider uppercase text-muted-foreground"
                        >
                          Phone
                        </Label>
                        <Input
                          id="modal-phone"
                          type="tel"
                          value={form.phone}
                          onChange={setField("phone")}
                          placeholder="+1 234 567 8900"
                          className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="modal-chatid"
                        className="font-display text-xs tracking-wider uppercase text-muted-foreground"
                      >
                        Skype / Line / WeChat ID
                      </Label>
                      <Input
                        id="modal-chatid"
                        value={form.chatId}
                        onChange={setField("chatId")}
                        placeholder="Your Skype, Line or WeChat ID"
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="modal-message"
                        className="font-display text-xs tracking-wider uppercase text-muted-foreground"
                      >
                        Message
                      </Label>
                      <Textarea
                        id="modal-message"
                        value={form.message}
                        onChange={setField("message")}
                        placeholder="Tell us about yourself, your experience level, preferred dates..."
                        rows={3}
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary resize-none"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        type="submit"
                        disabled={submitInquiry.isPending}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold tracking-wider uppercase text-xs amber-glow"
                      >
                        {submitInquiry.isPending
                          ? "Sending..."
                          : "Send Inquiry"}
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Tour:{" "}
                        <span className="text-primary font-medium">
                          {tour.name}
                        </span>
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
