import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { publicTours } from "../../data/publicTours";
import TourCard from "./TourCard";

export default function FeaturedTours() {
  return (
    <section
      id="featured-tours"
      className="bg-white py-12 sm:py-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Handpicked experiences
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Featured Tours
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              Make more of your time with locally inspired journeys.
            </p>
          </div>
          <Link
            to="/tours"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Browse all tours <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {publicTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}
