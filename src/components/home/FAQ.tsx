import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/lib/trips";

export function FAQ() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 md:px-8 md:py-20">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Got questions?</p>
        <h2 className="mt-1 font-display text-3xl font-extrabold sm:text-4xl">Frequently asked</h2>
      </div>
      <Accordion type="single" collapsible className="mt-8 space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="overflow-hidden rounded-2xl border border-border bg-card px-5 shadow-soft data-[state=open]:shadow-card"
          >
            <AccordionTrigger className="py-4 text-left font-display text-base font-bold hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
