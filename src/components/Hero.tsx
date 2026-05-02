import { Button } from "@/components/ui/button";
import { Sparkles, Truck, Globe2 } from "lucide-react";
import heroImage from "@/assets/hero-student.jpg";

const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-warm pb-24 pt-16 md:pt-24">
      {/* floating blobs */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />

      <div className="container relative mx-auto grid items-center gap-12 lg:grid-cols-2">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-card/80 px-4 py-1.5 text-sm font-semibold text-primary shadow-soft">
            <Sparkles className="h-4 w-4" /> For international students
          </span>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] text-foreground md:text-6xl lg:text-7xl">
            Move in light.{" "}
            <span className="bg-gradient-sunset bg-clip-text text-transparent">Feel at home</span> on day one.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
            Skip the suitcase tetris. Rent a curated kit of bedding, kitchen, and home essentials — delivered to your dorm or flat the day you arrive.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="hero" size="xl" onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })}>
              Choose your package
            </Button>
            <Button variant="soft" size="xl" onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}>
              How it works
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Free delivery</span>
            <span className="flex items-center gap-2"><Globe2 className="h-4 w-4 text-primary" /> 40+ universities</span>
            <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Sanitized & ready</span>
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:200ms]">
          <div className="absolute inset-0 -rotate-3 rounded-[2.5rem] bg-gradient-sunset opacity-20 blur-2xl" />
          <img
            src={heroImage}
            alt="International students unpacking their NestKit rental boxes in a cozy apartment"
            width={1536}
            height={1280}
            className="relative rounded-[2.5rem] shadow-warm"
          />
          <div className="absolute -bottom-6 -left-6 hidden md:flex items-center gap-3 rounded-2xl bg-card px-5 py-4 shadow-card animate-float">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">12,000+ students</p>
              <p className="text-xs text-muted-foreground">moved in stress-free</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;