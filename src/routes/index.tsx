import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { SearchBar } from "@/components/home/SearchBar";
import { Categories } from "@/components/home/Categories";
import { TripGrid } from "@/components/home/TripGrid";
import { WhyUs } from "@/components/home/WhyUs";
import { Community } from "@/components/home/Community";
import { Testimonials } from "@/components/home/Testimonials";
import { Gallery } from "@/components/home/Gallery";
import { FAQ } from "@/components/home/FAQ";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Globo Traveller — Curated group trips, treks & getaways" },
      {
        name: "description",
        content:
          "Join curated group trips across India and abroad. Weekend getaways, Himalayan circuits, treks, and international adventures with expert trip captains.",
      },
      { property: "og:title", content: "Globo Traveller — Explore More" },
      { property: "og:description", content: "Curated group trips for modern Indian travellers." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <SearchBar />
      <Categories />
      <TripGrid eyebrow="Upcoming" title="Featured trips this season" limit={4} />
      <TripGrid category="weekend" eyebrow="Quick getaways" title="Weekend escapes" subtitle="Friday flight out, Monday morning back." limit={4} />
      <TripGrid category="backpacking" eyebrow="For wanderers" title="Backpacking adventures" subtitle="Budget-friendly, friend-filled journeys." limit={4} />
      <TripGrid category="weekend" eyebrow="More weekends" title="More weekend getaways" subtitle="Extended weekend explorations." limit={4} />
      <WhyUs />
      <Community />
      <Testimonials />
      <Gallery />
      <FAQ />
    </>
  );
}
