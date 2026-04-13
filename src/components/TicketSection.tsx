import { useEffect, useState } from "react";
import { getInventory } from "@/lib/supabase-helpers";
import TicketCard from "./TicketCard";
import ReservationForm from "./ReservationForm";
import CountdownTimer from "./CountdownTimer";

interface InventoryItem {
  id: string;
  category: string;
  total: number;
  sold: number;
  price: number;
}

const TicketSection = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedGlobalCategory, setSelectedGlobalCategory] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const fetchInventory = async () => {
    try {
      const data = await getInventory();
      setInventory(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    if (!selectedGlobalCategory && inventory.length > 0) {
      setSelectedGlobalCategory(inventory[0].category);
    }
  }, [inventory, selectedGlobalCategory]);

  const selectedItem = inventory.find((i) => i.category === selectedCategory);

  return (
    <section id="billets" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <h2 className="font-display text-5xl md:text-6xl text-center text-gold-gradient mb-4">
          Nos Billets
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Choisissez votre catégorie et réservez votre place pour une soirée inoubliable !
        </p>

        <CountdownTimer />

        {loading ? (
          <div className="text-center text-muted-foreground">Chargement...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {inventory.map((item) => (
                <TicketCard
                  key={item.id}
                  category={item.category}
                  total={item.total}
                  sold={item.sold}
                  onSelect={setSelectedCategory}
                />
              ))}
            </div>
            
            <div className="flex flex-col items-center justify-center gap-4 mb-12">
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="text-muted-foreground">Choisir le type de billet</span>
                <select
                  value={selectedGlobalCategory}
                  onChange={(e) => setSelectedGlobalCategory(e.target.value)}
                  className="w-72 rounded-2xl border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                >
                  {inventory.map((item) => (
                    <option key={item.id} value={item.category}>
                      {item.category}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setSelectedCategory(selectedGlobalCategory || inventory[0]?.category || null)}
                disabled={!selectedGlobalCategory}
                className="bg-gold-gradient text-primary-foreground font-bold text-lg px-12 py-4 rounded-lg hover:scale-105 transition-transform animate-pulse-gold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🎟️ Réserver mes billets
              </button>
            </div>
          </>
        )}

        {selectedCategory && selectedItem && (
          <ReservationForm
            category={selectedCategory}
            price={selectedItem.price}
            onClose={() => setSelectedCategory(null)}
            onSuccess={() => {
              setSelectedCategory(null);
              fetchInventory();
            }}
          />
        )}
      </div>
    </section>
  );
};

export default TicketSection;
