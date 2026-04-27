import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BusFront,
  Calendar,
  Check,
  Clock,
  Compass,
  HeartPulse,
  MapPin,
  Mountain,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import gsap from "gsap";
import SplitType from "split-type";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import heroBanner from "@/assets/hampip4.avif";
import hampiHero from "@/assets/hampip4.avif";
import hampiTemple from "@/assets/hampip1.jpg.jpeg";
import hampiRiver from "@/assets/hampip2.jpg.jpeg";
import hampiRuins from "@/assets/hampip3.webp";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// ── DATA ─────────────────────────────────────────────────────────────────────

const itinerary = [
  {
    day: "Day 0 — Friday Night",
    title: "Departure from Hyderabad",
    subtitle: "The city fades out, the adventure begins.",
    image: hampiHero,
    points: [
      "10:00 PM — Near Rayalaseema Ruchulu, Lakdikapul.",
      "10:30 PM — Near Bikanervala, Aramghar.",
      "10:45 PM — Nehru ORR Exit 16, Shamshabad.",
      "Overnight journey to Hampi in a private MUV / Tempo Traveller.",
      "Midnight chatter, travel games, and a crew of fellow explorers.",
    ],
    meals: "None",
    notes: [
      "Arrive at your pickup point at least 15 minutes before the scheduled time.",
      "Trip confirms only if at least 10 travellers have reserved — you'll be notified in advance.",
      "Timings are approximate and may vary due to traffic conditions.",
    ],
  },
  {
    day: "Day 1 — Saturday",
    title: "Coracle Ride · Anegundi Fort · Anjanadri Hill",
    subtitle: "Boulders, history, and a golden Tungabhadra sunset.",
    image: hampiRiver,
    points: [
      "Early morning arrival in Hampi — straight to Sanapur Lake for a coracle ride amid iconic boulder landscapes.",
      "Check-in, breakfast, and freshen up at the experiential stay near the sunrise point.",
      "Explore Anegundi Fort — one of the oldest parts of Hampi with stunning viewpoints and rustic charm.",
      "Lunch at a local café in Hampi.",
      "Anjanadri Hill trek — believed to be the birthplace of Lord Hanuman. Short, scenic climb with a spectacular view.",
      "Sunset from the hilltop paints the entire Tungabhadra valley in gold.",
      "Return to stay: bonfire, dinner, and fun group games.",
    ],
    meals: "Breakfast & Lunch",
    notes: [
      "Coracle ride is subject to water-level conditions at Sanapur Lake.",
      "The Anjanadri Hill trek is beginner-friendly — roughly 570 steps.",
      "Carry comfortable footwear, sunscreen, and personal hydration.",
    ],
  },
  {
    day: "Day 2 — Sunday",
    title: "Vijaya Vittala · Lotus Mahal · Virupaksha",
    subtitle: "Stone chariots, ancient empires, and a heritage farewell.",
    image: hampiTemple,
    points: [
      "Morning breakfast before diving into Hampi's most iconic landmarks.",
      "Vijaya Vittala Temple — home to the legendary Stone Chariot featured on the ₹50 note.",
      "Lotus Mahal, Elephant Stables, and Hazara Rama Temple — each a chapter from the Vijayanagara Empire.",
      "Lunch at a local café near Hampi Bazaar.",
      "Virupaksha Temple — one of India's oldest functioning temples, filled with deep spiritual energy.",
      "Hampi Museum for a quick glimpse into ancient history.",
      "Hemakuta Hill for the final sunset view, then depart for Hyderabad.",
      "Arrive back in Hyderabad early Monday morning.",
    ],
    meals: "Breakfast & Lunch",
    notes: [
      "Temple entry requires modest clothing — avoid sleeveless tops and shorts.",
      "Entry fees for monuments and activities not mentioned are payable separately.",
      "Departure from Hampi by evening; estimated Hyderabad arrival is Monday early morning.",
    ],
  },
];

const includes = [
  "Pick-up & Drop",
  "Private Vehicle",
  "Accommodation",
  "Trip Leader",
  "Local Guide",
  "Tolls & Taxes",
];

