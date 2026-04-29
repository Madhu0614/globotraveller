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
  Mountain,
  Sparkles,
  Train,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import gsap from "gsap";
import SplitType from "split-type";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import heroBanner from "@/assets/Wayanad_Hill_Station.avif";
import wayanadHero from "@/assets/Hyderabad.webp";
import wayanadDam from "@/assets/Banasura_Sagar_Dam.jpg";
import wayanadForest from "@/assets/Chembra_Peak_Falls.jpg";
import wayanadFalls from "@/assets/Edakkal_Caves.jpg";


gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);


// ── DATA ─────────────────────────────────────────────────────────────────────


const itinerary = [
  {
    day: "Day 0 — Thu / Fri Night",
    title: "Departure from Hyderabad",
    subtitle: "Sleeper berths, starry windows, and the Western Ghats ahead.",
    image: wayanadHero,
    points: [
      "7:05 PM — Kacheguda Railway Station, Hyderabad.",
      "Board your sleeper-class train and settle in for the overnight journey.",
      "Wake up to changing landscapes as the plains give way to the Ghats.",
      "Arrive Mysore by 9:00 AM the following morning.",
    ],
    meals: "None",
    notes: [
      "Arrive at Kacheguda Railway Station at least 20 minutes before departure.",
      "Sleeper class train tickets (both ways) are included in the package.",
      "A special one-way surcharge of ₹400–500 may apply depending on train availability.",
    ],
  },
  {
    day: "Day 1 — Morning to Night",
    title: "Mysore · Banasura Sagar Dam · Lakidi · Zipline",
    subtitle: "Asia's largest earthen dam and a zipline over the jungle canopy.",
    image: wayanadDam,
    points: [
      "Reach Mysore by 9:00 AM — freshen up in the rooms provided.",
      "Drive from Mysore into Wayanad through the lush Kabini–Sulthan Bathery corridor.",
      "Banasura Sagar Dam — the largest earthen dam in India, surrounded by rolling green islands.",
      "Lakidi View Point — the gateway to Wayanad, draped in misty forest.",
      "Zipline over the jungle canopy — an adrenaline rush with a view.",
      "Check in to your homestay, settle in, and enjoy a warm Kerala dinner.",
    ],
    meals: "Dinner",
    notes: [
      "Entry fees and zipline charges are not included in the package.",
      "Drive from Mysore to Wayanad is approximately 3–4 hours.",
      "Carry light casuals and a rain jacket — Wayanad can receive sudden showers.",
    ],
  },
  {
    day: "Day 2 — Full Day",
    title: "Chembra Peak · Soochipara Falls · Pookode Lake",
    subtitle: "A heart-shaped lake on a summit, a cascade through the forest.",
    image: wayanadForest,
    points: [
      "Early morning start for Chembra Peak — Wayanad's highest point at 2,100 m, home to a heart-shaped lake at the top.",
      "Trek through thick grassland and shola forest — beginner to moderate difficulty.",
      "Descend and head to Soochipara (Sentinel Rock) Waterfalls — a three-tiered cascade deep in the forest.",
      "Afternoon at Pookode Lake — a rare freshwater lake nestled inside a forest reserve.",
      "Optional bamboo rafting on the lake.",
      "Return to homestay for bonfire, Kerala dinner, and group games.",
    ],
    meals: "Breakfast & Dinner",
    notes: [
      "Chembra Peak trek requires a permit — fees not included.",
      "Trekking shoes and a water bottle are essential for Day 2.",
      "Chembra Peak may be restricted during heavy monsoon — an alternative will be arranged.",
    ],
  },
  {
    day: "Day 3 — Morning",
    title: "Edakkal Caves · Departure · Hyderabad",
    subtitle: "Ancient petroglyphs, one last jungle breath, then home.",
    image: wayanadFalls,
    points: [
      "Wake up, freshen up, and enjoy a final Kerala breakfast at the homestay.",
      "Edakkal Caves — Stone Age rock carvings etched over 6,000 years ago, reached via a short jungle climb.",
      "Descend and begin the return drive toward Mysore.",
      "Board the return train to Hyderabad from Mysore.",
      "Arrive back in Hyderabad the following morning.",
    ],
    meals: "Breakfast",
    notes: [
      "Edakkal Caves entry fees are not included in the package.",
      "Return train departure from Mysore — timing shared closer to the trip date.",
      "Arrival in Hyderabad is early morning the next day.",
    ],
  },
];


