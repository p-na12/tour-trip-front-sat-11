import {
  ArrowRight,
  BadgeCheck,
  Compass,
  Earth,
  GraduationCap,
  HandHeart,
  Headset,
  Leaf,
  Map,
  MapPin,
  ShieldCheck,
  Star,
  UsersRound,
} from "lucide-react";
import angkorWat from "../../../assets/images/trips/Angkor-Wat(1).jpg";
import tonleLake from "../../../assets/images/trips/tonle-lake(1).jpg";
import siemReap from "../../../assets/images/destinations/siemReap.jpg";
import siemReapCity from "../../../assets/images/trips/Arrival & Siem Reap City.jpg";

const impactStats = [
  {
    icon: Map,
    value: "100+",
    label: "Curated Destinations",
    detail: "Temples & Nature Parks",
    color: "bg-sky-100 text-sky-700",
  },
  {
    icon: UsersRound,
    value: "10,000+",
    label: "Happy Travelers",
    detail: "From 64+ Countries",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: BadgeCheck,
    value: "50+",
    label: "Licensed Local Guides",
    detail: "Official Certified Historians",
    color: "bg-violet-100 text-violet-700",
  },
  {
    icon: Star,
    value: "4.9 / 5",
    label: "Average Rating",
    detail: "From 4,200+ Verified Reviews",
    color: "bg-amber-100 text-amber-700",
  },
  {
    icon: Headset,
    value: "24 / 7",
    label: "Dedicated Support",
    detail: "On-the-ground Assistance",
    color: "bg-rose-100 text-rose-700",
  },
];

