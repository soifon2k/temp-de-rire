import { useEffect, useState } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date("2026-12-19T17:00:00").getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-card via-card to-card border-2 border-primary rounded-lg p-8 mb-12">
      <p className="text-center text-muted-foreground mb-6 text-lg font-semibold">
        ⏱️ Compteur jusqu'à Tempête du Rire 2026
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="bg-primary/10 rounded-lg p-4 border border-primary/30">
            <p className="font-display text-4xl md:text-5xl text-gold-gradient">
              {timeLeft.days}
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              {timeLeft.days > 1 ? "Jours" : "Jour"}
            </p>
          </div>
        </div>
        <div className="text-center">
          <div className="bg-primary/10 rounded-lg p-4 border border-primary/30">
            <p className="font-display text-4xl md:text-5xl text-gold-gradient">
              {timeLeft.hours}
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              {timeLeft.hours > 1 ? "Heures" : "Heure"}
            </p>
          </div>
        </div>
        <div className="text-center">
          <div className="bg-primary/10 rounded-lg p-4 border border-primary/30">
            <p className="font-display text-4xl md:text-5xl text-gold-gradient">
              {timeLeft.minutes}
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              {timeLeft.minutes > 1 ? "Minutes" : "Minute"}
            </p>
          </div>
        </div>
        <div className="text-center">
          <div className="bg-primary/10 rounded-lg p-4 border border-primary/30">
            <p className="font-display text-4xl md:text-5xl text-gold-gradient">
              {timeLeft.seconds}
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              {timeLeft.seconds > 1 ? "Secondes" : "Seconde"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
