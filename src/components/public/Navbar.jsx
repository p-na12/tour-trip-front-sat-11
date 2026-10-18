import { useState } from "react";
import { Globe2, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const navigation = [
  { label: "Home", to: "/" },
  { label: "Destinations", to: "/destinations" },
  { label: "Tours", to: "/tours" },
  { label: "My Bookings", to: "/my-bookings" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const linkClass = ({ isActive }) =>
  `relative py-2 text-sm font-medium transition-colors ${
    isActive
      ? "text-emerald-700 after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-emerald-600"
      : "text-slate-600 hover:text-emerald-700"
  }`;

export default function PublicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight text-slate-900"
          aria-label="Tour-Trip home"
          onClick={() => setMenuOpen(false)}
        >
          <Globe2 className="h-6 w-6 text-emerald-700" aria-hidden="true" />
          <span>Tour-Trip</span>
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={linkClass}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/login"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:text-emerald-700"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            Sign Up
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <nav
          className="absolute inset-x-0 top-full border-t border-slate-100 bg-white px-4 pb-5 pt-2 shadow-lg lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto flex max-w-7xl flex-col">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-sm font-medium ${
                    isActive
                      ? "bg-emerald-50 text-emerald-800"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-3 flex gap-3 border-t border-slate-100 pt-4">
              <Link
                to="/login"
                className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold text-slate-700"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="flex-1 rounded-lg bg-emerald-700 px-4 py-2.5 text-center text-sm font-semibold text-white"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
