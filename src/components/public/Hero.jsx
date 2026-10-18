import angkorPanorama from "../../assets/images/trips/angkor-gallery(1).jpg";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[580px] items-center justify-center overflow-hidden text-center text-white sm:min-h-[650px] lg:min-h-[calc(75vh-64px)]">
      <img
        src={angkorPanorama}
        alt="Angkor Wat reflected in the water at sunrise"
        className="absolute inset-0 -z-20 h-full w-full scale-[1.02] object-cover object-center blur-[2px]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-amber-950/35 via-slate-950/55 to-slate-950/70" />
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200 sm:text-sm">
          Cambodia, beautifully discovered
        </p>
        <h1 className="mx-auto max-w-4xl text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Discover the Beauty of Cambodia
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-white/90 sm:text-base sm:leading-7">
          Embark on a journey through ancient temples, pristine beaches, and
          vibrant cultures. Curated experiences for the modern traveler.
        </p>
        <a
          href="#featured-tours"
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Explore Tours
        </a>
      </div>
    </section>
  );
}
