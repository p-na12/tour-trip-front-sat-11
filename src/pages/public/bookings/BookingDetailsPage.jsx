import { ArrowLeft, CalendarDays, MapPin, Users } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/auth";

const statusClass = {
  Pending: "bg-amber-50 text-amber-800",
  Confirmed: "bg-emerald-50 text-emerald-800",
  Cancelled: "bg-slate-100 text-slate-600",
  Completed: "bg-blue-50 text-blue-800",
};

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BookingDetailsPage() {
  const { bookingId } = useParams();
  const { user, bookings, cancelBooking, notify } = useAuth();
  const navigate = useNavigate();
  const booking = bookings.find(
    (item) => item.userId === user.id && (item.id === bookingId || item.reference === bookingId),
  );

  if (!booking) {
    return (
      <main className="mx-auto flex min-h-[60vh] flex-1 flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-[#0b2347]">Booking not found</h1>
        <p className="mt-2 text-slate-600">This booking may have been removed or belongs to another account.</p>
        <Link to="/my-bookings" className="mt-5 font-semibold text-emerald-700">Back to my bookings</Link>
      </main>
    );
  }

  const handleCancel = () => {
    if (booking.status === "Cancelled" || booking.status === "Completed") return;
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      cancelBooking(booking.id);
      notify("Your booking has been cancelled.");
    }
  };

  return (
    <main className="min-h-screen flex-1 bg-[#f7f9fc]">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <button type="button" onClick={() => navigate("/my-bookings")} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-700">
          <ArrowLeft size={16} /> My bookings
        </button>
        <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">Booking details</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0b2347]">Your trip is planned</h1>
            <p className="mt-2 text-sm text-slate-600">Reference <span className="font-bold text-slate-800">{booking.reference}</span></p>
          </div>
          <span className={`rounded-full px-3 py-1.5 text-sm font-semibold ${statusClass[booking.status] || statusClass.Pending}`}>{booking.status}</span>
        </div>

        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
          <div className="space-y-5">
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <img src={booking.tourImage} alt={booking.tourName} className="h-64 w-full object-cover sm:h-80" />
              <div className="p-5 sm:p-6">
                <h2 className="text-xl font-bold text-[#0b2347]">{booking.tourName}</h2>
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-600"><MapPin size={16} />{booking.destination}, Cambodia</p>
                <div className="mt-5 grid gap-4 border-t border-slate-100 pt-4 sm:grid-cols-2">
                  <p className="text-sm text-slate-500">Travel date<span className="mt-1 block font-semibold text-slate-800">{formatDate(booking.travelDate)}</span></p>
                  <p className="text-sm text-slate-500">Travelers<span className="mt-1 flex items-center gap-1.5 font-semibold text-slate-800"><Users size={15} />{booking.adults} adult(s){booking.children > 0 ? `, ${booking.children} child(ren)` : ""}</span></p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-bold text-[#0b2347]">Customer information</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <p className="text-sm text-slate-500">Name<span className="mt-1 block font-medium text-slate-800">{booking.customerName}</span></p>
                <p className="text-sm text-slate-500">Email<span className="mt-1 block font-medium text-slate-800">{booking.email}</span></p>
                <p className="text-sm text-slate-500">Phone<span className="mt-1 block font-medium text-slate-800">{booking.phone}</span></p>
                <p className="text-sm text-slate-500">Booked on<span className="mt-1 flex items-center gap-1.5 font-medium text-slate-800"><CalendarDays size={15} />{new Date(booking.bookingDate).toLocaleDateString()}</span></p>
              </div>
              {booking.specialRequests && <p className="mt-4 border-t border-slate-100 pt-4 text-sm text-slate-500">Special requests<span className="mt-1 block text-slate-800">{booking.specialRequests}</span></p>}
            </section>
          </div>

          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-[#0b2347]">Price breakdown</h2>
            <div className="mt-4 space-y-3 text-sm">
              <p className="flex justify-between text-slate-600"><span>${booking.pricePerPerson} × {booking.adults} adult(s)</span><span>${(booking.pricePerPerson * booking.adults).toFixed(2)}</span></p>
              {booking.children > 0 && <p className="flex justify-between text-slate-600"><span>${booking.pricePerPerson} × {booking.children} child(ren)</span><span>${(booking.pricePerPerson * booking.children).toFixed(2)}</span></p>}
              <p className="flex justify-between border-t border-slate-100 pt-3 text-base font-bold text-[#0b2347]"><span>Total amount</span><span>${Number(booking.totalPrice).toFixed(2)}</span></p>
            </div>
            {booking.status !== "Cancelled" && booking.status !== "Completed" && (
              <button type="button" onClick={handleCancel} className="mt-6 min-h-11 w-full rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50">
                Cancel booking
              </button>
            )}
            <p className="mt-4 text-xs leading-5 text-slate-500">Your booking is saved on this device. No payment has been collected.</p>
          </aside>
        </div>
      </div>
    </main>
  );
}
