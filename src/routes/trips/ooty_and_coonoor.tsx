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
import heroBanner from "@/assets/Ooty_Coonoor.jpg";
import ootyHero from "@/assets/Hyderabad.webp";
import ootyTrain from "@/assets/Toy_Train_Coonoor_Tea Gardens.jpg";
import ootyTea from "@/assets/Pine_Forest.jpg";
import ootyMysore from "@/assets/Mysore_Bandipur_Ooty.jpg";
import ootyCoonoorTea from "@/assets/Coonoor_Tea_Gardens.jpg";


gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);


// ── DATA ─────────────────────────────────────────────────────────────────────


const itinerary = [
  {
    day: "Day 0 — Thu / Fri Night",
    title: "Departure from Hyderabad",
    subtitle: "The plains fade away as the Nilgiris call.",
    image: ootyHero,
    points: [
      "7:00 PM — Kacheguda Railway Station, Hyderabad.",
      "Board your private vehicle and settle in for the overnight journey.",
      "Snacks, conversations, and the quiet hum of the highway through the night.",
      "Expected arrival in Mysore by early morning.",
    ],
    meals: "None",
    notes: [
      "Arrive at Kacheguda Railway Station at least 15 minutes before departure.",
      "Departures run every Thursday and Friday at 7:00 PM.",
      "Timings are approximate and may vary depending on traffic conditions.",
    ],
  },
  {
    day: "Day 1 — Morning to Night",
    title: "Mysore · Bandipur · Ooty",
    subtitle: "Palaces, jungle passes, and a hilltop welcome.",
    image: ootyMysore,
    points: [
      "Reach Mysore by 10:00 AM — freshen up and have breakfast.",
      "Mysore Palace or Chamundi Hill — pick your flavour of grandeur.",
      "Drive through Bandipur Forest — a natural sanctuary straddling Karnataka and Tamil Nadu.",
      "Needle Rock View Point — dramatic rocky spires rising from the forest below.",
      "Pykara Waterfalls — tucked in a serene valley surrounded by shola forest.",
      "Shooting Point — one of Ooty's most cinematic vistas.",
      "Check in to your stay in Ooty for the night.",
    ],
    meals: "Breakfast",
    notes: [
      "Mysore Palace entry fees are not included in the package.",
      "Bandipur Forest stretch timings are regulated — the convoy route is followed.",
      "Carry a light jacket; Ooty evenings can be chilly even in summer.",
    ],
  },
  {
    day: "Day 2 — Full Day",
    title: "Toy Train · Coonoor · Tea Gardens",
    subtitle: "Mist, chai, and a train ride through the clouds.",
    image: ootyTrain,
    points: [
      "Board the iconic Nilgiri Mountain Railway (Toy Train) from Ooty Railway Station to Coonoor.",
      "Dolphin Nose View Point — a dramatic cliff offering sweeping views of Coonoor valley.",
      "Tea Garden or Sim's Park — stroll through manicured gardens perched on the hillside.",
      "Visit a working Tea Factory — see how the Nilgiri leaf becomes your morning cup.",
      "Boat Ride on Ooty Lake — a quiet, unhurried end to a full day.",
      "Return to Ooty for night stay.",
    ],
    meals: "Breakfast",
    notes: [
      "Toy Train tickets are to be purchased separately; availability subject to seasonal demand.",
      "Tea factory visits may be restricted on government holidays.",
      "Boat ride at Ooty Lake is an optional activity; entry fees not included.",
    ],
  },
  {
    day: "Day 3 — Morning",
    title: "Pine Forest · Departure · Hyderabad",
    subtitle: "One last breath of mountain air before the plains.",
    image: ootyTea,
    points: [
      "Wake up, freshen up, and step into the cool Ooty morning.",
      "Pine Forest — tall silver oaks and pine trees draped in morning mist.",
      "Begin the return drive toward Mysore.",
      "Lunch en route.",
      "Continue drive to Hyderabad — arrive by late night or early next morning.",
    ],
    meals: "Lunch",
    notes: [
      "Departure from Ooty is in the morning to ensure a reasonable drive back.",
      "Estimated return to Hyderabad is by late night on Day 3.",
      "Any additional stops on return are at the trip leader's discretion.",
    ],
  },
];


const includes = [
  "Pick-up & Drop",
  "Private Vehicle",
  "Accommodation",
  "Trip Leader",
  "Toy Train Ride",
  "Tolls & Taxes",
];


const routeStops = ["Hyderabad", "Mysore", "Ooty", "Coonoor"];


// ── ROUTE ────────────────────────────────────────────────────────────────────


export const Route = createFileRoute("/trips/ooty_and_coonoor")({
  head: () => ({
    meta: [
      { title: "Ooty & Coonoor Escapade — 2N 3D Weekend Getaway from Hyderabad" },
      {
        name: "description",
        content:
          "A premium weekend itinerary for Travloger's Ooty & Coonoor Escapade — Toy Train rides, Bandipur Forest, Dolphin Nose, tea gardens, and misty hillscapes. Ex-Hyderabad, every Thursday & Friday.",
      },
    ],
  }),
  component: OotyCoonoorPage,
});


