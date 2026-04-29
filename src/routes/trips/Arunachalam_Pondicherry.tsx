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
import heroBanner from "@/assets/Arunachalam.jpeg";
import arunaHero from "@/assets/Hyderabad.webp";
import arunaTemple from "@/assets/Arunachalam.jpeg";
import pondyFrench from "@/assets/French_Colony.jpg";
import mahabaliTemple from "@/assets/Mahabalipuram.jpg";


gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);


// ── DATA ─────────────────────────────────────────────────────────────────────


const itinerary = [
  {
    day: "Day 0 — Thu / Fri Night",
    title: "Departure from Hyderabad",
    subtitle: "A journey from the Deccan plateau to the sacred coast.",
    image: arunaHero,
    points: [
      "5:00 PM — Nampally Railway Station, Hyderabad.",
      "Board your sleeper train — Chennai bound, coast ahead.",
      "Settle in for the overnight journey with travel games and fellow explorers.",
      "Arrive Chennai by 7:00 AM the next morning.",
    ],
    meals: "None",
    notes: [
      "Arrive at Nampally Railway Station at least 20 minutes before departure.",
      "Departures run every Thursday and Friday at 5:00 PM.",
      "Sleeper-class train tickets (both ways) are included in the package.",
    ],
  },
  {
    day: "Day 1 — Morning to Night",
    title: "Chennai · Chengalpattu · Arunachalam",
    subtitle: "Sacred trails and the ancient lingams of Tiruvannamalai.",
    image: arunaTemple,
    points: [
      "Reach Chennai by 7:00 AM — board the pre-hired AC Tempo Traveller.",
      "Breakfast en route toward Arunachalam.",
      "Explore Chengalpattu if time permits.",
      "Reach Arunachalam by afternoon — check in and freshen up.",
      "Evening Girivalam path (14 km) — circumambulate the sacred Arunachala mountain.",
      "Visit all eight Lingam shrines set in the eight cardinal directions.",
      "Return to stay for dinner and an early rest.",
    ],
    meals: "Breakfast",
    notes: [
      "Girivalam is a 14 km barefoot walk on a spiritual circuit — wear comfortable footwear.",
      "Temple entry and special archana charges are not included.",
      "Carry a torch or phone light for the evening circuit.",
    ],
  },
  {
    day: "Day 2 — Full Day",
    title: "Ramana Ashram · Auroville · French Colony",
    subtitle: "Silence, golden domes, and colonial boulevards by the Bay.",
    image: pondyFrench,
    points: [
      "Wake up by 6:00 AM — optional morning time in Arunachalam town for shopping.",
      "Visit the Ramana Maharshi Ashram — a sanctuary of profound stillness.",
      "Drive to Auroville by 11:30 AM — explore the global township built around the Matrimandir.",
      "Check into your hotel in Pondicherry by 1:30 PM.",
      "Afternoon stroll through the French Colony — yellow villas, bougainvillea, and quiet streets.",
      "Evening beach walk along the Promenade — watch the Bay of Bengal turn orange.",
      "Back to stay by 8:30 PM; dinner.",
    ],
    meals: "None",
    notes: [
      "Auroville entry and Matrimandir inner chamber access are to be arranged separately.",
      "Pondicherry is best explored on foot or bicycle — both easily available.",
      "Modest dress is required at the Ashram.",
    ],
  },
  {
    day: "Day 3 — Full Day",
    title: "Pondicherry Heritage · Mahabalipuram · Departure",
    subtitle: "Ancient cathedrals, war memorials, and shore temples carved in stone.",
    image: mahabaliTemple,
    points: [
      "Wake up by 6:00 AM — breakfast.",
      "Chunnambur Boat House — a quiet, scenic morning on the backwaters.",
      "Basilica of the Sacred Heart of Jesus and Immaculate Conception Cathedral.",
      "Mahatma Gandhi Statue, French War Memorial, and the Old Light House.",
      "Drive to Mahabalipuram — explore the UNESCO World Heritage Shore Temple.",
      "Start toward the railway station by evening.",
      "Board the return train to Hyderabad — arrive the next morning.",
    ],
    meals: "Breakfast",
    notes: [
      "Mahabalipuram and church entry fees are payable separately.",
      "Return train departure from Chennai — timings shared closer to the trip date.",
      "A one-way surcharge of ₹400–500 may apply depending on train routing.",
    ],
  },
];


