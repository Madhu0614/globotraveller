import { Instagram } from "lucide-react";
import { trips } from "@/lib/trips";

export function Gallery() {
  const imgs = trips.flatMap((t) => t.gallery).slice(0, 8);
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-primary">
            <Instagram className="h-4 w-4" /> globotraveller.in
          </p>
          <h2 className="mt-1 font-display text-3xl font-extrabold sm:text-4xl">
            Postcards from our travellers
          </h2>
        </div>
        <a
          href="https://www.instagram.com/globotraveller.in"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background hover:opacity-90 sm:inline-block"
        >
          Follow us
        </a>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {imgs.map((src, i) => (
          <a
            key={i}
            href="https://www.instagram.com/globotraveller.in"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-2xl"
          >
            <img
              src={src}
              alt="Travel moment"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 grid place-items-center bg-black/0 opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
              <Instagram className="h-6 w-6 text-white" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
