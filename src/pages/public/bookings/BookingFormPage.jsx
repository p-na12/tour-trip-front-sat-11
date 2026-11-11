import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft, CalendarDays, CheckCircle2, MapPin, Users } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { publicTours } from "../../../data/publicTours";
import { useAuth } from "../../../context/auth";
import { localizeTour } from "../../../i18n/localizeContent";

const now = new Date();
const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const fieldClass = "mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50";

export default function BookingFormPage() {
  const { slug } = useParams();
  const sourceTour = publicTours.find((item) => item.slug === slug);
  const { t, i18n } = useTranslation();
  const tour = sourceTour
    ? localizeTour(sourceTour, i18n.resolvedLanguage || i18n.language)
    : null;
  const { user, createBooking, notify } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    travelDate: "",
    adults: "1",
    children: "0",
    phone: user?.phone || "",
    specialRequests: "",
  });
  const [error, setError] = useState("");
  const total = useMemo(
    () => tour ? (Number(form.adults) + Number(form.children)) * tour.price : 0,
    [tour, form.adults, form.children],
  );
  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  if (!tour) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-[#0b2347]">{t("booking.tourNotFound")}</h1>
        <Link to="/tours" className="mt-4 font-semibold text-emerald-700">{t("booking.browseAvailableTours")}</Link>
      </main>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    if (!form.travelDate || form.travelDate < today) {
      setError(t("booking.invalidTravelDate"));
      return;
    }
    if (!form.phone.trim()) {
      setError(t("booking.phoneRequired"));
      return;
    }
    const booking = createBooking({
      tourId: sourceTour.id,
      tourSlug: sourceTour.slug,
      tourName: sourceTour.title,
      destination: sourceTour.destination,
      tourImage: sourceTour.image,
      customerName: user.name,
      email: user.email,
      phone: form.phone.trim(),
      travelDate: form.travelDate,
      adults: Number(form.adults),
      children: Number(form.children),
      specialRequests: form.specialRequests.trim(),
      pricePerPerson: sourceTour.price,
      totalPrice: total,
    });
    notify(t("booking.bookingConfirmed", { reference: booking.reference }));
    navigate(`/booking-details/${booking.id}`);
  };

  return (
    <main className="min-h-screen flex-1 bg-[#f7f9fc]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link to={`/tours/${tour.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-700">
          <ArrowLeft size={16} /> {t("booking.backToTour")}
        </Link>
        <div className="mb-8 mt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">{t("booking.planYourTrip")}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0b2347] sm:text-4xl">{t("booking.completeBooking")}</h1>
          <p className="mt-2 text-slate-600">{t("booking.bookingIntro")}</p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(300px,0.7fr)]">
          <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <section>
              <h2 className="text-lg font-bold text-[#0b2347]">{t("booking.yourTour")}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="booking-tour" className="text-sm font-semibold text-slate-700">{t("booking.tourName")}</label>
                  <input id="booking-tour" readOnly value={tour.title} className={`${fieldClass} bg-slate-50`} />
                </div>
                <div>
                  <label htmlFor="booking-destination" className="text-sm font-semibold text-slate-700">{t("common.destination")}</label>
                  <input id="booking-destination" readOnly value={tour.destination} className={`${fieldClass} bg-slate-50`} />
                </div>
              </div>
            </section>
            <section className="border-t border-slate-100 pt-5">
              <h2 className="text-lg font-bold text-[#0b2347]">{t("booking.travelDetails")}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="travel-date" className="text-sm font-semibold text-slate-700">{t("booking.tourDate")} *</label>
                  <input id="travel-date" type="date" min={today} required value={form.travelDate} onChange={update("travelDate")} className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="adults" className="text-sm font-semibold text-slate-700">{t("booking.adults")} *</label>
                  <input id="adults" type="number" min="1" max="30" required value={form.adults} onChange={update("adults")} className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="children" className="text-sm font-semibold text-slate-700">{t("booking.children")}</label>
                  <input id="children" type="number" min="0" max="30" value={form.children} onChange={update("children")} className={fieldClass} />
                </div>
              </div>
            </section>
            <section className="border-t border-slate-100 pt-5">
              <h2 className="text-lg font-bold text-[#0b2347]">{t("booking.customerInformation")}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="customer-name" className="text-sm font-semibold text-slate-700">{t("booking.customerName")}</label>
                  <input id="customer-name" readOnly value={user.name} className={`${fieldClass} bg-slate-50`} />
                </div>
                <div>
                  <label htmlFor="customer-email" className="text-sm font-semibold text-slate-700">{t("booking.email")}</label>
                  <input id="customer-email" type="email" readOnly value={user.email} className={`${fieldClass} bg-slate-50`} />
                </div>
                <div>
                  <label htmlFor="customer-phone" className="text-sm font-semibold text-slate-700">{t("booking.phoneNumber")} *</label>
                  <input id="customer-phone" type="tel" required value={form.phone} onChange={update("phone")} className={fieldClass} />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="special-requests" className="text-sm font-semibold text-slate-700">{t("booking.specialRequests")} <span className="font-normal text-slate-400">{t("booking.optional")}</span></label>
                <textarea id="special-requests" rows="3" maxLength="500" value={form.specialRequests} onChange={update("specialRequests")} placeholder={t("booking.specialRequestsPlaceholder")} className="mt-2 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50" />
              </div>
            </section>
            {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">
              <CheckCircle2 size={18} /> {t("booking.confirmBooking")}
            </button>
            <p className="text-center text-xs text-slate-500">{t("booking.demoBookingNote")}</p>
          </form>

          <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-24">
            <img src={tour.image} alt={tour.title} className="h-52 w-full object-cover" />
            <div className="p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{t("booking.summary")}</p>
              <h2 className="mt-2 text-xl font-bold text-[#0b2347]">{tour.title}</h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-600"><MapPin size={16} />{tour.destination}, Cambodia</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-600"><CalendarDays size={16} />{form.travelDate || t("booking.selectTravelDate")}</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-600"><Users size={16} />{Number(form.adults) + Number(form.children)} {t("booking.travelers")}</p>
              <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-sm">
                <div className="flex justify-between text-slate-600"><span>${tour.price} × {Number(form.adults) + Number(form.children)} {t("booking.travelers")}</span><span>${total.toFixed(2)}</span></div>
                <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-bold text-[#0b2347]"><span>{t("common.total")}</span><span>${total.toFixed(2)}</span></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
