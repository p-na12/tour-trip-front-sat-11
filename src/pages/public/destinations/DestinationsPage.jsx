import { useTranslation } from "react-i18next";
import DestinationCard from "../../../components/public/DestinationCard";
import PublicPageFrame from "../../../components/public/PublicPageFrame";
import { publicDestinations } from "../../../data/publicDestinations";

export default function DestinationsPage() {
  const { t } = useTranslation();

  return (
    <PublicPageFrame
      title={t("destination.destinationsPageTitle")}
      description={t("destination.destinationsPageDescription")}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {publicDestinations.map((destination, index) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            index={index}
          />
        ))}
      </div>
    </PublicPageFrame>
  );
}
