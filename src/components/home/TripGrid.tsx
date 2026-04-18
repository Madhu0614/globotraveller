import { Link } from "@tanstack/react-router";
import { TripCard } from "@/components/TripCard";
import { trips, type TripCategory } from "@/lib/trips";

interface TripGridProps {
  category?: TripCategory;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  limit?: number;
}

export function TripGrid({ category, title, subtitle, eyebrow, limit = 4 }: TripGridProps) {
  const filtered = (category ? trips.filter((t) => t.category === category) : trips).slice(0, limit);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
          )}
          <h2 className="mt-1 font-display text-2xl font-extrabold sm:text-3xl">{title}</h2>
          {subtitle && <p className="mt-2 max-w-xl text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <Link
          to="/trips"
          search={category ? ({ category } as never) : undefined}
          className="hidden text-sm font-semibold text-primary hover:underline sm:block"
        >
          See all →
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((t) => (
          <TripCard key={t.slug} trip={t} />
        ))}
      </div>
    </section>
  );
}
