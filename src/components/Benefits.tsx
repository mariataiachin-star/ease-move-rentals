import { Wallet, Truck, ShieldCheck, Clock, Leaf, GraduationCap } from "lucide-react";

const BENEFITS = [
  {
    icon: Wallet,
    title: "Affordable for student budgets",
    desc: "Pay one transparent monthly fee instead of buying everything new for a temporary stay.",
  },
  {
    icon: Truck,
    title: "Delivery & pickup included",
    desc: "We bring your kit on arrival and collect it when you leave — no logistics on your side.",
  },
  {
    icon: ShieldCheck,
    title: "Refundable deposit",
    desc: "A small deposit at booking, fully refunded when the kit is returned in good condition.",
  },
  {
    icon: Clock,
    title: "Flexible periods",
    desc: "Rent for one month, a semester or a full academic year. Extend whenever you need.",
  },
  {
    icon: GraduationCap,
    title: "Made for Erasmus & exchange",
    desc: "Designed around the realities of short-term student stays in Antwerp universities.",
  },
  {
    icon: Leaf,
    title: "Less waste, more reuse",
    desc: "Every item is cleaned and rented again — nothing is bought just to be thrown away.",
  },
];

const Benefits = () => (
  <section id="benefits" className="py-24 bg-background">
    <div className="container mx-auto">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Why students choose us</p>
        <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl">
          Built for international students in Antwerp
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          A simple, honest service that removes the stress of moving abroad for studies.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {BENEFITS.map((b) => (
          <article
            key={b.title}
            className="group rounded-2xl border border-border bg-card p-7 shadow-card transition-smooth hover:-translate-y-1 hover:border-primary/40 hover:shadow-warm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition-smooth group-hover:bg-gradient-sunset group-hover:text-primary-foreground">
              <b.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-body text-lg font-bold text-foreground">{b.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Benefits;