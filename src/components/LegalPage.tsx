interface Section {
  h: string;
  p: string;
}

export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: Section[] }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-8 md:py-20">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">Legal</p>
      <h1 className="mt-1 font-display text-4xl font-extrabold">{title}</h1>
      <p className="mt-2 text-xs text-muted-foreground">Last updated: {updated}</p>

      <div className="mt-8 space-y-6">
        {sections.map((s) => (
          <section key={s.h} className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-display text-lg font-bold">{s.h}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.p}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
