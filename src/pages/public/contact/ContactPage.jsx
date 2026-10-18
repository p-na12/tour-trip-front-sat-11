import { Mail, MapPin, Phone } from "lucide-react";
import PublicPageFrame from "../../../components/public/PublicPageFrame";

export default function ContactPage() {
  return (
    <PublicPageFrame
      title="Contact Us"
      description="Planning a trip or have a question? Our team would be happy to help."
    >
      <section className="grid gap-4 sm:grid-cols-3">
        <a
          href="mailto:hello@tour-trip.com"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-emerald-300"
        >
          <Mail className="text-emerald-700" size={22} />
          <h2 className="mt-4 font-semibold text-slate-900">Email</h2>
          <p className="mt-1 text-sm text-slate-600">hello@tour-trip.com</p>
        </a>
        <a
          href="tel:+85512345678"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-emerald-300"
        >
          <Phone className="text-emerald-700" size={22} />
          <h2 className="mt-4 font-semibold text-slate-900">Call us</h2>
          <p className="mt-1 text-sm text-slate-600">+855 12 345 678</p>
        </a>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <MapPin className="text-emerald-700" size={22} />
          <h2 className="mt-4 font-semibold text-slate-900">Based in</h2>
          <p className="mt-1 text-sm text-slate-600">Phnom Penh, Cambodia</p>
        </div>
      </section>
    </PublicPageFrame>
  );
}
