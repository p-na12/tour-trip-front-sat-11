import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  CalendarRange,
  Check,
  CircleUserRound,
  Compass,
  Mail,
  MapPin,
  NotebookPen,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useAuth } from "../../context/auth";

export default function ProfilePage() {
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const isKhmer = i18n.resolvedLanguage === "kh" || i18n.language === "kh";

  const profile = {
    name: user?.name || "Lina S.",
    email: user?.email || "lina12@gmail.com",
    phone: user?.phone || "+855 027 352 323",
    location: user?.location || (isKhmer ? "ដូនពេញ, ភ្នំពេញ, កម្ពុជា" : "Daun Penh, Phnom Penh, Cambodia"),
    memberSince: user?.memberSince || "October 2023",
    verified: user?.verified ?? true,
  };

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-[28px] border border-[#dce5dd] bg-[#eef5f0] p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)] sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-[#d9f7e8] via-[#ecfdf5] to-[#d7efe0] shadow-sm sm:h-24 sm:w-24">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
                alt={t("profile.avatarAlt")}
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-[#0f172a] sm:text-4xl">{profile.name}</h1>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  <ShieldCheck size={12} />
                  {t("profile.silverExplorer")}
                </span>
              </div>

              <div className="mt-3 space-y-2 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <CalendarRange size={15} className="text-slate-500" />
                  <span>{t("profile.memberSince", { date: profile.memberSince })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-slate-500" />
                  <span>{t("profile.resident")}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link to="/my-bookings" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f3b3a] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0d2f2f]">
              <BookOpenText size={17} />
              {t("profile.viewBookings")}
            </Link>
            <button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#cfe2d2] bg-white px-5 py-3 text-sm font-semibold text-[#0b2347] shadow-sm transition hover:bg-slate-50">
              <NotebookPen size={17} />
              {t("profile.editProfile")}
            </button>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-[#d6e2d0] pt-5 text-sm text-slate-700">
          <div className="flex items-center gap-2">
            <BadgeCheck size={16} className="text-emerald-600" />
            <span>{profile.verified ? t("profile.identityVerified") : t("profile.verificationPending")}</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-2">
            <CircleUserRound size={16} className="text-emerald-600" />
            <span>{t("profile.handcraftedTrips", { count: 4 })}</span>
          </div>
        </div>
      </section>

      <section className="mt-7 rounded-[24px] border border-[#d6e5d7] bg-[#eaf3eb] p-4 sm:p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#dff3e5] text-[#0f3b3a]">
              <Compass size={18} />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0f3b3a]">{t("profile.nextJourney")}</p>
              <h2 className="mt-1 text-2xl font-bold text-[#0f172a]">{t("profile.nextJourneyTitle")}</h2>
            </div>
          </div>

          <button type="button" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f3b3a]">
            {t("profile.itineraryDetails")}
            <ArrowRight size={16} />
          </button>
        </div>

        <p className="mt-3 text-sm text-slate-600">{t("profile.nextJourneyDate")}</p>
      </section>

      <section className="mt-7 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[24px] border border-[#dfe9e0] bg-[#f3f8f4] p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#d8efe3] text-[#0f3b3a]">
                <UserRound size={17} />
              </div>
              <h3 className="text-2xl font-bold text-[#0f172a]">{t("profile.accountDetails")}</h3>
            </div>
            <span className="text-sm font-medium text-slate-500">{t("profile.personal")}</span>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-[#dfe7df] bg-[#eef3ef] px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">{t("profile.legalName")}</p>
              <p className="mt-2 text-lg font-semibold text-slate-800">Lina Samnang</p>
            </div>

            <div className="rounded-2xl border border-[#dfe7df] bg-[#eef3ef] px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">{t("profile.primaryEmail")}</p>
                {profile.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                    <Check size={12} /> {t("profile.verified")}
                  </span>
                )}
              </div>
              <p className="mt-2 text-base font-semibold text-slate-800">{profile.email}</p>
            </div>

            <div className="rounded-2xl border border-[#dfe7df] bg-[#eef3ef] px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">{t("profile.phoneWhatsapp")}</p>
              <p className="mt-2 text-lg font-semibold text-slate-800">{profile.phone}</p>
            </div>

            <div className="rounded-2xl border border-[#dfe7df] bg-[#eef3ef] px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">{t("profile.primaryResidence")}</p>
              <p className="mt-2 text-lg font-semibold text-slate-800">{profile.location}</p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#dfe7df] pt-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-slate-500" />
              <span>{t("profile.passportOnFile")}</span>
            </div>
            <span className="font-semibold text-slate-800">{t("profile.passportExpiry")}</span>
          </div>
        </div>

        <div className="rounded-[24px] border border-[#dfe9e0] bg-[#f3f8f4] p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#d8efe3] text-[#0f3b3a]">
                <Sparkles size={17} />
              </div>
              <h3 className="text-2xl font-bold text-[#0f172a]">{t("profile.travelStyle")}</h3>
            </div>
            <span className="text-sm font-medium text-slate-500">{t("profile.tailored")}</span>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-[#dfe7df] bg-[#eef3ef] px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">{t("profile.spokenLanguages")}</p>
              <p className="mt-2 text-base font-semibold text-slate-800">{t("profile.languages")}</p>
            </div>

            <div className="rounded-2xl border border-[#dfe7df] bg-[#eef3ef] px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">{t("profile.dietaryPreference")}</p>
              <p className="mt-2 flex items-center gap-2 text-base font-semibold text-slate-800">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check size={12} />
                </span>
                {t("profile.dietaryValue")}
              </p>
            </div>

            <div className="rounded-2xl border border-[#dfe7df] bg-[#eef3ef] px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">{t("profile.guideCadence")}</p>
              <p className="mt-2 text-base font-semibold text-slate-800">{t("profile.guideValue")}</p>
            </div>

            <div className="rounded-2xl border border-[#dfe7df] bg-[#eef3ef] px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">{t("profile.emergencyContact")}</p>
              <div className="mt-2 flex items-center justify-between gap-3 text-base font-semibold text-slate-800">
                <span>S. Vicheka ({t("profile.brother")})</span>
                <span className="text-emerald-700">+855 012 994 118</span>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#dfe7df] bg-[#edf3ef] px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">{t("profile.carbonOffset")}</p>
              <p className="mt-2 text-base font-semibold text-slate-800">{t("profile.carbonValue")}</p>
            </div>
            <div className="rounded-2xl border border-[#dfe7df] bg-[#edf3ef] px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">{t("profile.travelNotes")}</p>
              <p className="mt-2 text-base font-semibold text-slate-800">{t("profile.slowMornings")}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
