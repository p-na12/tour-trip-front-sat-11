import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function DestinationCard({ destination }) {
  return (
    <Link
      to={`/destinations/${destination.id}`}
      className="group relative isolate flex min-h-[270px] overflow-hidden rounded-2xl bg-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-h-[300px]"
    >
      <img
        src={destination.image}
        alt={destination.name}
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />
      <div className="mt-auto w-full p-5 text-white sm:p-6">
        <span className="inline-flex rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11px] font-medium backdrop-blur-sm">
          {destination.category}
        </span>
        <div className="mt-3 flex items-end justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold sm:text-2xl">
              {destination.name}
            </h3>
            <p className="mt-1 max-w-sm text-sm leading-5 text-white/80">
              {destination.description}
            </p>
          </div>
          <span className="mb-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/50 transition-all duration-300 group-hover:bg-white group-hover:text-slate-900">
            <ArrowUpRight size={18} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
