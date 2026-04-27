import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/legal/terms")({
  head: () => ({ meta: [{ title: "Terms & Conditions — Globo Traveller" }] }),
  component: () => (
    <LegalPage
      title="Terms & Conditions"
      updated="April 2026"
      sections={[
        { h: "Booking & confirmation", p: "Bookings are confirmed only on receipt of a 25% advance. Balance is due at least 14 days before departure." },
        { h: "Eligibility", p: "Travellers must be 18+. Minors travelling with guardians require explicit consent and a signed indemnity." },
        { h: "Code of conduct", p: "Globo Traveller reserves the right to remove travellers from a trip without refund for behaviour that compromises group safety or comfort." },
        { h: "Liability", p: "Globo Traveller acts as a coordinator and is not liable for circumstances beyond reasonable control (weather, strikes, government action)." },
      ]}
    />
  ),
});