const routeStops = ["Hyderabad", "Hampi"];

// ── ROUTE ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/trips/treasures-of-karnataka")({
  head: () => ({
    meta: [
      { title: "Hampi Escapade — 2D 1N Weekend Getaway from Hyderabad" },
      {
        name: "description",
        content:
          "A premium weekend itinerary page for Travloger's Hampi Escapade — coracle rides, Anjanadri Hill trek, Vijaya Vittala Temple, and ancient ruins. Ex-Hyderabad, every Friday.",
      },
    ],
  }),
  component: HampiEscapadePage,
});

// ── PAGE ─────────────────────────────────────────────────────────────────────

function HampiEscapadePage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
  const heroCopyRef = useRef<HTMLParagraphElement | null>(null);
  const heroStatsRef = useRef<HTMLDivElement | null>(null);

  const timelineSectionRef = useRef<HTMLElement | null>(null);
  const timelinePathRef = useRef<SVGPathElement | null>(null);
  const timelinePathProgressRef = useRef<SVGPathElement | null>(null);
  const busIndicatorRef = useRef<HTMLDivElement | null>(null);

  const imagePanelRef = useRef<HTMLDivElement | null>(null);
  const notesSectionRef = useRef<HTMLElement | null>(null);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.08,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => { lenis.raf(time * 1000); };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      let split: SplitType | null = null;

      if (heroTitleRef.current) {
        split = new SplitType(heroTitleRef.current, { types: "lines,words,chars" });
        gsap.set(split.chars, { opacity: 0, yPercent: 100, rotateX: 12, transformOrigin: "50% 100%" });
        gsap.to(split.chars, {
          opacity: 1, yPercent: 0, rotateX: 0,
          duration: 1, stagger: 0.018, ease: "power4.out", delay: 0.08,
        });
      }

      if (heroCopyRef.current) {
        gsap.fromTo(heroCopyRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.28 }
        );
      }

      if (heroStatsRef.current) {
        gsap.fromTo(heroStatsRef.current.children,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, stagger: 0.07, duration: 0.75, ease: "power3.out", delay: 0.42 }
        );
      }

      if (heroRef.current) {
        const heroImage = heroRef.current.querySelector(".hero-image");
        if (heroImage) {
          gsap.to(heroImage, {
            yPercent: 6, scale: 1.06, ease: "none",
            scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
          });
        }
      }

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 50, filter: "blur(8px)" },
          {
            opacity: 1, y: 0, filter: "blur(0px)",
            duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 84%", once: true },
          }
        );
        ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });

      if (timelineSectionRef.current && timelinePathProgressRef.current) {
        const path = timelinePathProgressRef.current;
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0, ease: "none",
          scrollTrigger: {
            trigger: timelineSectionRef.current,
            start: "top 18%", end: "bottom 82%", scrub: true,
          },
        });
      }

      if (
        timelineSectionRef.current &&
        timelinePathRef.current &&
        busIndicatorRef.current &&
        window.innerWidth >= 1024
      ) {
        gsap.to(busIndicatorRef.current, {
          ease: "none",
          motionPath: {
            path: timelinePathRef.current,
            align: timelinePathRef.current,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
            start: 0,
            end: 1,
          },
          scrollTrigger: {
            trigger: timelineSectionRef.current,
            start: "top 18%", end: "bottom 82%", scrub: true,
          },
        });
      }

      if (imagePanelRef.current) {
        gsap.fromTo(imagePanelRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: imagePanelRef.current, start: "top 80%", once: true },
          }
        );
      }

      if (notesSectionRef.current) {
        const cards = notesSectionRef.current.querySelectorAll(".soft-reveal");
        gsap.fromTo(cards,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
            scrollTrigger: { trigger: notesSectionRef.current, start: "top 82%", once: true },
          }
        );
      }

      return () => split?.revert();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#f3ede3] text-[#201c17]" ref={rootRef}>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="Hampi Escapade"
            className="hero-image h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,8,0.28),rgba(12,10,8,0.52)_35%,rgba(243,237,227,0.84)_82%,#f3ede3_100%)]" />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-4 pb-10 pt-36 md:px-8 md:pt-44">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#fff2dd] backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#ffd48a]" />
              Globo Traveller
            </motion.div>

            <h1
              ref={heroTitleRef}
              className="mt-6 max-w-5xl text-4xl font-black leading-[0.92] tracking-[-0.05em] text-[#fff7ea] drop-shadow-[0_12px_26px_rgba(0,0,0,0.32)] sm:text-6xl lg:text-8xl"
            >
              Hampi Escapade
            </h1>

            <p
              ref={heroCopyRef}
              className="mt-5 max-w-2xl text-sm leading-7 text-[#f1e3cf] drop-shadow-[0_8px_18px_rgba(0,0,0,0.22)] sm:text-base"
            >
              A short, soulful weekend away — coracle rides on Sanapur Lake, a trek to Anjanadri Hill,
              and quiet walks through Hampi's ancient stone corridors. Every Friday from Hyderabad.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton>
                <Button
                  asChild
                  className="h-12 rounded-full bg-[#fff7ea] px-6 text-sm font-bold text-[#201c17] hover:bg-white"
                >
                  <a href="/booking/hampi-escapade">
                    Reserve Your Seat
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="https://wa.me/916281392007"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-black/20 px-6 text-sm font-semibold text-[#fff7ea] backdrop-blur-sm"
                >
                  WhatsApp Us
                </a>
              </MagneticButton>
            </div>
          </div>

          <div ref={heroStatsRef} className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <GlassStat icon={Clock} label="Duration" value="2D / 1N" />
            <GlassStat icon={Mountain} label="Difficulty" value="Easy" />
            <GlassStat icon={Users} label="Min Group" value="10 Adults" />
            <GlassStat icon={Compass} label="Trip Style" value="Heritage + Nature" />
            <GlassStat icon={Calendar} label="Departure" value="Every Friday" />
          </div>
        </div>
      </section>

      {/* ── INCLUDES + ROUTE OVERVIEW ── */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[32px] border border-[#ddd1c0] bg-[#fbf7f1] p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8f7f6b]">
              Route overview
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#201c17] md:text-5xl">
              City lights out, ruins in.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#655949]">
              Leave Hyderabad on a Friday night and wake up in one of the world's greatest archaeological
              landscapes. Two full days of ancient temples, boulderscapes, and a lakeside coracle ride —
              back by Monday morning.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2">
              {routeStops.map((stop, idx) => (
                <div key={stop} className="flex items-center gap-2">
                  <span className="rounded-full border border-[#ded2c2] bg-[#f6f0e6] px-3 py-1.5 text-xs font-medium text-[#3c342b]">
                    {stop}
                  </span>
                  {idx < routeStops.length - 1 ? (
                    <span className="text-[#a4927e]">—</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {includes.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="rounded-[24px] border border-[#ddd1c0] bg-[#fbf7f1] p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-[#e1d6c8] bg-[#f6f0e6] text-[#b08a57]">
                    <Check className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#201c17]">{item}</p>
                    <p className="text-xs text-[#7c6f61]">Included in the package</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESTINATION CARDS ── */}
      <section ref={imagePanelRef} className="mx-auto max-w-7xl px-4 py-6 md:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          <DestinationCard
            title="Sanapur Lake"
            subtitle="Coracle rides, boulder reflections, and the best possible morning in Hampi."
            image={hampiRiver}
          />
          <DestinationCard
            title="Anegundi & Anjanadri"
            subtitle="Ancient fort viewpoints and the sacred hill of Lord Hanuman's birthplace."
            image={hampiRuins}
          />
          <DestinationCard
            title="Hampi Temples"
            subtitle="Stone chariots on the ₹50 note, Virupaksha's quiet sanctum, and Vijayanagara grandeur."
            image={hampiTemple}
          />
        </div>
      </section>

      {/* ── ITINERARY TIMELINE ── */}
      <section
        ref={timelineSectionRef}
        className="relative mx-auto mt-20 max-w-7xl px-4 pb-28 md:px-8"
      >
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8d7d68]">
            Journey plan
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#201c17] md:text-5xl">
            Friday night to Sunday evening
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#6c6053] md:text-[15px]">
            Three days woven into a single, unhurried story — from the overnight bus out of Hyderabad
            to the last golden hour at Hemakuta Hill.
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl">

          {/* SVG timeline path + bus */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-75 -translate-x-1/2 lg:block">
            <svg
              className="absolute left-1/2 top-0 h-full w-65 -translate-x-1/2 overflow-visible"
              viewBox="0 0 260 1400"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                ref={timelinePathRef}
                d="M130 20 C 42 130, 42 260, 130 360 C 218 460, 218 590, 130 690 C 42 790, 60 980, 130 1100 C 155 1180, 145 1280, 130 1360"
                stroke="#d8c8b3"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                ref={timelinePathProgressRef}
                d="M130 20 C 42 130, 42 260, 130 360 C 218 460, 218 590, 130 690 C 42 790, 60 980, 130 1100 C 155 1180, 145 1280, 130 1360"
                stroke="#b08a57"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <div
              ref={busIndicatorRef}
              className="absolute left-1/2 top-0 z-20 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-[#d6c7b5] bg-[#fbf7f1] text-[#7a5d39] shadow-[0_10px_30px_rgba(73,53,27,0.10)] lg:flex"
            >
              <BusFront className="h-5 w-5" />
            </div>
          </div>

          {/* Day cards */}
          <div className="space-y-14 md:space-y-20">
            {itinerary.map((item, index) => {
              const isLeft = index % 2 === 0;
              const isActive = index === activeIndex;

              return (
                <div
                  key={item.day}
                  ref={(el) => { cardRefs.current[index] = el; }}
                  className="relative grid items-center gap-6 lg:grid-cols-2"
                >
                  <div className={isLeft ? "lg:pr-20" : "lg:order-2 lg:pl-20"}>
                    <article
                      className={`overflow-hidden rounded-[30px] border transition-all duration-500 ${
                        isActive
                          ? "border-[#d0b892] bg-[#fbf7f1] shadow-[0_18px_50px_rgba(69,49,22,0.10)]"
                          : "border-[#ddd1c0] bg-[#fbf7f1]"
                      }`}
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,18,14,0.02),rgba(24,18,14,0.12)_52%,rgba(24,18,14,0.46)_100%)]" />
                        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2 md:left-5 md:top-5">
                          <span className="inline-flex rounded-full border border-white/40 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3b3128] backdrop-blur-sm">
                            {item.day}
                          </span>
                          <span className="inline-flex rounded-full border border-white/40 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3b3128] backdrop-blur-sm">
                            {item.meals}
                          </span>
                        </div>
                      </div>

                      <div className="px-5 py-5 md:px-7 md:py-7">
                        <h3 className="text-2xl font-black tracking-[-0.03em] text-[#201c17] md:text-3xl">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-[#645849]">{item.subtitle}</p>

                        <ul className="mt-6 space-y-3">
                          {item.points.map((point) => (
                            <li key={point} className="flex gap-3 text-sm leading-6 text-[#5c5047]">
                              <span className="mt-2.75 h-1.25 w-1.25 shrink-0 rounded-full bg-[#b08a57]" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-6 rounded-[22px] border border-[#e1d5c5] bg-[#f8f2e9] p-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b7b68]">
                            Notes
                          </p>
                          <div className="mt-3 space-y-2">
                            {item.notes.map((note) => (
                              <p key={note} className="text-xs leading-6 text-[#6b5e50]">
                                — {note}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>

                  <div className="relative hidden h-full lg:block">
                    <div
                      className={`absolute top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-[#d5c6b4] bg-[#fbf7f1] text-[#8a6941] shadow-[0_8px_24px_rgba(80,58,28,0.10)] ${
                        isLeft ? "-left-7" : "-right-7"
                      }`}
                    >
                      <BusFront className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── NOTES + BOOKING ── */}
      <section ref={notesSectionRef} className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
        <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">

          {/* Important Notes */}
          <div className="soft-reveal rounded-[30px] border border-[#ddd1c0] bg-[#fbf7f1] p-6 md:p-7">
            <h2 className="inline-flex items-center gap-2 text-2xl font-black tracking-[-0.03em] text-[#201c17]">
              <HeartPulse className="h-5 w-5 text-[#b08a57]" />
              Important Notes
            </h2>

            <ul className="mt-5 space-y-3 text-sm leading-7 text-[#645949]">
              <li>— Trip departs every Friday at ~10 PM from Hyderabad; back by Monday morning.</li>
              <li>— Minimum 10 travellers required to confirm the trip.</li>
              <li>— Advance of ₹1,000/adult required to reserve; full payment if booking within 1 day of departure.</li>
              <li>— Entry fees for monuments, coracle ride, and other activities are not included.</li>
              <li>— Stays are on sharing basis; room upgrades available at additional cost.</li>
              <li>— Modest clothing required for all temple visits.</li>
              <li>— Rates may vary during peak season (Diwali, Christmas, New Year).</li>
            </ul>

            {/* Pricing */}
            <div className="mt-6 rounded-4xl border border-[#e1d5c5] bg-[#f8f2e9] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b7b68]">
                Pricing (+ 5% GST)
              </p>
              <div className="mt-3 space-y-2 text-xs leading-6 text-[#6b5e50]">
                <p>6–8 Sharing Dorm — ₹4,499 / adult</p>
                <p>4-Sharing Room — ₹4,999 / adult</p>
                <p>3-Sharing Room — ₹5,299 / adult</p>
                <p>2-Sharing (Couple Room) — ₹5,499 / adult</p>
              </div>
            </div>
          </div>

          {/* Booking CTA */}
          <div className="soft-reveal relative overflow-hidden rounded-[30px] border border-[#ddd1c0] bg-[#201c17] p-6 md:p-8">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#b08a57]/10 blur-3xl" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d7c5ae]">
                  Booking
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#f6efe5]">
                  Weekend well spent. Every Friday.
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#d1c1ad]">
                  Pack light, join strangers, return with stories. Travloger handles the rest —
                  vehicle, stay, leader, and a local guide who brings Hampi's history to life.
                </p>
                <p className="mt-3 text-xs text-[#a08878]">
                  hello@travloger.in · +91 62813 92007 · travloger.in
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <MagneticButton>
                  <Button
                    asChild
                    className="h-12 rounded-full bg-[#f1e4d0] px-6 text-sm font-bold text-[#1e1913] hover:bg-[#eadbc2]"
                  >
                    <a href="/booking/hampi-escapade">Book Now</a>
                  </Button>
                </MagneticButton>

                <MagneticButton>
                  <a
                    href="https://wa.me/916281392007"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-[#f5ece1]"
                  >
                    WhatsApp
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <section className="border-t border-[#ded1c0]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-xs text-[#7e705f] md:flex-row md:items-center md:justify-between md:px-8">
          <p>Travloger India · Hampi Escapade</p>
          <p>Hyderabad — Hampi — Hyderabad · Every Friday</p>
          <p>GSTIN: 36AAWFD8280H1ZS</p>
        </div>
      </section>
    </div>
  );
}

// ── SUB-COMPONENTS (unchanged) ────────────────────────────────────────────────

function DestinationCard({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle: string;
  image: string;
}) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[#ddd1c0] bg-[#fbf7f1]">
      <div className="aspect-4/3 overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b7b67]">
          Destination
        </p>
        <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#201c17]">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-[#655949]">{subtitle}</p>
      </div>
    </div>
  );
}

function GlassStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-[22px] border border-[#ded3c4] bg-[#fbf7f1]/90 p-4"
    >
      <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7e715f]">
        <Icon className="h-4 w-4 text-[#b08a57]" />
        {label}
      </p>
      <p className="mt-2 text-sm font-bold text-[#201c17]">{value}</p>
    </motion.div>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const strength = 22;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x / strength, y: y / strength, duration: 0.3, ease: "power3.out" });
    };

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: "power3.out" });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return <div ref={ref} className="will-change-transform">{children}</div>;
}