const includes = [
  "Train Tickets (2-way)",
  "2 Nights Accommodation",
  "AC Tempo Traveller",
  "Trip Organizer",
  "Driver & Tolls",
  "First Aid Kit",
];


const routeStops = ["Hyderabad", "Chennai", "Arunachalam", "Pondicherry", "Mahabalipuram"];


// ── ROUTE ────────────────────────────────────────────────────────────────────


export const Route = createFileRoute("/trips/Arunachalam_Pondicherry")({
  head: () => ({
    meta: [
      { title: "Arunachalam & Pondicherry — 2N 3D Weekend Getaway from Hyderabad" },
      {
        name: "description",
        content:
          "A premium weekend itinerary for Travloger's Arunachalam & Pondicherry Escapade — Girivalam path, Ramana Ashram, Auroville, French Colony, and Mahabalipuram Shore Temple. Ex-Hyderabad, every Thu & Fri.",
      },
    ],
  }),
  component: ArunaPondyPage,
});


// ── PAGE ─────────────────────────────────────────────────────────────────────


function ArunaPondyPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
  const heroCopyRef = useRef<HTMLParagraphElement | null>(null);
  const heroStatsRef = useRef<HTMLDivElement | null>(null);


  const timelineSectionRef = useRef<HTMLElement | null>(null);
  const timelinePathRef = useRef<SVGPathElement | null>(null);
  const timelinePathProgressRef = useRef<SVGPathElement | null>(null);
  const trainIndicatorRef = useRef<HTMLDivElement | null>(null);


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
        trainIndicatorRef.current &&
        window.innerWidth >= 1024
      ) {
        gsap.to(trainIndicatorRef.current, {
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
    <div className="bg-[#f9f4ee] text-[#1c1610]" ref={rootRef}>


      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="Arunachalam & Pondicherry"
            className="hero-image h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,8,4,0.28),rgba(14,8,4,0.52)_35%,rgba(249,244,238,0.84)_82%,#f9f4ee_100%)]" />
        </div>


        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-4 pb-10 pt-36 md:px-8 md:pt-44">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f5e8d8] backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#f0c98a]" />
              Globo Traveller
            </motion.div>


            <h1
              ref={heroTitleRef}
              className="mt-6 max-w-5xl text-4xl font-black leading-[0.92] tracking-[-0.05em] text-[#fdf6ec] drop-shadow-[0_12px_26px_rgba(0,0,0,0.32)] sm:text-6xl lg:text-8xl"
            >
              Aruna & Pondy
            </h1>


            <p
              ref={heroCopyRef}
              className="mt-5 max-w-2xl text-sm leading-7 text-[#e2cebc] drop-shadow-[0_8px_18px_rgba(0,0,0,0.22)] sm:text-base"
            >
              Walk the sacred 14 km Girivalam at dusk, wake up in Pondicherry's
              French Colony, and watch the Bay of Bengal glow at sunset — all in a single weekend
              from Hyderabad, by train.
            </p>


            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton>
                <Button
                  asChild
                  className="h-12 rounded-full bg-[#fdf3e6] px-6 text-sm font-bold text-[#1c1610] hover:bg-white"
                >
                  <a href="/booking/arunachalam-pondicherry">
                    Reserve Your Seat
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </MagneticButton>


              <MagneticButton>
                <a
                  href="https://wa.me/919705051052"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-black/20 px-6 text-sm font-semibold text-[#fdf3e6] backdrop-blur-sm"
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
            <GlassStat icon={Compass} label="Trip Style" value="Spiritual + Coastal" />
            <GlassStat icon={Calendar} label="Departure" value="Thu & Fri, 5 PM" />
          </div>
        </div>
      </section>


      {/* ── INCLUDES + ROUTE OVERVIEW ── */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[32px] border border-[#ddd0c0] bg-[#fdf8f2] p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8a7260]">
              Route overview
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#1c1610] md:text-5xl">
              Sacred hills to French shores.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#524032]">
              Board a sleeper train from Nampally on Thursday evening, walk the Girivalam
              at Arunachalam on Day 1, cross into Pondicherry's colonial streets on Day 2,
              and close the loop with Mahabalipuram's Shore Temple before heading home.
            </p>


            <div className="mt-7 flex flex-wrap items-center gap-2">
              {routeStops.map((stop, idx) => (
                <div key={stop} className="flex items-center gap-2">
                  <span className="rounded-full border border-[#d8cabb] bg-[#f5ede0] px-3 py-1.5 text-xs font-medium text-[#3a2c1e]">
                    {stop}
                  </span>
                  {idx < routeStops.length - 1 ? (
                    <span className="text-[#b09a84]">—</span>
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
                className="rounded-[24px] border border-[#ddd0c0] bg-[#fdf8f2] p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-[#d8cabb] bg-[#f5ede0] text-[#8c5e30]">
                    <Check className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#1c1610]">{item}</p>
                    <p className="text-xs text-[#7a6450]">Included in the package</p>
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
            title="Arunachalam"
            subtitle="The sacred mountain city of Tiruvannamalai — Girivalam at dusk, lingams in eight directions."
            image={arunaTemple}
          />
          <DestinationCard
            title="Pondicherry"
            subtitle="French Colony villas, Auroville's golden dome, and the Bay of Bengal at sunset."
            image={pondyFrench}
          />
          <DestinationCard
            title="Mahabalipuram"
            subtitle="UNESCO Shore Temples carved from granite on the Coromandel Coast."
            image={mahabaliTemple}
          />
        </div>
      </section>


      {/* ── ITINERARY TIMELINE ── */}
      <section
        ref={timelineSectionRef}
        className="relative mx-auto mt-20 max-w-7xl px-4 pb-28 md:px-8"
      >
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8a7260]">
            Journey plan
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#1c1610] md:text-5xl">
            Thursday evening to Sunday morning
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#5a4232] md:text-[15px]">
            Four days from the overnight train out of Nampally to the last temple
            at Mahabalipuram before the coast gives way to the highway home.
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
                stroke="#d8c4ac"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                ref={timelinePathProgressRef}
                d="M130 20 C 42 130, 42 280, 130 400 C 218 520, 218 670, 130 790 C 42 910, 42 1060, 130 1180 C 218 1300, 218 1500, 130 1620 C 80 1700, 110 1800, 130 1860"
                stroke="#8c5e30"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>


            <div
              ref={trainIndicatorRef}
              className="absolute left-1/2 top-0 z-20 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-[#d8c4ac] bg-[#fdf8f2] text-[#6e4420] shadow-[0_10px_30px_rgba(80,46,10,0.10)] lg:flex"
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
                          ? "border-[#c8a882] bg-[#fdf8f2] shadow-[0_18px_50px_rgba(80,46,10,0.10)]"
                          : "border-[#ddd0c0] bg-[#fdf8f2]"
                      }`}
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,10,4,0.02),rgba(18,10,4,0.12)_52%,rgba(18,10,4,0.46)_100%)]" />
                        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2 md:left-5 md:top-5">
                          <span className="inline-flex rounded-full border border-white/40 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2e2016] backdrop-blur-sm">
                            {item.day}
                          </span>
                          <span className="inline-flex rounded-full border border-white/40 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2e2016] backdrop-blur-sm">
                            {item.meals}
                          </span>
                        </div>
                      </div>


                      <div className="px-5 py-5 md:px-7 md:py-7">
                        <h3 className="text-2xl font-black tracking-[-0.03em] text-[#1c1610] md:text-3xl">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-[#524032]">{item.subtitle}</p>


                        <ul className="mt-6 space-y-3">
                          {item.points.map((point) => (
                            <li key={point} className="flex gap-3 text-sm leading-6 text-[#4a3828]">
                              <span className="mt-2.75 h-1.25 w-1.25 shrink-0 rounded-full bg-[#8c5e30]" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>


                        <div className="mt-6 rounded-[22px] border border-[#d8cabb] bg-[#f5ede0] p-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a7260]">
                            Notes
                          </p>
                          <div className="mt-3 space-y-2">
                            {item.notes.map((note) => (
                              <p key={note} className="text-xs leading-6 text-[#5c4838]">
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
                      className={`absolute top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-[#d4c0a8] bg-[#fdf8f2] text-[#6e4420] shadow-[0_8px_24px_rgba(80,46,10,0.10)] ${
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
          <div className="soft-reveal rounded-[30px] border border-[#ddd0c0] bg-[#fdf8f2] p-6 md:p-7">
            <h2 className="inline-flex items-center gap-2 text-2xl font-black tracking-[-0.03em] text-[#1c1610]">
              <HeartPulse className="h-5 w-5 text-[#8c5e30]" />
              Important Notes
            </h2>


            <ul className="mt-5 space-y-3 text-sm leading-7 text-[#524032]">
              <li>— Trip departs every Thursday and Friday at 5:00 PM from Nampally Railway Station.</li>
              <li>— This is a budget trip — comfort and cooperation from all travellers is appreciated.</li>
              <li>— Trip host holds the right to alter route, timings, or activities based on safety and conditions.</li>
              <li>— Food, entry tickets, jeep rides, and personal expenses are not included.</li>
              <li>— A special one-way surcharge of ₹400–500 may apply depending on train routing.</li>
              <li>— Travloger is not responsible for loss of valuables — avoid carrying gold, gadgets, or expensive items.</li>
              <li>— GST of 5% is applicable on the total package price.</li>
            </ul>
          </div>


          {/* Booking CTA */}
          <div className="soft-reveal relative overflow-hidden rounded-[30px] border border-[#ddd0c0] bg-[#1c1610] p-6 md:p-8">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#8c5e30]/10 blur-3xl" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c8a882]">
                  Booking
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#fdf3e6]">
                  Sacred hills to the French coast. Every Thursday.
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#b89878]">
                  Travloger handles the train, the AC tempo, the stay, and the guide —
                  you just show up at Nampally with an open mind.
                </p>
                <p className="mt-3 text-xs text-[#8a7060]">
                  <a
                    href="mailto:info@travloger.in"
                    className="hover:text-[#c8a882] transition-colors"
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
                    className="h-12 rounded-full bg-[#f5e8d4] px-6 text-sm font-bold text-[#180e06] hover:bg-[#eddfc8]"
                  >
                    <a href="/booking/arunachalam-pondicherry">Book Now</a>
                  </Button>
                </MagneticButton>


                <MagneticButton>
                  <a
                    href="https://wa.me/919705051052"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-[#fdf3e6]"
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
      <section className="border-t border-[#d8cabb]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-xs text-[#8a7260] md:flex-row md:items-center md:justify-between md:px-8">
          <p>Travloger India · Arunachalam & Pondicherry</p>
          <p>Hyderabad — Chennai — Arunachalam — Pondicherry — Hyderabad · Every Thu & Fri</p>
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
    <div className="overflow-hidden rounded-[28px] border border-[#ddd0c0] bg-[#fdf8f2]">
      <div className="aspect-4/3 overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a7260]">
          Destination
        </p>
        <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#1c1610]">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-[#524032]">{subtitle}</p>
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
      className="rounded-[22px] border border-[#d8cabb] bg-[#fdf8f2]/90 p-4"
    >
      <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a6450]">
        <Icon className="h-4 w-4 text-[#8c5e30]" />
        {label}
      </p>
      <p className="mt-2 text-sm font-bold text-[#1c1610]">{value}</p>
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
