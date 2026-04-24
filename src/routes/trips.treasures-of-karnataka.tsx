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
import heroBanner from "@/assets/Treasures_of_Karnataka.webp";
import hampiHero from "@/assets/hampip4.avif";
import hampiTemple from "@/assets/hampip1.jpg.jpeg";
import hampiRiver from "@/assets/hampip2.jpg.jpeg";
import hampiRuins from "@/assets/hampip3.webp";
import gokarnaBeach from "@/assets/gokarnap1.jpg.jpeg";
import gokarnaCoast from "@/assets/gokarnap2.jpeg";
import gokarnaSunset from "@/assets/gokarnap3.webp";
import gokarnaTemple from "@/assets/gokarnap4.jpg.jpeg";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const itinerary = [
  {
    day: "Day 1 - 24 Apr 2026",
    title: "Departure from Pune",
    subtitle: "Night departure with multiple pickup points.",
    image: hampiHero,
    points: [
      "Pune departure via Seater Traveler: BMCC College, FC Road (07:00 PM-08:00 PM), Xion Mall, Hinjewadi (08:00 PM-08:30 PM).",
      "Pune departure via Sleeper Bus: Wakad (07:40 PM), Hinjewadi (07:50 PM), Chandani Chowk (07:55 PM), Katraj (08:45 PM).",
      "Please arrive at your pickup point at least 30 minutes before departure.",
      "Journey continues overnight towards Hampi.",
    ],
    meals: "None",
    notes: [
      "Pickup timings are approximate and can be delayed due to traffic or long-weekend conditions.",
      "Sleeper bus departs from Mumbai route timings; track with your ticket link/message.",
      "Late arrival or missed bus boarding is not covered.",
    ],
  },
  {
    day: "Day 2 - 25 Apr 2026",
    title: "Arrival in Hampi",
    subtitle: "Riverside adventure, ruins, and sunset energy.",
    image: hampiRiver,
    points: [
      "Arrival in Hampi around 11:30 AM with breakfast stop on the way.",
      "Check-in, freshen up, and get ready for activities.",
      "Coracle ride on Tungabhadra River and optional cliff jumping (condition based).",
      "Late lunch after activities and sunset view from the other side of Hampi ruins.",
      "Dinner at a local restaurant.",
    ],
    meals: "Lunch",
    notes: [
      "Cliff jumping depends on safe water levels and dam gate conditions.",
      "Day 2 breakfast on arrival is not included; meals begin from lunch.",
      "Stay: Hotel Shree International / Delmont Resort or similar.",
    ],
  },
  {
    day: "Day 3 - 26 Apr 2026",
    title: "Hampi Exploration",
    subtitle: "Temple circuits, markets, and golden-hour architecture.",
    image: hampiTemple,
    points: [
      "Breakfast and checkout.",
      "Hampi temple run: Virupaksha Temple, Hampi Bazaar, Narasimha Temple, Lotus Temple, Ganesha Temple and nearby ruins.",
      "South Indian thali lunch.",
      "Local market exploration and souvenir shopping.",
      "Sunset at Vitthala Temple with Stone Chariot visit.",
      "Dinner en route to Murudeshwar.",
    ],
    meals: "Breakfast and Lunch",
    notes: [
      "Stay: Hotel Shreeram International / Shrikrishna International or similar.",
      "Carry hydration and footwear suitable for temple-walk distances.",
    ],
  },
  {
    day: "Day 4 - 27 Apr 2026",
    title: "Murudeshwar and Gokarna",
    subtitle: "Coastal temples, boating, and sea-facing sunsets.",
    image: gokarnaCoast,
    points: [
      "Early morning arrival in Yallapur/Gokarna around 03:00 AM and check-in.",
      "Rest until 09:00 AM and breakfast.",
      "Visit Murudeshwar Temple and the largest Shiva statue viewpoint.",
      "Proceed to Gokarna with Honnavar stop for boating or mangrove boardwalk.",
      "Visit Mahabaleshwar Temple and enjoy sunset at Gokarna or Murudeshwar (based on stay location).",
      "Begin return journey to Pune.",
    ],
    meals: "Breakfast and Lunch",
    notes: [
      "Honnavar boating is water-level dependent; boardwalk is arranged if boating is unavailable.",
      "Dress modestly while entering temple premises.",
    ],
  },
  {
    day: "Day 5 - 28 Apr 2026",
    title: "Arrival in Pune",
    subtitle: "Return with the same circuit services completed.",
    image: gokarnaSunset,
    points: [
      "Estimated arrival in Pune around 11:00 AM.",
      "Sleeper bus participants meet coordinator in Hampi.",
      "Services and itinerary remain the same; only bus category and boarding point differ.",
    ],
    meals: "None",
    notes: [
      "Board sleeper buses on time; private operators do not wait.",
      "Primary age group is 14-46 years; customized itineraries can be discussed for older participants.",
    ],
  },
];

