import { useState } from "react";
import {
  Bell,
  Check,
  Moon,
  Palette,
  Settings,
  Sun,
  UserRound,
  Upload,
} from "lucide-react";
import brandLogo from "../../../assets/tour-trip-logo.jpg";
import adminAvatar from "../../../assets/images/avatars/Lina.jpg";
import {
  ADMIN_SETTINGS_STORAGE_KEY,
  ADMIN_SETTINGS_UPDATED_EVENT,
} from "../../../constants/adminSettings";
const DEFAULT_SETTINGS = {
  general: {
    websiteName: "Tour-Trip",
    logo: brandLogo,
    contactEmail: "hello@tourtrip.com",
    phoneNumber: "+855 12 345 678",
  },
  account: {
    adminName: "Sok Dara",
    email: "admin@tourtrip.com",
    profilePicture: adminAvatar,
  },
  appearance: { theme: "light" },
  notifications: { bookings: true, customers: true },
};

const sections = [
  { id: "general", label: "General", description: "Website details", icon: Settings },
  { id: "account", label: "Account", description: "Your profile", icon: UserRound },
  { id: "appearance", label: "Appearance", description: "Theme preferences", icon: Palette },
  { id: "notifications", label: "Notifications", description: "What you hear about", icon: Bell },
];

function readSettings() {
  try {
    const stored = window.localStorage.getItem(ADMIN_SETTINGS_STORAGE_KEY);
    if (!stored) return { settings: DEFAULT_SETTINGS, error: "" };

    const parsed = JSON.parse(stored);
    return {
      settings: {
        general: { ...DEFAULT_SETTINGS.general, ...parsed.general },
        account: { ...DEFAULT_SETTINGS.account, ...parsed.account },
        appearance: { ...DEFAULT_SETTINGS.appearance, ...parsed.appearance },
        notifications: { ...DEFAULT_SETTINGS.notifications, ...parsed.notifications },
      },
      error: "",
    };
  } catch (error) {
    console.error("Unable to load saved system settings.", error);
    return {
      settings: DEFAULT_SETTINGS,
      error: "Saved settings could not be loaded. You can still update and save them.",
    };
  }
}

function Field({ label, value, onChange, type = "text", placeholder }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
      />
    </label>
  );
}

function ImageSetting({ label, image, onChange }) {
  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      <div className="flex items-center gap-4 rounded-xl border border-slate-200 p-3">
        <img
          src={image}
          alt={`${label} preview`}
          className="size-14 shrink-0 rounded-lg border border-slate-100 bg-slate-50 object-cover"
        />
        <div className="min-w-0 flex-1">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
            <Upload size={15} />
            Upload image
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="sr-only"
              onChange={onChange}
            />
          </label>
          <p className="mt-1.5 text-xs text-slate-500">PNG, JPG, or WebP. Max 1 MB.</p>
        </div>
      </div>
    </div>
  );
}

function NotificationToggle({ title, description, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 py-4">
      <span>
        <span className="block text-sm font-medium text-slate-800">{title}</span>
        <span className="mt-0.5 block text-sm text-slate-500">{description}</span>
      </span>
      <span className="relative inline-flex shrink-0 items-center">
        <input
          type="checkbox"
          role="switch"
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <span className="h-6 w-11 rounded-full bg-slate-200 transition peer-checked:bg-emerald-700 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-600 peer-focus-visible:ring-offset-2" />
        <span className="absolute left-0.5 size-5 rounded-full bg-white shadow-sm transition peer-checked:translate-x-5" />
      </span>
    </label>
  );
}

