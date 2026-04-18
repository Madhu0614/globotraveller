import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Globo Traveller" },
      { name: "description", content: "Reach out to plan your next trip with Globo Traveller." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="bg-gradient-to-b from-primary-soft/40 to-background">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Contact</p>
        <h1 className="mt-1 font-display text-4xl font-extrabold sm:text-5xl">Let's plan something epic</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Custom group trips, college fests, corporate offsites, or just questions about a trip — we reply within a few hours.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Message sent · We'll reply soon!");
              (e.target as HTMLFormElement).reset();
            }}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name"><Input required placeholder="Your full name" /></Field>
              <Field label="Phone"><Input required placeholder="+91 99999 99999" /></Field>
              <Field label="Email"><Input required type="email" placeholder="you@email.com" /></Field>
              <Field label="Interested in">
                <select className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-primary">
                  <option>Group trip</option>
                  <option>Custom / private trip</option>
                  <option>Corporate offsite</option>
                  <option>Other</option>
                </select>
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Message"><Textarea rows={4} placeholder="Tell us about your travel plans…" /></Field>
            </div>
            <Button type="submit" size="lg" className="mt-5 rounded-full px-6">Send message</Button>
          </form>

          <aside className="space-y-3">
            <ContactCard icon={Phone} title="Call us" text="+91 99999 99999" />
            <ContactCard icon={Mail} title="Email" text="hello@globotraveller.in" />
            <ContactCard icon={MapPin} title="Office" text="Indiranagar, Bengaluru" />
            <a
              href="https://wa.me/919999999999"
              className="flex items-center gap-3 rounded-2xl bg-[var(--whatsapp)] p-4 text-white shadow-soft"
            >
              <MessageCircle className="h-5 w-5" />
              <div>
                <p className="text-sm font-semibold">WhatsApp instantly</p>
                <p className="text-xs opacity-90">Avg reply in 5 min</p>
              </div>
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function ContactCard({ icon: Icon, title, text }: { icon: typeof Mail; title: string; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-xs uppercase text-muted-foreground">{title}</p>
        <p className="font-display text-sm font-bold">{text}</p>
      </div>
    </div>
  );
}
