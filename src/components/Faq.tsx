import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  { q: "When and where do you deliver?", a: "We deliver to 40+ university cities across Europe. Pick your move-in date at checkout and we'll have everything waiting in your room." },
  { q: "Is everything cleaned and sanitized?", a: "Yes — all textiles are professionally laundered and kitchenware is industrially sanitized between rentals. You can also choose our 'sealed-new' option at checkout." },
  { q: "What if something breaks?", a: "Normal wear is on us. For accidental damage, we have a small flat repair fee. No deposits, no hidden charges." },
  { q: "Can I extend or cut my rental short?", a: "Absolutely. Extend with one click in your dashboard, or end early with a 14-day notice." },
  { q: "How do you handle pickup at the end?", a: "Just leave the boxes by your door. We'll pick them up on the date you set — no laundry, no goodbyes to your duvet." },
];

const Faq = () => (
  <section id="faq" className="py-24 bg-gradient-cream">
    <div className="container mx-auto max-w-3xl">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">FAQ</p>
        <h2 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">Everything you wanted to ask</h2>
      </div>

      <Accordion type="single" collapsible className="mt-12 space-y-3">
        {FAQS.map((f, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="rounded-2xl border border-border bg-card px-6 shadow-card"
          >
            <AccordionTrigger className="text-left font-display text-lg font-semibold hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default Faq;