import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, MapPin, Calendar, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <section className="relative z-10 mx-auto -mt-8 max-w-6xl px-4 md:-mt-12 md:px-8">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-1 gap-2 rounded-3xl border border-border bg-card p-2 shadow-brand sm:grid-cols-2 sm:p-3 lg:grid-cols-[1.5fr_1fr_1fr_auto]"
      >
        <label className="flex items-center gap-2 rounded-2xl px-3 py-2 hover:bg-secondary/60">
          <MapPin className="h-4 w-4 text-primary" />
          <div className="flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Where to?</p>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Manali, Bali, Spiti…"
              className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-foreground/40"
            />
          </div>
        </label>
        <label className="flex items-center gap-2 rounded-2xl px-3 py-2 hover:bg-secondary/60">
          <Calendar className="h-4 w-4 text-primary" />
          <div className="flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Month</p>
            <select className="w-full bg-transparent text-sm font-medium outline-none">
              <option>Any month</option>
              <option>May 2026</option>
              <option>June 2026</option>
              <option>July 2026</option>
              <option>August 2026</option>
            </select>
          </div>
        </label>
        <label className="flex items-center gap-2 rounded-2xl px-3 py-2 hover:bg-secondary/60">
          <Wallet className="h-4 w-4 text-primary" />
          <div className="flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Budget</p>
            <select className="w-full bg-transparent text-sm font-medium outline-none">
              <option>Any budget</option>
              <option>Under ₹15,000</option>
              <option>₹15,000 – ₹25,000</option>
              <option>₹25,000 – ₹40,000</option>
              <option>₹40,000+</option>
            </select>
          </div>
        </label>
        <Button asChild size="lg" className="rounded-2xl px-6">
          <Link to="/trips" search={{ q: query } as never}>
            <Search className="mr-1 h-4 w-4" /> Search
          </Link>
        </Button>
      </form>
    </section>
  );
}
