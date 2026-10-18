import PublicPageFrame from "../../../components/public/PublicPageFrame";

export default function AboutPage() {
  return (
    <PublicPageFrame
      title="About Tour-Trip"
      description="We help travelers experience Cambodia with local insight, thoughtful planning, and memorable journeys."
    >
      <section className="grid gap-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-10 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Travel deeper. Discover more.
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            Tour-Trip brings together Cambodia's remarkable destinations and
            experiences, from the ancient temples of Siem Reap to the lively
            streets of Phnom Penh and the quiet riverside scenery of Kampot.
          </p>
          <p className="mt-4 leading-7 text-slate-600">
            Our goal is to make it easier to find a trip that fits your pace,
            connect with the places you visit, and enjoy every part of the
            journey.
          </p>
        </div>
        <img
          src="https://i.pinimg.com/736x/28/46/61/284661d052333313d5fd65f8a2325b69.jpg"
          alt="Cambodian Royal Palace in Phnom Penh"
          loading="lazy"
          className="h-64 w-full rounded-xl object-cover md:h-full"
        />
      </section>
    </PublicPageFrame>
  );
}
