import { useState } from "react";
import { createReservation } from "@/lib/supabase-helpers";
import { useToast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ReservationFormProps {
  category: string;
  price: number;
  onClose: () => void;
  onSuccess: () => void;
}

const ReservationForm = ({ category, price, onClose, onSuccess }: ReservationFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [reservation, setReservation] = useState<any>(null);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    city: "",
    quantity: 1,
  });

  const totalPrice = form.quantity * price;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name.trim() || !form.phone.trim()) {
      toast({ title: "Erreur", description: "Nom et téléphone obligatoires", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const res = await createReservation({
        full_name: form.full_name,
        phone: form.phone,
        email: form.email || undefined,
        city: form.city || undefined,
        ticket_category: category,
        quantity: form.quantity,
        total_price: totalPrice,
      });
      setReservation(res);
      toast({ title: "Réservation créée !", description: `Votre ID: ${res.ticket_id}` });
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = () => {
    if (!reservation) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const qrCodeElement = document.querySelector(".qr-code-svg") as SVGElement;

    if (!ctx || !qrCodeElement) return;

    const svgData = new XMLSerializer().serializeToString(qrCodeElement);
    const img = new Image();

    img.onload = () => {
      canvas.width = 400;
      canvas.height = 400;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 400, 400);
      ctx.drawImage(img, 0, 0, 400, 400);

      // Ajouter le texte
      ctx.fillStyle = "black";
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`Tempête du Rire 2026`, 200, 380);
      ctx.font = "12px Arial";
      ctx.fillText(`ID: ${reservation.ticket_id}`, 200, 395);

      const link = document.createElement("a");
      link.download = `ticket-${reservation.ticket_id}.png`;
      link.href = canvas.toDataURL();
      link.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  if (reservation) {
    return (
      <div className="max-w-md mx-auto bg-card border border-border rounded-xl p-6 text-center">
        <h3 className="font-display text-3xl text-gold-gradient mb-2">Réservation confirmée !</h3>
        <p className="text-muted-foreground mb-1">ID: <span className="text-foreground font-mono">{reservation.ticket_id}</span></p>
        <p className="text-muted-foreground mb-1">{reservation.full_name}</p>
        <p className="text-muted-foreground mb-4">{category} × {reservation.quantity} = {reservation.total_price}$</p>
        <div className="bg-foreground rounded-lg p-4 inline-block mb-4">
          <QRCodeSVG
            value={reservation.qr_code_data || ""}
            size={200}
            className="qr-code-svg"
          />
        </div>
        <div className="flex gap-2 mb-4">
          <Button
            onClick={downloadQRCode}
            className="flex-1 bg-primary text-primary-foreground hover:opacity-90"
          >
            📥 Télécharger QR Code
          </Button>
        </div>
        <p className="text-sm text-accent mb-4">
          ⚠️ Paiement en attente de validation par l'admin.
          Votre billet sera activé après confirmation du paiement.
        </p>
        <p className="text-xs text-muted-foreground mb-4">
          Contactez-nous via WhatsApp pour confirmer votre paiement
        </p>
        <Button onClick={onSuccess} className="bg-gold-gradient text-primary-foreground hover:opacity-90">
          Fermer
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-2xl text-gold-gradient">Billet {category}</h3>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-xl">✕</button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="full_name">Nom complet *</Label>
          <Input
            id="full_name"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            placeholder="Votre nom complet"
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Téléphone *</Label>
          <Input
            id="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+243 ..."
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="votre@email.com"
          />
        </div>
        <div>
          <Label htmlFor="city">Ville</Label>
          <Input
            id="city"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            placeholder="Muanda, Kinshasa..."
          />
        </div>
        <div>
          <Label htmlFor="quantity">Nombre de billets</Label>
          <Input
            id="quantity"
            type="number"
            min={1}
            max={10}
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) || 1 })}
          />
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-muted-foreground">Total</span>
          <span className="font-display text-2xl text-gold-gradient">{totalPrice}$</span>
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gold-gradient text-primary-foreground font-semibold hover:opacity-90"
        >
          {loading ? "Traitement..." : "Réserver maintenant"}
        </Button>
      </form>
    </div>
  );
};

export default ReservationForm;
