import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Page } from "../App";

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navLinks: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Tours", page: "tours" },
  { label: "Destinations", page: "destinations" },
  { label: "Gallery", page: "gallery" },
  { label: "About", page: "about" },
  { label: "Stories", page: "stories" },
  { label: "Contact", page: "contact" },
];

export default function Navigation({
  currentPage,
  onNavigate,
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (page: Page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border/60 shadow-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNav("home")}
          className="flex items-center gap-3 group"
        >
          <div className="flex flex-col text-left">
            <span className="font-display font-black text-lg tracking-wider text-foreground uppercase leading-none group-hover:text-primary transition-colors">
              WWA TOURS
            </span>
            <span className="font-sans font-medium text-[10px] tracking-[0.25em] text-primary uppercase leading-none mt-0.5">
              Big Bike Motorcycle Tours
            </span>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.slice(0, -1).map((link) => (
            <button
              type="button"
              key={link.page}
              onClick={() => handleNav(link.page)}
              className={`px-3 py-2 text-xs font-display font-semibold tracking-wider uppercase transition-all relative group ${
                currentPage === link.page
                  ? "text-primary"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 ${
                  currentPage === link.page ? "w-4/5" : "w-0 group-hover:w-4/5"
                }`}
              />
            </button>
          ))}
          <Button
            type="button"
            onClick={() => handleNav("contact")}
            size="sm"
            className="ml-3 bg-primary text-primary-foreground hover:bg-primary/90 font-display font-black tracking-widest uppercase text-xs px-5 amber-glow"
          >
            Book a Tour
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background/98 backdrop-blur-xl border-b border-border">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.page}
                onClick={() => handleNav(link.page)}
                className={`px-4 py-3 text-left font-display font-semibold tracking-wider uppercase text-sm transition-colors rounded-sm ${
                  currentPage === link.page
                    ? "text-primary bg-primary/10"
                    : "text-foreground/60 hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </button>
            ))}
            <Button
              type="button"
              onClick={() => handleNav("contact")}
              className="mt-3 bg-primary text-primary-foreground font-display font-black tracking-widest uppercase text-xs amber-glow"
            >
              Book a Tour
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
