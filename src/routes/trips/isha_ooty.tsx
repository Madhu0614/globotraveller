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
import heroBanner from "@/assets/Ooty_Coonoor.jpg";
import ishaHero from "@/assets/Hyderabad.webp";
import ishaAshram from "@/assets/Isha_Ooty.jpg";
import coonoorTrain from "@/assets/Toy_Train_Coonoor_Tea Gardens.jpg";
import ootyPine from "@/assets/Needle_Rock.jpg";


gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);


// ── DATA ─────────────────────────────────────────────────────────────────────


const itinerary = [
  {
    day: "Day 0 — Thu / Fri Night",
    title: "Departure from Hyderabad",
    subtitle: "The city lights fade, the Nilgiris await.",
    image: ishaHero,
    points: [
      "7:00 PM — Kacheguda Railway Station, Hyderabad.",
      "Board your sleeper train bound for Mysore.",
      "Overnight journey across the Deccan and into the foothills.",
      "Arrive Mysore by 9:40 AM the next morning.",
    ],
    meals: "None",
    notes: [
      "Arrive at Kacheguda Railway Station at least 20 minutes before departure.",
      "Departures run every Thursday and Friday at 7:00 PM.",
      "Sleeper class train tickets (both ways) are included in the package.",
    ],
  },
  {
    day: "Day 1 — Morning to Night",
    title: "Mysore · Isha Yoga Centre · Coimbatore",
    subtitle: "The Adiyogi face, the evening aarti, and a bonfire under the stars.",
    image: ishaAshram,
    points: [
      "Reach Mysore by 9:40 AM — freshen up at the hotel rooms (30 minutes).",
      "Board the pre-hired Tempo Traveller and drive toward Coimbatore.",
      "Arrive at Isha Yoga Centre — visit Adiyogi, the 112-foot face of Shiva.",
      "Explore the ashram grounds at leisure.",
      "Evening Aarti at the ashram — a deeply immersive spiritual experience.",
      "Music, dispersal, and bonfire at night.",
      "Overnight stay in Coimbatore.",
    ],
    meals: "None",
    notes: [
      "Modest dress is mandatory at the Isha Yoga Centre — avoid shorts and sleeveless tops.",
      "Entry tickets and darshan fees at Isha are not included in the package.",
      "Photography rules at the ashram must be followed at all times.",
    ],
  },
  {
    day: "Day 2 — Full Day",
    title: "Coonoor · Toy Train · Ooty",
    subtitle: "Dolphin's Nose, a century-old mountain railway, and chocolate at 2,240 m.",
    image: coonoorTrain,
    points: [
      "Wake up by 5:00 AM — freshen up and start toward Coonoor.",
      "Dolphin's Nose View Point — dramatic overhang with a sheer drop into misty valley.",
      "Toy Train from Coonoor to Ooty — a UNESCO World Heritage mountain railway through tea estates.",
      "Tea Garden & Factory visit — see how Nilgiri tea is grown, plucked, and processed.",
      "Chocolate Museum — taste artisan chocolates made from Ooty's highland cocoa.",
      "Check into your stay in Ooty for the night.",
    ],
    meals: "None",
    notes: [
      "Toy Train tickets are not included — book early as seats fill up fast.",
      "The Coonoor–Ooty toy train ride takes approximately 1.5 hours.",
      "Carry a light jacket — Ooty temperatures drop sharply after sunset.",
    ],
  },
  {
    day: "Day 3 — Morning",
    title: "Needle Rock · Bandipur Forest · Pine Forest · Mysore · Departure",
    subtitle: "Misty ridges, wildlife corridors, and the last stretch home.",
    image: ootyPine,
    points: [
      "Wake up and freshen up in Ooty.",
      "Needle Rock View Point — a volcanic rock pinnacle jutting out of the Nilgiri ridgeline.",
      "Bandipur Forest drive — transit through one of India's premier tiger reserves.",
      "Shooting Point and Pine Forest — iconic Ooty landscapes made famous by Bollywood.",
      "Drive back toward Mysore.",
      "Board the return train from Mysore by evening.",
      "Arrive back in Hyderabad by 5:40 AM the next morning.",
    ],
    meals: "None",
    notes: [
      "Bandipur Forest transit is subject to forest department timings — no stops permitted.",
      "Return train departure from Mysore — timings shared closer to the trip date.",
      "A one-way surcharge of ₹400–500 may apply depending on train availability.",
    ],
  },
];


