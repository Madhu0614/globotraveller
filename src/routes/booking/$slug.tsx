import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Tag, ShieldCheck, CreditCard, Lock } from "lucide-react";
import { getTrip, type Trip } from "@/lib/trips";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/booking/$slug")({
  loader: ({ params }): { trip: Trip } => {
    const trip = getTrip(params.slug);
    if (!trip) throw notFound();
    return { trip };
  },
  validateSearch: (s: Record<string, unknown>) => ({
    date: typeof s.date === "string" ? s.date : undefined,
  }),
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `Book ${loaderData.trip.title} — Globo Traveller` }] : [],
  }),
  component: BookingPage,
});

const STEPS = ["Travellers", "Departure", "Add-ons", "Payment"];

function BookingPage() {
  const { trip } = Route.useLoaderData() as { trip: Trip };
  const search = Route.useSearch();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [travellers, setTravellers] = useState(1);
  const [date, setDate] = useState(search.date ?? trip.departures[0]?.date ?? "");
  const [addons, setAddons] = useState<Record<string, boolean>>({ insurance: true, offload: false, room: false });
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const addonPrices = { insurance: 499, offload: 1500, room: 4000 };
  const addonsTotal =
    (addons.insurance ? addonPrices.insurance : 0) * travellers +
    (addons.offload ? addonPrices.offload : 0) * travellers +
    (addons.room ? addonPrices.room : 0);

  const subtotal = trip.price * travellers + addonsTotal;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst - discount;

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "GLOBO10") {
      setDiscount(Math.round(subtotal * 0.1));
      toast.success("Coupon applied · 10% off");
    } else {
      setDiscount(0);
      toast.error("Invalid coupon");
    }
  };

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const pay = () => {
    if (!name || !email || !phone) {
      toast.error("Please fill traveller details first");
      setStep(0);
      return;
    }
    toast.success("Payment successful! Redirecting…");
    setTimeout(() => {
      navigate({
        to: "/booking/confirmation",
        search: { trip: trip.slug, date, travellers, total } as never,
      });
    }, 800);
  };

  return (
    <div className="bg-linear-to-b from-primary-soft/40 to-background">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        <Link to="/trips/$slug" params={{ slug: trip.slug }} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ChevronLeft className="h-4 w-4" /> Back to trip
        </Link>
        <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">Book your spot</h1>
        <p className="text-sm text-muted-foreground">{trip.title}</p>

        {/* Stepper */}
        <ol className="mt-6 grid grid-cols-4 gap-2">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              <span
                className={
                  "grid h-8 w-8 flex-none place-items-center rounded-full text-xs font-bold transition " +
                  (i <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground")
                }
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span className={"hidden text-xs font-semibold sm:inline " + (i <= step ? "text-foreground" : "text-muted-foreground")}>
                {s}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-3xl border border-border bg-card p-5 shadow-soft md:p-7">
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-bold">Traveller details</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Full name"><Input value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} placeholder="Aarav Sharma" /></Field>
                  <Field label="Phone"><Input value={phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)} placeholder="+91 7975550990" /></Field>
                  <Field label="Email"><Input type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="you@email.com" /></Field>
                  <Field label="Number of travellers">
                    <div className="flex items-center gap-2">
                      <Button type="button" variant="outline" size="icon" className="rounded-full" onClick={() => setTravellers((t) => Math.max(1, t - 1))}>−</Button>
                      <span className="w-8 text-center font-display text-lg font-bold">{travellers}</span>
                      <Button type="button" variant="outline" size="icon" className="rounded-full" onClick={() => setTravellers((t) => Math.min(10, t + 1))}>+</Button>
                    </div>
                  </Field>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-bold">Pick your departure</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {trip.departures.map((d: Trip["departures"][0]) => (
                    <button
                      key={d.date}
                      type="button"
                      onClick={() => setDate(d.date)}
                      className={
                        "rounded-2xl border p-4 text-left transition " +
                        (date === d.date
                          ? "border-primary bg-primary-soft shadow-soft"
                          : "border-border bg-background hover:border-primary")
                      }
                    >
                      <p className="font-display font-bold">{d.date}</p>
                      <p className="text-xs text-muted-foreground">{d.spotsLeft} spots left · {trip.durationDays}D / {trip.durationNights}N</p>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Pickup: {trip.pickup} · Drop: {trip.drop}
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-bold">Add-ons</h2>
                <div className="space-y-3">
                  <AddonRow
                    title="Travel insurance"
                    desc="Recommended · medical + trip cover"
                    price={`₹${addonPrices.insurance}/person`}
                    checked={addons.insurance}
                    onChange={(v) => setAddons((a) => ({ ...a, insurance: v }))}
                  />
                  <AddonRow
                    title="Backpack offloading"
                    desc="Mules carry your bag on trek days"
                    price={`₹${addonPrices.offload}/person`}
                    checked={addons.offload}
                    onChange={(v) => setAddons((a) => ({ ...a, offload: v }))}
                  />
                  <AddonRow
                    title="Single-room upgrade"
                    desc="Private room throughout the trip"
                    price={`₹${addonPrices.room.toLocaleString("en-IN")}`}
                    checked={addons.room}
                    onChange={(v) => setAddons((a) => ({ ...a, room: v }))}
                  />
                </div>

                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Coupon code</Label>
                  <div className="mt-2 flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input value={coupon} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCoupon(e.target.value)} placeholder="Try GLOBO10" className="pl-9" />
                    </div>
                    <Button type="button" variant="outline" className="rounded-full" onClick={applyCoupon}>Apply</Button>
                  </div>
                  {discount > 0 && (
                    <p className="mt-2 text-xs font-semibold text-success">
                      ✓ ₹{discount.toLocaleString("en-IN")} discount applied
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-bold">Secure checkout</h2>
                <div className="grid gap-3 sm:grid-cols-3">
                  <PayMethod label="UPI" sub="GPay, PhonePe, Paytm" active />
                  <PayMethod label="Cards" sub="Credit / Debit + EMI" />
                  <PayMethod label="Net Banking" sub="All major banks" />
                </div>

                <div className="space-y-3 rounded-2xl border border-border bg-secondary/40 p-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Name on card"><Input placeholder="Aarav Sharma" /></Field>
                    <Field label="Card number"><Input placeholder="4242 4242 4242 4242" /></Field>
                    <Field label="Expiry"><Input placeholder="MM/YY" /></Field>
                    <Field label="CVV"><Input placeholder="•••" maxLength={4} /></Field>
                  </div>
                  <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Lock className="h-3 w-3" /> Demo checkout — no real charge will be made.
                  </p>
                </div>

                <div className="flex items-start gap-2 rounded-2xl border border-success/30 bg-success/5 p-3 text-xs text-success">
                  <ShieldCheck className="h-4 w-4 flex-none" />
                  256-bit SSL encrypted · PCI-DSS compliant · Free cancellation up to 21 days
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between gap-3">
              <Button variant="ghost" onClick={prev} disabled={step === 0} className="rounded-full">
                <ChevronLeft className="mr-1 h-4 w-4" /> Back
              </Button>
              {step < STEPS.length - 1 ? (
                <Button onClick={next} className="rounded-full px-6">
                  Continue <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={pay} size="lg" className="rounded-full px-6">
                  <CreditCard className="mr-1 h-4 w-4" /> Pay ₹{total.toLocaleString("en-IN")}
                </Button>
              )}
            </div>
          </div>

          {/* Summary */}
          <aside>
            <div className="sticky top-24 rounded-3xl border border-border bg-card p-5 shadow-card">
              <img src={trip.image} alt="" className="aspect-5/3 w-full rounded-2xl object-cover" />
              <h3 className="mt-3 font-display text-base font-bold">{trip.title}</h3>
              <p className="text-xs text-muted-foreground">{date || "Select a date"} · {trip.durationDays}D/{trip.durationNights}N</p>

              <div className="mt-4 space-y-2 text-sm">
                <Row label={`Trip × ${travellers}`} value={`₹${(trip.price * travellers).toLocaleString("en-IN")}`} />
                {addonsTotal > 0 && <Row label="Add-ons" value={`₹${addonsTotal.toLocaleString("en-IN")}`} />}
                <Row label="GST (5%)" value={`₹${gst.toLocaleString("en-IN")}`} />
                {discount > 0 && <Row label="Discount" value={`− ₹${discount.toLocaleString("en-IN")}`} accent="success" />}
                <div className="my-2 border-t border-border" />
                <Row label="Total" value={`₹${total.toLocaleString("en-IN")}`} bold />
              </div>

              <p className="mt-3 text-[11px] text-muted-foreground">
                ✓ Pay 25% (₹{Math.round(total * 0.25).toLocaleString("en-IN")}) now to confirm — rest before departure
              </p>
            </div>
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

function AddonRow({
  title, desc, price, checked, onChange,
}: { title: string; desc: string; price: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label
      className={
        "flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition " +
        (checked ? "border-primary bg-primary-soft" : "border-border bg-background hover:border-primary")
      }
    >
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-5 w-5 accent-primary" />
      <div className="flex-1">
        <p className="font-display text-sm font-bold">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <span className="text-sm font-bold">{price}</span>
    </label>
  );
}

function PayMethod({ label, sub, active }: { label: string; sub: string; active?: boolean }) {
  return (
    <button
      type="button"
      className={
        "rounded-2xl border p-4 text-left transition " +
        (active ? "border-primary bg-primary-soft shadow-soft" : "border-border bg-background hover:border-primary")
      }
    >
      <p className="font-display text-sm font-bold">{label}</p>
      <p className="text-[11px] text-muted-foreground">{sub}</p>
    </button>
  );
}

function Row({ label, value, bold, accent }: { label: string; value: string; bold?: boolean; accent?: "success" }) {
  return (
    <div className="flex items-center justify-between">
      <span className={bold ? "font-display font-bold" : "text-muted-foreground"}>{label}</span>
      <span
        className={
          (bold ? "font-display text-lg font-extrabold " : "font-semibold ") +
          (accent === "success" ? "text-success" : "")
        }
      >
        {value}
      </span>
    </div>
  );
}
