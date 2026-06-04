import logoAsset from "@/assets/survival-kit-logo.png.asset.json";

interface Props {
  size?: number;
  className?: string;
  variant?: "default" | "onDark";
}

const BrandLogo = ({ size = 36, className = "", variant = "default" }: Props) => (
  <span
    className={`inline-flex items-center justify-center rounded-xl bg-background shadow-soft overflow-hidden ${variant === "onDark" ? "ring-1 ring-background/20" : ""} ${className}`}
    style={{ height: size, width: size }}
  >
    <img
      src={logoAsset.url}
      alt="Survival Kit logo"
      width={size}
      height={size}
      className="h-full w-full object-contain p-1"
      loading="eager"
    />
  </span>
);

export default BrandLogo;