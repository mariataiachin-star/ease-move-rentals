import { Recycle, Leaf, RefreshCcw, PackageCheck } from "lucide-react";

const PILLARS = [
  {
    icon: Recycle,
    title: "Circular by design",
    desc: "Every kit is built to be rented again and again — not used once and discarded.",
  },
  {
    icon: RefreshCcw,
    title: "Cleaned, checked, reused",
    desc: "After each rental we clean, inspect and repair items so the next student gets quality.",
  },
  {
    icon: PackageCheck,
    title: "Less packaging waste",
    desc: "Reusable boxes for delivery and pickup. No throwaway plastic, no overpackaging.",
  },
  {
    icon: Leaf,
    title: "Fewer items in landfill",
    desc: "We help reduce the wave of bedding and kitchenware thrown out at the end of every year.",
  },
];

const Sustainability = () => (
  <section id="sustainability" className="relative overflow-hidden py-24">
    <div className="absolute inset-0 bg-gradient-warm" />
    <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
    <div className="absolute -bottom-32 left-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

    <div className="container relative mx-auto">
      <div className="grid items-start gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Sustainability</p>
          <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl">
            A circular alternative to single-use student moves
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Every year, thousands of international students buy bedding, kitchenware and small furniture for a few months — then throw most of it away. EaseMove Rentals offers a simpler, more responsible alternative built around reuse.
          </p>
          <div className="mt-8 rounded-2xl border border-primary/30 bg-card/80 p-6 shadow-soft backdrop-blur">
            <p className="font-body text-sm font-semibold text-foreground">Our promise</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Items in our kits are cleaned, repaired and rented to multiple students before they are responsibly retired — extending their useful life by years.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {PILLARS.map((p) => (
            <article key={p.title} className="rounded-2xl border border-primary/20 bg-card p-6 shadow-card">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-sunset text-primary-foreground shadow-soft">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-body text-base font-bold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Sustainability;