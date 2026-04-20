import { Link } from "@tanstack/react-router";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import community from "@/assets/community-travel.jpg";

export function Community() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
      <div className="grid items-center gap-8 overflow-hidden rounded-3xl bg-gradient-brand p-6 shadow-brand sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-12">
        <div className="text-primary-foreground">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur">
            <Heart className="h-3.5 w-3.5 text-warm" />
            Community first
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            Trips that turn strangers into your favourite people
          </h2>
          <p className="mt-3 max-w-xl text-primary-foreground/85">
            Every Globo trip is built around a community of curious travellers. Bonfire jams, sunrise hikes, late-night
            chai — you'll come back with stories and a squad.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary" className="rounded-full px-6 text-primary">
              <Link to="/trips">
                Join a trip <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <a
              href="https://wa.me/917975550990"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/10"
            >
              Plan a custom trip
            </a>
          </div>
        </div>
        <div className="relative">
          <img
            src={community}
            alt="Group of travellers laughing together at a viewpoint"
            loading="lazy"
            width={1280}
            height={960}
            className="aspect-[5/4] w-full rounded-2xl object-cover shadow-brand"
          />
          <div className="absolute -bottom-4 left-4 rounded-2xl bg-card px-4 py-3 shadow-brand sm:left-auto sm:right-4">
            <p className="text-xs text-muted-foreground">Last week</p>
            <p className="font-display text-sm font-bold">312 travellers, 14 destinations 🌏</p>
          </div>
        </div>
      </div>
    </section>
  );
}
