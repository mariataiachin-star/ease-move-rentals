import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Boxes, LogOut, Mail, Phone, User as UserIcon, Package as PackageIcon, MapPin, Calendar, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Profile { id: string; full_name: string | null; email: string | null; phone: string | null; }
interface Order {
  id: string;
  kit_name: string;
  kit_id: string;
  period_months: number;
  start_date: string;
  end_date: string;
  delivery_address: string;
  price_total: number;
  deposit: number;
  status: string;
  created_at: string;
}

const Account = () => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ full_name: "", phone: "" });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.title = "My account — Survival Kit";
  }, []);

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [{ data: p }, { data: o }] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
        supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);
      if (p) {
        setProfile(p as Profile);
        setForm({ full_name: p.full_name ?? "", phone: p.phone ?? "" });
      }
      if (o) setOrders(o as Order[]);
    })();
  }, [user]);

  const saveProfile = async () => {
    if (!user) return;
    setBusy(true);
    const { error } = await supabase.from("profiles").update({ full_name: form.full_name, phone: form.phone }).eq("id", user.id);
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    setProfile((p) => p ? { ...p, full_name: form.full_name, phone: form.phone } : p);
    setEditing(false);
    toast.success("Profile updated");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/", { replace: true });
  };

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  }

  const active = orders.find((o) => o.status === "Active");
  const statusColor = (s: string) => s === "Active" ? "bg-accent/20 text-accent" : s === "Returned" ? "bg-muted text-muted-foreground" : "bg-primary/15 text-primary";

  return (
    <div className="min-h-screen bg-gradient-warm">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
        <nav className="container mx-auto flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2.5 font-display text-2xl text-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-sunset text-primary-foreground shadow-soft">
              <Boxes className="h-5 w-5" />
            </span>
            <span className="font-body font-bold tracking-tight">Survival<span className="text-primary"> Kit</span></span>
          </Link>
          <Button variant="soft" size="sm" onClick={handleSignOut}><LogOut className="h-4 w-4" /> Log out</Button>
        </nav>
      </header>

      <main className="container mx-auto py-12">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">My dashboard</p>
          <h1 className="mt-2 font-display text-4xl text-foreground md:text-5xl">Hi {profile?.full_name?.split(" ")[0] ?? "there"} 👋</h1>
          <p className="mt-2 text-muted-foreground">Manage your profile and rentals.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile */}
          <section className="lg:col-span-1 rounded-3xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl text-foreground">Profile</h2>
              {!editing && <button onClick={() => setEditing(true)} className="text-xs font-semibold text-primary underline-offset-4 hover:underline">Edit</button>}
            </div>
            {!editing ? (
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-start gap-3"><UserIcon className="h-4 w-4 mt-0.5 text-primary" /><div><p className="text-xs text-muted-foreground">Full name</p><p className="font-medium text-foreground">{profile?.full_name || "—"}</p></div></div>
                <div className="flex items-start gap-3"><Mail className="h-4 w-4 mt-0.5 text-primary" /><div><p className="text-xs text-muted-foreground">Email</p><p className="font-medium text-foreground break-all">{profile?.email}</p></div></div>
                <div className="flex items-start gap-3"><Phone className="h-4 w-4 mt-0.5 text-primary" /><div><p className="text-xs text-muted-foreground">Phone</p><p className="font-medium text-foreground">{profile?.phone || "—"}</p></div></div>
              </div>
            ) : (
              <div className="mt-5 space-y-3">
                <div className="space-y-1.5"><Label htmlFor="fn">Full name</Label><Input id="fn" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="h-10 rounded-xl" maxLength={80} /></div>
                <div className="space-y-1.5"><Label htmlFor="ph">Phone</Label><Input id="ph" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="h-10 rounded-xl" maxLength={30} /></div>
                <div className="flex gap-2 pt-2">
                  <Button variant="hero" size="sm" onClick={saveProfile} disabled={busy}>{busy ? "Saving…" : "Save"}</Button>
                  <Button variant="soft" size="sm" onClick={() => { setEditing(false); setForm({ full_name: profile?.full_name ?? "", phone: profile?.phone ?? "" }); }}>Cancel</Button>
                </div>
              </div>
            )}

            {active && (
              <div className="mt-6 rounded-2xl bg-gradient-cream p-4 border border-primary/20">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Current rental</p>
                <p className="mt-1 font-display text-lg text-foreground">{active.kit_name}</p>
                <p className="text-xs text-muted-foreground">Until {new Date(active.end_date).toLocaleDateString()}</p>
              </div>
            )}
          </section>

          {/* Orders */}
          <section className="lg:col-span-2">
            <h2 className="font-display text-2xl text-foreground mb-4">Your orders</h2>
            {orders.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border bg-card p-10 text-center">
                <PackageIcon className="mx-auto h-10 w-10 text-muted-foreground" />
                <p className="mt-3 font-medium text-foreground">No orders yet</p>
                <p className="text-sm text-muted-foreground">Browse our kits to get started.</p>
                <Button variant="hero" className="mt-5" onClick={() => navigate("/#packages")}>Browse kits</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((o) => (
                  <article key={o.id} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-display text-xl text-foreground">{o.kit_name}</h3>
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${statusColor(o.status)}`}>{o.status}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Ordered {new Date(o.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-2xl text-primary">€{o.price_total}</p>
                        <p className="text-xs text-muted-foreground">Deposit €{o.deposit}</p>
                      </div>
                    </div>
                    <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                      <p className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4 text-primary" /> {new Date(o.start_date).toLocaleDateString()} → {new Date(o.end_date).toLocaleDateString()} <span className="text-xs">({o.period_months}mo)</span></p>
                      <p className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4 text-primary" /> {o.delivery_address}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Account;