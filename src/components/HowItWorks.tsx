import { PackageSearch, Calendar, Truck, Smile } from "lucide-react";

const STEPS = [
  { icon: PackageSearch, title: "Pick a package", desc: "Starter, Standard, or Deluxe — whichever fits your style." },
  { icon: Calendar, title: "Choose a period", desc: "Rent for 1, 3, 6, or 12 months. Cancel or extend anytime." },
  { icon: Truck, title: "We deliver", desc: "Boxed, sanitized and dropped at your door on move-in day." },
  { icon: Smile, title: "Live easy", desc: "When you leave, we collect everything. Zero hassle, zero waste." },
];

const HowItWorks = () => (
  <section id="how" className="py-24 bg-background">
    <div className="container mx-auto">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">How it works</p>
        <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">
          Four simple steps to a home that already feels yours
        </h2>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            className="group relative rounded-3xl border border-border bg-card p-8 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-warm"
          >
            <div className="absolute -top-4 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-sunset font-display text-lg font-bold text-primary-foreground shadow-soft">
              {i + 1}
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-smooth group-hover:bg-primary group-hover:text-primary-foreground">
              <step.icon className="h-7 w-7" />
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;