const principles = [
  {
    number: "01",
    icon: Compass,
    title: "Authentic Discovery",
    description:
      "We venture beyond crowded selfie stops into private sunrise access, hidden jungle shrines, and sacred mountain trails.",
    label: "Rare experiences",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    number: "02",
    icon: GraduationCap,
    title: "Certified Local Guides",
    description:
      "Licensed Khmer historians and passionate storytellers who grow up in the shadow of Angkor and bring cultural depth to every route.",
    label: "Officially certified",
    color: "bg-sky-100 text-sky-700",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Seamless & Safe",
    description:
      "Transparent pricing, flexible bookings, well-planned transportation, and clear communication from reservation to return.",
    label: "Travel with confidence",
    color: "bg-violet-100 text-violet-700",
  },
  {
    number: "04",
    icon: HandHeart,
    title: "Sustainable Impact",
    description:
      "We support local families, community tourism, and conservation-led experiences that keep Cambodia vibrant for future generations.",
    label: "Community first",
    color: "bg-amber-100 text-amber-700",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
      <section className="relative isolate overflow-hidden rounded-[22px] border border-green-600 bg-slate-950 shadow-[0_20px_50px_rgba(11,35,71,0.12)]">
        <img
          src={angkorWat}
          alt="Angkor Wat at sunset"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,35,71,0.90)_0%,rgba(11,35,71,0.74)_35%,rgba(11,35,71,0.25)_100%)]" />

        <div className="relative z-10 px-6 py-7 sm:px-9 sm:py-9 lg:px-10 lg:py-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
              <Leaf className="h-2.5 w-2.5" aria-hidden="true" />
            </span>
            Our Cambodian Heritage
          </div>

          <h1 className="mt-5 text-[2.8rem] font-bold tracking-[-0.06em] text-white sm:text-[3.2rem] lg:text-[4rem]">
            About Tour-Trip
          </h1>

          <p className="mt-4 max-w-[700px] text-base leading-7 text-slate-100/90 sm:text-lg sm:leading-8">
            Connecting curious travelers with authentic Cambodian culture,
            hidden jungle sanctuaries, and the timeless majesty of the Khmer
            Kingdom.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 sm:gap-6">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-white/90">
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-emerald-300/80 bg-emerald-500/10 text-emerald-300">
                <BadgeCheck className="h-3 w-3" aria-hidden="true" />
              </span>
              Cambodia Ministry of Tourism Licensed
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-white/90">
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/30 bg-white/5 text-white/80">
                <Earth className="h-3 w-3" aria-hidden="true" />
              </span>
              Eco-Certified Operator
            </span>
          </div>
        </div>
      </section>

      <section className="mt-9 rounded-[28px] bg-gray-200 p-4 sm:p-5 lg:p-6">
        <div className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <MapPin className="h-2.5 w-2.5" aria-hidden="true" />
          </span>
          Our roots & ethos
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.08fr_1fr] lg:items-start">
          <div>
            <h2 className="max-w-xl text-[2.15rem] font-bold tracking-[-0.05em] text-slate-900 sm:text-[2.7rem]">
              Born in Cambodia, Crafted for Thoughtful Explorers
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
              Tour-Trip was founded by native Cambodian cultural archivists and
              veteran guides who noticed mass tourism was bypassing the real
              heartbeat of the Kingdom. Beyond the standard tour buses,
              Cambodia holds untamed cardamom mountains, living village
              economies, and sacred temple insights waiting for meaningful
              discovery.
            </p>

            <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
              Every itinerary we curate is designed around local knowledge,
              cultural respect, and genuine human connection—so travelers can
              experience Cambodia with curiosity, confidence, and care.
            </p>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
                <p className="text-xl font-bold tracking-[-0.06em] text-slate-900">
                  100%
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-800">
                  Khmer-Owned & Guided
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Direct revenues empower local village economies.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
                <p className="text-xl font-bold tracking-[-0.06em] text-slate-900">
                  5% Fund
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-800">
                  Restoration Pledge
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Donated to temple masonry & clean water wells.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="group relative col-span-2 overflow-hidden rounded-[24px] border border-slate-200 bg-slate-200 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
              <img
                src={siemReap}
                alt="Tour guides and travelers in Siem Reap"
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[13.2rem]"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-emerald-600/95 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                Expert Guides
              </span>
            </div>

            <div className="group relative overflow-hidden rounded-[22px] border border-slate-200 bg-slate-200 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
              <img
                src={tonleLake}
                alt="Floating village and lake in Cambodia"
                className="h-[11.2rem] w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="group relative overflow-hidden rounded-[22px] border border-slate-200 bg-slate-200 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
              <img
                src={siemReapCity}
                alt="Community-based tourism in Siem Reap"
                className="h-[11.2rem] w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-emerald-600/95 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                Community Tourism
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[22px] border border-slate-200 bg-white p-3 shadow-[0_12px_32px_rgba(15,23,42,0.06)] sm:p-4 lg:p-5">
        <div className="grid gap-y-3 gap-x-2 sm:grid-cols-2 lg:grid-cols-5 ">
          {impactStats.map(({ icon: Icon, value, label, detail, color }) => (
            <div
              key={label}
              className="flex min-h-[176px] flex-col items-center border border-green-600 justify-center rounded-2xl px-3 py-5 text-center transition duration-200 hover:-translate-y-0.5 hover:bg-slate-50"
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-white ${color}`}
              >
                <Icon className="h-7 w-7" aria-hidden="true" />
              </span>
              <p className="mt-4 text-2xl font-bold leading-none tracking-[-0.06em] text-slate-900">
                {value}
              </p>
              <p className="mt-3 text-[1.05rem] font-semibold tracking-[-0.03em] text-slate-800">
                {label}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-500">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
              The Tour-Trip difference
            </p>
            <h2 className="mt-2 text-[2.1rem] font-bold tracking-[-0.05em] text-slate-900 sm:text-[2.8rem]">
              Our Guiding Principles & Commitments
            </h2>
          </div>
          <p className="max-w-[520px] text-base leading-7 text-slate-600 lg:text-right">
            Every journey with us balances effortless digital convenience with
            profound cultural immersion and safety.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {principles.map(({ number, icon: Icon, title, description, label, color }) => (
            <article
              key={number}
              className="group flex min-h-[290px] flex-col rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_10px_25px_rgba(15,23,42,0.03)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(15,23,42,0.08)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[2rem] font-bold tracking-[-0.06em] text-slate-300">
                  {number}
                </span>
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 ${color}`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>

              <h3 className="mt-6 text-[1.15rem] font-bold tracking-[-0.04em] text-slate-900 sm:text-[1.5rem]">
                {title}
              </h3>
              <p className="mt-3 flex-1 text-base leading-7 text-slate-600">
                {description}
              </p>
              <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-emerald-700">
                {label}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
