import { useState } from "react";
import { ChevronDown, Globe2, LogOut, Menu, UserRound, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const publicNavigation = [
  { label: "Home", to: "/" },
  { label: "Destinations", to: "/destinations" },
  { label: "Tours", to: "/tours" },
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
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, isAuthenticated, signOut, notify } = useAuth();
  const navigate = useNavigate();
  const navigation = isAuthenticated
    ? [...publicNavigation.slice(0, 3), { label: "My Bookings", to: "/my-bookings" }, ...publicNavigation.slice(3)]
    : publicNavigation;

  const handleLogout = () => {
    signOut();
    setProfileOpen(false);
    setMenuOpen(false);
    notify("You have been signed out.");
    navigate("/");
  };

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
          {isAuthenticated ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((open) => !open)}
                aria-expanded={profileOpen}
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-50 text-emerald-800"><UserRound size={17} /></span>
                <span className="max-w-32 truncate">{user.name}</span>
                <ChevronDown size={16} />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                  <Link to="/profile" onClick={() => setProfileOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50">My Profile</Link>
                  <Link to="/my-bookings" onClick={() => setProfileOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50">My Bookings</Link>
                  <button type="button" onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-700 hover:bg-red-50"><LogOut size={15} />Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:text-emerald-700">Sign In</Link>
              <Link to="/register" className="rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800">Sign Up</Link>
            </>
          )}
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
            <div className="mt-3 border-t border-slate-100 pt-4">
              {isAuthenticated ? (
                <>
                  <p className="px-3 pb-2 text-sm font-semibold text-slate-900">Hello, {user.name}</p>
                  <Link to="/profile" className="block rounded-lg px-3 py-3 text-sm text-slate-700 hover:bg-slate-50" onClick={() => setMenuOpen(false)}>My Profile</Link>
                  <Link to="/my-bookings" className="block rounded-lg px-3 py-3 text-sm text-slate-700 hover:bg-slate-50" onClick={() => setMenuOpen(false)}>My Bookings</Link>
                  <button type="button" onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-3 text-left text-sm font-medium text-red-700 hover:bg-red-50"><LogOut size={16} />Logout</button>
                </>
              ) : (
                <div className="flex gap-3">
                  <Link to="/login" className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold text-slate-700" onClick={() => setMenuOpen(false)}>Sign In</Link>
                  <Link to="/register" className="flex-1 rounded-lg bg-emerald-700 px-4 py-2.5 text-center text-sm font-semibold text-white" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
