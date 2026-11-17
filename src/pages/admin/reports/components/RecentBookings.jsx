import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FileSearch,
  Search,
} from "lucide-react";

const PAGE_SIZE = 8;
const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const BOOKING_STATUS_STYLES = {
  Pending: "bg-amber-50 text-amber-700 ring-amber-600/15",
  Confirmed: "bg-brand/5 text-brand ring-brand/20",
  Completed: "bg-slate-100 text-slate-600 ring-slate-500/15",
  Cancelled: "bg-rose-50 text-rose-700 ring-rose-600/15",
};

const PAYMENT_STATUS_STYLES = {
  Paid: "bg-brand/5 text-brand ring-brand/20",
  Pending: "bg-amber-50 text-amber-700 ring-amber-600/15",
  Refunded: "bg-slate-100 text-slate-600 ring-slate-500/15",
};

function formatBookingDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function StatusBadge({ value, styles }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${
        styles[value]
      }`}
    >
      {value}
    </span>
  );
}

export default function RecentBookings({
  bookings,
  search,
  onSearchChange,
  status,
  onStatusChange,
  resetKey,
}) {
  const [pagination, setPagination] = useState({ resetKey, page: 1 });
  const page = pagination.resetKey === resetKey ? pagination.page : 1;
  const pageCount = Math.ceil(bookings.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const pageBookings = bookings.slice(startIndex, startIndex + PAGE_SIZE);
  const updatePage = (nextPage) => setPagination({ resetKey, page: nextPage });

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Recent Booking Reports
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            {bookings.length.toLocaleString()} matching bookings
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="relative block min-w-0 sm:w-64">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => {
                updatePage(1);
                onSearchChange(event.target.value);
              }}
              placeholder="Search bookings..."
              aria-label="Search booking reports"
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/10"
            />
          </label>
          <select
            value={status}
            onChange={(event) => {
              updatePage(1);
              onStatusChange(event.target.value);
            }}
            aria-label="Filter by booking status"
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10"
          >
            <option value="All">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[880px] text-left">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-100">
              {[
                "Booking ID",
                "Customer Name",
                "Tour Name",
                "Booking Date",
                "Amount",
                "Payment",
                "Booking Status",
              ].map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pageBookings.map((booking) => (
              <tr
                key={booking.id}
                className="transition-colors hover:bg-slate-50/80"
              >
                <td className="whitespace-nowrap px-5 py-4 text-xs font-semibold text-slate-700">
                  {booking.id}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-800">
                  {booking.customerName}
                </td>
                <td className="px-5 py-4 text-sm text-slate-600">
                  {booking.tourName}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                  {formatBookingDate(booking.bookingDate)}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-800">
                  {CURRENCY_FORMATTER.format(booking.amount)}
                </td>
                <td className="px-5 py-4">
                  <StatusBadge
                    value={booking.paymentStatus}
                    styles={PAYMENT_STATUS_STYLES}
                  />
                </td>
                <td className="px-5 py-4">
                  <StatusBadge
                    value={booking.status}
                    styles={BOOKING_STATUS_STYLES}
                  />
                </td>
              </tr>
            ))}

            {pageBookings.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-14 text-center">
                  <FileSearch className="mx-auto mb-2 size-8 text-slate-300" />
                  <p className="text-sm font-semibold text-slate-700">
                    No bookings found
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Try changing your search, status, or report period.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-xs text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {bookings.length ? startIndex + 1 : 0}
          </span>
          {" to "}
          <span className="font-semibold text-slate-700">
            {Math.min(startIndex + PAGE_SIZE, bookings.length)}
          </span>
          {" of "}
          <span className="font-semibold text-slate-700">
            {bookings.length.toLocaleString()}
          </span>
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => updatePage(Math.max(1, page - 1))}
            disabled={page <= 1}
            aria-label="Previous page"
            className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="min-w-20 text-center text-xs font-medium text-slate-500">
            Page {pageCount ? page : 0} of {pageCount}
          </span>
          <button
            type="button"
            onClick={() => updatePage(Math.min(pageCount, page + 1))}
            disabled={page >= pageCount}
            aria-label="Next page"
            className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