const includes = [
  "Train Tickets (2-way)",
  "2 Nights Accommodation",
  "Mysore–Mysore Tempo",
  "Trip Host",
  "Driver & Tolls",
  "Travel Charges",
];


const routeStops = ["Hyderabad", "Mysore", "Isha Ashram", "Coonoor", "Ooty"];


// ── ROUTE ────────────────────────────────────────────────────────────────────


export const Route = createFileRoute("/trips/isha_ooty")({
  head: () => ({
    meta: [
      { title: "Isha & Ooty — 2N 3D Weekend Getaway from Hyderabad" },
      {
        name: "description",
        content:
          "A premium weekend itinerary for Travloger's Isha & Ooty — Adiyogi, evening aarti, Dolphin's Nose, UNESCO toy train, tea gardens, and Nilgiri pine forests. Ex-Hyderabad, every Thu & Fri.",
      },
    ],
  }),
  component: IshaOotyPage,
});


// ── PAGE ─────────────────────────────────────────────────────────────────────


function IshaOotyPage() {
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
    <div className="bg-[#f0ede8] text-[#1c1814]" ref={rootRef}>


      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="Isha & Ooty"
            className="hero-image h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,6,0.28),rgba(10,8,6,0.52)_35%,rgba(240,237,232,0.84)_82%,#f0ede8_100%)]" />
        </div>


        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-4 pb-10 pt-36 md:px-8 md:pt-44">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f5ede0] backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#e8c97a]" />
              Globo Traveller
            </motion.div>


            <h1
              ref={heroTitleRef}
              className="mt-6 max-w-5xl text-4xl font-black leading-[0.92] tracking-[-0.05em] text-[#fdf6ec] drop-shadow-[0_12px_26px_rgba(0,0,0,0.32)] sm:text-6xl lg:text-8xl"
            >
              Isha & Ooty
            </h1>


            <p
              ref={heroCopyRef}
              className="mt-5 max-w-2xl text-sm leading-7 text-[#ddd0bc] drop-shadow-[0_8px_18px_rgba(0,0,0,0.22)] sm:text-base"
            >
              Stand before the 112-foot Adiyogi at dusk, ride the UNESCO toy train through
              Nilgiri tea estates, and walk into pine forests at 2,240 metres —
              all in a single weekend from Hyderabad, by train.
            </p>


            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton>
                <Button
                  asChild
                  className="h-12 rounded-full bg-[#fdf6ec] px-6 text-sm font-bold text-[#1c1814] hover:bg-white"
                >
                  <a href="/booking/isha-ooty">
                    Reserve Your Seat
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </MagneticButton>


              <MagneticButton>
                <a
                  href="https://wa.me/919705051052"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-black/20 px-6 text-sm font-semibold text-[#fdf6ec] backdrop-blur-sm"
                >
                  WhatsApp Us
                </a>
              </MagneticButton>
            </div>
          </div>


          <div ref={heroStatsRef} className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <GlassStat icon={Clock} label="Duration" value="2N / 3D" />
            <GlassStat icon={Mountain} label="Difficulty" value="Easy" />
            <GlassStat icon={Users} label="Group Size" value="Open Group" />
            <GlassStat icon={Compass} label="Trip Style" value="Spiritual + Hills" />
            <GlassStat icon={Calendar} label="Departure" value="Thu & Fri, 7 PM" />
          </div>
        </div>
      </section>


      {/* ── INCLUDES + ROUTE OVERVIEW ── */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[32px] border border-[#d8cfc4] bg-[#faf7f3] p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a6e60]">
              Route overview
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#1c1814] md:text-5xl">
              Ashram to highland, all in one weekend.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#524838]">
              Board the overnight train from Kacheguda on Thursday, arrive in Mysore by morning,
              and spend three days moving through Isha's sacred grounds, Coonoor's misty viewpoints,
              and Ooty's pine-covered hills before the train brings you home.
            </p>


            <div className="mt-7 flex flex-wrap items-center gap-2">
              {routeStops.map((stop, idx) => (
                <div key={stop} className="flex items-center gap-2">
                  <span className="rounded-full border border-[#d0c6b8] bg-[#f3ede4] px-3 py-1.5 text-xs font-medium text-[#362c22]">
                    {stop}
                  </span>
                  {idx < routeStops.length - 1 ? (
                    <span className="text-[#a09484]">—</span>
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
                className="rounded-[24px] border border-[#d8cfc4] bg-[#faf7f3] p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-[#d0c6b8] bg-[#f3ede4] text-[#8a6840]">
                    <Check className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#1c1814]">{item}</p>
                    <p className="text-xs text-[#6c6050]">Included in the package</p>
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
            title="Isha Yoga Centre"
            subtitle="Adiyogi's towering face at dusk, the evening aarti, and the stillness of the ashram grounds."
            image={ishaAshram}
          />
          <DestinationCard
            title="Coonoor & Toy Train"
            subtitle="Dolphin's Nose overhang, Nilgiri tea estates, and a UNESCO mountain railway to Ooty."
            image={coonoorTrain}
          />
          <DestinationCard
            title="Ooty Highlands"
            subtitle="Pine forests, Needle Rock, and the Bandipur wildlife corridor on the way home."
            image={ootyPine}
          />
        </div>
      </section>


      {/* ── ITINERARY TIMELINE ── */}
      <section
        ref={timelineSectionRef}
        className="relative mx-auto mt-20 max-w-7xl px-4 pb-28 md:px-8"
      >
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7a6e60]">
            Journey plan
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#1c1814] md:text-5xl">
            Thursday evening to Sunday morning
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#5a4c3c] md:text-[15px]">
            Four days from the overnight train out of Kacheguda to the last pine forest
            before the return journey pulls into Hyderabad at 5:40 AM.
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
                stroke="#d0c4b4"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                ref={timelinePathProgressRef}
                d="M130 20 C 42 130, 42 280, 130 400 C 218 520, 218 670, 130 790 C 42 910, 42 1060, 130 1180 C 218 1300, 218 1500, 130 1620 C 80 1700, 110 1800, 130 1860"
                stroke="#8a6840"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>


            <div
              ref={busIndicatorRef}
              className="absolute left-1/2 top-0 z-20 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-[#d0c4b4] bg-[#faf7f3] text-[#6a5030] shadow-[0_10px_30px_rgba(70,48,20,0.10)] lg:flex"
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
                          ? "border-[#c8aa80] bg-[#faf7f3] shadow-[0_18px_50px_rgba(70,48,20,0.10)]"
                          : "border-[#d8cfc4] bg-[#faf7f3]"
                      }`}
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,12,8,0.02),rgba(16,12,8,0.12)_52%,rgba(16,12,8,0.46)_100%)]" />
                        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2 md:left-5 md:top-5">
                          <span className="inline-flex rounded-full border border-white/40 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2e2418] backdrop-blur-sm">
                            {item.day}
                          </span>
                          <span className="inline-flex rounded-full border border-white/40 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2e2418] backdrop-blur-sm">
                            {item.meals}
                          </span>
                        </div>
                      </div>


                      <div className="px-5 py-5 md:px-7 md:py-7">
                        <h3 className="text-2xl font-black tracking-[-0.03em] text-[#1c1814] md:text-3xl">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-[#524838]">{item.subtitle}</p>


                        <ul className="mt-6 space-y-3">
                          {item.points.map((point) => (
                            <li key={point} className="flex gap-3 text-sm leading-6 text-[#4a4030]">
                              <span className="mt-2.75 h-1.25 w-1.25 shrink-0 rounded-full bg-[#8a6840]" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>


                        <div className="mt-6 rounded-[22px] border border-[#d0c6b8] bg-[#f3ede4] p-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a6e5c]">
                            Notes
                          </p>
                          <div className="mt-3 space-y-2">
                            {item.notes.map((note) => (
                              <p key={note} className="text-xs leading-6 text-[#5c5040]">
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
                      className={`absolute top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-[#ccc0b0] bg-[#faf7f3] text-[#6a5030] shadow-[0_8px_24px_rgba(70,48,20,0.10)] ${
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
          <div className="soft-reveal rounded-[30px] border border-[#d8cfc4] bg-[#faf7f3] p-6 md:p-7">
            <h2 className="inline-flex items-center gap-2 text-2xl font-black tracking-[-0.03em] text-[#1c1814]">
              <HeartPulse className="h-5 w-5 text-[#8a6840]" />
              Important Notes
            </h2>


            <ul className="mt-5 space-y-3 text-sm leading-7 text-[#524838]">
              <li>— Trip departs every Thursday and Friday at 7:00 PM from Kacheguda Railway Station.</li>
              <li>— This is a budget trip — comfort and cooperation from all travellers is appreciated.</li>
              <li>— Trip host holds the right to alter route, timings, or activities based on safety and conditions.</li>
              <li>— Food expenses, entry tickets, and toy train fares are not included in the package.</li>
              <li>— Modest clothing is mandatory at the Isha Yoga Centre — no shorts or sleeveless tops.</li>
              <li>— A one-way surcharge of ₹400–500 may apply depending on train availability.</li>
              <li>— Travloger is not responsible for loss of valuables — avoid carrying gold, gadgets, or expensive items.</li>
              <li>— GST of 5% is applicable on the total package price.</li>
            </ul>
          </div>


          {/* Booking CTA */}
          <div className="soft-reveal relative overflow-hidden rounded-[30px] border border-[#d8cfc4] bg-[#1c1814] p-6 md:p-8">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#8a6840]/10 blur-3xl" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c8aa80]">
                  Booking
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#fdf6ec]">
                  Ashram at dusk, pine forests at dawn. Every Thursday.
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#b09878]">
                  Travloger handles the train, the tempo, the stay, and the host —
                  you just show up at Kacheguda with an open heart.
                </p>
                <p className="mt-3 text-xs text-[#887060]">
                  <a
                    href="mailto:info@travloger.in"
                    className="hover:text-[#c8aa80] transition-colors"
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
                    className="h-12 rounded-full bg-[#f3e8d4] px-6 text-sm font-bold text-[#180e06] hover:bg-[#ecdfc8]"
                  >
                    <a href="/booking/isha-ooty">Book Now</a>
                  </Button>
                </MagneticButton>


                <MagneticButton>
                  <a
                    href="https://wa.me/919705051052"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-[#fdf6ec]"
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
      <section className="border-t border-[#d0c6b8]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-xs text-[#7a6e60] md:flex-row md:items-center md:justify-between md:px-8">
          <p>Travloger India · Isha & Ooty</p>
          <p>Hyderabad — Mysore — Isha — Coonoor — Ooty — Hyderabad · Every Thu & Fri</p>
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
    <div className="overflow-hidden rounded-[28px] border border-[#d8cfc4] bg-[#faf7f3]">
      <div className="aspect-4/3 overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a6e60]">
          Destination
        </p>
        <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#1c1814]">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-[#524838]">{subtitle}</p>
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
      className="rounded-[22px] border border-[#d0c6b8] bg-[#faf7f3]/90 p-4"
    >
      <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6c6050]">
        <Icon className="h-4 w-4 text-[#8a6840]" />
        {label}
      </p>
      <p className="mt-2 text-sm font-bold text-[#1c1814]">{value}</p>
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