const includes = ["Food", "Accommodation", "Instructor", "First Aid", "Travelling"];
const routeStops = ["Pune", "Hampi", "Murudeshwar", "Honnavar", "Gokarna"];

export const Route = createFileRoute("/trips/treasures-of-karnataka")({
  head: () => ({
    meta: [
      { title: "Treasures of Karnataka - Hampi Gokarna Murudeshwar Honnavar" },
      {
        name: "description",
        content:
          "A premium classic travel itinerary page for Treasures of Karnataka covering Hampi, Murudeshwar, Honnavar, and Gokarna in 4N/5D.",
      },
    ],
  }),
  component: TreasuresOfKarnatakaPage,
});

function TreasuresOfKarnatakaPage() {
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

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

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

        gsap.set(split.chars, {
          opacity: 0,
          yPercent: 100,
          rotateX: 12,
          transformOrigin: "50% 100%",
        });

        gsap.to(split.chars, {
          opacity: 1,
          yPercent: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.018,
          ease: "power4.out",
          delay: 0.08,
        });
      }

      if (heroCopyRef.current) {
        gsap.fromTo(
          heroCopyRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.28 }
        );
      }

      if (heroStatsRef.current) {
        gsap.fromTo(
          heroStatsRef.current.children,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.07,
            duration: 0.75,
            ease: "power3.out",
            delay: 0.42,
          }
        );
      }

      if (heroRef.current) {
        const heroImage = heroRef.current.querySelector(".hero-image");
        if (heroImage) {
          gsap.to(heroImage, {
            yPercent: 6,
            scale: 1.06,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 50, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 84%",
              once: true,
            },
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

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: timelineSectionRef.current,
            start: "top 18%",
            end: "bottom 82%",
            scrub: true,
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
            start: "top 18%",
            end: "bottom 82%",
            scrub: true,
          },
        });
      }

      if (imagePanelRef.current) {
        gsap.fromTo(
          imagePanelRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imagePanelRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      if (notesSectionRef.current) {
        const cards = notesSectionRef.current.querySelectorAll(".soft-reveal");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: notesSectionRef.current,
              start: "top 82%",
              once: true,
            },
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
            alt="Treasures of Karnataka"
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
              Classic Karnataka Circuit
            </motion.div>

            <h1
              ref={heroTitleRef}
              className="mt-6 max-w-5xl text-4xl font-black leading-[0.92] tracking-[-0.05em] text-[#fff7ea] drop-shadow-[0_12px_26px_rgba(0,0,0,0.32)] sm:text-6xl lg:text-8xl"
            >
              Treasures of Karnataka
            </h1>

            <p
              ref={heroCopyRef}
              className="mt-5 max-w-2xl text-sm leading-7 text-[#f1e3cf] drop-shadow-[0_8px_18px_rgba(0,0,0,0.22)] sm:text-base"
            >
              A slower, richer road journey through Hampi's ruins, Murudeshwar's sacred coast,
              Honnavar's waters, and Gokarna's sunset shoreline.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton>
                <Button
                  asChild
                  className="h-12 rounded-full bg-[#fff7ea] px-6 text-sm font-bold text-[#201c17] hover:bg-white"
                >
                  <a href="/booking/treasures-of-karnataka?date=24%20Apr%202026">
                    Reserve Your Seat
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="https://wa.me/917975550990"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-black/20 px-6 text-sm font-semibold text-[#fff7ea] backdrop-blur-sm"
                >
                  WhatsApp Concierge
                </a>
              </MagneticButton>
            </div>
          </div>

          <div ref={heroStatsRef} className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <GlassStat icon={Clock} label="Duration" value="4N / 5D" />
            <GlassStat icon={Mountain} label="Difficulty" value="Easy" />
            <GlassStat icon={Users} label="Age Group" value="12 - 40" />
            <GlassStat icon={Compass} label="Trip Style" value="Heritage + Coast" />
            <GlassStat icon={Calendar} label="Departure" value="24 Apr 2026" />
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
              Heritage first, coast after
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#655949]">
              The route begins in Hampi with temple landscapes and old stone architecture, then
              gradually moves toward sea air, sacred coastlines, and slower sunset evenings.
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
                    <p className="text-xs text-[#7c6f61]">Included in the experience</p>
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
            title="Hampi"
            subtitle="Stone chariots, temple corridors, and history in warm light."
            image={hampiRuins}
          />
          <DestinationCard
            title="Murudeshwar"
            subtitle="Sea-facing shrines and one of Karnataka's most dramatic sacred coastlines."
            image={gokarnaTemple}
          />
          <DestinationCard
            title="Gokarna"
            subtitle="Sunset beaches, softer evenings, and a quieter end to the route."
            image={gokarnaBeach}
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
            The route unfolds day by day
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#6c6053] md:text-[15px]">
            A continuous route line guides the trip visually from departure to the final return,
            with each day framed as part of one long overland story.
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl">
          {/* SVG path + bus indicator */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-75 -translate-x-1/2 lg:block">
            <svg
              className="absolute left-1/2 top-0 h-full w-65 -translate-x-1/2 overflow-visible"
              viewBox="0 0 260 2200"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                ref={timelinePathRef}
                d="M130 20 C 42 120, 42 240, 130 330 C 218 420, 218 540, 130 630 C 42 720, 42 840, 130 930 C 218 1020, 218 1140, 130 1230 C 42 1320, 42 1440, 130 1530 C 218 1620, 218 1740, 130 1830 C 42 1920, 70 2050, 130 2160"
                stroke="#d8c8b3"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                ref={timelinePathProgressRef}
                d="M130 20 C 42 120, 42 240, 130 330 C 218 420, 218 540, 130 630 C 42 720, 42 840, 130 930 C 218 1020, 218 1140, 130 1230 C 42 1320, 42 1440, 130 1530 C 218 1620, 218 1740, 130 1830 C 42 1920, 70 2050, 130 2160"
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
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
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
                                - {note}
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
          <div className="soft-reveal rounded-[30px] border border-[#ddd1c0] bg-[#fbf7f1] p-6 md:p-7">
            <h2 className="inline-flex items-center gap-2 text-2xl font-black tracking-[-0.03em] text-[#201c17]">
              <HeartPulse className="h-5 w-5 text-[#b08a57]" />
              Important Notes
            </h2>

            <ul className="mt-5 space-y-3 text-sm leading-7 text-[#645949]">
              <li>- Bus pickup and arrival timing can vary due to traffic and road conditions.</li>
              <li>- Carry a neck pillow for the overnight travel segments.</li>
              <li>- Cliff jumping and Honnavar boating are condition-based for safety.</li>
              <li>- Temple visits require modest clothing.</li>
              <li>- Keep hydration and easy footwear for temple and market walks.</li>
            </ul>
          </div>

          <div className="soft-reveal relative overflow-hidden rounded-[30px] border border-[#ddd1c0] bg-[#201c17] p-6 md:p-8">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#b08a57]/10 blur-3xl" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d7c5ae]">
                  Booking
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#f6efe5]">
                  Designed like a refined travel journal
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#d1c1ad]">
                  Cinematic photography, a classic route line, and quieter motion help the page feel
                  more premium and destination-led.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <MagneticButton>
                  <Button
                    asChild
                    className="h-12 rounded-full bg-[#f1e4d0] px-6 text-sm font-bold text-[#1e1913] hover:bg-[#eadbc2]"
                  >
                    <a href="/booking/treasures-of-karnataka?date=24%20Apr%202026">Book Now</a>
                  </Button>
                </MagneticButton>

                <MagneticButton>
                  <a
                    href="https://wa.me/917975550990"
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
          <p>Treasures of Karnataka</p>
          <p>Pune — Hampi — Murudeshwar — Honnavar — Gokarna</p>
        </div>
      </section>
    </div>
  );
}

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

      gsap.to(el, {
        x: x / strength,
        y: y / strength,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const handleLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div ref={ref} className="will-change-transform">
      {children}
    </div>
  );
}
