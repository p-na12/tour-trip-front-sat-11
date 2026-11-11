import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { localizeDestination } from "../../i18n/localizeContent";

export default function DestinationCard({ destination }) {
  const { i18n } = useTranslation();
  const content = localizeDestination(destination, i18n.resolvedLanguage || i18n.language);

  return (
    <Link
      to={`/destinations/${content.id}`}
      className="group relative isolate flex min-h-[270px] overflow-hidden rounded-2xl border border-emerald-600 bg-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-h-[300px] "
    >
      <img
        src={destination.image}
        alt={content.name}
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />
      <div className="mt-auto w-full p-5 text-white sm:p-6">
        <span className="inline-flex rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11px] font-medium backdrop-blur-sm">
          {content.category}
        </span>
        <div className="mt-3 flex items-end justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold sm:text-2xl">
              {content.name}
            </h3>
            <p className="mt-1 max-w-sm text-sm leading-5 text-white/80">
              {content.description}
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
