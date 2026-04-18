import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Star,
  MapPin,
  Clock,
  Users,
  Mountain,
  Calendar,
  Check,
  X,
  MessageCircle,
  Download,
  Bus,
  Hotel,
  Utensils,
  Compass,
} from "lucide-react";
import { getTrip, faqs, type Trip } from "@/lib/trips";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/trips/$slug")({
  loader: ({ params }): { trip: Trip } => {
    const trip = getTrip(params.slug);
    if (!trip) throw notFound();
    return { trip };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.trip.title} — Globo Traveller` },
          { name: "description", content: loaderData.trip.tagline },
          { property: "og:title", content: loaderData.trip.title },
          { property: "og:description", content: loaderData.trip.tagline },
          { property: "og:image", content: loaderData.trip.image },
          { name: "twitter:image", content: loaderData.trip.image },
        ]
      : [],
  }),
  component: TripDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="font-display text-2xl font-bold">Trip not found</h1>
      <p className="mt-2 text-muted-foreground">This trip may have ended or been moved.</p>
      <Button asChild className="mt-6 rounded-full">
        <Link to="/trips">Browse all trips</Link>
      </Button>
    </div>
  ),
});

function TripDetail() {
  const { trip } = Route.useLoaderData() as { trip: Trip };

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[44vh] min-h-[320px] w-full overflow-hidden md:h-[58vh]">
          <img src={trip.image} alt={trip.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/20" />
        </div>
        <div className="mx-auto -mt-24 max-w-7xl px-4 md:-mt-28 md:px-8">
          <div className="rounded-3xl border border-border bg-card p-5 shadow-brand md:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                {trip.category}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {trip.location}, {trip.country}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold">
                <Star className="h-3.5 w-3.5 fill-warm text-warm" /> {trip.rating}{" "}
                <span className="text-muted-foreground">({trip.reviews} reviews)</span>
              </span>
            </div>
            <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">{trip.title}</h1>
            <p className="mt-1 text-muted-foreground">{trip.tagline}</p>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Fact icon={Clock} label="Duration" value={`${trip.durationDays}D / ${trip.durationNights}N`} />
              <Fact icon={Users} label="Group size" value={trip.groupSize} />
              <Fact icon={Mountain} label="Difficulty" value={trip.difficulty} />
              <Fact icon={Calendar} label="Next departure" value={trip.departures[0]?.date ?? "TBA"} />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-10 grid max-w-7xl gap-8 px-4 pb-32 md:px-8 lg:grid-cols-[1fr_360px] lg:pb-16">
        <div className="space-y-10">
          <Section title="About this trip">
            <p className="text-foreground/85">{trip.description}</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {trip.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 text-primary" />
                  {h}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Fixed departures">
            <div className="grid gap-3 sm:grid-cols-2">
              {trip.departures.map((d) => (
                <div
                  key={d.date}
                  className="flex items-center justify-between rounded-2xl border border-border bg-card p-4"
                >
                  <div>
                    <p className="font-display font-bold">{d.date}</p>
                    <p className="text-xs text-muted-foreground">{d.spotsLeft} spots left</p>
                  </div>
                  <Button asChild size="sm" className="rounded-full">
                    <Link to="/booking/$slug" params={{ slug: trip.slug }} search={{ date: d.date } as never}>
                      Book
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Day-wise itinerary">
            <ol className="space-y-3">
              {trip.itinerary.map((day) => (
                <li key={day.day} className="rounded-2xl border border-border bg-card p-4">
                  <div className="flex items-start gap-3">
                    <span className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-gradient-brand text-sm font-bold text-primary-foreground">
                      D{day.day}
                    </span>
                    <div>
                      <p className="font-display font-bold">{day.title}</p>
                      <p className="text-sm text-muted-foreground">{day.details}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          <div className="grid gap-6 md:grid-cols-2">
            <Section title="What's included">
              <ul className="space-y-2">
                {trip.inclusions.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 text-success" /> {i}
                  </li>
                ))}
              </ul>
            </Section>
            <Section title="Not included">
              <ul className="space-y-2">
                {trip.exclusions.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <X className="mt-0.5 h-4 w-4 text-destructive/70" /> {i}
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          <Section title="Stay, transport & meals">
            <div className="grid gap-3 sm:grid-cols-3">
              <InfoTile icon={Hotel} title="Stay" text="Curated boutique stays & camps" />
              <InfoTile icon={Bus} title="Transport" text="Tempo travellers & SUVs" />
              <InfoTile icon={Utensils} title="Meals" text="Daily breakfast & dinner" />
            </div>
          </Section>

          <Section title="Pickup & drop">
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoTile icon={Compass} title="Pickup" text={trip.pickup} />
              <InfoTile icon={Compass} title="Drop" text={trip.drop} />
            </div>
          </Section>

          <Section title="Gallery">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {trip.gallery.map((src, i) => (
                <img key={i} src={src} alt="" loading="lazy" className="aspect-square w-full rounded-2xl object-cover" />
              ))}
            </div>
          </Section>

          <Section title="FAQ">
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.slice(0, 4).map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`f-${i}`}
                  className="overflow-hidden rounded-2xl border border-border bg-card px-4"
                >
                  <AccordionTrigger className="py-3 text-left text-sm font-semibold hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 text-sm text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Section>
        </div>

        {/* Sticky booking card — desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-baseline gap-2">
              {trip.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{trip.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
              <span className="font-display text-3xl font-extrabold">₹{trip.price.toLocaleString("en-IN")}</span>
              <span className="text-xs text-muted-foreground">/ person</span>
            </div>
            {trip.originalPrice && (
              <p className="mt-1 text-xs font-semibold text-success">
                Save ₹{(trip.originalPrice - trip.price).toLocaleString("en-IN")} this season
              </p>
            )}

            <div className="mt-4 space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Pick a departure</p>
              {trip.departures.map((d) => (
                <Link
                  key={d.date}
                  to="/booking/$slug"
                  params={{ slug: trip.slug }}
                  search={{ date: d.date } as never}
                  className="flex items-center justify-between rounded-xl border border-border bg-background px-3 py-2.5 text-sm transition hover:border-primary"
                >
                  <span className="font-medium">{d.date}</span>
                  <span className="text-xs text-muted-foreground">{d.spotsLeft} left</span>
                </Link>
              ))}
            </div>

            <Button asChild size="lg" className="mt-5 w-full rounded-full">
              <Link to="/booking/$slug" params={{ slug: trip.slug }}>Book Now</Link>
            </Button>
            <a
              href="https://wa.me/919999999999"
              className="mt-2 flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold hover:border-[var(--whatsapp)] hover:text-[var(--whatsapp)]"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
            <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary/80">
              <Download className="h-4 w-4" /> Download Itinerary
            </button>

            <p className="mt-4 text-center text-[11px] text-muted-foreground">
              ✓ Free cancellation up to 21 days · ✓ Secure payments
            </p>
          </div>
        </aside>
      </div>

      {/* Sticky bottom bar — mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card p-3 shadow-brand lg:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <div className="flex-1">
            <p className="text-[10px] uppercase text-muted-foreground">From</p>
            <p className="font-display text-lg font-extrabold leading-tight">
              ₹{trip.price.toLocaleString("en-IN")}
            </p>
          </div>
          <a
            href="https://wa.me/919999999999"
            className="grid h-11 w-11 place-items-center rounded-full bg-[var(--whatsapp)] text-white"
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
          <Button asChild size="lg" className="flex-1 rounded-full">
            <Link to="/booking/$slug" params={{ slug: trip.slug }}>Book Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 font-display text-xl font-extrabold">{title}</h2>
      {children}
    </section>
  );
}

function Fact({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-3">
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-primary" />
        {label}
      </div>
      <p className="mt-1 font-display text-sm font-bold">{value}</p>
    </div>
  );
}

function InfoTile({ icon: Icon, title, text }: { icon: typeof Clock; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <p className="mt-2 font-display text-sm font-bold">{title}</p>
      <p className="text-xs text-muted-foreground">{text}</p>
    </div>
  );
}
