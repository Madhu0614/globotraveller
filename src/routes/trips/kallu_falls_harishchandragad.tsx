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
  Waves,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import gsap from "gsap";
import SplitType from "split-type";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import heroBanner from "@/assets/Kalu_Waterfalls.jpg";
import kaluWaterfalls from "@/assets/Kalu_Waterfalls.jpg";
import harishchandragad from "@/assets/Harishchandragad.jpg";
import rajmachiView from "@/assets/Rajmachi_Visapur.jpg";
import andharbanForest from "@/assets/Andharban.jpeg";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const itinerary = [
  {
    day: "Day 0 — Friday Night",
    title: "Departure from Mumbai / Pune",
    subtitle: "The city lights fade as the Sahyadris wait in the dark.",
    image: rajmachiView,
    points: [
      "Late evening pickups from major Mumbai and Pune points.",
      "Board the overnight vehicle and head toward the base region.",
      "Briefing from the trip lead on monsoon trail conditions and safety.",
      "Rest during the drive before the early-morning trek start.",
    ],
    meals: "None",
    notes: [
      "Pickup timings are shared one day before departure.",
      "Carry your rain cover, headlamp, and a change of clothes in an accessible daypack.",
      "Monsoon routes can shift depending on local trail conditions.",
    ],
  },
  {
    day: "Day 1 — Full Day",
    title: "Kalu Waterfalls Trail",
    subtitle: "Rocky stream crossings, roaring whitewater, and deep monsoon forest.",
    image: kaluWaterfalls,
    points: [
      "Reach the base village and freshen up before breakfast.",
      "Begin the waterfall trail with wet forest sections and stream-side boulder patches.",
      "Take in the full force of Kalu Waterfalls from key viewpoint sections on the route.",
      "Pause for trail snacks, photography, and group safety checks along the way.",
      "Return by evening for dinner, recovery, and overnight stay.",
    ],
    meals: "Breakfast & Dinner",
    notes: [
      "The waterfall approach is slippery in peak monsoon; strong grip footwear is essential.",
      "Water level and local conditions may affect how close the group can safely approach the falls.",
      "Phones and cameras should be protected with waterproof covers.",
    ],
  },
  {
    day: "Day 2 — Full Day",
    title: "Harishchandragad Fort Section",
    subtitle: "Ancient cave spaces, plateau stretches, and dramatic cliff views.",
    image: harishchandragad,
    points: [
      "Start early for the Harishchandragad section after breakfast.",
      "Trek through fort terrain with exposed rock, grass patches, and misty ridge sections.",
      "Explore the fort zone, caves, and major viewpoint belts depending on the weather window.",
      "Take a final break for lunch before beginning the descent.",
      "Drive back toward Mumbai and Pune with expected late-night arrival.",
    ],
    meals: "Breakfast & Lunch",
    notes: [
      "Visibility at top viewpoints changes quickly in monsoon weather.",
      "This route is moderate and suited to trekkers comfortable with long wet-trail days.",
      "Arrival time on return depends on descent pace, weather, and highway traffic.",
    ],
  },
];

const includes = [
  "Pickup & Drop",
  "1 Night Stay",
  "Local Transport",
  "Trip Leader",
  "Basic First Aid",
  "Meals as Mentioned",
];

const routeStops = ["Mumbai / Pune", "Kalu Waterfalls", "Harishchandragad"];

export const Route = createFileRoute("/trips/kallu_falls_harishchandragad")({
  head: () => ({
    meta: [
      { title: "Kalu Waterfalls & Harishchandragad — Monsoon Trek from Mumbai / Pune" },
      {
        name: "description",
        content:
          "A custom Globo Traveller weekend page for Kalu Waterfalls and Harishchandragad with a monsoon trek route, fort terrain, waterfall sections, and overnight group travel.",
      },
    ],
  }),
  component: KaluFallsHarishchandragadPage,
});

