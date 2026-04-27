import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/legal/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — Globo Traveller" }] }),
  component: () => (
    <LegalPage
      title="Privacy Policy"
      updated="April 2026"
      sections={[
        { h: "Data we collect", p: "Name, contact details, ID proof for permits, and payment information processed via PCI-compliant gateways." },
        { h: "How we use it", p: "Strictly for trip operations, safety, and communication. We never sell your data." },
        { h: "Photos & media", p: "Photos taken during trips may be shared on our channels. Email hello@globotraveller.in to opt out." },
        { h: "Your rights", p: "You can request data export or deletion any time at hello@globotraveller.in." },
      ]}
    />
  ),
});
