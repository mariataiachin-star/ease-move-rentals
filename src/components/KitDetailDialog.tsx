import { Check } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PACKAGES, PackageId } from "@/data/packages";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  kitId: PackageId | null;
  onOrder: (id: PackageId) => void;
}

const KitDetailDialog = ({ open, onOpenChange, kitId, onOrder }: Props) => {
  const pkg = kitId ? PACKAGES.find((p) => p.id === kitId) : null;
  if (!pkg) return null;
  const Icon = pkg.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl rounded-3xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">{pkg.name} details</DialogTitle>
        <DialogDescription className="sr-only">{pkg.description}</DialogDescription>

        <div className="grid md:grid-cols-2">
          <div className="bg-gradient-cream p-8 flex items-center justify-center">
            <img
              src={pkg.image}
              alt={`${pkg.name} 3D preview — reusable storage box with student essentials`}
              width={1024}
              height={1024}
              loading="lazy"
              className="w-full h-auto rounded-2xl shadow-warm"
            />
          </div>
          <div className="p-8 max-h-[80vh] overflow-y-auto">
            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${pkg.accent} text-primary-foreground shadow-soft`}>
              <Icon className="h-6 w-6" />
            </div>
            <h2 className="mt-4 font-display text-3xl text-foreground">{pkg.name}</h2>
            <p className="text-sm font-semibold text-primary">{pkg.tagline}</p>
            <p className="mt-3 text-sm text-muted-foreground">{pkg.description}</p>

            <div className="mt-5 flex items-baseline gap-2">
              <span className="font-display text-4xl text-foreground">€{pkg.monthlyPrice}</span>
              <span className="text-muted-foreground">/month</span>
              <span className="ml-3 text-sm text-muted-foreground">Deposit €{pkg.deposit}</span>
            </div>

            <div className="mt-6 space-y-5">
              {pkg.categories.map((cat) => (
                <div key={cat.label}>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">{cat.label}</p>
                  <ul className="space-y-1.5 text-sm">
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

            <Button variant="hero" size="lg" className="mt-8 w-full" onClick={() => onOrder(pkg.id)}>
              Continue to Rental Period
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KitDetailDialog;