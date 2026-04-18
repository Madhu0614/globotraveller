import manali from "@/assets/trip-manali.jpg";
import spiti from "@/assets/trip-spiti.jpg";
import bali from "@/assets/trip-bali.jpg";
import kashmir from "@/assets/trip-kashmir.jpg";
import meghalaya from "@/assets/trip-meghalaya.jpg";
import ladakh from "@/assets/trip-ladakh.jpg";
import thailand from "@/assets/trip-thailand.jpg";
import goa from "@/assets/trip-goa.jpg";

export type TripCategory = "weekend" | "international" | "trekking" | "himalayan" | "beach";

export interface Departure {
  date: string;
  spotsLeft: number;
}

export interface Trip {
  slug: string;
  title: string;
  location: string;
  country: string;
  image: string;
  gallery: string[];
  durationDays: number;
  durationNights: number;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  groupSize: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
  category: TripCategory;
  departureCities: string[];
  pickup: string;
  drop: string;
  months: string[];
  tagline: string;
  description: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: { day: number; title: string; details: string }[];
  departures: Departure[];
}

export const trips: Trip[] = [
  {
    slug: "manali-kasol-weekend",
    title: "Manali Kasol Weekend Escape",
    location: "Himachal Pradesh",
    country: "India",
    image: manali,
    gallery: [manali, spiti, ladakh],
    durationDays: 4,
    durationNights: 3,
    price: 8499,
    originalPrice: 10999,
    rating: 4.8,
    reviews: 1284,
    groupSize: "15–25",
    difficulty: "Easy",
    category: "weekend",
    departureCities: ["Delhi", "Chandigarh"],
    pickup: "Delhi ISBT, Kashmere Gate",
    drop: "Delhi ISBT, Kashmere Gate",
    months: ["Mar", "Apr", "May", "Jun", "Sep", "Oct"],
    tagline: "Pine forests, riverside cafes, and starlit nights",
    description:
      "A perfect weekend reset through Old Manali, Kasol, and the buzzing Parvati valley. Bonfires, jam sessions, and curated stays included.",
    highlights: [
      "Volvo journeys both sides",
      "Stay in boutique mountain cottages",
      "Bonfire night with live music",
      "Visit to Kheerganga base",
    ],
    inclusions: [
      "3 nights stay (twin/triple share)",
      "Daily breakfast & dinner",
      "All transfers in tempo traveller",
      "Trip captain throughout",
      "Permits & taxes",
    ],
    exclusions: ["Lunch", "Personal expenses", "Anything not in inclusions"],
    itinerary: [
      { day: 1, title: "Delhi → Manali", details: "Overnight Volvo to Manali. Sleeper seats." },
      { day: 2, title: "Manali sightseeing", details: "Solang valley, Hadimba temple, Mall road." },
      { day: 3, title: "Kasol & Chalal", details: "River walk to Chalal, cafe hopping in Kasol." },
      { day: 4, title: "Kasol → Delhi", details: "Overnight return. Drop in the morning." },
    ],
    departures: [
      { date: "10 May 2026", spotsLeft: 6 },
      { date: "17 May 2026", spotsLeft: 12 },
      { date: "24 May 2026", spotsLeft: 18 },
    ],
  },
  {
    slug: "spiti-circuit",
    title: "Spiti Valley Circuit",
    location: "Spiti, Himachal",
    country: "India",
    image: spiti,
    gallery: [spiti, ladakh, manali],
    durationDays: 8,
    durationNights: 7,
    price: 22999,
    originalPrice: 27999,
    rating: 4.9,
    reviews: 642,
    groupSize: "10–18",
    difficulty: "Moderate",
    category: "himalayan",
    departureCities: ["Delhi", "Chandigarh", "Manali"],
    pickup: "Delhi Airport T3",
    drop: "Delhi Airport T3",
    months: ["May", "Jun", "Jul", "Aug", "Sep"],
    tagline: "The land of monasteries, moonscapes & monks",
    description:
      "An 8-day Himalayan circuit through Kinnaur and Spiti — Kalpa, Tabo, Dhankar, Key, Chandratal — with our most experienced trip captains.",
    highlights: [
      "Stay overnight at Chandratal",
      "Visit Key & Tabo monasteries",
      "Hike to Dhankar lake",
      "Photography sessions at sunrise",
    ],
    inclusions: [
      "7 nights stay (hotels + camps)",
      "All meals from Day 1 dinner",
      "Innova/Tempo for the circuit",
      "Inner line permits",
      "First aid + oxygen support",
    ],
    exclusions: ["Flights", "Insurance", "Tips"],
    itinerary: [
      { day: 1, title: "Delhi → Shimla", details: "Pickup, overnight in Shimla." },
      { day: 2, title: "Shimla → Sangla", details: "Drive via Kinnaur." },
      { day: 3, title: "Sangla → Kalpa", details: "Visit Chitkul, India's last village." },
      { day: 4, title: "Kalpa → Tabo", details: "Cross Nako lake, reach the 1000-yr-old monastery." },
      { day: 5, title: "Tabo → Kaza", details: "Dhankar monastery & lake hike." },
      { day: 6, title: "Kaza local", details: "Key, Kibber, Hikkim & Komic villages." },
      { day: 7, title: "Kaza → Chandratal", details: "Camp by the moon lake." },
      { day: 8, title: "Chandratal → Manali → Delhi", details: "Drop next morning." },
    ],
    departures: [
      { date: "12 Jun 2026", spotsLeft: 4 },
      { date: "26 Jun 2026", spotsLeft: 8 },
      { date: "10 Jul 2026", spotsLeft: 12 },
    ],
  },
  {
    slug: "bali-explorer",
    title: "Bali Island Explorer",
    location: "Bali",
    country: "Indonesia",
    image: bali,
    gallery: [bali, thailand, goa],
    durationDays: 6,
    durationNights: 5,
    price: 38999,
    rating: 4.9,
    reviews: 423,
    groupSize: "12–20",
    difficulty: "Easy",
    category: "international",
    departureCities: ["Delhi", "Mumbai", "Bangalore"],
    pickup: "Denpasar Airport",
    drop: "Denpasar Airport",
    months: ["Apr", "May", "Jun", "Sep", "Oct", "Nov"],
    tagline: "Rice terraces, beach clubs & temple hopping",
    description:
      "Six days of curated Bali — Ubud rice terraces, Seminyak sunsets, Nusa Penida day trip, and a cliffside fire-dance evening at Uluwatu.",
    highlights: [
      "Sunrise at Mount Batur (optional)",
      "Tegalalang rice terrace swing",
      "Day trip to Nusa Penida",
      "Beach club afternoon at Seminyak",
    ],
    inclusions: [
      "5 nights in 4★ resorts",
      "Daily breakfast",
      "All inter-city transfers",
      "Activities & entries listed",
      "English-speaking trip captain",
    ],
    exclusions: ["International flights", "Visa on arrival", "Lunches & dinners"],
    itinerary: [
      { day: 1, title: "Arrival in Bali", details: "Airport pickup, welcome dinner in Seminyak." },
      { day: 2, title: "Ubud cultural day", details: "Rice terraces, monkey forest, swing." },
      { day: 3, title: "Nusa Penida", details: "Kelingking beach + snorkelling." },
      { day: 4, title: "Uluwatu & temples", details: "Tanah Lot + Kecak fire dance." },
      { day: 5, title: "Free day / beach club", details: "Optional spa & shopping." },
      { day: 6, title: "Departure", details: "Airport drop." },
    ],
    departures: [
      { date: "05 May 2026", spotsLeft: 7 },
      { date: "19 May 2026", spotsLeft: 14 },
    ],
  },
  {
    slug: "kashmir-great-lakes",
    title: "Kashmir Great Lakes Trek",
    location: "Sonamarg, Kashmir",
    country: "India",
    image: kashmir,
    gallery: [kashmir, ladakh, manali],
    durationDays: 8,
    durationNights: 7,
    price: 17499,
    originalPrice: 19999,
    rating: 4.95,
    reviews: 318,
    groupSize: "12–16",
    difficulty: "Challenging",
    category: "trekking",
    departureCities: ["Srinagar"],
    pickup: "Srinagar Airport",
    drop: "Srinagar Airport",
    months: ["Jul", "Aug", "Sep"],
    tagline: "India's most beautiful high-altitude trek",
    description:
      "Cross seven alpine lakes and four mountain passes in the Kashmir Himalayas. Curated for fit travellers with expert mountain guides.",
    highlights: [
      "Vishansar, Krishnasar & Gadsar lakes",
      "Camp at 13,000+ ft",
      "Certified mountain guides",
      "All veg meals in the mountains",
    ],
    inclusions: [
      "Forest permits",
      "Tents, sleeping bags, mats",
      "All meals on trek",
      "Trek leader, guide & cook",
      "Mules for common luggage",
    ],
    exclusions: ["Travel to Sonamarg", "Backpack offloading", "Insurance"],
    itinerary: [
      { day: 1, title: "Srinagar → Sonamarg", details: "Drive to base camp." },
      { day: 2, title: "Sonamarg → Nichnai", details: "First trek day, 6 hrs." },
      { day: 3, title: "Nichnai → Vishansar", details: "Cross Nichnai pass." },
      { day: 4, title: "Acclimatisation", details: "Day hike to Krishnasar." },
      { day: 5, title: "Vishansar → Gadsar", details: "Cross Gadsar pass, 13,750 ft." },
      { day: 6, title: "Gadsar → Satsar", details: "Lakes & meadows." },
      { day: 7, title: "Satsar → Gangbal twin lakes", details: "Cross Zaj pass." },
      { day: 8, title: "Gangbal → Naranag → Srinagar", details: "Descend & drop." },
    ],
    departures: [
      { date: "15 Jul 2026", spotsLeft: 3 },
      { date: "22 Jul 2026", spotsLeft: 9 },
    ],
  },
  {
    slug: "meghalaya-monsoon",
    title: "Meghalaya Monsoon Magic",
    location: "Shillong & Cherrapunji",
    country: "India",
    image: meghalaya,
    gallery: [meghalaya, bali, kashmir],
    durationDays: 5,
    durationNights: 4,
    price: 14999,
    rating: 4.85,
    reviews: 271,
    groupSize: "10–18",
    difficulty: "Moderate",
    category: "weekend",
    departureCities: ["Guwahati"],
    pickup: "Guwahati Airport",
    drop: "Guwahati Airport",
    months: ["Jun", "Jul", "Aug", "Sep", "Oct"],
    tagline: "Living root bridges & turquoise pools",
    description:
      "Trek to the famous Double Decker root bridge, swim in Krang Suri falls, and explore Asia's cleanest village in Mawlynnong.",
    highlights: [
      "Double Decker living root bridge",
      "Boat ride at Dawki river",
      "Krang Suri waterfalls",
      "Stay in Cherrapunji",
    ],
    inclusions: ["4 nights stay", "Breakfast & dinner", "All transfers", "Entries & permits"],
    exclusions: ["Flights", "Lunch", "Adventure activities"],
    itinerary: [
      { day: 1, title: "Guwahati → Shillong", details: "Pickup & evening at Police Bazaar." },
      { day: 2, title: "Shillong → Cherrapunji", details: "Mawkdok valley, Nohkalikai falls." },
      { day: 3, title: "Double Decker trek", details: "Trek to Nongriat." },
      { day: 4, title: "Dawki & Mawlynnong", details: "Boat ride & cleanest village." },
      { day: 5, title: "Drop", details: "Drive back to Guwahati." },
    ],
    departures: [
      { date: "08 Aug 2026", spotsLeft: 8 },
      { date: "22 Aug 2026", spotsLeft: 11 },
    ],
  },
  {
    slug: "ladakh-overland",
    title: "Ladakh Overland Adventure",
    location: "Leh, Nubra & Pangong",
    country: "India",
    image: ladakh,
    gallery: [ladakh, spiti, kashmir],
    durationDays: 7,
    durationNights: 6,
    price: 24999,
    originalPrice: 29999,
    rating: 4.92,
    reviews: 512,
    groupSize: "10–18",
    difficulty: "Moderate",
    category: "himalayan",
    departureCities: ["Delhi", "Leh"],
    pickup: "Leh Airport",
    drop: "Leh Airport",
    months: ["Jun", "Jul", "Aug", "Sep"],
    tagline: "Khardung La, Pangong & Nubra valley",
    description:
      "The classic Ladakh circuit with comfortable acclimatisation, monastery visits, and a night under the stars at Pangong.",
    highlights: [
      "Khardung La pass",
      "Bactrian camel ride at Hunder",
      "Pangong overnight stay",
      "Local Ladakhi cultural evening",
    ],
    inclusions: ["6 nights stay", "All meals", "SUVs throughout", "Inner line permits", "Oxygen support"],
    exclusions: ["Flights to Leh", "Insurance"],
    itinerary: [
      { day: 1, title: "Arrival in Leh", details: "Acclimatise, no activities." },
      { day: 2, title: "Leh local", details: "Shanti stupa, Leh palace." },
      { day: 3, title: "Leh → Nubra", details: "Cross Khardung La." },
      { day: 4, title: "Nubra → Pangong", details: "Via Shyok road." },
      { day: 5, title: "Pangong → Leh", details: "Via Chang La." },
      { day: 6, title: "Sham valley", details: "Magnetic hill, sangam." },
      { day: 7, title: "Departure", details: "Airport drop." },
    ],
    departures: [
      { date: "20 Jun 2026", spotsLeft: 5 },
      { date: "04 Jul 2026", spotsLeft: 13 },
    ],
  },
  {
    slug: "thailand-island-hopping",
    title: "Thailand Island Hopper",
    location: "Phuket, Phi Phi, Krabi",
    country: "Thailand",
    image: thailand,
    gallery: [thailand, bali, goa],
    durationDays: 6,
    durationNights: 5,
    price: 34999,
    rating: 4.7,
    reviews: 389,
    groupSize: "15–25",
    difficulty: "Easy",
    category: "international",
    departureCities: ["Delhi", "Mumbai", "Kolkata"],
    pickup: "Phuket Airport",
    drop: "Phuket Airport",
    months: ["Nov", "Dec", "Jan", "Feb", "Mar"],
    tagline: "Turquoise water, parties & speedboats",
    description:
      "From Phuket's beach clubs to Phi Phi's hidden coves, this is the perfect bachelorette/squad-style island adventure.",
    highlights: ["Phi Phi day cruise", "Maya Bay snorkelling", "James Bond island", "Bangla road night"],
    inclusions: ["5 nights stay", "Daily breakfast", "Speedboat tours", "All transfers"],
    exclusions: ["Flights", "Visa", "Dinners"],
    itinerary: [
      { day: 1, title: "Arrival Phuket", details: "Hotel check-in & beach evening." },
      { day: 2, title: "Phi Phi cruise", details: "Maya bay + lunch." },
      { day: 3, title: "James Bond island", details: "Sea canoeing." },
      { day: 4, title: "Krabi day trip", details: "4-island tour." },
      { day: 5, title: "Free day", details: "Spa / shopping." },
      { day: 6, title: "Departure", details: "Airport drop." },
    ],
    departures: [
      { date: "12 Dec 2026", spotsLeft: 9 },
      { date: "26 Dec 2026", spotsLeft: 4 },
    ],
  },
  {
    slug: "goa-new-year",
    title: "Goa New Year Festival",
    location: "North Goa",
    country: "India",
    image: goa,
    gallery: [goa, bali, thailand],
    durationDays: 4,
    durationNights: 3,
    price: 11999,
    rating: 4.6,
    reviews: 921,
    groupSize: "20–40",
    difficulty: "Easy",
    category: "beach",
    departureCities: ["Mumbai", "Pune", "Bangalore", "Goa"],
    pickup: "Goa Airport / Madgaon",
    drop: "Goa Airport / Madgaon",
    months: ["Dec", "Jan"],
    tagline: "Sunset shacks, NYE parties & beach hops",
    description:
      "A non-stop Goa weekend with curated beach clubs, sunset cruises, and entry to two of Goa's biggest NYE parties.",
    highlights: ["Sunset cruise on Mandovi", "Beach club at Anjuna", "NYE party entries", "Old Goa walking tour"],
    inclusions: ["3 nights stay near Baga", "Daily breakfast", "Local transfers", "NYE party passes"],
    exclusions: ["Flights/trains", "Lunch & dinner", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Arrival", details: "Check-in & welcome dinner." },
      { day: 2, title: "North Goa hop", details: "Baga, Anjuna, Vagator." },
      { day: 3, title: "NYE special", details: "Sunset cruise + NYE party." },
      { day: 4, title: "Departure", details: "Brunch & drop." },
    ],
    departures: [
      { date: "29 Dec 2026", spotsLeft: 16 },
      { date: "30 Dec 2026", spotsLeft: 8 },
    ],
  },
];

