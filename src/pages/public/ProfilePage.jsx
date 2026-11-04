import { Link } from "react-router-dom";
import { Mail, Phone, UserRound } from "lucide-react";
import PublicPageFrame from "../../components/public/PublicPageFrame";
import { useAuth } from "../../context/auth";

export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <PublicPageFrame title="My Profile" description="Your account details for planning your next trip.">
      <section className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-800"><UserRound size={25} /></div>
        <h2 className="mt-4 text-xl font-bold text-[#0b2347]">{user.name}</h2>
        <div className="mt-6 space-y-4 border-t border-slate-100 pt-5">
          <p className="flex items-center gap-3 text-sm text-slate-700"><Mail size={17} className="text-slate-400" />{user.email}</p>
          <p className="flex items-center gap-3 text-sm text-slate-700"><Phone size={17} className="text-slate-400" />{user.phone || "No phone number provided"}</p>
        </div>
        <Link to="/my-bookings" className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800">View my bookings</Link>
      </section>
    </PublicPageFrame>
  );
}
