import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import siemReap from "../../assets/images/destinations/siemReap.jpg";

const logoImage = "https://i.pinimg.com/736x/33/1d/f1/331df1662cb1553dad983c1821cca1d0.jpg";

export default function AuthPageShell({ children }) {
  const { t } = useTranslation();

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
            className="relative z-10 inline-flex w-fit items-center gap-3 text-lg font-bold tracking-tight"
          >
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-emerald-300/70 bg-white/10 shadow-sm ring-2 ring-emerald-300/40">
              <img src={logoImage} alt="Tour-Trip" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col leading-tight">
              <p style={{ fontFamily: '"Kantumruy Pro", "Segoe UI", sans-serif' }}>ដំណើរ</p>
              <p>Tour-Trip</p>
            </div>
          </Link>

          <div className="relative z-10 max-w-md">
            <span className="mb-4 inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur">
              {t("auth.discoverCambodia")}
            </span>
            <h2 className="text-4xl font-bold leading-tight tracking-tight">
              {t("auth.journeyTitle")}
            </h2>
            <p className="mt-4 max-w-sm text-base leading-7 text-white/80">
              {t("auth.journeyText")}
            </p>
          </div>
        </aside>

        <div className="min-w-0 px-5 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-base font-bold tracking-tight text-slate-900 lg:hidden"
          >
            <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-emerald-200 bg-white shadow-sm">
              <img src={logoImage} alt="Tour-Trip" className="h-full w-full object-cover" />
            </div>
            Tour-Trip
          </Link>
          {children}
        </div>
      </section>
    </main>
  );
}
