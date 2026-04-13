import ticketNormal from "@/assets/ticket-normal.png";
import ticketStandard from "@/assets/ticket-standard.png";
import ticketVip from "@/assets/ticket-vip.png";
import ticketVvip from "@/assets/ticket-vvip.png";

const ticketImages: Record<string, string> = {
  VVIP: ticketVvip,
  VIP: ticketVip,
  Standard: ticketStandard,
  Normal: ticketNormal,
};

interface TicketCardProps {
  category: string;
  total: number;
  sold: number;
  onSelect: (category: string) => void;
}

const TicketCard = ({ category, total, sold, onSelect }: TicketCardProps) => {
  const remaining = total - sold;
  const soldOut = remaining <= 0;

  return (
    <div className="group rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:glow-gold">
      <div className="relative">
        <img
          src={ticketImages[category]}
          alt={`Billet ${category}`}
          className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-display text-2xl text-foreground">{category}</p>
              <p className="text-muted-foreground text-sm">
                {soldOut ? 'Épuisé' : `${remaining} restant${remaining > 1 ? 's' : ''}`}
              </p>
            </div>
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
              soldOut ? 'bg-muted text-muted-foreground' : 'bg-gold-gradient text-primary-foreground'
            }`}>
              {soldOut ? 'Épuisé' : 'Disponible'}
            </span>
          </div>
        </div>
      </div>
      <div className="p-4 pt-0">
        <button
          onClick={() => !soldOut && onSelect(category)}
          disabled={soldOut}
          className={`w-full rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
            soldOut
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : 'bg-gold-gradient text-primary-foreground hover:scale-105'
          }`}
        >
          {soldOut ? 'Épuisé' : 'Réserver'}
        </button>
      </div>
    </div>
  );
};

export default TicketCard;
