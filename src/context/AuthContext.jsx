import { useEffect, useState } from "react";
import { CheckCircle2, CircleAlert, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "./auth";

const USERS_KEY = "tour-trip-users";
const USER_KEY = "tour-trip-user";
const SESSION_USER_KEY = "tour-trip-session-user";
const BOOKINGS_KEY = "tour-trip-bookings";

function readStorage(key, fallback) {
  const value = window.localStorage.getItem(key);
  return value ? JSON.parse(value) : fallback;
}

function readCurrentUser() {
  const storedUser =
    window.localStorage.getItem(USER_KEY) ??
    window.sessionStorage.getItem(SESSION_USER_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
}

export function AuthProvider({ children }) {
  const { t } = useTranslation();
  const [users, setUsers] = useState(() => readStorage(USERS_KEY, []));
  const [user, setUser] = useState(readCurrentUser);
  const [bookings, setBookings] = useState(() => readStorage(BOOKINGS_KEY, []));
  const [toast, setToast] = useState(null);

  useEffect(() => {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    window.localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(null), 4500);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const notify = (message, type = "success") => {
    setToast({ id: Date.now(), message, type });
  };

  const register = (formData) => {
    const email = formData.email.trim().toLowerCase();
    if (users.some((existingUser) => existingUser.email === email)) {
      return { error: t("auth.accountExists") };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: formData.name.trim(),
      email,
      phone: formData.phone.trim(),
      password: formData.password,
    };
    setUsers((currentUsers) => [...currentUsers, newUser]);
    return { user: newUser };
  };

  const signIn = ({ email, password, remember = true }) => {
    const account = users.find(
      (existingUser) =>
        existingUser.email === email.trim().toLowerCase() &&
        existingUser.password === password,
    );
    if (!account) {
      return { error: t("auth.invalidCredentials") };
    }

    const safeUser = {
      id: account.id,
      name: account.name,
      email: account.email,
      phone: account.phone,
    };
    window.localStorage.removeItem(USER_KEY);
    window.sessionStorage.removeItem(SESSION_USER_KEY);
    window[remember ? "localStorage" : "sessionStorage"].setItem(
      remember ? USER_KEY : SESSION_USER_KEY,
      JSON.stringify(safeUser),
    );
    setUser(safeUser);
    return { user: safeUser };
  };

  const resetPassword = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const accountExists = users.some(
      (existingUser) => existingUser.email === normalizedEmail,
    );
    if (!accountExists) {
      return { error: t("auth.noAccountFound") };
    }

    setUsers((currentUsers) =>
      currentUsers.map((existingUser) =>
        existingUser.email === normalizedEmail
          ? { ...existingUser, password }
          : existingUser,
      ),
    );
    return { success: true };
  };

  const signOut = () => {
    window.localStorage.removeItem(USER_KEY);
    window.sessionStorage.removeItem(SESSION_USER_KEY);
    setUser(null);
  };

  const createBooking = (booking) => {
    const createdBooking = {
      ...booking,
      id: `booking-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      reference: `TT-${Date.now().toString(36).toUpperCase()}-${Math.random()
        .toString(36)
        .slice(2, 6)
        .toUpperCase()}`,
      bookingDate: new Date().toISOString(),
      status: "Pending",
      userId: user.id,
    };
    setBookings((currentBookings) => [createdBooking, ...currentBookings]);
    return createdBooking;
  };

  const cancelBooking = (bookingId) => {
    setBookings((currentBookings) =>
      currentBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: "Cancelled" } : booking,
      ),
    );
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    notify,
    register,
    signIn,
    resetPassword,
    signOut,
    bookings,
    createBooking,
    cancelBooking,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {toast && (
        <div
          key={toast.id}
          role="status"
          className={`fixed right-4 top-20 z-[100] flex max-w-sm items-start gap-3 rounded-xl border bg-white p-4 shadow-xl ${
            toast.type === "error" ? "border-red-200" : "border-emerald-200"
          }`}
        >
          {toast.type === "error" ? (
            <CircleAlert className="mt-0.5 shrink-0 text-red-600" size={19} />
          ) : (
            <CheckCircle2
              className="mt-0.5 shrink-0 text-emerald-600"
              size={19}
            />
          )}
          <p className="flex-1 text-sm font-medium text-slate-800">
            {toast.message}
          </p>
          <button
            type="button"
            className="text-slate-400 hover:text-slate-700"
            aria-label={t("common.dismissNotification")}
            onClick={() => setToast(null)}
          >
            <X size={17} />
          </button>
        </div>
      )}
    </AuthContext.Provider>
  );
}
