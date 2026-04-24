import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Sparkles, Shield, Users, Star, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import slide1 from "@/assets/hero-slide-1.jpg";
import slide2 from "@/assets/hero-slide-2.jpg";
import slide3 from "@/assets/hero-himalayas.jpg";
import slide4 from "@/assets/hero-slide-3.jpg";

const SLIDES = [
  { src: slide1, alt: "Turquoise Himalayan lake at sunrise" },
  { src: slide2, alt: "Bali infinity pool at golden hour" },
  { src: slide3, alt: "Himalayan peaks at golden hour" },
  { src: slide4, alt: "Group of travellers around a bonfire under the stars" },
];

export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Animated image carousel with Ken Burns */}
      <div className="absolute inset-0 -z-10">
        {SLIDES.map((s, i) => (
          <div
            key={s.src}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== active}
          >
            <img
              src={s.src}
              alt={s.alt}
              className={`h-full w-full object-cover ${i === active ? "animate-ken-burns" : ""}`}
              width={1920}
              height={1080}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
            />
          </div>
        ))}
        {/* Premium gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/42 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgb(200_169_106_/_0.22),transparent_55%)]" />
        {/* Floating glow orbs */}
        <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-float" />
        <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-warm/25 blur-3xl animate-float [animation-delay:-3s]" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 pb-20 pt-28 md:px-8 md:pb-28 md:pt-32 lg:flex-row lg:items-center lg:gap-16 lg:pt-36">
        <div className="max-w-2xl text-white animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-warm" />
            India's most loved community travel brand
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-6xl lg:text-[4.2rem]">
            Explore More With{" "}
            <span className="bg-gradient-to-r from-[#f5f3ee] via-[#c8a96a] to-[#ffffff] bg-clip-text text-transparent [text-shadow:0_12px_30px_rgba(17,17,17,0.18)] animate-shimmer bg-[length:200%_auto]">
              Globo Traveller
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">
            Curated group trips, weekend getaways, treks, and international adventures designed for modern travellers.
            Small groups. Expert captains. Zero stress.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-6 shadow-brand hover:scale-[1.03] transition-transform">
              <Link to="/trips">
                Explore Trips <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <a
              href="https://wa.me/917975550990"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 hover:scale-[1.03]"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>

          {/* Premium social proof: Google + Instagram + Rating */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2.5 rounded-full border border-white/20 bg-white/95 px-4 py-2 text-foreground shadow-brand backdrop-blur">
              <GoogleIcon className="h-4 w-4" />
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold">4.9</span>
                <div className="flex text-warm">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] font-medium text-muted-foreground">Google</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 rounded-full border border-white/20 bg-gradient-to-r from-primary via-[#3b5130] to-[#2d3d2d] px-4 py-2 text-white shadow-brand">
              <Instagram className="h-4 w-4" />
              <span className="text-sm font-bold">250K+</span>
              <span className="text-[11px] font-semibold opacity-90">Followers</span>
            </div>
          </div>

          <dl className="mt-8 grid max-w-lg grid-cols-3 gap-4 text-white sm:gap-6">
            {[
              { v: "50k+", l: "Happy travellers" },
              { v: "120+", l: "Curated trips" },
              { v: "4.9★", l: "Avg. rating" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-white/15 bg-white/10 px-3 py-3 text-center backdrop-blur transition hover:bg-white/15 hover:-translate-y-0.5">
                <dt className="font-display text-xl font-extrabold sm:text-2xl">{s.v}</dt>
                <dd className="text-[11px] uppercase tracking-wider text-white/75">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Trust card — desktop */}
        <div className="hidden w-full max-w-sm lg:block">
          <div className="rounded-3xl border border-white/20 bg-white/95 p-5 text-foreground shadow-brand backdrop-blur animate-fade-in-up">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Why Globo</p>
            <ul className="mt-3 space-y-3 text-sm">
              {[
                { i: <Shield className="h-4 w-4 text-primary" />, t: "Verified stays & secure booking" },
                { i: <Users className="h-4 w-4 text-primary" />, t: "Small groups (10–25 travellers)" },
                { i: <Sparkles className="h-4 w-4 text-primary" />, t: "Expert trip captains on every trip" },
                { i: <Star className="h-4 w-4 text-primary" />, t: "4.9★ from 8,000+ verified reviews" },
              ].map((b) => (
                <li key={b.t} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-lg bg-primary-soft">{b.i}</span>
                  <span className="font-medium">{b.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Show slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-8 bg-primary" : "w-3 bg-[#9a9a9a] hover:bg-[#6b6b6b]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.4 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.5 0 10.4-2.1 14.1-5.5l-6.5-5.5c-2 1.5-4.6 2.5-7.6 2.5-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.5 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.7l6.5 5.5C41.9 35.6 44 30.2 44 24c0-1.2-.1-2.3-.4-3.5z" />
    </svg>
  );
}
