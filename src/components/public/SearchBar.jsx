import { CalendarDays, Flag, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [destination, setDestination] = useState("");
  const [tourType, setTourType] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  function handleSearch(event) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (destination.trim()) params.set("destination", destination.trim());
    if (tourType) params.set("type", tourType);
    if (date) params.set("date", date);
    const query = params.toString();
    navigate(query ? `/tours?${query}` : "/tours");
  }

  return (
    <div className="relative z-10 mx-auto -mt-9 w-full max-w-7xl px-4 sm:-mt-10 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl shadow-slate-900/10 sm:grid-cols-2 sm:p-5 lg:grid-cols-[1.15fr_1fr_1fr_auto] lg:items-end lg:gap-4"
      >
        <label className="min-w-0">
          <span className="mb-2 block text-xs font-semibold text-slate-700">
            Destination
          </span>
          <span className="flex h-11 items-center gap-2.5 rounded-lg border border-slate-200 px-3 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100">
            <MapPin size={17} className="shrink-0 text-emerald-700" />
            <input
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              placeholder="Where to?"
              className="w-full min-w-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
          </span>
        </label>

        <label className="min-w-0">
          <span className="mb-2 block text-xs font-semibold text-slate-700">
            Tour Type
          </span>
          <span className="flex h-11 items-center gap-2.5 rounded-lg border border-slate-200 px-3 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100">
            <Flag size={17} className="shrink-0 text-emerald-700" />
            <select
              value={tourType}
              onChange={(event) => setTourType(event.target.value)}
              className="w-full min-w-0 bg-transparent text-sm text-slate-700 outline-none"
            >
              <option value="">All Types</option>
              <option value="culture">Cultural & History</option>
              <option value="nature">Nature & Relax</option>
              <option value="city">Urban Explorer</option>
            </select>
          </span>
        </label>

        <label className="min-w-0">
          <span className="mb-2 block text-xs font-semibold text-slate-700">
            Date
          </span>
          <span className="flex h-11 items-center gap-2.5 rounded-lg border border-slate-200 px-3 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100">
            <CalendarDays size={17} className="shrink-0 text-emerald-700" />
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="w-full min-w-0 bg-transparent text-sm text-slate-700 outline-none"
            />
          </span>
        </label>

        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:col-span-2 lg:col-span-1"
        >
          <Search size={16} />
          Find Tours
        </button>
      </form>
    </div>
  );
}
