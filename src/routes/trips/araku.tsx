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
import heroBanner from "@/assets/Araku_Valley_Hill_Station.avif";
import arakuHero from "@/assets/Araku_Valley.jpg";
import hyderabadDeparture from "@/assets/Hyderabad.webp";
import borraCaves from "@/assets/Borra_Caves.jpg";
import visakhapatnamCity from "@/assets/Visakhapatnam.jpg";
import simhachalamTemple from "@/assets/Simhachalam.jpg";


gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);


// ── DATA ─────────────────────────────────────────────────────────────────────


const itinerary = [
  {
    day: "Day 0 — Thu / Fri Night",
    title: "Departure from Hyderabad",
    subtitle: "Sleeper berths and the Eastern Ghats waiting in the dark.",
    image: hyderabadDeparture,
    points: [
      "5:00 PM — Nampally Railway Station, Hyderabad.",
      "Board your sleeper train bound for Araku Valley.",
      "Overnight journey through the Eastern Ghats — one of India's most scenic rail routes.",
      "Wake up to thick forest, tribal villages, and misty valley views.",
    ],
    meals: "None",
    notes: [
      "Arrive at Nampally Railway Station at least 20 minutes before departure.",
      "Departures run every Thursday and Friday at 5:00 PM.",
      "Sleeper class (non-AC) train tickets both ways are included in the package.",
    ],
  },
  {
    day: "Day 1 — Full Day",
    title: "Galikonda · Borra Caves · Katiki Falls · Araku",
    subtitle: "Ancient limestone caverns, roaring waterfalls, and valley coffee.",
    image: borraCaves,
    points: [
      "Galikonda View Point — sweeping sunrise panorama over the forested Eastern Ghats.",
      "Borra Caves — one of India's largest cave systems, filled with stalactites and natural sculptures.",
      "Katiki Waterfalls — a hidden cascade tucked deep inside the tribal forest.",
      "Araku Coffee Museum — discover the story of Araku's acclaimed organic highland coffee.",
      "Local garden visits, mustard plantation walk, and the Tribal Museum.",
      "Evening campfire and live music — overnight camping in Araku Valley.",
    ],
    meals: "None",
    notes: [
      "Entry fees for Borra Caves and other sites are not included in the package.",
      "Wear comfortable shoes — the Katiki Falls path involves a forest trek.",
      "Campfire and music are part of the included experience.",
    ],
  },
  {
    day: "Day 2 — Full Day",
    title: "Chaprai · Simhachalam · Kailasgiri · RK Beach",
    subtitle: "From the tribal hills to Vizag's seafront in a single sweep.",
    image: visakhapatnamCity,
    points: [
      "Early morning visit to Chaprai — a scenic tribal village in the valley.",
      "Begin the drive toward Visakhapatnam.",
      "Simhachalam Temple — the revered Varahalakshmi Narasimha shrine on the hilltop.",
      "Kailasgiri Hill Park — cable car rides and panoramic views over Vizag and the Bay of Bengal.",
      "RK Beach — the city's landmark seafront promenade.",
      "Aircraft Museum and INS Kurusura Submarine Museum — a rare look inside a real submarine.",
      "Overnight stay in Vizag.",
    ],
    meals: "None",
    notes: [
      "Simhachalam Temple entry is free; special darshan tickets are chargeable.",
      "Kailasgiri cable car charges are not included.",
      "Submarine Museum timings may vary — confirm entry on the day.",
    ],
  },
  {
    day: "Day 3 — Morning",
    title: "Rushikonda · Venkataramana Temple · Departure",
    subtitle: "One last beach morning before the train home.",
    image: simhachalamTemple,
    points: [
      "Explore nearby temples in the morning.",
      "TTD Venkataramana Temple — a peaceful Tirumala Tirupati Devasthanams shrine in Vizag.",
      "Rushikonda Beach — one of Andhra's finest blue-flag beaches with golden sands.",
      "Ramanaidu Studios — a glimpse into Tollywood's production history.",
      "Start back to the railway station by evening.",
      "Board return train to Hyderabad — arrive the following morning.",
    ],
    meals: "None",
    notes: [
      "Rushikonda Beach is ideal for a short morning swim — carry a change of clothes.",
      "Return train departure from Vizag — timings shared closer to the trip date.",
      "A one-way surcharge of ₹400–500 may apply depending on train routing.",
    ],
  },
];


const includes = [
  "Train Tickets (2-way)",
  "2 Nights Accommodation",
  "Transport for 3 Days",
  "Trip Organizer",
  "Campfire & Music",
  "Driver & Tolls",
];


const routeStops = ["Hyderabad", "Araku Valley", "Visakhapatnam"];


// ── ROUTE ────────────────────────────────────────────────────────────────────


export const Route = createFileRoute("/trips/araku")({
  head: () => ({
    meta: [
      { title: "Araku 4-in-1 — 2N 3D Weekend Getaway from Hyderabad" },
      {
        name: "description",
        content:
          "A premium weekend itinerary for Travloger's Araku 4-in-1 — Borra Caves, Katiki Falls, Araku Coffee Museum, Vizag beaches, Simhachalam Temple, and a submarine museum. Ex-Hyderabad, every Thu & Fri.",
      },
    ],
  }),
  component: ArakuPage,
});


