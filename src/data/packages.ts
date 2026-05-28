import { Package, Sparkles, Crown } from "lucide-react";

export type PackageId = "starter" | "standard" | "deluxe";
export type Period = 1 | 3 | 6 | 12;

export interface RentalPackage {
  id: PackageId;
  name: string;
  tagline: string;
  description: string;
  monthlyPrice: number;
  icon: typeof Package;
  accent: string;
  includes: string[];
  highlight?: string;
}

export const PACKAGES: RentalPackage[] = [
  {
    id: "starter",
    name: "Essential Kit",
    tagline: "Settle in from night one",
    description: "The basics every student needs on arrival — quality bedding, towels and a starter kitchen set.",
    monthlyPrice: 35,
    icon: Package,
    accent: "from-[hsl(258_90%_85%)] to-[hsl(258_85%_75%)]",
    includes: [
      "Pillow, duvet & duvet cover",
      "Fitted sheet & 2 towels",
      "Mug, plate, bowl & cutlery set",
      "Essential cleaning kit",
      "Free delivery & pickup in Belgium",
    ],
  },
  {
    id: "standard",
    name: "Comfort Kit",
    tagline: "Most chosen by Erasmus students",
    description: "Everything in Essential, plus a complete kitchen and study setup to feel at home from day one.",
    monthlyPrice: 59,
    icon: Sparkles,
    accent: "from-[hsl(268_90%_78%)] to-[hsl(258_95%_70%)]",
    highlight: "Most chosen",
    includes: [
      "All Essential items",
      "Full kitchen kit (pots, pans, knives)",
      "Kettle, toaster & utensil set",
      "Desk lamp & study organizer",
      "Laundry basket & hangers",
      "Free swap once per period",
    ],
  },
  {
    id: "deluxe",
    name: "Premium Kit",
    tagline: "A fully furnished feel",
    description: "Premium textiles, kitchen appliances and finishing touches that turn a student room into a real home.",
    monthlyPrice: 95,
    icon: Crown,
    accent: "from-[hsl(248_70%_60%)] to-[hsl(268_85%_70%)]",
    includes: [
      "All Comfort items",
      "Premium hotel-grade bedding",
      "Coffee machine & blender",
      "Reading lamp & study chair pad",
      "Cushions, throws & decor accents",
      "Priority delivery & 24/7 support",
    ],
  },
];

export const PERIODS: { months: Period; label: string; discount: number }[] = [
  { months: 1, label: "1 month", discount: 0 },
  { months: 3, label: "3 months", discount: 0.05 },
  { months: 6, label: "6 months", discount: 0.12 },
  { months: 12, label: "12 months", discount: 0.2 },
];

export const calculatePrice = (monthlyPrice: number, months: Period): { total: number; perMonth: number; saved: number } => {
  const period = PERIODS.find((p) => p.months === months)!;
  const gross = monthlyPrice * months;
  const total = Math.round(gross * (1 - period.discount));
  const perMonth = Math.round(total / months);
  return { total, perMonth, saved: gross - total };
};