import { Link } from "@tanstack/react-router";
import { Star, Calendar, Clock, MapPin } from "lucide-react";
import { getTripDetailHref, type Trip } from "@/lib/trips";
import { Button } from "@/components/ui/button";

export function TripCard({ trip }: { trip: Trip }) {
  const next = trip.departures[0];
  const tripHref = getTripDetailHref(trip.slug) ?? `/booking/${trip.slug}`;
  const ctaLabel = getTripDetailHref(trip.slug) ? "View" : "Book";

  return (
    <article className="group overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-brand">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={trip.image}
          alt={trip.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
            {trip.category}
          </span>
          {trip.originalPrice && (
            <span className="rounded-full bg-warm px-2.5 py-1 text-[10px] font-bold uppercase text-warm-foreground">
              Save ₹{(trip.originalPrice - trip.price).toLocaleString("en-IN")}
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div>
            <div className="flex items-center gap-1 text-[11px] font-medium text-white/80">
              <MapPin className="h-3 w-3" />
              {trip.location}
            </div>
            <h3 className="mt-1 line-clamp-1 font-display text-lg font-bold drop-shadow">{trip.title}</h3>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[11px] font-bold text-[#1a1a1a]">
            <Star className="h-3 w-3 fill-warm text-warm" />
            {trip.rating}
          </div>
        </div>
      </div>

      <div className="p-4">
        <p className="line-clamp-1 text-xs text-muted-foreground">{trip.tagline}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-primary" />
            {trip.durationDays}D / {trip.durationNights}N
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            Next: {next?.date.split(" ").slice(0, 2).join(" ")}
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              {trip.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  ₹{trip.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
              <span className="font-display text-xl font-extrabold text-[#1a1a1a]">
                ₹{trip.price.toLocaleString("en-IN")}
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">per person</span>
          </div>
          <Button asChild size="sm" className="rounded-full">
            <a href={tripHref}>{ctaLabel}</a>
          </Button>
        </div>
      </div>
    </article>
  );
}
