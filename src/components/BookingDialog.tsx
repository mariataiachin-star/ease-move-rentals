import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Check, Loader2, PartyPopper } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PACKAGES, PERIODS, PackageId, Period, calculatePrice } from "@/data/packages";

const detailsSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  university: z.string().trim().min(2, "Tell us your university").max(120),
  address: z.string().trim().min(5, "Delivery address required").max(200),
  moveInDate: z.string().min(1, "Pick a move-in date"),
});
type Details = z.infer<typeof detailsSchema>;

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initialPackage?: PackageId;
}

const BookingDialog = ({ open, onOpenChange, initialPackage }: Props) => {
  const [step, setStep] = useState(0);
  const [packageId, setPackageId] = useState<PackageId>(initialPackage ?? "standard");
  const [period, setPeriod] = useState<Period>(6);
  const [details, setDetails] = useState<Details>({ fullName: "", email: "", university: "", address: "", moveInDate: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Details, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmationId, setConfirmationId] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setStep(0);
      setPackageId(initialPackage ?? "standard");
      setPeriod(6);
      setErrors({});
      setConfirmationId(null);
    }
  }, [open, initialPackage]);

  const pkg = PACKAGES.find((p) => p.id === packageId)!;
  const pricing = useMemo(() => calculatePrice(pkg.monthlyPrice, period), [pkg, period]);

  const handleSubmit = () => {
    const parsed = detailsSchema.safeParse(details);
    if (!parsed.success) {
      const e: Partial<Record<keyof Details, string>> = {};
      parsed.error.issues.forEach((issue) => {
        e[issue.path[0] as keyof Details] = issue.message;
      });
      setErrors(e);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setConfirmationId("EM-" + Math.random().toString(36).slice(2, 8).toUpperCase());
      setStep(3);
      toast.success("Booking request received! Check your inbox.");
    }, 900);
  };

  const STEPS = ["Package", "Period", "Your details", "Confirmed"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-3xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">Book your EaseMove rental kit</DialogTitle>
        <DialogDescription className="sr-only">Choose package, rental period, and enter your details.</DialogDescription>

        {/* Progress */}
        <div className="bg-gradient-cream px-8 pt-8 pb-4">
          <div className="flex items-center gap-2">
            {STEPS.map((label, i) => (
              <div key={label} className="flex flex-1 items-center gap-2">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-smooth ${
                  i < step ? "bg-accent text-accent-foreground" : i === step ? "bg-gradient-sunset text-primary-foreground shadow-soft" : "bg-muted text-muted-foreground"
                }`}>
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                {i < STEPS.length - 1 && <div className={`h-0.5 flex-1 rounded-full ${i < step ? "bg-accent" : "bg-muted"}`} />}
              </div>
            ))}
          </div>
          <p className="mt-3 font-display text-xl font-bold text-foreground">{STEPS[step]}</p>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-8 py-6">
          {step === 0 && (
            <div className="space-y-3">
              {PACKAGES.map((p) => {
                const Icon = p.icon;
                const selected = p.id === packageId;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPackageId(p.id)}
                    className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-smooth ${
                      selected ? "border-primary bg-primary/5 shadow-soft" : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${p.accent} text-primary-foreground`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-display text-lg font-bold text-foreground">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{p.tagline}</p>
                    </div>
                    <p className="font-display text-xl font-bold text-foreground">€{p.monthlyPrice}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                  </button>
                );
              })}
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {PERIODS.map((p) => {
                const selected = p.months === period;
                const price = calculatePrice(pkg.monthlyPrice, p.months);
                return (
                  <button
                    key={p.months}
                    onClick={() => setPeriod(p.months)}
                    className={`relative rounded-2xl border-2 p-5 text-left transition-smooth ${
                      selected ? "border-primary bg-primary/5 shadow-soft" : "border-border hover:border-primary/40"
                    }`}
                  >
                    {p.discount > 0 && (
                      <span className="absolute right-3 top-3 rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">
                        -{Math.round(p.discount * 100)}%
                      </span>
                    )}
                    <p className="font-display text-lg font-bold text-foreground">{p.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">€{price.perMonth}/month</p>
                    <p className="mt-3 font-display text-2xl font-bold text-primary">€{price.total}</p>
                    <p className="text-xs text-muted-foreground">total</p>
                  </button>
                );
              })}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-muted p-4 text-sm">
                <p className="font-bold text-foreground">{pkg.name} · {period} months</p>
                <p className="text-muted-foreground">€{pricing.perMonth}/month · €{pricing.total} total{pricing.saved > 0 && ` · save €${pricing.saved}`}</p>
              </div>
              {([
                { id: "fullName", label: "Full name", type: "text", placeholder: "Mei Tanaka" },
                { id: "email", label: "Email", type: "email", placeholder: "you@university.edu" },
                { id: "university", label: "University", type: "text", placeholder: "TU Delft" },
                { id: "address", label: "Delivery address", type: "text", placeholder: "Mekelweg 5, Delft" },
                { id: "moveInDate", label: "Move-in date", type: "date", placeholder: "" },
              ] as const).map((field) => (
                <div key={field.id} className="space-y-1.5">
                  <Label htmlFor={field.id}>{field.label}</Label>
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={details[field.id]}
                    onChange={(e) => setDetails({ ...details, [field.id]: e.target.value })}
                    maxLength={field.id === "address" ? 200 : 120}
                    className="h-11 rounded-xl"
                  />
                  {errors[field.id] && <p className="text-xs text-destructive">{errors[field.id]}</p>}
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="py-6 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-sunset text-primary-foreground shadow-warm animate-float">
                <PartyPopper className="h-10 w-10" />
              </div>
              <h3 className="mt-6 font-display text-3xl font-bold text-foreground">You're all set!</h3>
              <p className="mt-2 text-muted-foreground">
                Booking <span className="font-mono font-bold text-foreground">{confirmationId}</span> — confirmation sent to{" "}
                <span className="font-bold text-foreground">{details.email}</span>.
              </p>
              <div className="mt-6 inline-block rounded-2xl bg-muted px-6 py-4 text-left text-sm">
                <p><span className="text-muted-foreground">Package:</span> <span className="font-bold">{pkg.name}</span></p>
                <p><span className="text-muted-foreground">Period:</span> <span className="font-bold">{period} months</span></p>
                <p><span className="text-muted-foreground">Move-in:</span> <span className="font-bold">{details.moveInDate}</span></p>
                <p className="mt-2 border-t border-border pt-2"><span className="text-muted-foreground">Total:</span> <span className="font-display text-lg font-bold text-primary">€{pricing.total}</span></p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-border bg-card px-8 py-5">
          {step < 3 ? (
            <>
              <Button
                variant="ghost"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              {step < 2 ? (
                <Button variant="hero" onClick={() => setStep((s) => s + 1)}>
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="hero" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</> : <>Confirm booking <Check className="h-4 w-4" /></>}
                </Button>
              )}
            </>
          ) : (
            <Button variant="hero" className="ml-auto" onClick={() => onOpenChange(false)}>
              Done
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;