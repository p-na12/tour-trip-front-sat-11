import { useState } from "react";
import { Download, Search, CalendarDays } from "lucide-react";
import { ManageBookingData } from "../../../data/ManageBookingData";
import { useAuth } from "../../../context/auth";
import { useSearchParams } from "react-router-dom";

function ManageBooking() {
  const tabs = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];
  const { bookings: customerBookings } = useAuth();
  const [searchParams] = useSearchParams();

  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-brand/10 text-brand px-3 py-1 rounded-full font-semibold";
      case "Pending":
        return "bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-semibold";
      case "Cancelled":
        return "bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold";
      case "Completed":
        return "bg-slate-200 text-slate-700 px-3 py-1 rounded-full font-semibold";
      default:
        return "bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-semibold";
    }
  };

  const bookings = [
    ...customerBookings.map((booking) => ({
      id: booking.reference || booking.id,
      customerName: booking.customerName,
      customerEmail: booking.email,
      tourPackage: booking.tourName,
      bookingDate: new Date(booking.bookingDate).toLocaleDateString(),
      travelDate: booking.travelDate,
      amount: Number(booking.totalPrice),
      status: booking.status,
    })),
    ...ManageBookingData,
  ];
  const [search, setSearch] = useState(() => searchParams.get("customer") || "");
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtering
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.customerEmail?.toLowerCase().includes(search.toLowerCase()) ||
      b.tourPackage.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toString().includes(search);
    const matchesTab = activeTab === "All" || b.status === activeTab;
    return matchesSearch && matchesTab;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = filteredBookings.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
        <h1 className="text-3xl font-bold tracking-tight text-black md:text-4xl">
          Manage Bookings
        </h1>
        <button className="flex items-center gap-2 rounded-full border border-brand px-6 py-3 text-sm font-medium text-brand hover:bg-brand/5">
          <Download size={17} />
          Export Bookings
        </button>
      </div>

      {/* Main Card Container */}
      <div className="bg-white rounded-2xl shadow-sm mt-8 overflow-hidden">
        {/* Tabs */}
        <div className="flex gap-3 px-6 pt-6 border-b border-slate-100 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-brand text-white border-brand"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 px-6 py-5 items-center justify-between border-b border-slate-100">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search
              size={21}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by ID, Customer, or Tour..."
              className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-sm text-slate-700 outline-none focus:border-brand"
            />
          </div>

          {/* Date */}
          <button className="flex h-12 w-full md:w-72 items-center gap-3 rounded-xl border border-slate-300 px-4 text-sm text-slate-700 hover:bg-gray-50">
            <CalendarDays size={22} className="text-slate-700" />
            <span>Oct 01, 2023 - Oct 31, 2023</span>
          </button>
        </div>

        {/* Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-500">
            <thead className="bg-gray-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-600">Booking ID</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-600">Customer Name</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-600">Tour Package</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-600">Booking Date</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-600">Travel Date</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-600">Amount</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-600">Status</th>  
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-600">Actions</th>    
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedBookings.map((booking) => (
                <tr key={booking.id} className="transition hover:bg-slate-50">
                  <td className="px-6 py-5 font-medium text-slate-800">{booking.id}</td>
                  <td className="px-6 py-5 font-medium text-slate-800">{booking.customerName}</td>
                  <td className="px-6 py-5 font-medium text-slate-800">{booking.tourPackage}</td>
                  <td className="px-6 py-5 font-medium text-slate-800">{booking.bookingDate}</td>
                  <td className="px-6 py-5 font-medium text-slate-800">{booking.travelDate}</td>
                  <td className="px-6 py-5 font-medium text-slate-800">${booking.amount.toFixed(2)}</td> 
                  <td className="px-6 py-5">
                    <span className={`inline-block text-xs ${getStatusStyle(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <button className="text-brand hover:text-brand-hover font-medium">
                      
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedBookings.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-500">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-t border-slate-100 text-sm text-slate-600 gap-4">
          <span>
            Showing {filteredBookings.length > 0 ? startIndex + 1 : 0} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredBookings.length)} of{" "}
            {filteredBookings.length} bookings
          </span>
          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  currentPage === i + 1
                    ? "bg-brand text-white"
                    : "bg-gray-100 text-slate-700 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                currentPage === totalPages || totalPages === 0
                  ? "cursor-not-allowed bg-gray-100 text-gray-400"
                  : "bg-gray-100 text-slate-700 hover:bg-gray-200"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageBooking;