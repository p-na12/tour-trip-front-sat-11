import { Globe2 } from "lucide-react";
import { Link } from "react-router-dom";
import siemReap from "../../assets/images/destinations/siemReap.jpg";

export default function AuthPageShell({ children }) {
  return (
    <main className="flex min-w-0 flex-1 items-center justify-center bg-slate-50 px-4 py-8 sm:px-6 lg:py-12">
      <section className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="relative hidden min-h-[620px] flex-col justify-between overflow-hidden bg-slate-950 p-10 text-white lg:flex">
          <img
            src={siemReap}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-slate-950/85" />

          <Link
            to="/"
            className="relative z-10 inline-flex w-fit items-center gap-2 text-lg font-bold tracking-tight"
          >
            <Globe2 className="h-6 w-6 text-emerald-300" aria-hidden="true" />
            Tour-Trip
          </Link>

          <div className="relative z-10 max-w-md">
            <span className="mb-4 inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur">
              Discover Cambodia
            </span>
            <h2 className="text-4xl font-bold leading-tight tracking-tight">
              Find a journey that feels like yours.
            </h2>
            <p className="mt-4 max-w-sm text-base leading-7 text-white/80">
              From ancient temples to quiet countryside, explore Cambodia with
              local insight and thoughtful care.
            </p>
          </div>
        </aside>

        <div className="min-w-0 px-5 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-base font-bold tracking-tight text-slate-900 lg:hidden"
          >
            <Globe2 className="h-5 w-5 text-emerald-700" aria-hidden="true" />
            Tour-Trip
          </Link>
          {children}
        </div>
      </section>
    </main>
  );
}
