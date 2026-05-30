import { PackageSearch, Calendar, Truck, Smile } from "lucide-react";

const STEPS = [
  { icon: PackageSearch, title: "Choose your kit", desc: "Pick the Essential, Comfort or Premium kit that fits your stay." },
  { icon: Calendar, title: "Select a period", desc: "Rent for 1, 3, 6 or 12 months. Extend or end early when you need." },
  { icon: Truck, title: "We deliver in Antwerp", desc: "Your kit arrives at your room or student housing on move-in day." },
  { icon: Smile, title: "Return & get refunded", desc: "When you leave, we pick everything up and refund your deposit." },
];

const HowItWorks = () => (
  <section id="how" className="py-24 bg-background">
    <div className="container mx-auto">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">How it works</p>
        <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl">
          Four simple steps from arrival to move-out
        </h2>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            className="group relative rounded-2xl border border-border bg-card p-8 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-warm"
          >
            <div className="absolute -top-4 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-sunset font-body text-sm font-bold text-primary-foreground shadow-soft">
              {i + 1}
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary transition-smooth group-hover:bg-primary group-hover:text-primary-foreground">
              <step.icon className="h-7 w-7" />
            </div>
            <h3 className="mt-5 font-body text-lg font-bold text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;