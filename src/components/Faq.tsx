import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Where in Belgium do you deliver?",
    a: "We deliver to student housing and private apartments across Belgian university cities including Brussels, Leuven, Ghent, Antwerp, Liège and Louvain-la-Neuve. Just enter your address at checkout.",
  },
  {
    q: "How does the refundable deposit work?",
    a: "You pay a small deposit when booking. When you return the kit in good condition, the full deposit is refunded to your account — no hidden fees.",
  },
  {
    q: "Is everything cleaned between rentals?",
    a: "Yes. All textiles are professionally laundered and kitchenware is thoroughly cleaned and checked before each new rental.",
  },
  {
    q: "What if something gets damaged?",
    a: "Normal wear is on us. For accidental damage we charge a small, transparent fee per item — clearly listed before you book.",
  },
  {
    q: "Can I extend or shorten my rental?",
    a: "Yes. You can extend your rental at any time from your account, or end it early with two weeks' notice.",
  },
  {
    q: "How do pickup and return work?",
    a: "On your end date we collect everything from your door. No need to launder, repack or sell anything yourself.",
  },
];

const Faq = () => (
  <section id="faq" className="py-24 bg-gradient-cream">
    <div className="container mx-auto max-w-3xl">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">FAQ</p>
        <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl">Questions students ask us</h2>
      </div>

      <Accordion type="single" collapsible className="mt-12 space-y-3">
        {FAQS.map((f, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="rounded-2xl border border-border bg-card px-6 shadow-card"
          >
            <AccordionTrigger className="text-left font-body text-base font-semibold hover:no-underline">
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