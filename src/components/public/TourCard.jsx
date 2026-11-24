import { ArrowRight, Clock3, MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { localizeTour } from "../../i18n/localizeContent";

export default function TourCard({ tour, index = 0 }) {
  const { t, i18n } = useTranslation();
  const content = localizeTour(tour, i18n.resolvedLanguage || i18n.language);

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
        delay: (index % 3) * 0.2,
      }}
    >
      <article className="h-full overflow-hidden rounded-2xl border border-emerald-600 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <Link to={`/tours/${content.slug}`} className="group block overflow-hidden">
          <img
            src={content.image}
            alt={content.title}
            loading="lazy"
            className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="p-5">
          <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="text-emerald-700" aria-hidden="true" />
              {content.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={14} aria-hidden="true" />
              {content.duration}
            </span>
          </div>
          <div className="mt-3 flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-slate-900">{content.title}</h3>
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
              {t("common.from")}{" "}
              <span className="text-lg font-bold text-slate-900">
                ${content.price}
              </span>
            </p>
            <Link
              to={`/tours/${content.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              {t("common.viewTour")} <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
