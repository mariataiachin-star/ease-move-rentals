import { useState } from "react";
import { z } from "zod";
import { Mail, MapPin, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  message: z.string().trim().min(10, "Tell us a bit more").max(600),
});

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Partial<Record<keyof typeof form, string>> = {};
      parsed.error.issues.forEach((i) => (next[i.path[0] as keyof typeof form] = i.message));
      setErrors(next);
      return;
    }
    setErrors({});
    toast.success("Thanks! We'll get back to you within one business day.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto grid gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Contact</p>
          <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl">
            Questions before you book?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We help students, university housing offices and exchange coordinators across Antwerp. Drop us a message and we'll reply personally.
          </p>

          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-foreground">Email</p>
                <p className="text-muted-foreground">hello@easemove-rentals.be</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-foreground">Based in</p>
                <p className="text-muted-foreground">Antwerp — serving students in the city</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <MessageSquare className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-foreground">Reply time</p>
                <p className="text-muted-foreground">Within one business day</p>
              </div>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-8 shadow-card">
          <div className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="c-name">Name</Label>
              <Input id="c-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={80} placeholder="Your full name" className="h-11 rounded-xl" />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="c-email">Email</Label>
              <Input id="c-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={120} placeholder="you@university.be" className="h-11 rounded-xl" />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="c-message">Message</Label>
              <Textarea id="c-message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={600} placeholder="Tell us about your stay, dates and questions…" className="min-h-32 rounded-xl" />
              {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full">
              Send message <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;