function KaluFallsHarishchandragadPage() {
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
    <div className="bg-[#eef3ee] text-[#161c16]" ref={rootRef}>
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="Kalu Waterfalls and Harishchandragad trek"
            className="hero-image h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,14,10,0.24),rgba(8,14,10,0.58)_36%,rgba(238,243,238,0.86)_82%,#eef3ee_100%)]" />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-4 pb-10 pt-36 md:px-8 md:pt-44">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e8f5e4] backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#a7d59f]" />
              Globo Traveller
            </motion.div>

            <h1
              ref={heroTitleRef}
              className="mt-6 max-w-5xl text-4xl font-black leading-[0.92] tracking-[-0.05em] text-[#edf6eb] drop-shadow-[0_12px_26px_rgba(0,0,0,0.32)] sm:text-6xl lg:text-8xl"
            >
              Kalu Waterfalls & Harishchandragad
            </h1>

            <p
              ref={heroCopyRef}
              className="mt-5 max-w-2xl text-sm leading-7 text-[#c9dfc5] drop-shadow-[0_8px_18px_rgba(0,0,0,0.22)] sm:text-base"
            >
              A monsoon-heavy Sahyadri weekend with waterfall thunder, slippery forest trails,
              fort plateaus, and long ridge views stitched into one rugged route.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="h-12 rounded-full bg-[#edf6eb] px-6 text-sm font-bold text-[#161c16] hover:bg-white"
              >
                <a href="/booking/kallu_falls_harishchandragad">
                  Reserve Your Seat
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>

              <a
                href="https://wa.me/917975550990"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-black/20 px-6 text-sm font-semibold text-[#edf6eb] backdrop-blur-sm"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

          <div ref={heroStatsRef} className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <GlassStat icon={Clock} label="Duration" value="2D / 1N" />
            <GlassStat icon={Mountain} label="Difficulty" value="Moderate" />
            <GlassStat icon={Users} label="Group Size" value="12–20" />
            <GlassStat icon={Waves} label="Terrain" value="Falls + Fort" />
            <GlassStat icon={Calendar} label="Season" value="Monsoon" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[32px] border border-[#c5d1c4] bg-[#f5f8f4] p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#607a5c]">
              Route overview
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#161c16] md:text-5xl">
              Waterfall force. Fort exposure. Monsoon miles.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#3c5038]">
              This route is built for trekkers who want a wetter, rougher Sahyadri weekend.
              Expect muddy climbs, powerful water flow, old fort terrain, and long hours on trail.
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
                className="rounded-[24px] border border-[#c5d1c4] bg-[#f5f8f4] p-4"
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

      <section ref={imagePanelRef} className="mx-auto max-w-7xl px-4 py-6 md:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          <DestinationCard
            title="Kalu Waterfalls"
            subtitle="A raw monsoon cascade section with dense greenery, wet rock, and roaring valley energy."
            image={kaluWaterfalls}
          />
          <DestinationCard
            title="Harishchandragad"
            subtitle="Historic fort terrain, cave spaces, plateau traverses, and exposed mountain viewpoints."
            image={harishchandragad}
          />
          <DestinationCard
            title="Sahyadri Forest Belt"
            subtitle="Deep monsoon trail character with mist, mud, and long green ridge sections."
            image={andharbanForest}
          />
        </div>
      </section>

      <section
        ref={timelineSectionRef}
        className="relative mx-auto mt-20 max-w-7xl px-4 pb-28 md:px-8"
      >
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#607a5c]">
            Journey plan
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#161c16] md:text-5xl">
            One monsoon weekend, two heavy trail sections
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#445840] md:text-[15px]">
            Start overnight, move through the waterfall approach first, then push into the fort
            terrain before the return run to the city.
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-75 -translate-x-1/2 lg:block">
            <svg
              className="absolute left-1/2 top-0 h-full w-65 -translate-x-1/2 overflow-visible"
              viewBox="0 0 260 1500"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                ref={timelinePathRef}
                d="M130 20 C 52 110, 52 260, 130 360 C 208 470, 208 650, 130 760 C 52 870, 52 1050, 130 1160 C 190 1250, 170 1380, 130 1460"
                stroke="#b8ccb4"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                ref={timelinePathProgressRef}
                d="M130 20 C 52 110, 52 260, 130 360 C 208 470, 208 650, 130 760 C 52 870, 52 1050, 130 1160 C 190 1250, 170 1380, 130 1460"
                stroke="#3c7035"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <div
              ref={busIndicatorRef}
              className="absolute left-1/2 top-0 z-20 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-[#b8ccb4] bg-[#f5f8f4] text-[#2e5828] shadow-[0_10px_30px_rgba(20,54,16,0.10)] lg:flex"
            >
              <BusFront className="h-5 w-5" />
            </div>
          </div>

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

      <section ref={notesSectionRef} className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
        <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="soft-reveal rounded-[30px] border border-[#c2d4be] bg-[#f5f8f4] p-6 md:p-7">
            <h2 className="inline-flex items-center gap-2 text-2xl font-black tracking-[-0.03em] text-[#161c16]">
              <HeartPulse className="h-5 w-5 text-[#3c7035]" />
              Important Notes
            </h2>

            <ul className="mt-5 space-y-3 text-sm leading-7 text-[#3c5038]">
              <li>— This is a moderate monsoon trek and not a relaxed sightseeing route.</li>
              <li>— Good grip shoes, rain protection, and a light trekking bag are mandatory.</li>
              <li>— Waterfall approach limits may change depending on rainfall intensity and local advice.</li>
              <li>— Fort sections can be windy, slippery, and visibility may drop fast in cloud cover.</li>
              <li>— Final route decisions remain with the trip lead based on safety conditions.</li>
              <li>— Keep electronics waterproofed and avoid carrying unnecessary valuables.</li>
            </ul>
          </div>

          <div className="soft-reveal relative overflow-hidden rounded-[30px] border border-[#c2d4be] bg-[#161c16] p-6 md:p-8">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#3c7035]/10 blur-3xl" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#90bc8a]">
                  Booking
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#edf6eb]">
                  A harder monsoon weekend than the average getaway.
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#78a072]">
                  If you want a waterfall route with real trekking effort and fort exposure,
                  this is one of the stronger Maharashtra weekend options in the lineup.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="h-12 rounded-full bg-[#cce8c6] px-6 text-sm font-bold text-[#101810] hover:bg-[#bcddb6]"
                >
                  <a href="/booking/kallu_falls_harishchandragad">Book Now</a>
                </Button>

                <a
                  href="https://wa.me/917975550990"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-[#edf6eb]"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#bcceb8]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-xs text-[#607a5c] md:flex-row md:items-center md:justify-between md:px-8">
          <p>Globo Traveller · Kalu Waterfalls & Harishchandragad</p>
          <p>Mumbai / Pune — Monsoon Trek Route — Weekend Departure</p>
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
