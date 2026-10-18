import {
  ArrowRight,
  BadgeDollarSign,
  Clock3,
  MapPin,
  Shirt,
  Sun,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import angkorWat from "../../assets/images/trips/Angkor-Wat(1).jpg";
import tonleLake from "../../assets/images/trips/tonle-lake(1).jpg";
import { publicDestinations } from "../../data/publicDestinations";
import { publicTours } from "../../data/publicTours";

const travelTips = [
  {
    title: "Best Time to Visit",
    description: "November to March brings cooler, dry weather for exploring.",
    icon: Sun,
    iconClass: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Temple Dress Code",
    description: "Cover your shoulders and knees when visiting sacred sites.",
    icon: Shirt,
    iconClass: "bg-sky-100 text-sky-700",
  },
  {
    title: "Currency",
    description: "US dollars and Cambodian riel are widely accepted.",
    icon: BadgeDollarSign,
    iconClass: "bg-amber-100 text-amber-700",
  },
];

function AttractionCard({ attraction, featured = false }) {
  return (
    <article
      className={`group relative isolate flex min-h-64 overflow-hidden rounded-2xl bg-slate-900 shadow-sm sm:min-h-72 ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      <img
        src={attraction.image}
        alt={attraction.title}
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />
      <div className="mt-auto p-5 text-white sm:p-6">
        <h3 className="text-lg font-semibold sm:text-xl">{attraction.title}</h3>
        <p className="mt-1 max-w-xl text-sm leading-5 text-white/85">
          {attraction.description}
        </p>
      </div>
    </article>
  );
}

function RecommendedTourCard({ tour }) {
  const destination = publicDestinations.find(
    (item) => item.name === tour.destination,
  );

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link
        to={`/tours/${tour.slug}`}
        className="relative block overflow-hidden"
      >
        <img
          src={tour.image}
          alt={tour.title}
          loading="lazy"
          className="h-44 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-48"
        />
        <span className="absolute right-3 top-3 rounded-lg bg-white/95 px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
          {destination?.category ?? tour.destination}
        </span>
      </Link>
      <div className="p-4 sm:p-5">
        <Link
          to={`/tours/${tour.slug}`}
          className="line-clamp-1 text-lg font-semibold text-slate-900 hover:text-emerald-700"
        >
          {tour.title}
        </Link>
        <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
          <Clock3 size={15} className="shrink-0" aria-hidden="true" />
          <span>{tour.duration}</span>
          <span aria-hidden="true">·</span>
          <span className="capitalize">{tour.type}</span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <span className="text-xl font-bold text-red-600">${tour.price}</span>
          <Link
            to={`/tours/${tour.slug}`}
            className="shrink-0 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Booking
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function DestinationPage() {
  const { id } = useParams();
  const destination = id
    ? publicDestinations.find((item) => item.id === id)
    : publicDestinations[0];

  if (!destination) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
        <MapPin size={36} className="text-emerald-700" aria-hidden="true" />
        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          Destination not found
        </h1>
        <p className="mt-2 text-slate-600">
          Choose a destination to start planning your trip.
        </p>
        <Link
          to="/destinations"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          Browse destinations <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </main>
    );
  }

  const attractions =
    destination.id === "siem-reap"
      ? [
          {
            title: "Angkor Wat",
            description:
              "Watch the morning light fall across Cambodia's iconic temple complex.",
            image: angkorWat,
          },
          {
            title: "Tonlé Sap Floating Village",
            description:
              "Discover a remarkable lakeside way of life just outside the city.",
            image: tonleLake,
          },
        ]
      : [
          {
            title: `Explore ${destination.name}`,
            description: destination.description,
            image: destination.image,
          },
          {
            title: `${destination.category} experiences`,
            description: `Take time to enjoy the landscapes and local character of ${destination.name}.`,
            image: destination.image,
          },
        ];
  const destinationTours = publicTours.filter(
    (tour) => tour.destination === destination.name,
  );
  const recommendedTours = [
    ...destinationTours,
    ...publicTours.filter((tour) => tour.destination !== destination.name),
  ].slice(0, 4);

  return (
    <main className="min-h-screen bg-[#f7f8fc] pb-12">
      <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8 lg:pt-8">
        <section className="relative isolate flex min-h-[300px] overflow-hidden rounded-2xl bg-slate-900 sm:min-h-[380px] lg:min-h-[430px]">
          <img
            src={destination.image}
            alt={destination.name}
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-slate-950/5" />
          <div className="mt-auto max-w-3xl p-6 text-white sm:p-9 lg:p-11">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-700/90 px-3 py-1 text-xs font-semibold">
              <MapPin size={13} aria-hidden="true" />
              {destination.category}
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {destination.name}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/90 sm:text-base">
              {destination.description}
            </p>
          </div>
        </section>

        <section className="mt-8" aria-labelledby="attractions-heading">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2
              id="attractions-heading"
              className="text-xl font-bold text-slate-900"
            >
              Top Attractions
            </h2>
            <a
              href="#recommended-tours"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-900"
            >
              Explore more <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {attractions.map((attraction, index) => (
              <AttractionCard
                key={attraction.title}
                attraction={attraction}
                featured={index === 0}
              />
            ))}
          </div>
        </section>

        <section
          id="recommended-tours"
          className="mt-8 rounded-2xl bg-slate-100/80 px-4 py-6 sm:px-6"
          aria-labelledby="recommended-tours-heading"
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2
              id="recommended-tours-heading"
              className="text-xl font-bold text-slate-900"
            >
              Recommended Tours
            </h2>
            <Link
              to="/tours"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-900"
            >
              See all <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          {recommendedTours.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {recommendedTours.map((tour) => (
                <RecommendedTourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-white px-4 py-6 text-sm text-slate-600">
              There are no tours listed for {destination.name} yet.{" "}
              <Link
                to="/tours"
                className="font-semibold text-emerald-800 hover:underline"
              >
                Browse all tours
              </Link>
              .
            </p>
          )}
        </section>

        <section className="mt-8" aria-labelledby="travel-tips-heading">
          <h2
            id="travel-tips-heading"
            className="mb-4 text-center text-xl font-bold text-slate-900"
          >
            Essential Travel Tips
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {travelTips.map(({ title, description, icon: Icon, iconClass }) => (
              <article
                key={title}
                className="rounded-xl border border-slate-100 bg-white px-5 py-5 text-center shadow-sm"
              >
                <span
                  className={`mx-auto inline-flex h-11 w-11 items-center justify-center rounded-full ${iconClass}`}
                >
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-sm font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-slate-600">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
