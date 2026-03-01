import { Mail, Phone } from "lucide-react";
import { SiFacebook, SiWhatsapp, SiX, SiYoutube } from "react-icons/si";
import type { Page } from "../App";

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const quickLinks: { label: string; page: Page }[] = [
  { label: "Our Tours", page: "tours" },
  { label: "Destinations", page: "destinations" },
  { label: "Gallery", page: "gallery" },
  { label: "About Us", page: "about" },
  { label: "Stories", page: "stories" },
  { label: "Contact", page: "contact" },
];

export default function Footer({ onNavigate }: FooterProps) {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-black/50 border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <div className="font-display font-black text-xl tracking-wider text-foreground uppercase leading-none">
                WWA TOURS
              </div>
              <div className="font-sans font-medium text-[10px] tracking-[0.25em] text-primary uppercase mt-1">
                Big Bike Motorcycle Tours
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-3">
              Adventure and Freedom · Global Swissness
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
              Swiss/American operated guided motorcycle tours across Thailand,
              Europe, and the USA. Passionate about creating your dream
              vacation.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/WWATour"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 bg-muted hover:bg-primary/20 border border-border hover:border-primary/50 rounded-sm flex items-center justify-center text-muted-foreground hover:text-primary transition-all"
              >
                <SiFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/channel/UC5oej0R0dhLwBoFhs-_uaPg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 bg-muted hover:bg-primary/20 border border-border hover:border-primary/50 rounded-sm flex items-center justify-center text-muted-foreground hover:text-primary transition-all"
              >
                <SiYoutube className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/WWATcompany"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter/X"
                className="w-9 h-9 bg-muted hover:bg-primary/20 border border-border hover:border-primary/50 rounded-sm flex items-center justify-center text-muted-foreground hover:text-primary transition-all"
              >
                <SiX className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-xs tracking-widest uppercase text-primary mb-5">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, page }) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => onNavigate(page)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-xs tracking-widest uppercase text-primary mb-5">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <a
                    href="tel:+13108699142"
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    +1 310 869 9142 (USA)
                  </a>
                  <a
                    href="https://wa.me/13108699142"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors mb-1"
                  >
                    <SiWhatsapp className="w-3 h-3" />
                    WhatsApp
                  </a>
                  <a
                    href="tel:+41793511577"
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
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
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <a
                  href="mailto:wwatours@gmail.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors break-all"
                >
                  wwatours@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/40 mt-12 pt-6 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              © {year} World Wide Adventure Tours LLC. All Rights Reserved.
            </p>
            <p className="text-xs text-muted-foreground text-center sm:text-right">
              Powered by BigBikeMotorcycleTours.com | WWATour.com
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              Terms & Agreement | Privacy | Legal | Disclaimers
            </p>
            <p className="text-xs text-muted-foreground">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
