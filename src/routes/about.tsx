import { createFileRoute } from "@tanstack/react-router";
import { useLayoutEffect, useRef } from "react";
import {
  ArrowRight,
  HeartHandshake,
  ShieldCheck,
  Compass,
  Users,
  MapPin,
  Phone,
  Mail,
  Star,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import community from "@/assets/community-travel.jpg";

gsap.registerPlugin(ScrollTrigger);

// ── DATA ─────────────────────────────────────────────────────────────────────

const stats = [
  { value: "95%", label: "Customer Retention" },
  { value: "50K+", label: "Happy Travellers" },
  { value: "4.8★", label: "Google Rating" },
  { value: "24×7", label: "Trip Monitoring" },
];

const clients = [
  "Microsoft",
  "Amazon",
  "Deloitte",
  "Cognizant",
  "Mercedes-Benz",
  "MG Motors",
  "Honda",
  "Hyundai",
  "Ather Energy",
  "DBS Bank",
  "Sandoz Pharma",
];

const values = [
  {
    index: "01",
    icon: HeartHandshake,
    title: "Community first",
    body: "Strangers become friends. Every trip is built around small groups where real conversations happen and genuine bonds form — not just a seat on a bus.",
  },
  {
    index: "02",
    icon: ShieldCheck,
    title: "Safety & accountability",
    body: "Trip leaders, 24×7 monitoring, and clear policies so every traveller — solo, in a group, or with a partner — feels completely looked after from first pickup to drop-off.",
  },
  {
    index: "03",
    icon: Compass,
    title: "Curated, not cookie-cutter",
    body: "No generic packages. Every destination, stay, and activity is hand-picked by a team that's been there — and knows exactly which café is worth the detour.",
  },
  {
    index: "04",
    icon: Users,
    title: "Small group promise",
    body: "Group sizes are capped for quality. You get a real experience, not a managed crowd. Every batch is intentionally sized so the leader knows your name.",
  },
];

const testimonials = [
  {
    name: "Arendala Shruthi",
    trip: "Weekend Group Trip",
    stars: 5,
    quote:
      "This was my first time planning a vacation with a travel company. We were only 5 girls travelling — we felt secured and had a safe trip throughout. Had a wonderful experience.",
  },
  {
    name: "Ganesh Ghantasala",
    trip: "Wayanad",
    stars: 5,
    quote:
      "Travloger made our trip feel so easy and seamless. The stays were good, the itinerary covered almost everything, and the people they arranged to receive us were quite friendly.",
  },
  {
    name: "GAJULA ANSIKA",
    trip: "South Goa & Dandeli",
    stars: 5,
    quote:
      "Thanks to Travloger and team for an amazing trip and for their wonderful photography. This is truly one remarkable experience — the guides were like friends, not staff.",
  },
  {
    name: "Santhosh Kumar",
    trip: "Manali — 9 members",
    stars: 5,
    quote:
      "Great planning and execution. Well organised trip. We never worried about travel, plan, or accommodation. Just enjoyed our trip — the rest was taken care of by Travloger.",
  },
  {
    name: "Loyamadhusudhan",
    trip: "Manali & Kasol — 6 days",
    stars: 5,
    quote:
      "Best adventurous trip ever. One of the best hotel stays in Manali and the camping in Kasol was too good. Thanks Travloger for this amazing experience.",
  },
  {
    name: "Veronica K",
    trip: "Group Trip",
    stars: 5,
    quote:
      "Sat back and made memories with friends without the hassle of planning everything ourselves. Good itinerary that makes your vacation as pleasant as it can possibly be.",
  },
];

// ── ROUTE ─────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Travloger India" },
      {
        name: "description",
        content:
          "Travloger India — community-first weekend getaways from Hyderabad. Learn our story, values, and the team behind every trip.",
      },
    ],
  }),
  component: About,
});

// ── PAGE ──────────────────────────────────────────────────────────────────────

