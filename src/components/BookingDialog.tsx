import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Check, Loader2, PartyPopper } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PACKAGES, PERIODS, PackageId, Period, calculatePrice } from "@/data/packages";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const DELIVERY_FEE = 4;

const detailsSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().min(6, "Phone number is required").max(30),
  address: z.string().trim().min(5, "Delivery address required").max(200),
  startDate: z.string().min(1, "Pick a start date"),
});
type Details = z.infer<typeof detailsSchema>;

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initialPackage?: PackageId;
}

const addMonths = (iso: string, months: number) => {
  if (!iso) return "";
  const d = new Date(iso);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
};

const BookingDialog = ({ open, onOpenChange, initialPackage }: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [packageId, setPackageId] = useState<PackageId>(initialPackage ?? "comfort");
  const [period, setPeriod] = useState<Period>(6);
  const [details, setDetails] = useState<Details>({ fullName: "", email: "", phone: "", address: "", startDate: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Details, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmationId, setConfirmationId] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setStep(initialPackage ? 1 : 0);
      setPackageId(initialPackage ?? "comfort");
      setPeriod(6);
      setErrors({});
      setConfirmationId(null);
      // Prefill from logged-in user
      if (user) {
        supabase.from("profiles").select("full_name, email, phone").eq("id", user.id).maybeSingle().then(({ data }) => {
          if (data) {
            setDetails((d) => ({
              ...d,
              fullName: data.full_name ?? "",
              email: data.email ?? user.email ?? "",
              phone: data.phone ?? "",
            }));
          }
        });
      }
    }
  }, [open, initialPackage, user]);

  const pkg = PACKAGES.find((p) => p.id === packageId)!;
  const pricing = useMemo(() => calculatePrice(pkg.monthlyPrice, period), [pkg, period]);
  const endDate = useMemo(() => addMonths(details.startDate, period), [details.startDate, period]);
  const dueToday = pricing.total + pkg.deposit + DELIVERY_FEE;

  const handleSubmit = async () => {
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
    if (!user) {
      toast.info("Please log in or create an account to complete your order.");
      onOpenChange(false);
      navigate("/auth");
      return;
    }
    setSubmitting(true);
    const { data, error } = await supabase.from("orders").insert({
      user_id: user.id,
      kit_id: pkg.id,
      kit_name: pkg.name,
      period_months: period,
      start_date: details.startDate,
      end_date: endDate,
      full_name: details.fullName,
      email: details.email,
      phone: details.phone,
      delivery_address: details.address,
      price_total: pricing.total + DELIVERY_FEE,
      deposit: pkg.deposit,
      status: "Active",
    }).select("id").single();
    setSubmitting(false);
    if (error) { toast.error(error.message); return; }
    setConfirmationId(data.id.slice(0, 8).toUpperCase());
    setStep(3);
    toast.success("Order confirmed!");
  };

  const STEPS = ["Package", "Period", "Your details", "Confirmed"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-3xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">Book your Survival Kit rental</DialogTitle>
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
                    <div className="text-right">
                      <p className="font-display text-xl font-bold text-foreground">€{p.monthlyPrice}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                      <p className="text-xs text-muted-foreground">Deposit €{p.deposit}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-2xl bg-muted px-4 py-3 text-sm">
                <div>
                  <p className="font-bold text-foreground">{pkg.name}</p>
                  <p className="text-muted-foreground">€{pkg.monthlyPrice}/month · Deposit €{pkg.deposit}</p>
                </div>
                <button
                  onClick={() => setStep(0)}
                  className="text-xs font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Change kit
                </button>
              </div>
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
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-muted p-4 text-sm space-y-2">
                <p className="font-bold text-foreground">{pkg.name} · {period} months</p>
                <div className="space-y-1 text-muted-foreground">
                  <div className="flex justify-between"><span>Kit rental ({period} months @ €{pricing.perMonth}/mo)</span><span className="text-foreground">€{pricing.total}</span></div>
                  <div className="flex justify-between"><span>Refundable deposit</span><span className="text-foreground">€{pkg.deposit}</span></div>
                  <div className="flex justify-between"><span>Delivery fee</span><span className="text-foreground">€{DELIVERY_FEE}</span></div>
                  {pricing.saved > 0 && <div className="flex justify-between text-accent"><span>You save</span><span>€{pricing.saved}</span></div>}
                </div>
                <div className="flex justify-between border-t border-border pt-2 font-display text-base font-bold text-foreground">
                  <span>Total due today</span><span className="text-primary">€{dueToday}</span>
                </div>
              </div>
              {!user && (
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs text-foreground">
                  You'll be asked to log in or create an account to confirm.
                </div>
              )}
              {([
                { id: "fullName", label: "Full name", type: "text", placeholder: "Mei Tanaka", required: true },
                { id: "email", label: "Email", type: "email", placeholder: "you@university.edu", required: true },
                { id: "phone", label: "Phone number", type: "tel", placeholder: "+32 470 12 34 56", required: true },
                { id: "address", label: "Delivery address", type: "text", placeholder: "Stadscampus, Antwerp", required: true },
                { id: "startDate", label: "Rental start date", type: "date", placeholder: "", required: true },
              ] as const).map((field) => (
                <div key={field.id} className="space-y-1.5">
                  <Label htmlFor={field.id}>{field.label} <span className="text-destructive">*</span></Label>
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={details[field.id]}
                    onChange={(e) => setDetails({ ...details, [field.id]: e.target.value })}
                    maxLength={field.id === "address" ? 200 : 120}
                    className="h-11 rounded-xl"
                    required
                  />
                  {errors[field.id] && <p className="text-xs text-destructive">{errors[field.id]}</p>}
                </div>
              ))}
              <div className="space-y-1.5">
                <Label>Rental end date</Label>
                <Input value={endDate || ""} readOnly className="h-11 rounded-xl bg-muted" placeholder="Auto-calculated from start date + period" />
                <p className="text-xs text-muted-foreground">Calculated from your start date and {period}-month rental period.</p>
              </div>
              <div className="rounded-xl border border-dashed border-border bg-muted/40 p-3 text-xs text-muted-foreground">
                💳 Payment & deposit: handled securely on delivery (placeholder for prototype).
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="py-6 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-sunset text-primary-foreground shadow-warm animate-float">
                <PartyPopper className="h-10 w-10" />
              </div>
              <h3 className="mt-6 font-display text-3xl font-bold text-foreground">You&apos;re all set!</h3>
              <p className="mt-2 text-muted-foreground">
                Booking <span className="font-mono font-bold text-foreground">{confirmationId}</span> — confirmation sent to{" "}
                <span className="font-bold text-foreground">{details.email}</span>.
              </p>
              <div className="mt-6 inline-block rounded-2xl bg-muted px-6 py-4 text-left text-sm">
                <p><span className="text-muted-foreground">Package:</span> <span className="font-bold">{pkg.name}</span></p>
                <p><span className="text-muted-foreground">Period:</span> <span className="font-bold">{period} months</span></p>
                <p><span className="text-muted-foreground">Start:</span> <span className="font-bold">{details.startDate}</span></p>
                <p><span className="text-muted-foreground">End:</span> <span className="font-bold">{endDate}</span></p>
                <p><span className="text-muted-foreground">Kit rental:</span> <span className="font-bold">€{pricing.total}</span></p>
                <p><span className="text-muted-foreground">Deposit:</span> <span className="font-bold">€{pkg.deposit}</span></p>
                <p><span className="text-muted-foreground">Delivery fee:</span> <span className="font-bold">€{DELIVERY_FEE}</span></p>
                <p className="mt-2 border-t border-border pt-2"><span className="text-muted-foreground">Total due today:</span> <span className="font-display text-lg font-bold text-primary">€{dueToday}</span></p>
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
            <div className="ml-auto flex gap-3">
              <Button variant="soft" onClick={() => onOpenChange(false)}>
                Done
              </Button>
              <Button variant="hero" onClick={() => { onOpenChange(false); navigate("/account"); }}>
                View My Account
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
