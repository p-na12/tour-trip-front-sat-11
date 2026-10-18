// import React, { useState } from "react";
import { Plus, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { cx } from "../../../utils/helpers";
import { useNavigate } from "react-router-dom";

const CustomerListPage = ({
  customers = [],
  highlightId,
  selectedIds = [],
  setSelectedIds,
  onDeleteSelected,
}) => {
  /* ---------------------------- Customer List Page ---------------------------- */
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const getInitials = (name = "") =>
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "CU";

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      (customer.destination ?? "").toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 font-display">
              Customers
            </h1>
            <p className="text-[13.5px] text-gray-500 mt-1">
              Manage customer profiles before booking a tour.
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/customers/create")}
            className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white text-[13.5px] font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Create Customer
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 sm:px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full sm:max-w-xs">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-[13px] outline-none w-full placeholder:text-gray-400"
              />
            </div>
            {selectedIds.length > 0 && (
              <button
                onClick={onDeleteSelected}
                disabled={selectedIds.length === 0}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 text-[13px] font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-4 h-4" />
                Delete ({selectedIds.length})
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full text-left">
              <thead>
                <tr className="text-[12px] uppercase tracking-wide text-gray-400 border-b border-gray-100">
                  <th className="px-5 py-3">
                    <input
                      type="checkbox"
                      checked={
                        customers.length > 0 &&
                        selectedIds.length === customers.length
                      }
                      onChange={(e) =>
                        setSelectedIds(
                          e.target.checked ? customers.map((c) => c.id) : [],
                        )
                      }
                    />
                  </th>

                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Destination</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((c) => (
                    <tr
                      key={c.id}
                      className={cx(
                        "border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors",
                        c.id === highlightId && "anim-row",
                      )}
                    >
                      <td className="px-5 py-3.5">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(c.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedIds((prev) => [...prev, c.id]);
                            } else {
                              setSelectedIds((prev) =>
                                prev.filter((id) => id !== c.id),
                              );
                            }
                          }}
                        />
                      </td>

                      {/* Customer */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-teal-50 text-teal-700 flex items-center justify-center text-[11.5px] font-semibold font-display shrink-0">
                            {c.photo || c.image ? (
                              <img
                                src={c.photo || c.image}
                                className="w-full h-full object-cover"
                                alt={c.name || "Customer avatar"}
                              />
                            ) : (
                              c.initials || getInitials(c.name)
                            )}
                          </div>

                          <div>
                            <p className="text-[13.5px] font-medium text-gray-900">
                              {c.name}
                            </p>
                            <p className="text-[12px] text-gray-500">
                              {c.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-3.5 text-[13px] text-gray-600">
                        {c.destination || "—"}
                      </td>

                      <td className="px-5 py-3.5">
                        <span
                          className={cx(
                            "text-[11.5px] font-medium px-2.5 py-1 rounded-full",
                            c.status === "Active"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-amber-50 text-amber-600",
                          )}
                        >
                          {c.status}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 text-[13px] text-gray-500">
                        {c.created}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-8 text-center text-gray-500"
                    >
                      No customers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerListPage;
