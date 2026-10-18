import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck2,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  ShieldCheck,
  Star,
  Users,
  X,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import TourCard from "../../../components/public/TourCard";
import { publicTours } from "../../../data/publicTours";

function TourGallery({ tour }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const showImage = (offset) => {
    setActiveImageIndex(
      (current) => (current + offset + tour.images.length) % tour.images.length,
    );
  };

  return (
    <section aria-label={`${tour.title} photo gallery`} className="min-w-0">
      <div className="group relative h-64 overflow-hidden rounded-2xl bg-slate-100 sm:h-80 lg:h-[420px]">
        <img
          src={tour.images[activeImageIndex]}
          alt={`${tour.title} view ${activeImageIndex + 1}`}
          className="h-full w-full object-cover"
        />
        <button
          type="button"
          onClick={() => showImage(-1)}
          aria-label="Previous tour image"
          className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-800 shadow transition hover:bg-white"
        >
          <ChevronLeft size={21} />
        </button>
        <button
          type="button"
          onClick={() => showImage(1)}
          aria-label="Next tour image"
          className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-800 shadow transition hover:bg-white"
        >
          <ChevronRight size={21} />
        </button>
        <span className="absolute bottom-3 right-3 rounded-full bg-slate-950/70 px-3 py-1 text-xs font-semibold text-white">
          {activeImageIndex + 1} / {tour.images.length}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
        {tour.images.map((image, index) => (
          <button
            key={`${tour.slug}-image-${index}`}
            type="button"
            onClick={() => setActiveImageIndex(index)}
            aria-label={`Show tour image ${index + 1}`}
            aria-pressed={activeImageIndex === index}
            className={`h-16 overflow-hidden rounded-lg border-2 transition sm:h-20 ${
              activeImageIndex === index
                ? "border-emerald-700"
                : "border-transparent opacity-75 hover:opacity-100"
            }`}
          >
            <img
              src={image}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </section>
  );
}

function TourBookingCard({ tour }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <p className="text-sm text-slate-500">From</p>
      <p className="mt-1 text-3xl font-bold text-[#0b2347]">
        ${tour.price}
        <span className="ml-1 text-sm font-normal text-slate-500">/ person</span>
      </p>
      <Link
        to="/login"
        state={{
          bookingTour: {
            id: tour.id,
            slug: tour.slug,
            title: tour.title,
            price: tour.price,
            location: tour.location,
          },
        }}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#00875f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
      >
        <CalendarCheck2 size={18} aria-hidden="true" />
        Book Now
      </Link>
      <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 text-sm text-slate-600">
        <p className="flex items-center gap-2">
          <Check size={16} className="text-emerald-700" aria-hidden="true" />
          Instant confirmation
        </p>
        <p className="flex items-center gap-2">
          <ShieldCheck
            size={16}
            className="text-emerald-700"
            aria-hidden="true"
          />
          Free cancellation up to 24 hours before
        </p>
      </div>
    </section>
  );
}

function ItinerarySection({ days }) {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const activeDay = days[activeDayIndex];

  return (
    <section aria-labelledby="itinerary-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
            Your journey
          </p>
          <h2
            id="itinerary-heading"
            className="mt-1 text-2xl font-bold text-[#0b2347] sm:text-3xl"
          >
            Itinerary
          </h2>
        </div>
        <div
          role="tablist"
          aria-label="Itinerary days"
          className="flex max-w-full gap-2 overflow-x-auto pb-1"
        >
          {days.map((day, index) => (
            <button
              key={day.day}
              type="button"
              role="tab"
              id={`itinerary-tab-${index}`}
              aria-selected={activeDayIndex === index}
              aria-controls="itinerary-panel"
              onClick={() => setActiveDayIndex(index)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeDayIndex === index
                  ? "bg-[#0b2347] text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              {day.day}
            </button>
          ))}
        </div>
      </div>
      <article
        id="itinerary-panel"
        role="tabpanel"
        aria-labelledby={`itinerary-tab-${activeDayIndex}`}
        className="mt-5 grid overflow-hidden rounded-2xl border border-slate-200 bg-white md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
      >
        <img
          src={activeDay.image}
          alt={activeDay.title}
          className="h-56 w-full object-cover md:h-full md:min-h-80"
          loading="lazy"
        />
        <div className="p-5 sm:p-7">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={15} className="text-emerald-700" aria-hidden="true" />
              {activeDay.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={15} aria-hidden="true" />
              {activeDay.time}
            </span>
          </div>
          <h3 className="mt-3 text-xl font-bold text-[#0b2347]">
            {activeDay.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {activeDay.description}
          </p>
          <ul className="mt-5 space-y-3">
            {activeDay.activities.map((activity) => (
              <li
                key={activity}
                className="flex items-start gap-3 text-sm text-slate-700"
              >
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-700">
                  <Check size={13} aria-hidden="true" />
                </span>
                {activity}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
}

function DetailList({ title, items, included }) {
  const Icon = included ? Check : X;
  const iconClass = included
    ? "bg-emerald-50 text-emerald-700"
    : "bg-slate-100 text-slate-500";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <h2 className="text-lg font-bold text-[#0b2347]">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
            <span
              className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${iconClass}`}
            >
              <Icon size={13} aria-hidden="true" />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function TourNotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-700">
        <MapPin size={25} aria-hidden="true" />
      </span>
      <h1 className="mt-5 text-2xl font-bold text-[#0b2347]">Tour Not Found</h1>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
        This tour may have moved or is no longer available. Browse our other
        Cambodia experiences.
      </p>
      <Link
        to="/tours"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#00875f] px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to tours
      </Link>
    </main>
  );
}

export default function TourDetailPage() {
  const { slug } = useParams();
  const tour = publicTours.find((item) => item.slug === slug);

  if (!tour) {
    return <TourNotFound />;
  }

  const recommendedTours = publicTours
    .filter((item) => item.id !== tour.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[#f7f9fc] pb-14">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <Link
          to="/tours"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-emerald-700"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          All tours
        </Link>

        <section className="grid items-start gap-7 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
          <div>
            <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
              {tour.category} tour
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#0b2347] sm:text-4xl">
              {tour.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <Star
                  size={17}
                  className="fill-amber-400 text-amber-400"
                  aria-hidden="true"
                />
                <strong className="text-slate-900">{tour.rating}</strong>
                <span>({tour.reviewCount} reviews)</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 size={16} aria-hidden="true" />
                {tour.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={16} aria-hidden="true" />
                {tour.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users size={16} aria-hidden="true" />
                {tour.groupSize}
              </span>
            </div>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              {tour.description}
            </p>
            <div className="mt-6 lg:max-w-md">
              <TourBookingCard tour={tour} />
            </div>
          </div>
          <TourGallery tour={tour} />
        </section>

        <div className="mt-14 space-y-14 sm:mt-16">
          <ItinerarySection days={tour.itinerary} />

          <section
            className="grid gap-5 md:grid-cols-2"
            aria-label="Tour inclusions"
          >
            <DetailList
              title="What's Included"
              items={tour.included}
              included
            />
            <DetailList
              title="What's Not Included"
              items={tour.notIncluded}
              included={false}
            />
          </section>

          <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.8fr)]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                Make it memorable
              </p>
              <h2 className="mt-1 text-2xl font-bold text-[#0b2347]">
                Tour Highlights
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {tour.highlights.map((highlight, index) => (
                  <article
                    key={highlight}
                    className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-800">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm font-medium leading-6 text-slate-700">
                      {highlight}
                    </p>
                  </article>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-50 text-emerald-700">
                  <MapPin size={19} aria-hidden="true" />
                </span>
                <h2 className="mt-3 text-lg font-bold text-[#0b2347]">
                  Meeting Point
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {tour.meetingPoint}
                </p>
              </section>
              <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <h2 className="text-lg font-bold text-[#0b2347]">Good to Know</h2>
                <ul className="mt-3 space-y-2.5">
                  {tour.goodToKnow.map((tip) => (
                    <li
                      key={tip}
                      className="flex items-start gap-2.5 text-sm leading-5 text-slate-600"
                    >
                      <Check
                        size={15}
                        className="mt-0.5 shrink-0 text-emerald-700"
                        aria-hidden="true"
                      />
                      {tip}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </section>

          {recommendedTours.length > 0 && (
            <section aria-labelledby="recommended-tours-heading">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                    Keep exploring
                  </p>
                  <h2
                    id="recommended-tours-heading"
                    className="mt-1 text-2xl font-bold text-[#0b2347]"
                  >
                    You May Also Like
                  </h2>
                </div>
                <Link
                  to="/tours"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:text-emerald-900"
                >
                  See all <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {recommendedTours.map((recommendedTour) => (
                  <TourCard key={recommendedTour.id} tour={recommendedTour} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