// ── PAGE ─────────────────────────────────────────────────────────────────────


function OotyCoonoorPage() {
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
    <div className="bg-[#eef3ed] text-[#181f17]" ref={rootRef}>


      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="Ooty & Coonoor Escapade"
            className="hero-image h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,14,8,0.28),rgba(8,14,8,0.52)_35%,rgba(238,243,237,0.84)_82%,#eef3ed_100%)]" />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-4 pb-10 pt-36 md:px-8 md:pt-44">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e8fce6] backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#a8e6a3]" />
              Globo Traveller
            </motion.div>

            <h1
              ref={heroTitleRef}
              className="mt-6 max-w-5xl text-4xl font-black leading-[0.92] tracking-[-0.05em] text-[#f0fced] drop-shadow-[0_12px_26px_rgba(0,0,0,0.32)] sm:text-6xl lg:text-8xl"
            >
              Ooty & Coonoor
            </h1>

            <p
              ref={heroCopyRef}
              className="mt-5 max-w-2xl text-sm leading-7 text-[#cfe8cc] drop-shadow-[0_8px_18px_rgba(0,0,0,0.22)] sm:text-base"
            >
              Misty hill stations, a century-old Toy Train, and the scent of Nilgiri tea drifting
              through pine forests — a proper mountain weekend, every Thursday from Hyderabad.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton>
                <Button
                  asChild
                  className="h-12 rounded-full bg-[#edfaeb] px-6 text-sm font-bold text-[#181f17] hover:bg-white"
                >
                  <a href="/booking/ooty-coonoor">
                    Reserve Your Seat
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="https://wa.me/919705051052"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-black/20 px-6 text-sm font-semibold text-[#edfaeb] backdrop-blur-sm"
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
            <GlassStat icon={Compass} label="Trip Style" value="Hills + Nature" />
            <GlassStat icon={Calendar} label="Departure" value="Thu & Fri, 7 PM" />
          </div>
        </div>
      </section>


      {/* ── INCLUDES + ROUTE OVERVIEW ── */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[32px] border border-[#c8d9c6] bg-[#f4f8f3] p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6b836a]">
              Route overview
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#181f17] md:text-5xl">
              Plains out, clouds in.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#485947]">
              Leave Hyderabad on a Thursday evening, wake up in Mysore, drive through Bandipur,
              and spend two full days breathing Nilgiri air — Toy Trains, tea factories, and mist-draped
              valleys. Back before the week begins.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2">
              {routeStops.map((stop, idx) => (
                <div key={stop} className="flex items-center gap-2">
                  <span className="rounded-full border border-[#c4d4c2] bg-[#ebf2ea] px-3 py-1.5 text-xs font-medium text-[#2c3b2b]">
                    {stop}
                  </span>
                  {idx < routeStops.length - 1 ? (
                    <span className="text-[#8aa388]">—</span>
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
                className="rounded-[24px] border border-[#c8d9c6] bg-[#f4f8f3] p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-[#c4d4c2] bg-[#ebf2ea] text-[#4a7c47]">
                    <Check className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#181f17]">{item}</p>
                    <p className="text-xs text-[#617560]">Included in the package</p>
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
            title="Mysore & Bandipur"
            subtitle="A palace city at dawn and a jungle corridor alive with wildlife on the road to Ooty."
            image={ootyMysore}
          />
          <DestinationCard
            title="Nilgiri Toy Train"
            subtitle="A UNESCO World Heritage railway winding through tea estates and cloud-level bridges."
            image={ootyTrain}
          />
          <DestinationCard
            title="Coonoor Tea Gardens"
            subtitle="Rolling green slopes, Dolphin Nose cliffs, and the warm smell of freshly processed tea."
            image={ootyCoonoorTea}
          />
        </div>
      </section>


      {/* ── ITINERARY TIMELINE ── */}
      <section
        ref={timelineSectionRef}
        className="relative mx-auto mt-20 max-w-7xl px-4 pb-28 md:px-8"
      >
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6e836d]">
            Journey plan
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#181f17] md:text-5xl">
            Thursday evening to Sunday night
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#4e5e4d] md:text-[15px]">
            Three days in the Nilgiris — from the overnight drive out of Hyderabad to the last
            pine-scented morning before the journey home.
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl">

          {/* SVG timeline path + bus */}
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
                stroke="#b8cfb6"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                ref={timelinePathProgressRef}
                d="M130 20 C 42 130, 42 280, 130 400 C 218 520, 218 670, 130 790 C 42 910, 42 1060, 130 1180 C 218 1300, 218 1500, 130 1620 C 80 1700, 110 1800, 130 1860"
                stroke="#4a7c47"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <div
              ref={busIndicatorRef}
              className="absolute left-1/2 top-0 z-20 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-[#b8cfb6] bg-[#f4f8f3] text-[#3a6337] shadow-[0_10px_30px_rgba(30,60,28,0.10)] lg:flex"
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
                          ? "border-[#8ab887] bg-[#f4f8f3] shadow-[0_18px_50px_rgba(30,60,28,0.10)]"
                          : "border-[#c8d9c6] bg-[#f4f8f3]"
                      }`}
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,10,0.02),rgba(10,18,10,0.12)_52%,rgba(10,18,10,0.46)_100%)]" />
                        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2 md:left-5 md:top-5">
                          <span className="inline-flex rounded-full border border-white/40 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#243423] backdrop-blur-sm">
                            {item.day}
                          </span>
                          <span className="inline-flex rounded-full border border-white/40 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#243423] backdrop-blur-sm">
                            {item.meals}
                          </span>
                        </div>
                      </div>

                      <div className="px-5 py-5 md:px-7 md:py-7">
                        <h3 className="text-2xl font-black tracking-[-0.03em] text-[#181f17] md:text-3xl">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-[#475846]">{item.subtitle}</p>

                        <ul className="mt-6 space-y-3">
                          {item.points.map((point) => (
                            <li key={point} className="flex gap-3 text-sm leading-6 text-[#3e4e3d]">
                              <span className="mt-2.75 h-1.25 w-1.25 shrink-0 rounded-full bg-[#4a7c47]" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-6 rounded-[22px] border border-[#c4d4c2] bg-[#ebf2ea] p-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5e7a5c]">
                            Notes
                          </p>
                          <div className="mt-3 space-y-2">
                            {item.notes.map((note) => (
                              <p key={note} className="text-xs leading-6 text-[#4c5e4b]">
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
                      className={`absolute top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-[#b5ccb3] bg-[#f4f8f3] text-[#3a6337] shadow-[0_8px_24px_rgba(30,60,28,0.10)] ${
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
          <div className="soft-reveal rounded-[30px] border border-[#c8d9c6] bg-[#f4f8f3] p-6 md:p-7">
            <h2 className="inline-flex items-center gap-2 text-2xl font-black tracking-[-0.03em] text-[#181f17]">
              <HeartPulse className="h-5 w-5 text-[#4a7c47]" />
              Important Notes
            </h2>

            <ul className="mt-5 space-y-3 text-sm leading-7 text-[#475846]">
              <li>— Trip departs every Thursday and Friday at 7:00 PM from Kacheguda Railway Station.</li>
              <li>— This is a budget trip — comfort and cooperation from all travellers is appreciated.</li>
              <li>— Trip host holds the right to alter route, timings, or activities based on safety and conditions.</li>
              <li>— Entry fees for Mysore Palace, Toy Train, boat ride, and monuments are not included.</li>
              <li>— Travloger is not responsible for loss of valuables — avoid carrying gold, gadgets, or expensive items.</li>
              <li>— Modest clothing is required for all temple and heritage site visits.</li>
              <li>— Rates may vary during peak seasons (Diwali, Christmas, New Year).</li>
            </ul>
          </div>

          {/* Booking CTA */}
          <div className="soft-reveal relative overflow-hidden rounded-[30px] border border-[#c8d9c6] bg-[#181f17] p-6 md:p-8">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#4a7c47]/10 blur-3xl" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a8c4a6]">
                  Booking
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#edfaeb]">
                  The Nilgiris are calling. Every Thursday.
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#9db89b]">
                  Travloger handles the essentials — vehicle, stay, trip leader, and a local guide
                  who knows every curve of the mountain road.
                </p>
                <p className="mt-3 text-xs text-[#6e8a6c]">
                  <a
                    href="mailto:info@travloger.in"
                    className="hover:text-[#a8c4a6] transition-colors"
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
                    className="h-12 rounded-full bg-[#d6edcf] px-6 text-sm font-bold text-[#131a12] hover:bg-[#c4e2bc]"
                  >
                    <a href="/booking/ooty-coonoor">Book Now</a>
                  </Button>
                </MagneticButton>

                <MagneticButton>
                  <a
                    href="https://wa.me/919705051052"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-[#edfaeb]"
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
      <section className="border-t border-[#c4d4c2]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-xs text-[#627061] md:flex-row md:items-center md:justify-between md:px-8">
          <p>Travloger India · Ooty & Coonoor Escapade</p>
          <p>Hyderabad — Mysore — Ooty — Coonoor — Hyderabad · Every Thu & Fri</p>
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
    <div className="overflow-hidden rounded-[28px] border border-[#c8d9c6] bg-[#f4f8f3]">
      <div className="aspect-4/3 overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6b836a]">
          Destination
        </p>
        <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#181f17]">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-[#485947]">{subtitle}</p>
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
      className="rounded-[22px] border border-[#c4d4c2] bg-[#f4f8f3]/90 p-4"
    >
      <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5e7a5c]">
        <Icon className="h-4 w-4 text-[#4a7c47]" />
        {label}
      </p>
      <p className="mt-2 text-sm font-bold text-[#181f17]">{value}</p>
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
