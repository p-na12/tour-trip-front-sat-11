import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import TourCard from "../../../components/public/TourCard";
import PublicPageFrame from "../../../components/public/PublicPageFrame";
import { publicTours } from "../../../data/publicTours";

export default function ToursPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const destinationQuery = searchParams.get("destination")?.toLowerCase() ?? "";
  const type = searchParams.get("type") ?? "";

  const filteredTours = useMemo(
    () =>
      publicTours.filter((tour) => {
        const matchesDestination = tour.destination
          .toLowerCase()
          .includes(destinationQuery);
        const matchesType = !type || tour.type === type;
        return matchesDestination && matchesType;
      }),
    [destinationQuery, type],
  );

  return (
    <PublicPageFrame
      title={t("destination.toursPageTitle")}
      description={t("destination.toursPageDescription")}
    >
      {filteredTours.length ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            {t("destination.noToursMatch")}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {t("destination.tryAnotherTourSearch")}
          </p>
          <Link
            to="/tours"
            className="mt-5 inline-flex rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            {t("destination.viewAllTours")}
          </Link>
        </div>
      )}
    </PublicPageFrame>
  );
}
