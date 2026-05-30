import { Button } from "@/components/ui/button";
import { GraduationCap, Truck, Leaf, ShieldCheck } from "lucide-react";
import heroImage from "@/assets/hero-student.jpg";

const Hero = () => {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-gradient-warm pb-28 pt-20 md:pt-28 lg:pt-32">
      {/* subtle background accents — kept behind content */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 -z-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-40 -z-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="container relative z-10 mx-auto grid items-center gap-12 lg:grid-cols-2">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary shadow-soft">
            <GraduationCap className="h-4 w-4" /> For Erasmus & international students in Antwerp
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] text-foreground md:text-6xl lg:text-7xl">
            A stress-free start to your life in Antwerp.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
            Rent a complete kit of bedding, kitchen and home essentials — delivered to your room on arrival, picked up when you leave. Affordable, sustainable, and built for temporary stays.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="hero" size="xl" onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })}>
              Browse kits
            </Button>
            <Button variant="soft" size="xl" onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}>
              How it works
            </Button>
          </div>

          <ul className="mt-10 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
            <li className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Delivery & pickup included</li>
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Fully refundable deposit</li>
            <li className="flex items-center gap-2"><Leaf className="h-4 w-4 text-primary" /> Reused, not thrown away</li>
          </ul>
        </div>

        <div className="relative animate-fade-up [animation-delay:200ms]">
          <div className="absolute inset-0 -rotate-3 rounded-[2rem] bg-gradient-sunset opacity-25 blur-2xl" />
          <img
            src={heroImage}
            alt="International student unpacking a Survival Kit rental in a Belgian student room"
            width={1536}
            height={1280}
            className="relative rounded-[2rem] border border-primary/20 bg-card shadow-warm"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;