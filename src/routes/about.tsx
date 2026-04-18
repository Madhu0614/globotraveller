import { createFileRoute } from "@tanstack/react-router";
import { Heart, Globe2, Users, Sparkles } from "lucide-react";
import community from "@/assets/community-travel.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Globo Traveller" },
      { name: "description", content: "Learn about Globo Traveller — a community-first travel brand for modern Indian explorers." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary-soft/40 to-background">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center md:px-8 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">About us</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">
            We build trips we'd want to take ourselves
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Globo Traveller started in 2019 with a backpack, a spreadsheet, and a deep love for the Himalayas. Today
            we're a 50-person team helping 50,000+ travellers explore the world without the planning stress.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2 md:px-8 md:py-16">
        <img src={community} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-card" />
        <div>
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Our story</h2>
          <p className="mt-3 text-muted-foreground">
            What began as weekend trips with friends to Manali has grown into one of India's most-loved community
            travel brands. We obsess over the small details — the right cafe, the cleanest stay, the trip captain who
            tells the best stories.
          </p>
          <p className="mt-3 text-muted-foreground">
            Whether it's a quick weekend reset or a 12-day Himalayan circuit, every Globo trip is designed to feel
            personal, social, and safe.
          </p>
        </div>
      </section>

      <section className="bg-secondary/40 py-14">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">What we stand for</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { i: Heart, t: "Community first", d: "Friends over followers." },
              { i: Globe2, t: "Responsible travel", d: "Local stays, low impact." },
              { i: Users, t: "Small groups", d: "10–25, max." },
              { i: Sparkles, t: "Curated, always", d: "No cookie-cutter trips." },
            ].map((v) => (
              <div key={v.t} className="rounded-2xl border border-border bg-card p-5">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                  <v.i className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-display text-base font-bold">{v.t}</h3>
                <p className="text-sm text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
