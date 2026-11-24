import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";

import {
  FaSearch,
  FaBell,
  FaFilter,
  FaPlus,
  FaEye,
} from "react-icons/fa";

function CustomerList() {
  const [search, setSearch] = useState("");
  const { users, customers: adminCustomers, bookings } = useAuth();

  const customers = useMemo(() => {
    const registeredCustomers = users.map((user) => {
      const customerBookings = bookings.filter((booking) => booking.userId === user.id);
      const lastBooking = customerBookings[0];
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        bookings: customerBookings.length,
        lastActivity: lastBooking?.tourName || "No bookings yet",
        date: lastBooking
          ? new Date(lastBooking.bookingDate).toLocaleDateString()
          : "",
        status: "Active",
        image: "",
      };
    });
    const registeredEmails = new Set(users.map((user) => user.email.toLowerCase()));
    const adminCreatedCustomers = adminCustomers
      .filter((customer) => !registeredEmails.has(customer.email.toLowerCase()))
      .map((customer) => {
        const customerBookings = bookings.filter(
          (booking) => booking.email?.toLowerCase() === customer.email.toLowerCase(),
        );
        const lastBooking = customerBookings[0];
        return {
          ...customer,
          bookings: customerBookings.length,
          lastActivity: lastBooking?.tourName || "No bookings yet",
          date: lastBooking
            ? new Date(lastBooking.bookingDate).toLocaleDateString()
            : "",
          image: "",
        };
      });

    return [...registeredCustomers, ...adminCreatedCustomers];
  }, [users, adminCustomers, bookings]);

  // Search customers
  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-gray-800">

      {/* ================= NAVBAR ================= */}
      <div className="h-[58px border-b border-gray-200 bg-white">
        <div className="px-6 h-full justify-between flex items-center">

          {/* Search */}
          <div className="mx-auto w-[475px relative">
            <FaSearch className="top-1/2 text-gray-500 absolute left-4 -translate-y-1/2" />

            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-full border border-gray-300 bg-white text-sm pl-10 pr-4 outline-none focus:border-teal-700"
            />
          </div>

          {/* Right side */}
          <div className="gap-6 flex items-center">
            <FaBell className="text-lg text-gray-600" />

          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="px-6 py-5">

        {/* ================= TITLE ================= */}
        <div className="mb-6 justify-between flex items-center">

          <div>
            <h1 className="text-[28px] font-bold text-gray-800">
              Customer Directory
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage and review all registered customer profiles.
            </p>
          </div>

          {/* Buttons */}
          <div className="gap-2 flex">

            {/* Filter */}
            <button
              type="button"
              className="gap-2 px-5 h-10 rounded-xl border border-teal-700 bg-white text-sm font-medium text-teal-700 flex items-center hover:bg-teal-50"
            >
              <FaFilter />
              Filter
            </button>

            {/* New Customer */}
            <Link
              to="/admin/customers/create"
              className="gap-2 px-5 h-10 rounded-xl bg-teal-700 text-sm font-medium text-white flex items-center hover:bg-teal-800"
            >
              <FaPlus />
              New Customer
            </Link>

          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

          <table className="w-full">

            {/* ================= TABLE HEADER ================= */}
            <thead>
              <tr className="bg-[#eef2ff] text-left text-[11px] font-medium text-gray-600 uppercase tracking-wide">

                <th className="px-5 py-4">
                  Customer
                </th>

                <th className="px-5 py-4">
                  Contact
                </th>

                <th className="px-5 py-4 text-center">
                  Bookings
                </th>

                <th className="px-5 py-4">
                  Last Activity
                </th>

                <th className="px-5 py-4">
                  Status
                </th>

                <th className="px-5 py-4 text-center">
                  Actions
                </th>

              </tr>
            </thead>

            {/* ================= TABLE BODY ================= */}
            <tbody>

              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (

                  <tr
                    key={customer.id}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >

                    {/* CUSTOMER */}
                    <td className="px-5 py-3">

                      <div className="gap-3 flex items-center">

                        {customer.image ? (
                          <img
                            src={customer.image}
                            alt={customer.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 justify-center rounded-full bg-[#e5eaf5] text-sm font-medium text-gray-500 flex items-center">
                            {customer.name
                              .split(/\s+/)
                              .slice(0, 2)
                              .map((part) => part[0])
                              .join("")
                              .toUpperCase()}
                          </div>
                        )}

                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {customer.name}
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* CONTACT */}
                    <td className="px-5 py-3">

                      <p className="text-sm text-gray-700">
                        {customer.email}
                      </p>

                      <p className="text-[11px] text-gray-500">
                        {customer.phone}
                      </p>

                    </td>

                    {/* BOOKINGS */}
                    <td className="px-5 py-3 text-center text-sm font-medium">
                      <Link
                        to={`/admin/bookings?customer=${encodeURIComponent(customer.email || customer.name)}`}
                        className="font-semibold text-teal-700 hover:text-teal-900 hover:underline"
                        aria-label={`View ${customer.bookings} bookings for ${customer.name}`}
                      >
                        {customer.bookings}
                      </Link>
                    </td>

                    {/* LAST ACTIVITY */}
                    <td className="px-5 py-3">

                      {customer.date ? (
                        <>
                          <p className="text-sm text-gray-700">
                            {customer.lastActivity}
                          </p>

                          <p className="text-[11px] text-gray-500">
                            {customer.date}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-gray-700">
                          {customer.lastActivity}
                        </p>
                      )}

                    </td>

                    {/* STATUS */}
                    <td className="px-5 py-3">

                      {customer.status === "Active" ? (
                        <span className="px-3 py-1 rounded-full bg-[#dff6ec] text-[11px] font-medium text-[#16a36d]">
                          Active
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-[#ffe1e1] text-[11px] font-medium text-red-500">
                          Blocked
                        </span>
                      )}

                    </td>

                    {/* ACTION */}
                    <td className="px-5 py-3 text-center">

                      <button
                        type="button"
                        className="text-lg text-teal-700 hover:text-teal-900"
                      >
                        <FaEye />
                      </button>

                    </td>

                  </tr>

                ))
              ) : (

                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-10 text-center text-sm text-gray-500"
                  >
                    No customers found.
                  </td>
                </tr>

              )}

            </tbody>
          </table>

          {/* ================= PAGINATION ================= */}
          <div className="px-5 py-3 justify-between border-t border-gray-200 flex items-center">

            <p className="text-xs text-gray-500">
              Showing {filteredCustomers.length} customers
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CustomerList;