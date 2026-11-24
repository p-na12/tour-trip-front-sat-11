import { useEffect, useRef, useState } from "react";
import { ChevronDown, Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher({ className = "" }) {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const availableLanguages = [
    { code: "kh", label: "ខ្មែរ", flag: "🇰🇭" },
    { code: "en", label: "English", flag: "🇬🇧" },
  ];

  const selectedLanguage =
    availableLanguages.find(({ code }) => i18n.language === code) ?? availableLanguages[0];

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("tour-trip-language", language);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className={`relative ${className}`} aria-label={t("nav.language")}>
      <button
        type="button"
        className="inline-flex items-center justify-between gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 shadow-sm transition hover:border-slate-300 sm:px-3"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="inline-flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-base">
            {selectedLanguage.flag}
          </span>
          <span className="text-sm font-semibold text-slate-700">{selectedLanguage.label}</span>
        </span>
        <ChevronDown size={15} className={`text-slate-500 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-44 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl">
          {availableLanguages.map(({ code, label, flag }) => {
            const selected = selectedLanguage.code === code;

            return (
              <button
                key={code}
                type="button"
                onClick={() => changeLanguage(code)}
                className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-sm font-medium transition ${
                  selected ? "bg-slate-100 text-slate-900" : "text-slate-700 hover:bg-slate-50"
                }`}
                aria-pressed={selected}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-base">
                  {flag}
                </span>
                <span className="flex-1">{label}</span>
                {selected && <Languages size={14} className="text-slate-500" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
