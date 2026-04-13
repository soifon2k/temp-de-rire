import eventHero from "@/assets/event-hero.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={eventHero} alt="Tempête du Rire 2026" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
      </div>
      <div className="relative z-10 text-center px-4 py-20">
        <p className="text-primary font-semibold text-sm md:text-base uppercase tracking-widest mb-4">
          Le gala qui fait trembler Muanda et Kinshasa !
        </p>
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-gold-gradient leading-none mb-4">
          Tempête du Rire
        </h1>
        <p className="font-display text-2xl md:text-3xl text-foreground/80 mb-2">Édition 2026</p>
        <p className="text-muted-foreground text-lg mb-8">
          Stand Up • Humour • Musique • Ambiance
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base mb-10">
          <div className="flex items-center gap-2">
            <span className="text-accent">📅</span>
            <span className="text-foreground font-medium">Samedi 19 Décembre 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary">🕐</span>
            <span className="text-foreground font-medium">17h00 - 22h00</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-accent">📍</span>
            <span className="text-foreground font-medium">Espace Atlantique, Muanda</span>
          </div>
        </div>
        <a
          href="#billets"
          className="inline-block bg-gold-gradient text-primary-foreground font-bold text-lg px-8 py-4 rounded-lg hover:scale-105 transition-transform animate-pulse-gold"
        >
          🎟️ Acheter mes billets
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
