import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/trips";

export function Testimonials() {
  return (
    <section className="bg-gradient-soft py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Loved by travellers</p>
            <h2 className="mt-1 font-display text-3xl font-extrabold sm:text-4xl">
              4.9★ from 8,000+ travellers
            </h2>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="relative flex h-full flex-col rounded-3xl border border-border bg-card p-5 shadow-card transition hover:-translate-y-0.5"
            >
              <Quote className="absolute right-4 top-4 h-7 w-7 text-primary-soft" />
              <div className="flex items-center gap-1 text-warm">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground/85">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand font-display text-sm font-bold text-primary-foreground">
                  {t.avatar}
                </span>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.trip}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
