import { Mail, MapPin, Phone } from "lucide-react";
import phnomSomPov from "../../../assets/images/common/phnom_som_pov.jpg";

const fieldClassName =
  "mt-2 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

function ContactCard({ icon: Icon, title, children, href }) {
  const content = (
    <>
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
        <Icon size={18} aria-hidden="true" />
      </span>
      <h2 className="mt-4 font-semibold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-600">{children}</p>
    </>
  );

  const className =
    "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 sm:p-6";

  return href ? (
    <a href={href} className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}

function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const body = [
    `Name: ${formData.get("name")}`,
    `Email: ${formData.get("email")}`,
    `Phone: ${formData.get("phone") || "Not provided"}`,
    `Interested destination: ${formData.get("destination") || "Not specified"}`,
    "",
    formData.get("message"),
  ].join("\n");

  window.location.href = `mailto:hello@tour-trip.com?subject=${encodeURIComponent(
    "Travel enquiry",
  )}&body=${encodeURIComponent(body)}`;
}

export default function ContactPage() {
  return (
    <main className="min-w-0 flex-1 bg-white">
      <section className="mx-auto w-full max-w-7xl px-4 pb-10 pt-8 sm:px-6 sm:pb-12 sm:pt-10 lg:px-8">
        <header className="mb-7">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Contact Us
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            Planning a trip or have a question? Our team would be happy to help.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-3">
          <ContactCard
            icon={Mail}
            title="Email"
            href="mailto:hello@tour-trip.com"
          >
            hello@tour-trip.com
          </ContactCard>
          <ContactCard
            icon={Phone}
            title="Call us"
            href="tel:+85512345678"
          >
            +855 12 345 678
          </ContactCard>
          <ContactCard icon={MapPin} title="Based in">
            Phnom Penh, Cambodia
          </ContactCard>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 ">
        <div className="mx-auto grid w-full max-w-[76rem] overflow-hidden rounded-2xl border border-green-600 bg-white shadow-sm lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="relative isolate flex min-w-0 min-h-[300px] items-end overflow-hidden bg-slate-900 sm:min-h-[380px] lg:min-h-[500px]">
            <img
              src={phnomSomPov}
              alt="Green Cambodian countryside surrounding Phnom Som Pov"
              className="absolute inset-0 -z-20 h-full w-full object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/90 via-slate-950/15 to-transparent" />
            <div className="p-6 text-white sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-700/90 px-3 py-1.5 text-xs font-semibold">
                <MapPin size={14} aria-hidden="true" />
                Battambang · Phnom Sampeau
              </span>
              <h2 className="mt-4 max-w-md text-2xl font-bold leading-tight sm:text-3xl">
                Explore Authentic Cambodia With Local Guides
              </h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-white/85">
                Personalized packages across Angkor, pristine rural plains, and
                southern coastal getaways.
              </p>
            </div>
          </div>

          <div className="min-w-0 p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Send us a Message
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Fill out the form below and one of our travel advisors will reply
              within 24 hours.
            </p>

            <form className="mt-7" onSubmit={handleSubmit}>
              <div className="grid min-w-0 gap-x-4 gap-y-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <label className="block min-w-0 text-xs font-semibold uppercase tracking-wide text-slate-700">
                  Full name
                  <input
                    className={fieldClassName}
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    autoComplete="name"
                    required
                  />
                </label>
                <label className="block min-w-0 text-xs font-semibold uppercase tracking-wide text-slate-700">
                  Email address
                  <input
                    className={fieldClassName}
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    required
                  />
                </label>
                <label className="block min-w-0 text-xs font-semibold uppercase tracking-wide text-slate-700">
                  Phone number
                  <input
                    className={fieldClassName}
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    autoComplete="tel"
                  />
                </label>
                <label className="block min-w-0 text-xs font-semibold uppercase tracking-wide text-slate-700">
                  Interested destination
                  <select
                    className={fieldClassName}
                    name="destination"
                    defaultValue=""
                  >
                    <option value="">Choose a destination</option>
                    <option>Siem Reap &amp; Angkor Wat</option>
                    <option>Phnom Penh</option>
                    <option>Battambang</option>
                    <option>Kampot &amp; Kep</option>
                    <option>Koh Rong</option>
                    <option>Other / not sure yet</option>
                  </select>
                </label>
                <label className="block min-w-0 text-xs font-semibold uppercase tracking-wide text-slate-700 sm:col-span-2">
                  Your message
                  <textarea
                    className={`${fieldClassName} min-h-32 resize-y`}
                    name="message"
                    placeholder="Tell us about your group size, travel dates, and dream destinations..."
                    rows={4}
                    required
                  />
                </label>
              </div>

              <button
                className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                type="submit"
              >
                Send Message
              </button>
              <p className="mt-3 text-xs text-slate-500">
                Submitting opens your email app with the message ready to send.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