function About() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const storyRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.09,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      if (storyRef.current) {
        gsap.fromTo(
          storyRef.current.querySelector(".story-img"),
          { opacity: 0, x: -36, filter: "blur(6px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: storyRef.current,
              start: "top 76%",
              once: true,
            },
          }
        );
        gsap.fromTo(
          storyRef.current.querySelector(".story-text"),
          { opacity: 0, x: 36 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: storyRef.current,
              start: "top 76%",
              once: true,
            },
          }
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#f3ede3] text-[#201c17]" ref={rootRef}>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={community}
            alt="Travloger India community on a trip"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,8,0.32),rgba(12,10,8,0.54)_38%,rgba(243,237,227,0.90)_80%,#f3ede3_100%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-40 md:px-8 md:pb-24 md:pt-56">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e8d5b8]"
          >
            About Travloger India
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="mt-4 max-w-4xl text-4xl font-black leading-[0.92] tracking-[-0.05em] text-[#fff7ea] drop-shadow-[0_12px_28px_rgba(0,0,0,0.30)] sm:text-6xl lg:text-7xl"
          >
            We build trips worth the out-of-office.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-5 max-w-xl text-sm leading-7 text-[#f1e3cf] sm:text-base"
          >
            Every weekend, a crew of strangers leaves Hyderabad and returns as friends.
            Travloger is the team that makes sure the plan is airtight, the stay is warm,
            and the memories last longer than the Instagram story.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.34 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/trips"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-[#fff7ea] px-6 text-sm font-bold text-[#201c17] transition-colors hover:bg-white"
            >
              See our trips <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/916281392007"
              className="inline-flex h-12 items-center rounded-full border border-white/25 bg-black/20 px-6 text-sm font-semibold text-[#fff7ea] backdrop-blur-sm"
            >
              WhatsApp us
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div ref={statsRef} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[26px] border border-[#ddd1c0] bg-[#fbf7f1] p-6 text-center"
            >
              <p className="text-3xl font-black tracking-[-0.04em] text-[#b08a57]">
                {stat.value}
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8f7f6b]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CLIENT TRUST BAR ── */}
      <section className="overflow-hidden border-y border-[#ddd1c0] bg-[#fbf7f1] py-8">
        <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-[#a09080]">
          Trusted by teams at
        </p>
        <div className="mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex items-center gap-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            {[...clients, ...clients].map((client, i) => (
              <span
                key={i}
                className="shrink-0 whitespace-nowrap text-sm font-semibold text-[#5a4e42] opacity-60"
              >
                {client}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section
        ref={storyRef}
        className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24"
      >
        <div className="story-img aspect-4/3 overflow-hidden rounded-4xl shadow-[0_18px_50px_rgba(32,28,23,0.10)]">
          <img
            src={community}
            alt="Travloger community on a trip"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="story-text flex flex-col justify-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8f7f6b]">
            Our story
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#201c17] md:text-4xl lg:text-5xl">
            Started in Hyderabad. Still here.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#655949]">
            Travloger began with a small group of friends who wanted real weekend escapes —
            not crowded bus tours, not overpriced packages, just good people going to good places.
            We started with Hampi. We still do Hampi, because it never gets old.
          </p>
          <p className="mt-3 text-sm leading-7 text-[#655949]">
            Today we run trips every Friday from Hyderabad, with dedicated trip leaders, a local
            guide at every destination, and 24×7 monitoring so no one is ever on their own.
            Teams from Microsoft, Amazon, Deloitte, and Cognizant trust us for their group
            outings — but most of our travellers are just people who needed a break.
          </p>
          <p className="mt-3 text-sm leading-7 text-[#655949]">
            We're rated 4.8★ on Google. We'll take it. But the reviews that mean more are the
            ones that end with "looking forward to travelling with you again."
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-5 text-xs text-[#8f7f6b]">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#b08a57]" />
              New Nallakunta, Hyderabad
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-[#b08a57]" />
              +91 62813 92007
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-[#b08a57]" />
              hello@travloger.in
            </span>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="bg-[#201c17] py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a09080]">
              What we stand for
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-[-0.04em] text-[#f6efe5] md:text-5xl">
              Four things we won't compromise on.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-3xl border border-white/8 bg-white/3 p-7"
              >
                <div className="flex items-start justify-between">
                  <v.icon className="h-5 w-5 text-[#b08a57]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5a524a]">
                    {v.index}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-black tracking-[-0.03em] text-[#f6efe5]">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#b8ac9e]">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8f7f6b]">
            Community
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#201c17] md:text-5xl">
            In their own words.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: i * 0.07,
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col rounded-[28px] border border-[#ddd1c0] bg-[#fbf7f1] p-6"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-[#b08a57] text-[#b08a57]" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-7 text-[#5c5047]">
                "{t.quote}"
              </p>
              <div className="mt-5 border-t border-[#ece4d8] pt-4">
                <p className="text-sm font-semibold text-[#201c17]">{t.name}</p>
                <p className="mt-0.5 text-xs text-[#8f7f6b]">{t.trip}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA + CONTACT ── */}
      <section className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
        <div className="relative overflow-hidden rounded-[36px] bg-[#201c17] p-8 md:p-12">
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[#b08a57]/10 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a09080]">
                Ready?
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-[-0.04em] text-[#f6efe5] md:text-5xl">
                Your next Friday night just got a plan.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#c4b8ac]">
                Browse open trips, check available dates, and lock in your seat before it fills.
                Group travel is first-come, first-served.
              </p>
              <div className="mt-5 flex flex-wrap gap-5 text-xs text-[#8a7e70]">
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-[#b08a57]" />
                  hello@travloger.in
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-[#b08a57]" />
                  +91 62813 92007
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#b08a57]" />
                  New Nallakunta, Hyderabad 500044
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/trips"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[#f1e4d0] px-6 text-sm font-bold text-[#1e1913] transition-colors hover:bg-[#eadbc2]"
              >
                Explore trips <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/916281392007"
                className="inline-flex h-12 items-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-[#f5ece1]"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <section className="border-t border-[#ded1c0]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-xs text-[#7e705f] md:flex-row md:items-center md:justify-between md:px-8">
          <p>Travloger India · New Nallakunta, Hyderabad 500044</p>
          <div className="flex gap-4">
            <a
              href="https://instagram.com/travloger.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#b08a57] transition-colors"
            >
              @travloger.in
            </a>
            <a
              href="mailto:hello@travloger.in"
              className="hover:text-[#b08a57] transition-colors"
            >
              hello@travloger.in
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}