// ── PAGE ─────────────────────────────────────────────────────────────────────


function ArakuPage() {
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
    <div className="bg-[#f0f4f0] text-[#161c16]" ref={rootRef}>


      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="Araku 4-in-1"
            className="hero-image h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,14,6,0.28),rgba(6,14,6,0.52)_35%,rgba(240,244,240,0.84)_82%,#f0f4f0_100%)]" />
        </div>


        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-4 pb-10 pt-36 md:px-8 md:pt-44">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e8f5e4] backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#a8d8a0]" />
              Globo Traveller
            </motion.div>


            <h1
              ref={heroTitleRef}
              className="mt-6 max-w-5xl text-4xl font-black leading-[0.92] tracking-[-0.05em] text-[#edf6eb] drop-shadow-[0_12px_26px_rgba(0,0,0,0.32)] sm:text-6xl lg:text-8xl"
            >
              Araku 4-in-1
            </h1>


            <p
              ref={heroCopyRef}
              className="mt-5 max-w-2xl text-sm leading-7 text-[#c4dcc0] drop-shadow-[0_8px_18px_rgba(0,0,0,0.22)] sm:text-base"
            >
              Ancient limestone caves, tribal coffee valleys, a real submarine to walk through,
              and golden beaches — four destinations in three days from Hyderabad by train,
              every Thursday.
            </p>


            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton>
                <Button
                  asChild
                  className="h-12 rounded-full bg-[#edf6eb] px-6 text-sm font-bold text-[#161c16] hover:bg-white"
                >
                  <a href="/booking/araku">
                    Reserve Your Seat
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </MagneticButton>


              <MagneticButton>
                <a
                  href="https://wa.me/919705051052"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-black/20 px-6 text-sm font-semibold text-[#edf6eb] backdrop-blur-sm"
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
            <GlassStat icon={Compass} label="Trip Style" value="Nature + Coast" />
            <GlassStat icon={Calendar} label="Departure" value="Thu & Fri, 5 PM" />
          </div>
        </div>
      </section>


      {/* ── INCLUDES + ROUTE OVERVIEW ── */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[32px] border border-[#c2d4be] bg-[#f5f8f4] p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#607a5c]">
              Route overview
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#161c16] md:text-5xl">
              Valley, caves, coast, city.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#3c5038]">
              Board the overnight train from Nampally, wake up inside the Eastern Ghats, and spend
              three days moving through four distinct worlds — Araku's tribal highlands, ancient
              Borra Caves, Vizag's seafront, and its temple-topped hills.
            </p>


            <div className="mt-7 flex flex-wrap items-center gap-2">
              {routeStops.map((stop, idx) => (
                <div key={stop} className="flex items-center gap-2">
                  <span className="rounded-full border border-[#bcceb8] bg-[#e8f0e6] px-3 py-1.5 text-xs font-medium text-[#263824]">
                    {stop}
                  </span>
                  {idx < routeStops.length - 1 ? (
                    <span className="text-[#84a07e]">—</span>
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
                className="rounded-[24px] border border-[#c2d4be] bg-[#f5f8f4] p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-[#bcceb8] bg-[#e8f0e6] text-[#3c7035]">
                    <Check className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#161c16]">{item}</p>
                    <p className="text-xs text-[#587054]">Included in the package</p>
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
            title="Araku Valley"
            subtitle="Tribal coffee estates, a living museum, and campsites under the Eastern Ghats sky."
            image={arakuHero}
          />
          <DestinationCard
            title="Borra Caves & Katiki Falls"
            subtitle="India's largest stalactite cave system and a hidden waterfall deep in the forest."
            image={borraCaves}
          />
          <DestinationCard
            title="Visakhapatnam"
            subtitle="Kailasgiri hilltop, a real submarine to explore, and the Bay of Bengal at RK Beach."
            image={visakhapatnamCity}
          />
        </div>
      </section>


      {/* ── ITINERARY TIMELINE ── */}
      <section
        ref={timelineSectionRef}
        className="relative mx-auto mt-20 max-w-7xl px-4 pb-28 md:px-8"
      >
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#607a5c]">
            Journey plan
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#161c16] md:text-5xl">
            Thursday night to Sunday morning
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#445840] md:text-[15px]">
            Four days through the Eastern Ghats — from the sleeper train out of Nampally
            to the last sunrise at Rushikonda Beach before heading home.
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
                stroke="#b8ccb4"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                ref={timelinePathProgressRef}
                d="M130 20 C 42 130, 42 280, 130 400 C 218 520, 218 670, 130 790 C 42 910, 42 1060, 130 1180 C 218 1300, 218 1500, 130 1620 C 80 1700, 110 1800, 130 1860"
                stroke="#3c7035"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>


            <div
              ref={trainIndicatorRef}
              className="absolute left-1/2 top-0 z-20 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-[#b8ccb4] bg-[#f5f8f4] text-[#2e5828] shadow-[0_10px_30px_rgba(20,54,16,0.10)] lg:flex"
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
                          ? "border-[#80b478] bg-[#f5f8f4] shadow-[0_18px_50px_rgba(20,54,16,0.10)]"
                          : "border-[#c2d4be] bg-[#f5f8f4]"
                      }`}
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,14,6,0.02),rgba(6,14,6,0.12)_52%,rgba(6,14,6,0.46)_100%)]" />
                        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2 md:left-5 md:top-5">
                          <span className="inline-flex rounded-full border border-white/40 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1e2e1a] backdrop-blur-sm">
                            {item.day}
                          </span>
                          <span className="inline-flex rounded-full border border-white/40 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1e2e1a] backdrop-blur-sm">
                            {item.meals}
                          </span>
                        </div>
                      </div>


                      <div className="px-5 py-5 md:px-7 md:py-7">
                        <h3 className="text-2xl font-black tracking-[-0.03em] text-[#161c16] md:text-3xl">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-[#3c5038]">{item.subtitle}</p>


                        <ul className="mt-6 space-y-3">
                          {item.points.map((point) => (
                            <li key={point} className="flex gap-3 text-sm leading-6 text-[#344830]">
                              <span className="mt-2.75 h-1.25 w-1.25 shrink-0 rounded-full bg-[#3c7035]" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>


                        <div className="mt-6 rounded-[22px] border border-[#bcceb8] bg-[#e8f0e6] p-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#527050]">
                            Notes
                          </p>
                          <div className="mt-3 space-y-2">
                            {item.notes.map((note) => (
                              <p key={note} className="text-xs leading-6 text-[#3e5440]">
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
                      className={`absolute top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-[#b4c8b0] bg-[#f5f8f4] text-[#2e5828] shadow-[0_8px_24px_rgba(20,54,16,0.10)] ${
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
          <div className="soft-reveal rounded-[30px] border border-[#c2d4be] bg-[#f5f8f4] p-6 md:p-7">
            <h2 className="inline-flex items-center gap-2 text-2xl font-black tracking-[-0.03em] text-[#161c16]">
              <HeartPulse className="h-5 w-5 text-[#3c7035]" />
              Important Notes
            </h2>


            <ul className="mt-5 space-y-3 text-sm leading-7 text-[#3c5038]">
              <li>— Trip departs every Thursday and Friday at 5:00 PM from Nampally Railway Station.</li>
              <li>— This is a budget trip — comfort and cooperation from all travellers is appreciated.</li>
              <li>— Trip host holds the right to alter route, timings, or activities based on safety and conditions.</li>
              <li>— Food, entry tickets, and personal expenses are not included.</li>
              <li>— A special one-way surcharge of ₹400–500 may apply depending on train routing.</li>
              <li>— Travloger is not responsible for loss of valuables — avoid carrying gold, gadgets, or expensive items.</li>
              <li>— GST of 5% is applicable on the total package price.</li>
            </ul>
          </div>


          {/* Booking CTA */}
          <div className="soft-reveal relative overflow-hidden rounded-[30px] border border-[#c2d4be] bg-[#161c16] p-6 md:p-8">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#3c7035]/10 blur-3xl" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#90bc8a]">
                  Booking
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#edf6eb]">
                  Four destinations. One weekend. Every Thursday.
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#78a072]">
                  Travloger handles the train, the stay, and the guide — you just show up
                  at Nampally with a backpack and the whole Eastern Ghats ahead of you.
                </p>
                <p className="mt-3 text-xs text-[#587054]">
                  <a
                    href="mailto:info@travloger.in"
                    className="hover:text-[#90bc8a] transition-colors"
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
                    className="h-12 rounded-full bg-[#cce8c6] px-6 text-sm font-bold text-[#101810] hover:bg-[#bcddb6]"
                  >
                    <a href="/booking/araku">Book Now</a>
                  </Button>
                </MagneticButton>


                <MagneticButton>
                  <a
                    href="https://wa.me/919705051052"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-[#edf6eb]"
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
      <section className="border-t border-[#bcceb8]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-xs text-[#607a5c] md:flex-row md:items-center md:justify-between md:px-8">
          <p>Travloger India · Araku 4-in-1</p>
          <p>Hyderabad — Araku Valley — Visakhapatnam — Hyderabad · Every Thu & Fri</p>
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
    <div className="overflow-hidden rounded-[28px] border border-[#c2d4be] bg-[#f5f8f4]">
      <div className="aspect-4/3 overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#607a5c]">
          Destination
        </p>
        <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#161c16]">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-[#3c5038]">{subtitle}</p>
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
      className="rounded-[22px] border border-[#bcceb8] bg-[#f5f8f4]/90 p-4"
    >
      <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#527050]">
        <Icon className="h-4 w-4 text-[#3c7035]" />
        {label}
      </p>
      <p className="mt-2 text-sm font-bold text-[#161c16]">{value}</p>
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
