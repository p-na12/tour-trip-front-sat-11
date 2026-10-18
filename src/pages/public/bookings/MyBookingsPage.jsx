import { CalendarCheck2 } from "lucide-react";
import { Link } from "react-router-dom";
import PublicPageFrame from "../../../components/public/PublicPageFrame";

export default function MyBookingsPage() {
  return (
    <PublicPageFrame
      title="My Bookings"
      description="Keep your Cambodia adventures organized in one place."
    >
      <section className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-700">
          <CalendarCheck2 size={26} />
        </span>
        <h2 className="mt-5 text-xl font-semibold text-slate-900">
          Sign in to view your bookings
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
          Your upcoming trips and booking details will appear here once you sign
          in to your account.
        </p>
        <Link
          to="/login"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          Sign In
        </Link>
      </section>
    </PublicPageFrame>
  );
}