export default function SystemSettings() {
  const [initial] = useState(readSettings);
  const [settings, setSettings] = useState(initial.settings);
  const [activeSection, setActiveSection] = useState("general");
  const [message, setMessage] = useState(initial.error);
  const [saved, setSaved] = useState(false);

  const updateSetting = (section, field, value) => {
    setSettings((current) => ({
      ...current,
      [section]: { ...current[section], [field]: value },
    }));
    setMessage("");
    setSaved(false);
  };

  const handleImageUpload = (section, field, event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setMessage("Choose a PNG, JPG, or WebP image.");
      setSaved(false);
      return;
    }
    if (file.size > 1024 * 1024) {
      setMessage("Images must be 1 MB or smaller.");
      setSaved(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setMessage("The selected image could not be read.");
        setSaved(false);
        return;
      }
      updateSetting(section, field, reader.result);
    };
    reader.onerror = () => {
      setMessage("The selected image could not be read.");
      setSaved(false);
    };
    reader.readAsDataURL(file);
  };

  const saveSettings = () => {
    try {
      window.localStorage.setItem(ADMIN_SETTINGS_STORAGE_KEY, JSON.stringify(settings));
      window.dispatchEvent(
        new CustomEvent(ADMIN_SETTINGS_UPDATED_EVENT, { detail: settings }),
      );
      setMessage("Your settings have been saved.");
      setSaved(true);
    } catch (error) {
      console.error("Unable to save system settings.", error);
      setMessage("Settings could not be saved. Try removing a large image and saving again.");
      setSaved(false);
    }
  };

  const section = sections.find((item) => item.id === activeSection);
  const SectionIcon = section.icon;

  return (
    <div className="mx-auto max-w-6xl pb-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-sm font-medium text-emerald-700">Admin dashboard</p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">System settings</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your site, account, and dashboard preferences.
          </p>
        </div>
        <button
          type="button"
          onClick={saveSettings}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        >
          <Check size={16} />
          Save changes
        </button>
      </div>

      <div className="grid items-start gap-5 md:grid-cols-[220px_minmax(0,1fr)]">
        <nav
          aria-label="Settings sections"
          className="grid grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm md:grid-cols-1"
        >
          {sections.map((item) => {
            const Icon = item.icon;
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                aria-current={active ? "page" : undefined}
                className={`flex min-w-0 items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                  active
                    ? "bg-emerald-50 text-emerald-800"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={18} className="shrink-0" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">{item.label}</span>
                  <span className={`hidden truncate text-xs sm:block ${active ? "text-emerald-700" : "text-slate-500"}`}>
                    {item.description}
                  </span>
                </span>
              </button>
            );
          })}
        </nav>

        <section className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
            <span className="grid size-9 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
              <SectionIcon size={18} />
            </span>
            <div>
              <h2 className="text-base font-semibold text-slate-900">{section.label} settings</h2>
              <p className="text-sm text-slate-500">{section.description}</p>
            </div>
          </div>

          <div className="space-y-5 px-5 py-5 sm:px-6 sm:py-6">
            {activeSection === "general" && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Website name"
                    value={settings.general.websiteName}
                    onChange={(event) => updateSetting("general", "websiteName", event.target.value)}
                  />
                  <Field
                    label="Contact email"
                    type="email"
                    value={settings.general.contactEmail}
                    onChange={(event) => updateSetting("general", "contactEmail", event.target.value)}
                  />
                  <Field
                    label="Phone number"
                    type="tel"
                    value={settings.general.phoneNumber}
                    onChange={(event) => updateSetting("general", "phoneNumber", event.target.value)}
                  />
                  <ImageSetting
                    label="Website logo"
                    image={settings.general.logo}
                    onChange={(event) => handleImageUpload("general", "logo", event)}
                  />
                </div>
              </>
            )}

            {activeSection === "account" && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Admin name"
                    value={settings.account.adminName}
                    onChange={(event) => updateSetting("account", "adminName", event.target.value)}
                  />
                  <Field
                    label="Email address"
                    type="email"
                    value={settings.account.email}
                    onChange={(event) => updateSetting("account", "email", event.target.value)}
                  />
                </div>
                <ImageSetting
                  label="Profile picture"
                  image={settings.account.profilePicture}
                  onChange={(event) => handleImageUpload("account", "profilePicture", event)}
                />
              </>
            )}

            {activeSection === "appearance" && (
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Color theme</h3>
                <p className="mt-1 text-sm text-slate-500">Choose your preferred dashboard appearance.</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    { id: "light", label: "Light mode", detail: "A bright, clear workspace", icon: Sun },
                    { id: "dark", label: "Dark mode", detail: "A darker, low-glare workspace", icon: Moon },
                  ].map((option) => {
                    const Icon = option.icon;
                    const selected = settings.appearance.theme === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => updateSetting("appearance", "theme", option.id)}
                        className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                          selected
                            ? "border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <span className={`grid size-10 place-items-center rounded-lg ${selected ? "bg-white text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                          <Icon size={19} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-slate-800">{option.label}</span>
                          <span className="mt-0.5 block text-xs text-slate-500">{option.detail}</span>
                        </span>
                        <span className={`grid size-5 place-items-center rounded-full border ${selected ? "border-emerald-700 bg-emerald-700 text-white" : "border-slate-300"}`}>
                          {selected && <Check size={12} />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="divide-y divide-slate-100">
                <NotificationToggle
                  title="Booking notifications"
                  description="Get updates when a new booking is made."
                  checked={settings.notifications.bookings}
                  onChange={(event) => updateSetting("notifications", "bookings", event.target.checked)}
                />
                <NotificationToggle
                  title="Customer notifications"
                  description="Get updates when a customer joins or updates their profile."
                  checked={settings.notifications.customers}
                  onChange={(event) => updateSetting("notifications", "customers", event.target.checked)}
                />
              </div>
            )}

            {message && (
              <p
                role={saved ? "status" : "alert"}
                className={`border-t border-slate-100 pt-4 text-sm ${saved ? "text-emerald-700" : "text-rose-700"}`}
              >
                {saved && <Check size={15} className="mr-1 inline" />}
                {message}
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
