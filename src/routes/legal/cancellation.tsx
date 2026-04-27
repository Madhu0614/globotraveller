import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/legal/cancellation")({
  head: () => ({ meta: [{ title: "Cancellation & Refund Policy — Globo Traveller" }] }),
  component: () => (
    <LegalPage
      title="Cancellation & Refund Policy"
      updated="April 2026"
      sections={[
        { h: "21+ days before departure", p: "100% refund minus a flat ₹500 processing fee." },
        { h: "8–20 days before departure", p: "50% refund or 100% credit note valid 12 months." },
        { h: "0–7 days before departure", p: "No cash refund. 50% credit note valid 12 months." },
        { h: "If we cancel", p: "If Globo Traveller cancels (e.g., for safety), travellers receive 100% refund or free reschedule." },
        { h: "Refund timeline", p: "Approved refunds are processed within 7 business days to the original payment method." },
      ]}
    />
  ),
});
