import { Package, Sparkles } from "lucide-react";
import kitEssentialImg from "@/assets/kit-essential.jpg";
import kitComfortImg from "@/assets/kit-comfort.jpg";

export type PackageId = "essential" | "comfort";
export type Period = 1 | 3 | 6 | 12;

export interface KitCategory {
  label: string;
  items: string[];
}

export interface RentalPackage {
  id: PackageId;
  name: string;
  tagline: string;
  description: string;
  monthlyPrice: number;
  deposit: number;
  icon: typeof Package;
  accent: string;
  image: string;
  categories: KitCategory[];
  highlight?: string;
}

export const PACKAGES: RentalPackage[] = [
  {
    id: "essential",
    name: "Essential Kit",
    tagline: "Everything you need to settle in",
    description: "A thoughtfully curated kit covering your bedroom and kitchen basics — quality essentials for your first weeks in Antwerp.",
    monthlyPrice: 20,
    deposit: 60,
    icon: Package,
    accent: "from-[hsl(258_90%_85%)] to-[hsl(258_85%_75%)]",
    image: kitEssentialImg,
    categories: [
      {
        label: "Bedroom",
        items: [
          "Pillow",
          "Blanket",
          "Bedsheet set",
          "Pillowcase",
        ],
      },
      {
        label: "Kitchen",
        items: [
          "2 big plates",
          "2 bowls",
          "2 mugs",
          "2 glasses",
          "2 forks",
          "2 knives",
          "2 tablespoons",
          "2 teaspoons",
          "1 frying pan",
          "1 pot",
          "1 spatula",
        ],
      },
    ],
  },
  {
    id: "comfort",
    name: "Comfort Kit",
    tagline: "Most chosen by international students",
    description: "Includes everything from the Essential Kit, plus extra comfort items to truly feel at home during your stay.",
    monthlyPrice: 30,
    deposit: 100,
    icon: Sparkles,
    accent: "from-[hsl(268_90%_78%)] to-[hsl(258_95%_70%)]",
    highlight: "Most chosen",
    image: kitComfortImg,
    categories: [
      {
        label: "Bedroom",
        items: [
          "Pillow",
          "Blanket",
          "Bedsheet set",
          "Pillowcase",
          "Mattress protector",
          "Extra bedsheet set",
          "Bedside lamp",
          "10 hangers",
        ],
      },
      {
        label: "Kitchen",
        items: [
          "2 big plates",
          "2 bowls",
          "2 mugs",
          "2 glasses",
          "2 forks",
          "2 knives",
          "2 tablespoons",
          "2 teaspoons",
          "1 frying pan",
          "1 pot",
          "1 spatula",
          "Food containers",
          "Cutting board",
          "Kitchen knife",
          "Salad bowl",
          "Full pot set: small, medium, and large",
        ],
      },
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
