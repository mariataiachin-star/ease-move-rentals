import { Quote } from "lucide-react";

const STORIES = [
  {
    quote: "I landed in Berlin at 11pm and my room was already set up. I literally cried (good tears).",
    name: "Amara",
    detail: "From Lagos · Studying in Berlin",
    color: "from-[hsl(36_85%_70%)] to-[hsl(28_85%_60%)]",
  },
  {
    quote: "Way cheaper than buying everything new. And I didn't have to sell anything when I left.",
    name: "Hiroshi",
    detail: "From Tokyo · Studying in Amsterdam",
    color: "from-[hsl(14_75%_60%)] to-[hsl(8_75%_50%)]",
  },
  {
    quote: "The Deluxe kit made my tiny studio feel like a real apartment. The plants were a sweet touch.",
    name: "Sofia",
    detail: "From São Paulo · Studying in Lisbon",
    color: "from-[hsl(130_30%_55%)] to-[hsl(150_30%_45%)]",
  },
];

const Stories = () => (
  <section id="stories" className="py-24 bg-background">
    <div className="container mx-auto">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">Student stories</p>
        <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">
          A softer landing, in their own words
        </h2>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {STORIES.map((s) => (
          <figure key={s.name} className="rounded-3xl border border-border bg-card p-8 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-warm">
            <Quote className="h-8 w-8 text-primary/40" />
            <blockquote className="mt-4 font-display text-xl leading-snug text-foreground">"{s.quote}"</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${s.color} font-display text-lg font-bold text-primary-foreground`}>
                {s.name[0]}
              </span>
              <div>
                <p className="font-bold text-foreground">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.detail}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default Stories;