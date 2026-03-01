import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import Navigation from "./components/Navigation";
import TourDetailModal from "./components/TourDetailModal";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import DestinationsPage from "./pages/DestinationsPage";
import GalleryPage from "./pages/GalleryPage";
import HomePage from "./pages/HomePage";
import StoriesPage from "./pages/StoriesPage";
import ToursPage from "./pages/ToursPage";

export type Page =
  | "home"
  | "tours"
  | "destinations"
  | "gallery"
  | "about"
  | "stories"
  | "contact";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);
  const [destinationFilter, setDestinationFilter] = useState<string | null>(
    null,
  );

  const navigate = (page: Page, filter?: string) => {
    setCurrentPage(page);
    if (filter) setDestinationFilter(filter);
    else setDestinationFilter(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Navigation currentPage={currentPage} onNavigate={navigate} />

      <main>
        {currentPage === "home" && (
          <HomePage onNavigate={navigate} onSelectTour={setSelectedTourId} />
        )}
        {currentPage === "tours" && (
          <ToursPage
            onSelectTour={setSelectedTourId}
            onNavigate={navigate}
            initialDestinationFilter={destinationFilter}
          />
        )}
        {currentPage === "destinations" && (
          <DestinationsPage
            onNavigate={navigate}
            onSelectTour={setSelectedTourId}
          />
        )}
        {currentPage === "gallery" && <GalleryPage onNavigate={navigate} />}
        {currentPage === "about" && <AboutPage onNavigate={navigate} />}
        {currentPage === "stories" && <StoriesPage onNavigate={navigate} />}
        {currentPage === "contact" && <ContactPage onNavigate={navigate} />}
      </main>

      {selectedTourId && (
        <TourDetailModal
          tourId={selectedTourId}
          onClose={() => setSelectedTourId(null)}
        />
      )}

      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "oklch(0.18 0.01 30)",
            border: "1px solid oklch(0.28 0.02 40)",
            color: "oklch(0.95 0.02 60)",
          },
        }}
      />
    </div>
  );
}
