import khContent from "../locales/kh/content.js";

const localizedObject = (source, translation) => ({
  ...source,
  ...(translation || {}),
});

export function localizeDestination(destination, language) {
  if (language !== "kh") return destination;
  return localizedObject(destination, khContent.destinations[destination.id]);
}

export function localizeTour(tour, language) {
  if (language !== "kh") return tour;

  const translation = khContent.tours[tour.id];
  if (!translation) return tour;

  return {
    ...tour,
    ...translation,
    itinerary: tour.itinerary.map((day, index) =>
      localizedObject(day, translation.itinerary?.[index]),
    ),
  };
}

export function localizeTripDetail(trip, language) {
  if (language !== "kh") return trip;

  const translation = khContent.tripDetail;
  return {
    ...trip,
    ...translation,
    itinerary: trip.itinerary.map((day, index) => ({
      ...day,
      ...translation.itinerary[index],
    })),
    included: translation.included,
    excluded: translation.excluded,
    info: trip.info.map(([, , icon], index) => [
      translation.info[index][0],
      translation.info[index][1],
      icon,
    ]),
    reviews: trip.reviews.map((review, index) => ({
      ...review,
      text: translation.reviews[index],
    })),
  };
}
