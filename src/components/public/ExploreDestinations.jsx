import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { publicDestinations } from "../../data/publicDestinations";
import DestinationCard from "./DestinationCard";

export default function ExploreDestinations() {
  const { t, i18n } = useTranslation();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700"
          >
            {t("home.exploreEyebrow")}
          </p>
          <h2
            className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            {t("home.exploreTitle")}
          </h2>
          <p
            className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base"
          >
            {t("home.exploreDescription")}
          </p>
        </div>
        <Link
          to="/destinations"
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
        >
          {t("common.viewAllDestinations")} <ArrowRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {publicDestinations.map((destination, index) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
