import ExploreDestinations from "../../components/public/ExploreDestinations";
import FeaturedTours from "../../components/public/FeaturedTours";
import Hero from "../../components/public/Hero";
import SearchBar from "../../components/public/SearchBar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Hero />
      <SearchBar />
      <ExploreDestinations />
      <FeaturedTours />
    </main>
  );
}


