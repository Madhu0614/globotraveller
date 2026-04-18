import { Link } from "@tanstack/react-router";
import { Mountain, Plane, Tent, Waves, MapPinned, Backpack } from "lucide-react";

const cats = [
  { slug: "weekend", label: "Weekend Getaways", icon: MapPinned, hue: "from-sky/30 to-primary-soft" },
  { slug: "backpacking", label: "Backpacking", icon: Backpack, hue: "from-orange/30 to-primary-soft" },
  { slug: "trekking", label: "Treks & Adventure", icon: Tent, hue: "from-success/25 to-primary-soft" },
  { slug: "himalayan", label: "Himalayan Circuits", icon: Mountain, hue: "from-primary/15 to-primary-soft" },
  { slug: "beach", label: "Beach & Islands", icon: Waves, hue: "from-teal/30 to-primary-soft" },
  { slug: "international", label: "International", icon: Plane, hue: "from-warm/40 to-primary-soft" },
];

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Find your vibe</p>
          <h2 className="mt-1 font-display text-2xl font-extrabold sm:text-3xl">Travel categories</h2>
        </div>
        <Link to="/trips" className="hidden text-sm font-semibold text-primary hover:underline sm:block">
          View all →
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {cats.map((c) => (
          <Link
            key={c.slug}
            to="/trips"
            search={{ category: c.slug } as never}
            className={`group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${c.hue} p-4 transition-all hover:-translate-y-0.5 hover:shadow-card`}
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-white shadow-soft">
              <c.icon className="h-5 w-5 text-primary" />
            </div>
            <p className="mt-3 text-sm font-semibold leading-tight text-foreground">{c.label}</p>
            <span className="mt-1 inline-block text-[11px] font-medium text-primary/80 group-hover:text-primary">
              Explore →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
