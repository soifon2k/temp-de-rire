import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TicketSection from "@/components/TicketSection";
import InfoSection from "@/components/InfoSection";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
          <span className="font-display text-xl text-gold-gradient">🎤 Tempête du Rire</span>
          <div className="flex items-center gap-4">
            <a href="#billets" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Billets
            </a>
            <Link
              to="/admin"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>
      <HeroSection />
      <AboutSection />
      <TicketSection />
      <InfoSection />
      <Footer />
    </div>
  );
};

export default Index;
