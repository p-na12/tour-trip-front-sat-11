import DestinationCard from "../../../components/public/DestinationCard";
import PublicPageFrame from "../../../components/public/PublicPageFrame";
import { publicDestinations } from "../../../data/publicDestinations";

export default function DestinationsPage() {
  return (
    <PublicPageFrame
      title="Destinations"
      description="From world-famous temples to relaxed riverside towns, find the Cambodia that speaks to you."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {publicDestinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </PublicPageFrame>
  );
}
