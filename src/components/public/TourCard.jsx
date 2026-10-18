import { ArrowRight, Clock3, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function TourCard({ tour }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/tours/${tour.slug}`} className="block overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          loading="lazy"
          className="h-48 w-full object-cover transition duration-500 hover:scale-105"
        />
      </Link>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} className="text-emerald-700" aria-hidden="true" />
            {tour.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 size={14} aria-hidden="true" />
            {tour.duration}
          </span>
        </div>
        <div className="mt-3 flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900">{tour.title}</h3>
          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-slate-700">
            <Star
              size={15}
              className="fill-amber-400 text-amber-400"
              aria-hidden="true"
            />
            {tour.rating}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-500">
            From{" "}
            <span className="text-lg font-bold text-slate-900">
              ${tour.price}
            </span>
          </p>
          <Link
            to={`/tours/${tour.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            View tour <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
