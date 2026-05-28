import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PACKAGES, PackageId } from "@/data/packages";

interface PackagesProps {
  onSelect: (id: PackageId) => void;
}

const Packages = ({ onSelect }: PackagesProps) => (
  <section id="packages" className="py-24 bg-gradient-cream">
    <div className="container mx-auto">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Available rental kits</p>
        <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl">
          Choose the kit that fits your stay
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Transparent monthly pricing with a one-time refundable deposit.
        </p>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:max-w-5xl lg:mx-auto">
        {PACKAGES.map((pkg) => {
          const Icon = pkg.icon;
          const featured = pkg.id === "comfort";
          return (
            <article
              key={pkg.id}
              className={`relative flex flex-col rounded-2xl border bg-card p-8 transition-smooth hover:-translate-y-2 ${
                featured
                  ? "border-primary shadow-warm lg:scale-[1.02]"
                  : "border-border shadow-card hover:shadow-warm"
              }`}
            >
              {pkg.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-sunset px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-soft">
                  {pkg.highlight}
                </span>
              )}
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${pkg.accent} text-primary-foreground shadow-soft`}>
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 font-display text-2xl text-foreground">{pkg.name}</h3>
              <p className="text-sm font-semibold text-primary">{pkg.tagline}</p>
              <p className="mt-3 text-sm text-muted-foreground">{pkg.description}</p>

              <div className="mt-6">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-5xl text-foreground">€{pkg.monthlyPrice}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  Deposit: €{pkg.deposit} total
                </p>
                <p className="mt-2 text-xs italic text-muted-foreground/80">
                  Deposit is partially refundable after return, depending on product condition.
                </p>
              </div>

              <div className="mt-6 space-y-5">
                {pkg.categories.map((cat) => (
                  <div key={cat.label}>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">{cat.label}</p>
                    <ul className="space-y-2 text-sm">
                      {cat.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                          <span className="text-foreground/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <Button
                variant={featured ? "hero" : "soft"}
                size="lg"
                className="mt-8 w-full"
                onClick={() => onSelect(pkg.id)}
              >
                Choose {pkg.name}
              </Button>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default Packages;
