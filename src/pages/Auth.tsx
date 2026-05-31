import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { Boxes, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const signUpSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().min(6, "Enter a valid phone number").max(30),
  password: z.string().min(6, "Min 6 characters").max(72),
});
const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(1, "Password required"),
});

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate("/account", { replace: true });
  }, [user, loading, navigate]);

  useEffect(() => {
    document.title = mode === "signup" ? "Sign up — Survival Kit" : "Log in — Survival Kit";
  }, [mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (mode === "signup") {
        const parsed = signUpSchema.safeParse(form);
        if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            emailRedirectTo: `${window.location.origin}/account`,
            data: { full_name: form.fullName, phone: form.phone },
          },
        });
        if (error) { toast.error(error.message); return; }
        toast.success("Account created!");
      } else {
        const parsed = signInSchema.safeParse(form);
        if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
        const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
        if (error) { toast.error(error.message); return; }
        toast.success("Welcome back!");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-warm flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2.5 font-display text-2xl text-foreground mb-8">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-sunset text-primary-foreground shadow-soft">
            <Boxes className="h-5 w-5" />
          </span>
          <span className="font-body font-bold tracking-tight">Survival<span className="text-primary"> Kit</span></span>
        </Link>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-warm">
          <h1 className="font-display text-3xl text-foreground">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "signin" ? "Log in to manage your rentals." : "Sign up to book your kit and track your orders."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {mode === "signup" && (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input id="fullName" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} maxLength={80} className="h-11 rounded-xl" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={30} className="h-11 rounded-xl" required />
                </div>
              </>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={120} className="h-11 rounded-xl" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} maxLength={72} className="h-11 rounded-xl" required />
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting}>
              {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Please wait…</> : (mode === "signin" ? "Log in" : "Create account")}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
            <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="font-semibold text-primary underline-offset-4 hover:underline">
              {mode === "signin" ? "Create an account" : "Log in"}
            </button>
          </p>
        </div>

        <p className="mt-6 text-center text-sm">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-smooth">← Back to home</Link>
        </p>
      </div>
    </main>
  );
};

export default Auth;