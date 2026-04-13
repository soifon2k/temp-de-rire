const features = [
  { icon: "🎫", title: "Billet Numérique", desc: "Accessible depuis votre téléphone" },
  { icon: "📱", title: "QR Code Unique", desc: "Valable une seule fois à l'entrée" },
  { icon: "🔒", title: "Sécurisé", desc: "Achat 100% sécurisé et vérifié" },
  { icon: "✅", title: "Confirmation", desc: "Reçu envoyé par email ou WhatsApp" },
];

const InfoSection = () => {
  return (
    <section className="py-16 px-4 border-t border-border">
      <div className="container max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="text-center">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h4 className="font-display text-lg text-foreground mb-1">{f.title}</h4>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
