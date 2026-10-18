import { MapPin, Mail } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b2347] text-white">
      {/* MAIN FOOTER */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_0.75fr_1fr_1.15fr_1.35fr] lg:gap-12">

          {/* BRAND */}
          <div>
            <Link to="/" className="flex items-center gap-3">
              {/* Replace this with your logo image if you have one */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
                <img className="rounded-full" src="https://i.pinimg.com/736x/33/1d/f1/331df1662cb1553dad983c1821cca1d0.jpg" alt="" />
              </div>

              <span className="text-2xl font-bold">
                Tour-Trip
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">
              Explore amazing destinations, create unforgettable memories,
              and enjoy your journey with Tour-Trip.
            </p>

            {/* SOCIAL MEDIA */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-slate-300 transition hover:bg-emerald-600 hover:text-white"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-slate-300 transition hover:bg-emerald-600 hover:text-white"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                aria-label="Youtube"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-slate-300 transition hover:bg-emerald-600 hover:text-white"
              >
                <FaYoutube size={18} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-slate-300 transition hover:bg-emerald-600 hover:text-white"
              >
                <FaXTwitter size={18} />              </a>
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-lg font-bold text-white">
              Company
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-slate-300">
              <Link
                to="/about"
                className="transition hover:text-emerald-400"
              >
                About Us
              </Link>

              <Link
                to="/tours"
                className="transition hover:text-emerald-400"
              >
                Our Services
              </Link>

              <a
                href="#"
                className="transition hover:text-emerald-400"
              >
                Careers
              </a>

              <a
                href="#"
                className="transition hover:text-emerald-400"
              >
                Blog
              </a>
            </div>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-lg font-bold text-white">
              Support
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-slate-300">
              <a
                href="#"
                className="transition hover:text-emerald-400"
              >
                FAQ
              </a>

              <a
                href="#"
                className="transition hover:text-emerald-400"
              >
                Terms & Conditions
              </a>

              <a
                href="#"
                className="transition hover:text-emerald-400"
              >
                Privacy Policy
              </a>

              <Link
                to="/contact"
                className="transition hover:text-emerald-400"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* DESTINATIONS */}
          <div>
            <h3 className="text-lg font-bold text-white">
              Popular Destinations
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              {[
                "Siem Reap",
                "Phnom Penh",
                "Sihanoukville",
                "Kampot",
              ].map((destination) => (
                <Link
                  key={destination}
                  to="/destinations"
                  className="group flex items-center gap-2 text-sm text-slate-300 transition hover:text-emerald-400"
                >
                  <MapPin
                    size={16}
                    className="shrink-0 text-red-400 transition group-hover:text-emerald-400"
                  />

                  {destination}
                </Link>
              ))}
            </div>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-lg font-bold text-white">
              Newsletter
            </h3>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">
              Subscribe to get the latest tours, travel tips, and special
              offers.
            </p>

            <form
              className="mt-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex overflow-hidden rounded-lg bg-white">
                <div className="flex min-w-0 flex-1 items-center gap-2 px-4">
                  <Mail
                    size={18}
                    className="shrink-0 text-slate-500"
                  />

                  <input
                    type="email"
                    placeholder="Your email"
                    aria-label="Email address"
                    className="min-w-0 flex-1 bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>

                <button
                  type="submit"
                  className="shrink-0 bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-[1300px] flex-col gap-4 px-5 py-5 text-xs text-slate-400 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            © {currentYear} Tour-Trip. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="#"
              className="transition hover:text-white"
            >
              Privacy Policy
            </a>

            <span className="hidden h-4 w-px bg-white/20 sm:block" />

            <a
              href="#"
              className="transition hover:text-white"
            >
              Terms & Conditions
            </a>

            <span className="hidden h-4 w-px bg-white/20 sm:block" />

            <a
              href="#"
              className="transition hover:text-white"
            >
              Site Map
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}