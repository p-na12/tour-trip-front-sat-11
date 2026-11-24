import {
  ArrowRight,
  BadgeDollarSign,
  Clock3,
  MapPin,
  Shirt,
  Sun,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import angkorWat from "../../assets/images/trips/Angkor-Wat(1).jpg";
import tonleLake from "../../assets/images/trips/tonle-lake(1).jpg";
import { publicDestinations } from "../../data/publicDestinations";
import { publicTours } from "../../data/publicTours";
import { localizeDestination, localizeTour } from "../../i18n/localizeContent";

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

function AttractionCard({ attraction, featured = false, index = 0 }) {
  return (
    <motion.article
      className={`group relative isolate flex min-h-64 overflow-hidden rounded-2xl border border-emerald-600 bg-slate-900 shadow-sm sm:min-h-72 ${
        featured ? "lg:col-span-2" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
        delay: (index % 3) * 0.2,
      }}
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
    </motion.article>
  );
}

function RecommendedTourCard({ tour, language, t, index = 0 }) {
  const content = localizeTour(tour, language);
  const destination = publicDestinations.find(
    (item) => item.name === tour.destination,
  );
  const localizedDestination = destination
    ? localizeDestination(destination, language)
    : null;

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
      <article
        className="group overflow-hidden rounded-2xl border border-emerald-600 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
      >
        <Link
          to={`/tours/${content.slug}`}
          className="relative block overflow-hidden"
        >
          <img
            src={content.image}
            alt={content.title}
            loading="lazy"
            className="h-44 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-48"
          />
          <span className="absolute right-3 top-3 rounded-lg bg-white/95 px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
            {localizedDestination?.category ?? content.destination}
          </span>
        </Link>
        <div className="p-4 sm:p-5">
          <Link
            to={`/tours/${content.slug}`}
            className="line-clamp-1 text-lg font-semibold text-slate-900 hover:text-emerald-700"
          >
            {content.title}
          </Link>
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
            <Clock3 size={15} className="shrink-0" aria-hidden="true" />
            <span>{content.duration}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{t(`common.tourTypes.${tour.type}`, { defaultValue: content.category })}</span>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <span className="text-xl font-bold text-red-600">${content.price}</span>
            <Link
              to={`/tours/${content.slug}`}
              className="shrink-0 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              {t("common.booking")}
            </Link>
          </div>
        </div>
      </article>
    </motion.div>
  );
}

export default function DestinationPage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage || i18n.language;
  const sourceDestination = id
    ? publicDestinations.find((item) => item.id === id)
    : publicDestinations[0];
  const destination = sourceDestination
    ? localizeDestination(sourceDestination, language)
    : null;

  if (!destination) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
        <MapPin size={36} className="text-emerald-700" aria-hidden="true" />
        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          {t("destination.notFound")}
        </h1>
        <p className="mt-2 text-slate-600">
          {t("destination.notFoundText")}
        </p>
        <Link
          to="/destinations"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          {t("destination.browseDestinations")} <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </main>
    );
  }

  const attractions =
    destination.id === "siem-reap"
      ? [
          {
            title: t("destination.angkorWat"),
            description: t("destination.angkorWatDescription"),
            image: angkorWat,
          },
          {
            title: t("destination.tonleSapVillage"),
            description: t("destination.tonleSapDescription"),
            image: tonleLake,
          },
        ]
      : [
          {
            title: t("destination.exploreDestination", { destination: destination.name }),
            description: destination.description,
            image: destination.image,
          },
          {
            title: t("destination.destinationExperiences", { category: destination.category }),
            description: t("destination.localCharacter", { destination: destination.name }),
            image: destination.image,
          },
        ];
  const destinationTours = publicTours.filter(
    (tour) => tour.destination === sourceDestination.name,
  );
  const recommendedTours = [
    ...destinationTours,
    ...publicTours.filter((tour) => tour.destination !== sourceDestination.name),
  ];

  return (
   <main className="w-full min-w-0 min-h-screen bg-[#f7f8fc] pb-12">
  <div className="mx-auto w-full max-w-7xl px-4 pt-5 sm:px-6 lg:px-8 lg:pt-8">
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
            <h1
              className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              {destination.name}
            </h1>
            <p
              className="mt-2 max-w-2xl text-sm leading-6 text-white/90 sm:text-base"
            >
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
              {t("destination.topAttractions")}
            </h2>
            <a
              href="#recommended-tours"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-900"
            >
              {t("destination.exploreMore")} <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {attractions.map((attraction, index) => (
              <AttractionCard
                key={attraction.title}
                attraction={attraction}
                featured={index === 0}
                index={index}
              />
            ))}
          </div>
        </section>

        <section
          id="recommended-tours"
          className="mt-8 rounded-2xl bg-slate-100/80 px-4 py-6 sm:px-0"
          aria-labelledby="recommended-tours-heading"
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2
              id="recommended-tours-heading"
              className="text-xl font-bold text-slate-900"
            >
              {t("destination.recommendedTours")}
            </h2>
            <Link
              to="/tours"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-900"
            >
              {t("destination.seeAll")} <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          {recommendedTours.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recommendedTours.map((tour, index) => (
                <RecommendedTourCard
                  key={tour.id}
                  tour={tour}
                  language={language}
                  t={t}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-white px-4 py-6 text-sm text-slate-600">
              {t("destination.noToursForDestination", { destination: destination.name })}{" "}
              <Link
                to="/tours"
                className="font-semibold text-emerald-800 hover:underline"
              >
                {t("destination.browseAllTours")}
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
            {t("destination.essentialTravelTips")}
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {travelTips.map(({ title, description, icon: Icon, iconClass }, index) => (
              <article
                key={title}
                className="rounded-xl border border-emerald-600 bg-white px-5 py-5 text-center shadow-sm"
              >
                <span
                  className={`mx-auto inline-flex h-11 w-11 items-center justify-center rounded-full ${iconClass}`}
                >
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-sm font-semibold text-slate-900">
                  {t(["destination.bestTimeToVisit", "destination.dressCode", "destination.currency"][index])}
                </h3>
                <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-slate-600">
                  {t(["destination.bestTimeDescription", "destination.dressCodeDescription", "destination.currencyDescription"][index])}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
