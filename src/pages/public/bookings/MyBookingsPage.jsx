import { useMemo, useState } from "react";
import { CalendarCheck2, CalendarDays, MapPin, Search, Users } from "lucide-react";
import { Link } from "react-router-dom";
import PublicPageFrame from "../../../components/public/PublicPageFrame";
import { useAuth } from "../../../context/auth";

const statuses = ["All statuses", "Pending", "Confirmed", "Cancelled", "Completed"];
const statusClass = {
  Pending: "bg-amber-50 text-amber-800",
  Confirmed: "bg-emerald-50 text-emerald-800",
  Cancelled: "bg-slate-100 text-slate-600",
  Completed: "bg-blue-50 text-blue-800",
};

function displayDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function MyBookingsPage() {
  const { user, bookings, cancelBooking, notify } = useAuth();
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [search, setSearch] = useState("");

  const myBookings = useMemo(
    () => bookings
      .filter((booking) => booking.userId === user.id)
      .filter((booking) => statusFilter === "All statuses" || booking.status === statusFilter)
      .filter((booking) => {
        const query = search.trim().toLowerCase();
        return !query || [booking.reference, booking.tourName, booking.destination]
          .some((value) => value.toLowerCase().includes(query));
      }),
    [bookings, user.id, statusFilter, search],
  );
  const hasBookings = bookings.some((booking) => booking.userId === user.id);

  const handleCancel = (booking) => {
    if (booking.status === "Cancelled" || booking.status === "Completed") return;
    if (window.confirm(`Cancel booking ${booking.reference}?`)) {
      cancelBooking(booking.id);
      notify(`Booking ${booking.reference} has been cancelled.`);
    }
  };

  return (
    <PublicPageFrame title="My Bookings" description="Keep your Cambodia adventures organized in one place.">
      {!hasBookings ? (
        <section className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-700">
            <CalendarCheck2 size={26} />
          </span>
          <h2 className="mt-5 text-xl font-semibold text-slate-900">No bookings yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">Your upcoming trips and booking details will appear here after you reserve a tour.</p>
          <Link to="/tours" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800">Explore tours</Link>
        </section>
      ) : (
        <>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-600">{myBookings.length} booking{myBookings.length === 1 ? "" : "s"}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="relative">
                <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search bookings" aria-label="Search bookings" className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-emerald-500 sm:w-56" />
              </label>
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter by booking status" className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-500">
                {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
          </div>

          {myBookings.length === 0 ? (
            <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
              <h2 className="font-semibold text-slate-900">No matching bookings</h2>
              <p className="mt-2 text-sm text-slate-600">Try a different search or status filter.</p>
            </section>
          ) : (
            <div className="space-y-4">
              {myBookings.map((booking) => (
                <article key={booking.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                  <div className="grid sm:grid-cols-[220px_minmax(0,1fr)]">
                    <img src={booking.tourImage} alt={booking.tourName} className="h-48 w-full object-cover sm:h-full sm:min-h-56" />
                    <div className="min-w-0 p-5 sm:p-6">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{booking.reference}</p>
                          <h2 className="mt-1 text-lg font-bold text-[#0b2347]">{booking.tourName}</h2>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[booking.status] || statusClass.Pending}`}>{booking.status}</span>
                      </div>
                      <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                        <p className="flex items-center gap-2"><MapPin size={15} />{booking.destination}</p>
                        <p className="flex items-center gap-2"><CalendarDays size={15} />Travel: {displayDate(booking.travelDate)}</p>
                        <p className="flex items-center gap-2"><Users size={15} />{booking.adults + booking.children} traveler(s)</p>
                        <p>Booked: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                      </div>
                      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                        <p className="text-sm text-slate-500">Total <strong className="ml-1 text-base text-[#0b2347]">${Number(booking.totalPrice).toFixed(2)}</strong></p>
                        <div className="flex gap-2">
                          {booking.status !== "Cancelled" && booking.status !== "Completed" && (
                            <button type="button" onClick={() => handleCancel(booking)} className="rounded-lg border border-red-200 px-3.5 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">Cancel</button>
                          )}
                          <Link to={`/booking-details/${booking.id}`} className="rounded-lg bg-[#0b2347] px-3.5 py-2 text-sm font-semibold text-white hover:bg-[#153766]">View details</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </PublicPageFrame>
  );
}
