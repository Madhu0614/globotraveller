import { Shield, Users, Compass, Headphones, BadgeCheck, Wallet } from "lucide-react";

const items = [
  { icon: Users, title: "Small groups", text: "10–25 travellers max so it stays personal." },
  { icon: Compass, title: "Expert captains", text: "Trained trip captains on every departure." },
  { icon: Shield, title: "Verified stays", text: "Hand-picked, safety-checked accommodations." },
  { icon: Wallet, title: "Transparent pricing", text: "No hidden costs. Pay 25% to confirm." },
  { icon: BadgeCheck, title: "Curated itineraries", text: "Built by travellers, refined every season." },
  { icon: Headphones, title: "24×7 support", text: "WhatsApp support before, during & after." },
];

export function WhyUs() {
  return (
    <section className="bg-secondary/50 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Why Globo Traveller</p>
          <h2 className="mt-1 font-display text-3xl font-extrabold sm:text-4xl">
            We obsess over the little things, so you don't have to.
          </h2>
          <p className="mt-3 text-muted-foreground">
            From the moment you book to the moment you're back home, every detail is engineered for hassle-free, memorable travel.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.title}
              className="group rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{it.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
