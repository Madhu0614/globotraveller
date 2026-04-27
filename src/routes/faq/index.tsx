import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/lib/trips";

export const Route = createFileRoute("/faq/")({
  head: () => ({ meta: [{ title: "FAQ — Globo Traveller" }] }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-8 md:py-20">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">Help centre</p>
      <h1 className="mt-1 font-display text-4xl font-extrabold">Frequently asked questions</h1>
      <Accordion type="single" collapsible className="mt-8 space-y-3">
        {[...faqs, ...faqs].map((f, i) => (
          <AccordionItem key={i} value={`f-${i}`} className="overflow-hidden rounded-2xl border border-border bg-card px-5">
            <AccordionTrigger className="py-4 text-left font-display text-base font-bold hover:no-underline">{f.q}</AccordionTrigger>
            <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
