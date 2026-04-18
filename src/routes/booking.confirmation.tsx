import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Calendar, Users, MessageCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTrip } from "@/lib/trips";

export const Route = createFileRoute("/booking/confirmation")({
  validateSearch: (s: Record<string, unknown>) => ({
    trip: typeof s.trip === "string" ? s.trip : undefined,
    date: typeof s.date === "string" ? s.date : undefined,
    travellers: typeof s.travellers === "number" ? s.travellers : 1,
    total: typeof s.total === "number" ? s.total : 0,
  }),
  head: () => ({ meta: [{ title: "Booking confirmed — Globo Traveller" }] }),
  component: ConfirmationPage,
});

function ConfirmationPage() {
  const { trip: tripSlug, date, travellers, total } = Route.useSearch();
  const trip = tripSlug ? getTrip(tripSlug) : undefined;
  const ref = "GT-" + Math.random().toString(36).slice(2, 8).toUpperCase();

  return (
    <div className="bg-gradient-to-b from-primary-soft/50 to-background">
      <div className="mx-auto max-w-2xl px-4 py-16 md:px-8 md:py-24">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-brand md:p-10">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <h1 className="mt-5 font-display text-3xl font-extrabold">You're going! 🎉</h1>
          <p className="mt-2 text-muted-foreground">
            Your booking is confirmed. We've sent the details to your inbox and our trip captain will WhatsApp you within 24 hours.
          </p>

          <dl className="mt-6 grid gap-3 rounded-2xl border border-border bg-secondary/40 p-4 sm:grid-cols-2">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Booking ID</dt>
              <dd className="font-display text-base font-bold">{ref}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Trip</dt>
              <dd className="font-display text-base font-bold">{trip?.title ?? "Your trip"}</dd>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{date ?? "TBA"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{travellers} traveller{travellers > 1 ? "s" : ""}</span>
            </div>
            <div className="sm:col-span-2 mt-1 flex items-center justify-between border-t border-border pt-3">
              <span className="text-sm font-semibold">Amount paid</span>
              <span className="font-display text-lg font-extrabold">₹{total.toLocaleString("en-IN")}</span>
            </div>
          </dl>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a
              href="https://wa.me/919999999999"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--whatsapp)] px-4 py-3 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" /> Chat with trip captain
            </a>
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-sm font-semibold">
              <Download className="h-4 w-4" /> Download voucher
            </button>
          </div>

          <Button asChild variant="ghost" className="mt-4 w-full rounded-full">
            <Link to="/trips">Browse more trips</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
