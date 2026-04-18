import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { TripCard } from "@/components/TripCard";
import { trips, type TripCategory } from "@/lib/trips";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface TripsSearch {
  category?: TripCategory;
  q?: string;
}

export const Route = createFileRoute("/trips")({
  validateSearch: (search: Record<string, unknown>): TripsSearch => ({
    category: search.category as TripCategory | undefined,
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "All Trips — Globo Traveller" },
      { name: "description", content: "Browse all curated group trips, weekend getaways, treks, and international adventures." },
    ],
  }),
  component: TripsPage,
});

const CATEGORIES: { value: TripCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "weekend", label: "Weekend" },
  { value: "international", label: "International" },
  { value: "trekking", label: "Trekking" },
  { value: "himalayan", label: "Himalayan" },
  { value: "beach", label: "Beach" },
];

const DURATIONS = ["Any", "1–3 days", "4–6 days", "7+ days"];
const PRICES = ["Any", "Under ₹15,000", "₹15,000–₹25,000", "₹25,000–₹40,000", "₹40,000+"];
const DIFFICULTY = ["Any", "Easy", "Moderate", "Challenging"];
const SORTS = ["Recommended", "Price: Low to High", "Price: High to Low", "Highest rated"];

function TripsPage() {
  const search = Route.useSearch();
  const [category, setCategory] = useState<TripCategory | "all">(search.category ?? "all");
  const [duration, setDuration] = useState("Any");
  const [price, setPrice] = useState("Any");
  const [difficulty, setDifficulty] = useState("Any");
  const [sort, setSort] = useState("Recommended");
  const [q, setQ] = useState(search.q ?? "");

  const filtered = useMemo(() => {
    let list = trips.filter((t) => {
      if (category !== "all" && t.category !== category) return false;
      if (q && !`${t.title} ${t.location} ${t.country}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (duration === "1–3 days" && t.durationDays > 3) return false;
      if (duration === "4–6 days" && (t.durationDays < 4 || t.durationDays > 6)) return false;
      if (duration === "7+ days" && t.durationDays < 7) return false;
      if (price === "Under ₹15,000" && t.price >= 15000) return false;
      if (price === "₹15,000–₹25,000" && (t.price < 15000 || t.price > 25000)) return false;
      if (price === "₹25,000–₹40,000" && (t.price < 25000 || t.price > 40000)) return false;
      if (price === "₹40,000+" && t.price < 40000) return false;
      if (difficulty !== "Any" && t.difficulty !== difficulty) return false;
      return true;
    });
    if (sort === "Price: Low to High") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "Highest rated") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, q, duration, price, difficulty, sort]);

  const reset = () => {
    setCategory("all");
    setDuration("Any");
    setPrice("Any");
    setDifficulty("Any");
    setSort("Recommended");
    setQ("");
  };

  const Filters = (
    <div className="space-y-6">
      <FilterGroup label="Search">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Destination or trip name"
          className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
        />
      </FilterGroup>
      <FilterGroup label="Category">
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <Chip key={c.value} active={category === c.value} onClick={() => setCategory(c.value)}>
              {c.label}
            </Chip>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup label="Duration">
        <div className="flex flex-wrap gap-1.5">
          {DURATIONS.map((d) => (
            <Chip key={d} active={duration === d} onClick={() => setDuration(d)}>
              {d}
            </Chip>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup label="Budget">
        <div className="flex flex-wrap gap-1.5">
          {PRICES.map((p) => (
            <Chip key={p} active={price === p} onClick={() => setPrice(p)}>
              {p}
            </Chip>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup label="Difficulty">
        <div className="flex flex-wrap gap-1.5">
          {DIFFICULTY.map((d) => (
            <Chip key={d} active={difficulty === d} onClick={() => setDifficulty(d)}>
              {d}
            </Chip>
          ))}
        </div>
      </FilterGroup>
      <Button variant="outline" className="w-full rounded-full" onClick={reset}>
        <X className="mr-1 h-4 w-4" /> Reset filters
      </Button>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-primary-soft/40 to-background">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
        <header className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Trips</p>
          <h1 className="mt-1 font-display text-3xl font-extrabold sm:text-4xl">Find your next adventure</h1>
          <p className="mt-2 text-sm text-muted-foreground">{filtered.length} curated trips ready to book</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-3xl border border-border bg-card p-5 shadow-soft">
              <div className="mb-4 flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-primary" />
                <h2 className="font-display text-base font-bold">Filters</h2>
              </div>
              {Filters}
            </div>
          </aside>

          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-full lg:hidden">
                    <Filter className="mr-1 h-4 w-4" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto">
                  <h2 className="font-display text-lg font-bold">Filters</h2>
                  <div className="mt-4">{Filters}</div>
                </SheetContent>
              </Sheet>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="ml-auto rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold"
              >
                {SORTS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border bg-card p-10 text-center">
                <p className="font-display text-lg font-bold">No trips match your filters</p>
                <p className="mt-1 text-sm text-muted-foreground">Try resetting or broadening your search.</p>
                <Button onClick={reset} className="mt-4 rounded-full">Reset filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((t) => (
                  <TripCard key={t.slug} trip={t} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-full border px-3 py-1.5 text-xs font-semibold transition " +
        (active
          ? "border-primary bg-primary text-primary-foreground shadow-soft"
          : "border-border bg-card text-foreground/75 hover:border-primary hover:text-primary")
      }
    >
      {children}
    </button>
  );
}