export const getTrip = (slug: string) => trips.find((t) => t.slug === slug);

export const testimonials = [
  {
    name: "Ananya Sharma",
    trip: "Spiti Valley Circuit",
    rating: 5,
    text: "Honestly the best trip I've ever taken. The captains felt like friends by Day 2 and Chandratal under the stars was unreal.",
    avatar: "AS",
  },
  {
    name: "Rohan Mehta",
    trip: "Kashmir Great Lakes",
    rating: 5,
    text: "Tough trek but the team made it feel safe. Stays, food, gear — everything was top class. Already booked Ladakh next.",
    avatar: "RM",
  },
  {
    name: "Priya Iyer",
    trip: "Bali Island Explorer",
    rating: 5,
    text: "Solo female traveller — felt totally safe and made lifelong friends. Globo Traveller knows what they're doing.",
    avatar: "PI",
  },
  {
    name: "Karan Patel",
    trip: "Manali Kasol Weekend",
    rating: 4.5,
    text: "Quick weekend reset that was genuinely fun. Bonfire night was a vibe. Will be back for Spiti.",
    avatar: "KP",
  },
];

export const faqs = [
  {
    q: "How are Globo Traveller's group sizes managed?",
    a: "We keep groups intentionally small — 10 to 25 travellers per departure — with a dedicated trip captain so you're never just a number on a bus.",
  },
  {
    q: "Are your trips suitable for solo travellers?",
    a: "Absolutely. 60% of our travellers are solo. We do same-gender room-sharing by default, and our captains make sure everyone is included.",
  },
  {
    q: "What's your cancellation & refund policy?",
    a: "Free cancellation up to 21 days before departure. 50% refund 7–20 days before. Beyond that, we offer a credit voucher valid for 12 months.",
  },
  {
    q: "How do I pay? Do you support EMI?",
    a: "We accept UPI, all major cards, net banking, and EMI on cards above ₹5,000. Pay 25% to confirm, rest before departure.",
  },
  {
    q: "What if my trip is cancelled due to weather?",
    a: "If we cancel for safety reasons, you get a full refund or a free reschedule — your choice, no questions asked.",
  },
];
