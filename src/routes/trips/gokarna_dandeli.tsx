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
import heroBanner from "@/assets/Gokarna_Dandeli_Weekend.jpg";
import dandeliHero from "@/assets/Hyderabad.webp";
import dandeliWater from "@/assets/Dandeli_Water_Adventure.jpg";
import gokarnaBeach from "@/assets/Gokarna_Om_Beach.jpg";
import murudeshwar from "@/assets/Mangroves.jpg";


gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);


// ── DATA ─────────────────────────────────────────────────────────────────────


const itinerary = [
  {
    day: "Day 0 — Night",
    title: "Departure from Hyderabad",
    subtitle: "The highway opens up, the Western Ghats pull you in.",
    image: dandeliHero,
    points: [
      "Board your overnight bus / vehicle from Hyderabad toward Hubli.",
      "Arrive Hubli by early morning — board the pre-arranged Tempo Traveller.",
      "Drive to Dandeli — estimated arrival by 10:30 AM.",
      "Check-in starts at 11:00 AM.",
    ],
    meals: "None",
    notes: [
      "Departure point and timings shared upon booking confirmation.",
      "This is a budget backpacking experience — not a luxury tour.",
      "Seats are on a first-come-first-served basis at the pickup point.",
    ],
  },
  {
    day: "Day 1 — Full Day",
    title: "Dandeli · Water Activities · Rain Dance · Campfire",
    subtitle: "Kayak the Kali, spin inside a zorb, and dance in the rain.",
    image: dandeliWater,
    points: [
      "Arrive Dandeli by 10:30 AM — check-in at 11:00 AM.",
      "If rooms are not yet available, use the common washrooms to freshen up.",
      "Breakfast: 9:00 AM – 10:30 AM at the stay.",
      "Collect your receipt at reception and proceed to the water activities zone — driver will drop you.",
      "3 included water activities: Kayaking · River Zorbing · River Boating.",
      "Return from water activities — rooms will be segregated by the organiser in the afternoon.",
      "Lunch: 1:00 PM – 3:00 PM · Rain Dance: 7:30 PM – 9:00 PM.",
      "Dinner: 8:30 PM – 10:00 PM · Group Campfire: 10:00 PM onwards.",
    ],
    meals: "Breakfast, Lunch & Dinner",
    notes: [
      "Show the receipt at the water activities zone — organiser will be present throughout.",
      "Rain dance timings are fixed — plan your rest accordingly.",
      "Dandeli stay: 5–8 sharing basis (as per organiser segregation).",
    ],
  },
  {
    day: "Day 2 — Full Day",
    title: "Vibhuti Falls · Om Beach · Mahabaleshwar Temple · Murudeshwar",
    subtitle: "A waterfall trek, a sunset coast, and an ancient temple before dark.",
    image: gokarnaBeach,
    points: [
      "Start early at 6:00 AM – 7:00 AM from Dandeli.",
      "Vibhuti Waterfalls — a scenic trek through the Western Ghats forest.",
      "Reach Om Beach by 3:00 PM — 1 hour at the beach (till 4:30–5:00 PM).",
      "Namaste Café restrooms available for dress change before temple visit.",
      "Traditional wear required — Men: Lungi / Puncha · Women: Saree or Churidar.",
      "Mahabaleshwar Temple, Gokarna — one of the most sacred Shiva temples on the Konkan coast.",
      "Depart for Murudeshwar — overnight stay.",
    ],
    meals: "None",
    notes: [
      "Reach Om Beach by 3:00 PM strictly — heavy traffic after 5:00 PM on this stretch.",
      "Mahabaleshwar Temple closes at 8:00 PM — do not delay at Om Beach.",
      "Dress change can also be done in the vehicle if café restrooms are crowded (your own arrangement).",
    ],
  },
  {
    day: "Day 3 — Morning",
    title: "Murudeshwar · Mangroves · Honnavar Boating · Hubli · Hyderabad",
    subtitle: "The tallest Shiva, mangrove channels, and the long road home.",
    image: murudeshwar,
    points: [
      "Morning Murudeshwar darshan — Lord Shiva statue (2nd tallest in the world) and Murudeshwar Temple.",
      "Mangrove walk — serene backwater channels along the Uttara Kannada coast.",
      "Honnavar boating — a peaceful finale on the Sharavathi estuary.",
      "Lunch stop by 1:30–2:00 PM en route to Hubli.",
      "Drive from Honnavar to Hubli — 4 to 5 hours.",
      "Board return vehicle / train from Hubli toward Hyderabad.",
    ],
    meals: "Lunch",
    notes: [
      "Day 3 timing is critical — missing any schedule means missing the return train.",
      "Follow the organiser's instructions strictly — one delayed member affects the entire group.",
      "Murudeshwar stay: 4–5 sharing basis (standard / budget property).",
    ],
  },
];


