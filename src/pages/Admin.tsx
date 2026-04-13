import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";
import QRScanner from "@/components/QRScanner";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [activeTab, setActiveTab] = useState<"dashboard" | "scanner">("dashboard");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: roles } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id);
        if (roles?.some((r) => r.role === "admin")) {
          setAuthenticated(true);
        }
      }
      setChecking(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });

    checkAuth();
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthenticated(false);
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
          <span className="font-display text-xl text-gold-gradient">🎤 Admin</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                activeTab === "dashboard"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Tableau de bord
            </button>
            <button
              onClick={() => setActiveTab("scanner")}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                activeTab === "scanner"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Scanner
            </button>
            <Link to="/" className="text-muted-foreground hover:text-foreground text-sm px-2">
              Site
            </Link>
            <Button size="sm" variant="outline" onClick={handleLogout}>
              Déconnexion
            </Button>
          </div>
        </div>
      </nav>
      <main className="container max-w-6xl mx-auto py-8 px-4">
        {activeTab === "dashboard" ? <AdminDashboard /> : <QRScanner />}
      </main>
    </div>
  );
};

export default Admin;
