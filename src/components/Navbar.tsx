import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
      <nav className="container mx-auto flex items-center justify-between py-4">
        <button
          onClick={() => scrollTo("top")}
          className="flex items-center gap-2 font-display text-2xl font-bold text-foreground"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-sunset text-primary-foreground shadow-soft">
            <Home className="h-5 w-5" />
          </span>
          NestKit
        </button>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <button onClick={() => scrollTo("how")} className="hover:text-foreground transition-smooth">How it works</button>
          <button onClick={() => scrollTo("packages")} className="hover:text-foreground transition-smooth">Packages</button>
          <button onClick={() => scrollTo("stories")} className="hover:text-foreground transition-smooth">Stories</button>
          <button onClick={() => scrollTo("faq")} className="hover:text-foreground transition-smooth">FAQ</button>
        </div>
        <Button variant="hero" size="sm" onClick={() => scrollTo("packages")}>
          Book now
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;