const includes = [
  "Train Tickets (2-way)",
  "Homestay Stay",
  "Local Transport",
  "Trip Organizer",
  "Tolls & Taxes",
  "Driver Charges",
];


const routeStops = ["Hyderabad", "Mysore", "Wayanad"];


// ── ROUTE ────────────────────────────────────────────────────────────────────


export const Route = createFileRoute("/trips/wayanad")({
  head: () => ({
    meta: [
      { title: "Wayanad Escapade — 2N 3D Weekend Getaway from Hyderabad" },
      {
        name: "description",
        content:
          "A premium weekend itinerary for Travloger's Wayanad Escapade — Banasura Sagar Dam, Chembra Peak trek, Soochipara Falls, Edakkal Caves, and jungle homestays. Ex-Hyderabad, every Thursday & Friday.",
      },
    ],
  }),
  component: WayanadEscapadePage,
});


// ── PAGE ─────────────────────────────────────────────────────────────────────


function WayanadEscapadePage() {
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
    <div className="bg-[#eaf0ea] text-[#141c14]" ref={rootRef}>


      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="Wayanad Escapade"
            className="hero-image h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,12,4,0.30),rgba(4,12,4,0.55)_35%,rgba(234,240,234,0.84)_82%,#eaf0ea_100%)]" />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-4 pb-10 pt-36 md:px-8 md:pt-44">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d6f5d0] backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#88d982]" />
              Globo Traveller
            </motion.div>

            <h1
              ref={heroTitleRef}
              className="mt-6 max-w-5xl text-4xl font-black leading-[0.92] tracking-[-0.05em] text-[#eaf8e6] drop-shadow-[0_12px_26px_rgba(0,0,0,0.38)] sm:text-6xl lg:text-8xl"
            >
              Wayanad Wilds
            </h1>

            <p
              ref={heroCopyRef}
              className="mt-5 max-w-2xl text-sm leading-7 text-[#bcdbb6] drop-shadow-[0_8px_18px_rgba(0,0,0,0.24)] sm:text-base"
            >
              Zip over jungle canopy, stand inside 6,000-year-old caves, and sleep in a Kerala
              homestay while the forest breathes around you. Every Thursday from Hyderabad by train.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton>
                <Button
                  asChild
                  className="h-12 rounded-full bg-[#e6f7e2] px-6 text-sm font-bold text-[#141c14] hover:bg-white"
                >
                  <a href="/booking/wayanad">
                    Reserve Your Seat
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="https://wa.me/919705051052"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-black/20 px-6 text-sm font-semibold text-[#e6f7e2] backdrop-blur-sm"
                >
                  WhatsApp Us
                </a>
              </MagneticButton>
            </div>
          </div>

          <div ref={heroStatsRef} className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <GlassStat icon={Clock} label="Duration" value="2N / 3D" />
            <GlassStat icon={Mountain} label="Difficulty" value="Easy–Moderate" />
            <GlassStat icon={Users} label="Group Size" value="Open Group" />
            <GlassStat icon={Compass} label="Trip Style" value="Jungle + Heritage" />
            <GlassStat icon={Calendar} label="Departure" value="Thu & Fri, 7:05 PM" />
          </div>
        </div>
      </section>


      {/* ── INCLUDES + ROUTE OVERVIEW ── */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[32px] border border-[#b8ccb6] bg-[#f2f7f1] p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5e7a5a]">
              Route overview
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#141c14] md:text-5xl">
              Train out, jungle in.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#3e5040]">
              Board the overnight sleeper from Kacheguda, wake up in Mysore, and drive into the
              Western Ghats. Three days of Wayanad's finest — waterfalls, ancient caves, a heart-shaped
              summit lake, and a Kerala homestay in the forest.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2">
              {routeStops.map((stop, idx) => (
                <div key={stop} className="flex items-center gap-2">
                  <span className="rounded-full border border-[#b4c8b2] bg-[#e6f0e4] px-3 py-1.5 text-xs font-medium text-[#243426]">
                    {stop}
                  </span>
                  {idx < routeStops.length - 1 ? (
                    <span className="text-[#7e9a7c]">—</span>
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
                className="rounded-[24px] border border-[#b8ccb6] bg-[#f2f7f1] p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-[#b4c8b2] bg-[#e6f0e4] text-[#3a6837]">
                    <Check className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#141c14]">{item}</p>
                    <p className="text-xs text-[#567054]">Included in the package</p>
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
            title="Banasura Sagar Dam"
            subtitle="India's largest earthen dam — emerald islands rising from a still, wide reservoir."
            image={wayanadDam}
          />
          <DestinationCard
            title="Chembra Peak & Falls"
            subtitle="A heart-shaped lake at 2,100 m and a three-tiered waterfall crashing through forest."
            image={wayanadForest}
          />
          <DestinationCard
            title="Edakkal Caves"
            subtitle="Stone Age petroglyphs etched 6,000 years ago inside a natural rock cleft in the hills."
            image={wayanadFalls}
          />
        </div>
      </section>


      {/* ── ITINERARY TIMELINE ── */}
      <section
        ref={timelineSectionRef}
        className="relative mx-auto mt-20 max-w-7xl px-4 pb-28 md:px-8"
      >
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5e7a5a]">
            Journey plan
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#141c14] md:text-5xl">
            Thursday night to Sunday morning
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#425442] md:text-[15px]">
            Four days woven into a single forest story — from the sleeper train out of Kacheguda
            to the last misty morning at Edakkal before the journey home.
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl">

          {/* SVG timeline path + train */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-75 -translate-x-1/2 lg:block">
            <svg
              className="absolute left-1/2 top-0 h-full w-65 -translate-x-1/2 overflow-visible"
              viewBox="0 0 260 1900"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                ref={timelinePathRef}
                d="M130 20 C 42 130, 42 280, 130 400 C 218 520, 218 670, 130 790 C 42 910, 42 1060, 130 1180 C 218 1300, 218 1500, 130 1620 C 80 1700, 110 1800, 130 1860"
                stroke="#a8c4a5"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                ref={timelinePathProgressRef}
                d="M130 20 C 42 130, 42 280, 130 400 C 218 520, 218 670, 130 790 C 42 910, 42 1060, 130 1180 C 218 1300, 218 1500, 130 1620 C 80 1700, 110 1800, 130 1860"
                stroke="#3a6837"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <div
              ref={busIndicatorRef}
              className="absolute left-1/2 top-0 z-20 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-[#a8c4a5] bg-[#f2f7f1] text-[#2e5630] shadow-[0_10px_30px_rgba(20,50,18,0.12)] lg:flex"
            >
              <Train className="h-5 w-5" />
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
                          ? "border-[#7aab77] bg-[#f2f7f1] shadow-[0_18px_50px_rgba(20,50,18,0.10)]"
                          : "border-[#b8ccb6] bg-[#f2f7f1]"
                      }`}
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,14,6,0.02),rgba(6,14,6,0.12)_52%,rgba(6,14,6,0.48)_100%)]" />
                        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2 md:left-5 md:top-5">
                          <span className="inline-flex rounded-full border border-white/40 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1e2e1e] backdrop-blur-sm">
                            {item.day}
                          </span>
                          <span className="inline-flex rounded-full border border-white/40 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1e2e1e] backdrop-blur-sm">
                            {item.meals}
                          </span>
                        </div>
                      </div>

                      <div className="px-5 py-5 md:px-7 md:py-7">
                        <h3 className="text-2xl font-black tracking-[-0.03em] text-[#141c14] md:text-3xl">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-[#3e5040]">{item.subtitle}</p>

                        <ul className="mt-6 space-y-3">
                          {item.points.map((point) => (
                            <li key={point} className="flex gap-3 text-sm leading-6 text-[#364838]">
                              <span className="mt-2.75 h-1.25 w-1.25 shrink-0 rounded-full bg-[#3a6837]" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-6 rounded-[22px] border border-[#b0c8ae] bg-[#e6f0e4] p-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4e6e4c]">
                            Notes
                          </p>
                          <div className="mt-3 space-y-2">
                            {item.notes.map((note) => (
                              <p key={note} className="text-xs leading-6 text-[#405242]">
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
                      className={`absolute top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-[#a8c4a5] bg-[#f2f7f1] text-[#2e5630] shadow-[0_8px_24px_rgba(20,50,18,0.10)] ${
                        isLeft ? "-left-7" : "-right-7"
                      }`}
                    >
                      <Train className="h-5 w-5" />
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
          <div className="soft-reveal rounded-[30px] border border-[#b8ccb6] bg-[#f2f7f1] p-6 md:p-7">
            <h2 className="inline-flex items-center gap-2 text-2xl font-black tracking-[-0.03em] text-[#141c14]">
              <HeartPulse className="h-5 w-5 text-[#3a6837]" />
              Important Notes
            </h2>

            <ul className="mt-5 space-y-3 text-sm leading-7 text-[#3e5040]">
              <li>— Trip departs every Thursday and Friday at 7:05 PM from Kacheguda Railway Station.</li>
              <li>— This is a budget trip — comfort and cooperation from all travellers is appreciated.</li>
              <li>— Trip host holds the right to alter route, timings, or activities based on safety and conditions.</li>
              <li>— Entry tickets, jeep rides, food, and personal expenses are not included.</li>
              <li>— A special one-way surcharge of ₹400–500 may apply depending on train routing.</li>
              <li>— Travloger is not responsible for loss of valuables — avoid carrying gold, gadgets, or expensive items.</li>
              <li>— GST of 5% is applicable on the package price.</li>
            </ul>
          </div>

          {/* Booking CTA */}
          <div className="soft-reveal relative overflow-hidden rounded-[30px] border border-[#b8ccb6] bg-[#141c14] p-6 md:p-8">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#3a6837]/12 blur-3xl" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8ab887]">
                  Booking
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#e6f7e2]">
                  Into the jungle. Every Thursday.
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#7a9e78]">
                  Travloger handles the train, the homestay, and the guide —
                  you just show up at Kacheguda with a backpack and a free weekend.
                </p>
                <p className="mt-3 text-xs text-[#567054]">
                  <a
                    href="mailto:info@travloger.in"
                    className="hover:text-[#8ab887] transition-colors"
                  >
                    info@travloger.in
                  </a>{" "}
                  · +91 97050 51052 · travloger.in
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <MagneticButton>
                  <Button
                    asChild
                    className="h-12 rounded-full bg-[#cce8c8] px-6 text-sm font-bold text-[#101810] hover:bg-[#bcddb8]"
                  >
                    <a href="/booking/wayanad">Book Now</a>
                  </Button>
                </MagneticButton>

                <MagneticButton>
                  <a
                    href="https://wa.me/919705051052"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-[#e6f7e2]"
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
      <section className="border-t border-[#b0c8ae]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-xs text-[#567054] md:flex-row md:items-center md:justify-between md:px-8">
          <p>Travloger India · Wayanad Escapade</p>
          <p>Hyderabad — Mysore — Wayanad — Hyderabad · Every Thu & Fri</p>
          <p>GSTIN: 36AAWFD8280H1ZS</p>
        </div>
      </section>
    </div>
  );
}


// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────


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
    <div className="overflow-hidden rounded-[28px] border border-[#b8ccb6] bg-[#f2f7f1]">
      <div className="aspect-4/3 overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5e7a5a]">
          Destination
        </p>
        <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#141c14]">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-[#3e5040]">{subtitle}</p>
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
      className="rounded-[22px] border border-[#b4c8b2] bg-[#f2f7f1]/90 p-4"
    >
      <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4e6e4c]">
        <Icon className="h-4 w-4 text-[#3a6837]" />
        {label}
      </p>
      <p className="mt-2 text-sm font-bold text-[#141c14]">{value}</p>
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
