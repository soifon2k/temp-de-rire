const AboutSection = () => {
  return (
    <section className="py-20 px-4 border-t border-border bg-background">
      <div className="container max-w-6xl mx-auto">
        <h2 className="font-display text-5xl md:text-6xl text-center text-gold-gradient mb-2">
          À propos
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          Découvrez l'univers de Tempête du Rire, un événement qui transcende l'humour.
        </p>

        <div className="space-y-8">
          {/* Introduction */}
          <div className="space-y-4 bg-card border border-border rounded-lg p-8">
            <p className="text-lg text-foreground leading-relaxed">
              Tempête du Rire est un grand gala d'humour organisé à Muanda, en République Démocratique du Congo, qui ambitionne d'offrir une expérience unique mêlant stand-up, musique et ambiance festive.
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              Pensé comme un événement de référence en fin d'année, Tempête du Rire réunit sur une même scène des humoristes de Kinshasa et des talents locaux, dans un cadre exceptionnel : l'Espace Atlantique.
            </p>
            <p className="text-lg italic text-primary">
              Une soirée où le rire devient une véritable expérience.
            </p>
          </div>

          {/* Concept */}
          <div className="space-y-4 bg-card border border-border rounded-lg p-8">
            <h3 className="font-display text-3xl text-gold-gradient">Concept</h3>
            <p className="text-lg text-foreground">Tempête du Rire, c'est bien plus qu'un spectacle…</p>
            <p className="text-base text-foreground">C'est une immersion dans une ambiance où :</p>
            <ul className="space-y-3 pl-6 text-base text-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">😂</span>
                <span>Le rire est au centre</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">🎤</span>
                <span>Les artistes connectent avec le public</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">🎶</span>
                <span>La musique accompagne l'énergie</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">🎉</span>
                <span>L'ambiance transforme la soirée</span>
              </li>
            </ul>
            <p className="text-base italic text-primary pt-2">
              Un mélange parfait entre show, divertissement et moments inoubliables.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-card border border-border rounded-lg p-8 space-y-4">
              <h3 className="font-display text-2xl text-gold-gradient">Infos cles</h3>
              <div className="space-y-3">
                <p className="text-base text-foreground">📍 <span className="text-muted-foreground">Espace Atlantique - Muanda</span></p>
                <p className="text-base text-foreground">📅 <span className="text-muted-foreground">Samedi 19 Decembre 2026</span></p>
                <p className="text-base text-foreground">⏰ <span className="text-muted-foreground">17h - 22h</span></p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-8 space-y-4">
              <h3 className="font-display text-2xl text-gold-gradient">Notre vision</h3>
              <p className="text-sm text-foreground font-medium mb-3">Faire de Tempete du Rire:</p>
              <ul className="space-y-2 text-base text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✨</span>
                  <span>Un evenement annuel incontournable</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✨</span>
                  <span>Une plateforme de valorisation des talents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✨</span>
                  <span>Une experience reconnue nationalement</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 space-y-4">
            <h3 className="font-display text-2xl text-gold-gradient">Pourquoi reserver maintenant?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-primary text-xl">🎟️</span>
                <div>
                  <p className="font-medium text-foreground">Places limitees</p>
                  <p className="text-sm text-muted-foreground">Espace ferme et exclusif</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl">🔥</span>
                <div>
                  <p className="font-medium text-foreground">Forte demande</p>
                  <p className="text-sm text-muted-foreground">Evenement tres attendu</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-xl">🚀</span>
                <div>
                  <p className="font-medium text-foreground">Acces prioritaire</p>
                  <p className="text-sm text-muted-foreground">Meilleures categories</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl">💰</span>
                <div>
                  <p className="font-medium text-foreground">Tarifs evolutifs</p>
                  <p className="text-sm text-muted-foreground">Prix selon les phases</p>
                </div>
              </div>
            </div>
            <p className="text-base font-semibold text-primary pt-4">
              Reserver tot = meilleure experience
            </p>
          </div>

          <div className="bg-gradient-to-br from-card to-card border border-border rounded-lg p-8 space-y-4 text-center">
            <h3 className="font-display text-2xl text-gold-gradient">Besoin d'infos?</h3>
            <p className="text-base text-foreground">Pour toute reservation ou question :</p>
            <a
              href="tel:+243980978990"
              className="inline-flex items-center justify-center gap-2 bg-gold-gradient text-primary-foreground font-bold text-lg px-8 py-3 rounded-lg hover:scale-105 transition-transform"
            >
              📞 +243 980 978 990
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
