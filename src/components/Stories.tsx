import { Quote } from "lucide-react";

const STORIES = [
  {
    quote:
      "Arriving in Leuven without having to buy a duvet, pots and pans on day one made the whole move so much calmer.",
    name: "Amélie",
    detail: "Erasmus student · KU Leuven",
  },
  {
    quote:
      "Renting for one semester was far cheaper than buying everything, and I didn't have to figure out what to do with it all when I left.",
    name: "Mateo",
    detail: "Exchange student · ULB Brussels",
  },
  {
    quote:
      "I liked knowing my kit would be reused by another student instead of ending up in the trash at the end of the year.",
    name: "Sara",
    detail: "Master's student · UGent",
  },
];

const Stories = () => (
  <section id="stories" className="py-24 bg-background">
    <div className="container mx-auto">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Student stories</p>
        <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl">
          Real experiences from students in Antwerp
        </h2>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {STORIES.map((s) => (
          <figure key={s.name} className="rounded-2xl border border-border bg-card p-8 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-warm">
            <Quote className="h-8 w-8 text-primary/40" />
            <blockquote className="mt-4 font-body text-base leading-relaxed text-foreground">"{s.quote}"</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-sunset font-body text-base font-bold text-primary-foreground">
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