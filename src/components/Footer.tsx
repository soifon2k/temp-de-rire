const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t border-border text-center">
      <p className="font-display text-xl text-gold-gradient mb-2">Tempête du Rire 2026</p>
      <p className="text-muted-foreground text-sm mb-4">
        Une soirée. Une ambiance. Une explosion de rire.
      </p>
      <div className="flex justify-center gap-4 text-muted-foreground text-sm">
        <span>@tempetedurire</span>
        <span>#TempeteDuRire2026</span>
      </div>
      <p className="text-muted-foreground/50 text-xs mt-4">
        Prévente disponible maintenant !
      </p>
    </footer>
  );
};

export default Footer;
