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
    name: "Starter",
    tagline: "The cozy basics",
    description: "Everything you need for a comfy first night — bedding, towels, and the essentials.",
    monthlyPrice: 39,
    icon: Package,
    accent: "from-[hsl(36_85%_70%)] to-[hsl(28_85%_60%)]",
    includes: [
      "Pillow, duvet & duvet cover",
      "Fitted sheet & 2 towels",
      "Mug, plate, bowl & cutlery set",
      "Basic cleaning kit",
      "Door-to-door delivery",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    tagline: "Most popular",
    description: "Everything in Starter, plus a full kitchen kit and study setup to feel at home from day one.",
    monthlyPrice: 69,
    icon: Sparkles,
    accent: "from-[hsl(14_75%_60%)] to-[hsl(8_75%_50%)]",
    highlight: "Most loved",
    includes: [
      "All Starter items",
      "Full kitchen kit (pots, pans, knives)",
      "Kettle, toaster & utensil set",
      "Desk lamp & study organizer",
      "Laundry basket & hangers",
      "Free swap once per period",
    ],
  },
  {
    id: "deluxe",
    name: "Deluxe",
    tagline: "Move-in ready luxury",
    description: "A fully furnished feel — premium textiles, smart appliances, and the little touches that turn a room into a home.",
    monthlyPrice: 109,
    icon: Crown,
    accent: "from-[hsl(130_30%_55%)] to-[hsl(150_30%_45%)]",
    includes: [
      "All Standard items",
      "Premium hotel-grade bedding",
      "Coffee machine & blender",
      "Bluetooth speaker & smart lamp",
      "Decorative plants & throws",
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