const includes = [
  "Hyderabad–Hyderabad Transport",
  "2 Nights Accommodation",
  "Meals as per itinerary",
  "3 Water Activities",
  "Trip Organiser",
  "Driver, Tolls & Taxes",
];


const routeStops = ["Hyderabad", "Dandeli", "Gokarna", "Murudeshwar", "Hubli"];


// ── ROUTE ────────────────────────────────────────────────────────────────────


export const Route = createFileRoute("/trips/gokarna_dandeli")({
  head: () => ({
    meta: [
      { title: "Gokarna & Dandeli — 2N 3D Adventure from Hyderabad" },
      {
        name: "description",
        content:
          "A premium weekend itinerary for Travloger's Gokarna & Dandeli — kayaking and zorbing on the Kali River, Om Beach sunset, Mahabaleshwar Temple, Murudeshwar darshan, and Honnavar mangroves. Ex-Hyderabad.",
      },
    ],
  }),
  component: GokarnaDateliPage,
});


// ── PAGE ─────────────────────────────────────────────────────────────────────


function GokarnaDateliPage() {
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
    <div className="bg-[#e8f0ed] text-[#141c18]" ref={rootRef}>


      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="Gokarna & Dandeli"
            className="hero-image h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,14,10,0.28),rgba(4,14,10,0.54)_35%,rgba(232,240,237,0.84)_82%,#e8f0ed_100%)]" />
        </div>


        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-4 pb-10 pt-36 md:px-8 md:pt-44">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c8e8d8] backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#7cd4a8]" />
              Globo Traveller
            </motion.div>


            <h1
              ref={heroTitleRef}
              className="mt-6 max-w-5xl text-4xl font-black leading-[0.92] tracking-[-0.05em] text-[#e4f4ec] drop-shadow-[0_12px_26px_rgba(0,0,0,0.36)] sm:text-6xl lg:text-8xl"
            >
              Gokarna & Dandeli
            </h1>


            <p
              ref={heroCopyRef}
              className="mt-5 max-w-2xl text-sm leading-7 text-[#a8cfc0] drop-shadow-[0_8px_18px_rgba(0,0,0,0.24)] sm:text-base"
            >
              Kayak the rapids of the Kali River, spin inside a water zorb, dance in the rain,
              watch the sun sink behind Om Beach, and stand before the world's second-tallest Shiva —
              all in one weekend from Hyderabad.
            </p>


            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton>
                <Button
                  asChild
                  className="h-12 rounded-full bg-[#e4f4ec] px-6 text-sm font-bold text-[#141c18] hover:bg-white"
                >
                  <a href="/booking/gokarna-dandeli">
                    Reserve Your Seat
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </MagneticButton>


              <MagneticButton>
                <a
                  href="https://wa.me/919705051052"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-black/20 px-6 text-sm font-semibold text-[#e4f4ec] backdrop-blur-sm"
                >
                  WhatsApp Us
                </a>
              </MagneticButton>
            </div>
          </div>


          <div ref={heroStatsRef} className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <GlassStat icon={Clock} label="Duration" value="2N / 3D" />
            <GlassStat icon={Mountain} label="Difficulty" value="Easy–Moderate" />
            <GlassStat icon={Users} label="Group Stay" value="5–8 Sharing" />
            <GlassStat icon={Compass} label="Trip Style" value="Adventure + Coast" />
            <GlassStat icon={Calendar} label="Departure" value="Weekends" />
          </div>
        </div>
      </section>


      {/* ── INCLUDES + ROUTE OVERVIEW ── */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[32px] border border-[#b8d0c4] bg-[#f2f7f4] p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#3e6e58]">
              Route overview
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#141c18] md:text-5xl">
              River rapids, sacred beaches, and ancient temples.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#2c4c3c]">
              An overnight ride from Hyderabad drops you into Dandeli's Kali River adventure zone.
              Two days later you're watching the sun drop behind Om Beach in Gokarna and standing
              before Murudeshwar's iconic Shiva — all on a backpacker's budget.
            </p>


            <div className="mt-7 flex flex-wrap items-center gap-2">
              {routeStops.map((stop, idx) => (
                <div key={stop} className="flex items-center gap-2">
                  <span className="rounded-full border border-[#b0ccc0] bg-[#deeee6] px-3 py-1.5 text-xs font-medium text-[#182c22]">
                    {stop}
                  </span>
                  {idx < routeStops.length - 1 ? (
                    <span className="text-[#6a9e88]">—</span>
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
                className="rounded-[24px] border border-[#b8d0c4] bg-[#f2f7f4] p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-[#b0ccc0] bg-[#deeee6] text-[#1a6b50]">
                    <Check className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#141c18]">{item}</p>
                    <p className="text-xs text-[#3e6050]">Included in the package</p>
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
            title="Dandeli Water Adventure"
            subtitle="Kayaking, river zorbing, and boating on the Kali River — then rain dance and a group campfire at night."
            image={dandeliWater}
          />
          <DestinationCard
            title="Gokarna · Om Beach"
            subtitle="Vibhuti Falls trek, Om Beach at golden hour, and the sacred Mahabaleshwar Temple before sunset."
            image={gokarnaBeach}
          />
          <DestinationCard
            title="Murudeshwar · Honnavar"
            subtitle="The world's second-tallest Shiva, mangrove channels, and a serene estuary boating farewell."
            image={murudeshwar}
          />
        </div>
      </section>


      {/* ── ITINERARY TIMELINE ── */}
      <section
        ref={timelineSectionRef}
        className="relative mx-auto mt-20 max-w-7xl px-4 pb-28 md:px-8"
      >
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#3e6e58]">
            Journey plan
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#141c18] md:text-5xl">
            Overnight to Monday morning
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#2c4c3c] md:text-[15px]">
            From the overnight bus out of Hyderabad to the final boating stretch at Honnavar —
            every hour of this trip is accounted for. Follow the organiser and you won't miss a thing.
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
                stroke="#a8c8b8"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                ref={timelinePathProgressRef}
                d="M130 20 C 42 130, 42 280, 130 400 C 218 520, 218 670, 130 790 C 42 910, 42 1060, 130 1180 C 218 1300, 218 1500, 130 1620 C 80 1700, 110 1800, 130 1860"
                stroke="#1a6b50"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>


            <div
              ref={busIndicatorRef}
              className="absolute left-1/2 top-0 z-20 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-[#a8c8b8] bg-[#f2f7f4] text-[#145040] shadow-[0_10px_30px_rgba(10,44,28,0.10)] lg:flex"
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
                          ? "border-[#68a888] bg-[#f2f7f4] shadow-[0_18px_50px_rgba(10,44,28,0.10)]"
                          : "border-[#b8d0c4] bg-[#f2f7f4]"
                      }`}
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,16,10,0.02),rgba(4,16,10,0.12)_52%,rgba(4,16,10,0.46)_100%)]" />
                        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2 md:left-5 md:top-5">
                          <span className="inline-flex rounded-full border border-white/40 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#142018] backdrop-blur-sm">
                            {item.day}
                          </span>
                          <span className="inline-flex rounded-full border border-white/40 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#142018] backdrop-blur-sm">
                            {item.meals}
                          </span>
                        </div>
                      </div>


                      <div className="px-5 py-5 md:px-7 md:py-7">
                        <h3 className="text-2xl font-black tracking-[-0.03em] text-[#141c18] md:text-3xl">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-[#2c4c3c]">{item.subtitle}</p>


                        <ul className="mt-6 space-y-3">
                          {item.points.map((point) => (
                            <li key={point} className="flex gap-3 text-sm leading-6 text-[#243c2c]">
                              <span className="mt-2.75 h-1.25 w-1.25 shrink-0 rounded-full bg-[#1a6b50]" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>


                        <div className="mt-6 rounded-[22px] border border-[#b0ccc0] bg-[#deeee6] p-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3c6050]">
                            Notes
                          </p>
                          <div className="mt-3 space-y-2">
                            {item.notes.map((note) => (
                              <p key={note} className="text-xs leading-6 text-[#2c4438]">
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
                      className={`absolute top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-[#a8c8b8] bg-[#f2f7f4] text-[#145040] shadow-[0_8px_24px_rgba(10,44,28,0.10)] ${
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
          <div className="soft-reveal rounded-[30px] border border-[#b8d0c4] bg-[#f2f7f4] p-6 md:p-7">
            <h2 className="inline-flex items-center gap-2 text-2xl font-black tracking-[-0.03em] text-[#141c18]">
              <HeartPulse className="h-5 w-5 text-[#1a6b50]" />
              Important Notes
            </h2>


            <ul className="mt-5 space-y-3 text-sm leading-7 text-[#2c4c3c]">
              <li>— This is a budget backpacking trip — not a luxury tour. Stay properties are standard / basic.</li>
              <li>— Dandeli rooms: 5–8 sharing · Murudeshwar rooms: 4–5 sharing (as per organiser segregation).</li>
              <li>— Collect water activity receipt at Dandeli reception — show it at the water activities zone.</li>
              <li>— Reach Om Beach by 3:00 PM on Day 2 — traffic after 5 PM causes heavy delays on this stretch.</li>
              <li>— Mahabaleshwar Temple, Gokarna closes at 8:00 PM — traditional wear is mandatory (Puncha / Saree / Churidar).</li>
              <li>— Dress change at Namaste Café restrooms or nearby hotel — on your own expenses.</li>
              <li>— Day 3: Honnavar to Hubli is 4–5 hours — strictly follow the organiser or the group misses the train.</li>
              <li>— Travloger is not responsible for loss of valuables — avoid carrying gold, gadgets, or expensive items.</li>
              <li>— Trip host reserves the right to alter route, timings, or activities based on safety and conditions.</li>
              <li>— GST of 5% applicable on the total package price.</li>
            </ul>
          </div>


          {/* Booking CTA */}
          <div className="soft-reveal relative overflow-hidden rounded-[30px] border border-[#b8d0c4] bg-[#141c18] p-6 md:p-8">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#1a6b50]/10 blur-3xl" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#68c898]">
                  Booking
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#e4f4ec]">
                  River rapids to sacred coastline. One weekend.
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#58987c]">
                  Travloger handles the vehicle, the stays, the organiser, and the water
                  activities — you just show up and follow the flow.
                </p>
                <p className="mt-3 text-xs text-[#3e6858]">
                  <a
                    href="mailto:info@travloger.in"
                    className="hover:text-[#68c898] transition-colors"
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
                    className="h-12 rounded-full bg-[#c0e8d0] px-6 text-sm font-bold text-[#081410] hover:bg-[#b0dcc0]"
                  >
                    <a href="/booking/gokarna-dandeli">Book Now</a>
                  </Button>
                </MagneticButton>


                <MagneticButton>
                  <a
                    href="https://wa.me/919705051052"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-[#e4f4ec]"
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
      <section className="border-t border-[#b0ccc0]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-xs text-[#3e6e58] md:flex-row md:items-center md:justify-between md:px-8">
          <p>Travloger India · Gokarna & Dandeli</p>
          <p>Hyderabad — Dandeli — Gokarna — Murudeshwar — Honnavar — Hubli · Weekends</p>
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
    <div className="overflow-hidden rounded-[28px] border border-[#b8d0c4] bg-[#f2f7f4]">
      <div className="aspect-4/3 overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3e6e58]">
          Destination
        </p>
        <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#141c18]">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-[#2c4c3c]">{subtitle}</p>
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
      className="rounded-[22px] border border-[#b0ccc0] bg-[#f2f7f4]/90 p-4"
    >
      <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3c6050]">
        <Icon className="h-4 w-4 text-[#1a6b50]" />
        {label}
      </p>
      <p className="mt-2 text-sm font-bold text-[#141c18]">{value}</p>
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
