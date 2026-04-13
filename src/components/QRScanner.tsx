import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { scanTicket } from "@/lib/supabase-helpers";
import { useToast } from "@/hooks/use-toast";

const QRScanner = () => {
  const { toast } = useToast();
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(true);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (!scanning) return;

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scanner.render(
      async (decodedText) => {
        scanner.clear();
        setScanning(false);

        try {
          const parsed = JSON.parse(decodedText);
          if (parsed.app !== "tempete-du-rire-2026") {
            setError("Ce QR code ne provient pas de l'application Tempête du Rire");
            return;
          }
          const data = await scanTicket(parsed.ticket_id);
          setResult(data);
          toast({ title: "✅ Billet valide !", description: `${data.full_name} - ${data.ticket_category}` });
        } catch (err: any) {
          setError(err.message);
          toast({ title: "❌ Erreur", description: err.message, variant: "destructive" });
        }
      },
      (err) => {
        // ignore scan errors
      }
    );

    scannerRef.current = scanner;

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [scanning]);

  const reset = () => {
    setResult(null);
    setError(null);
    setScanning(true);
  };

  return (
    <div className="max-w-md mx-auto">
      <h3 className="font-display text-2xl text-foreground mb-4 text-center">Scanner QR Code</h3>

      {scanning && (
        <div id="qr-reader" className="rounded-xl overflow-hidden border border-border" />
      )}

      {result && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center">
          <p className="text-3xl mb-2">✅</p>
          <p className="text-green-400 font-display text-xl mb-2">Billet valide</p>
          <p className="text-foreground font-medium">{result.full_name}</p>
          <p className="text-muted-foreground">{result.ticket_category} × {result.quantity}</p>
          <p className="text-muted-foreground font-mono text-sm">{result.ticket_id}</p>
          <button
            onClick={reset}
            className="mt-4 px-4 py-2 bg-gold-gradient text-primary-foreground rounded-md font-semibold hover:opacity-90"
          >
            Scanner un autre billet
          </button>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
          <p className="text-3xl mb-2">❌</p>
          <p className="text-red-400 font-display text-xl mb-2">Erreur</p>
          <p className="text-muted-foreground">{error}</p>
          <button
            onClick={reset}
            className="mt-4 px-4 py-2 bg-gold-gradient text-primary-foreground rounded-md font-semibold hover:opacity-90"
          >
            Réessayer
          </button>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
