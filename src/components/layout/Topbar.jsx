import { useState } from "react";
import { Menu, Search, Bell, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useMobileSidebar, cx } from "./Sidebar";
import LanguageSwitcher from "../LanguageSwitcher";

/**
 * Dashboard top bar: search, notifications, profile trigger (dropdown-ready).
 * @param {{ className?: string, userName?: string, userRole?: string }} props
 */
export function Topbar({ className, userName = "Sok Dara", userRole = "Administrator" }) {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [, setMobileOpen] = useMobileSidebar();

  return (
    <header
      className={cx(
        "flex h-16 items-center gap-3 border-b border-slate-200 bg-white px-4 md:gap-4 md:px-6",
        className,
      )}
    >
      {/* Mobile sidebar toggle */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label={t("admin.openSidebar")}
        className="shrink-0 rounded-lg p-2 text-slate-500 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900 md:hidden"
      >
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="group relative min-w-0 max-w-sm flex-1">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors duration-200 group-focus-within:text-slate-700"
        />
        <input
          type="search"
          placeholder={t("admin.searchPlaceholder")}
          className={cx(
            "h-10 w-full rounded-full border border-slate-300 bg-slate-100/80 pl-9 pr-4 text-sm text-slate-900",
            "placeholder:text-slate-500 outline-none",
            "transition-all duration-200 ease-out",
            "focus:bg-white focus:shadow-md focus:ring-2 focus:ring-indigo-400/50",
          )}
        />
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-1 md:gap-2">
        {/* Notifications */}
        <button
          type="button"
          aria-label={t("admin.notifications")}
          className="relative rounded-full p-2 text-slate-500 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900 md:p-2.5"
        >
          <Bell size={18} />
          <span className="absolute right-2 top-2 flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-rose-500/70 [animation-duration:2.4s]" />
            <span className="relative inline-flex size-2 rounded-full bg-rose-500" />
          </span>
        </button>

        {/* Profile trigger */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            className="flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-2 transition-colors duration-200 hover:bg-slate-100 md:pr-3"
          >
            <span className="grid size-8 place-items-center rounded-full bg-indigo-600 text-sm font-semibold text-white md:size-9">
              {userName.charAt(0)}
            </span>
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-sm font-medium text-slate-900">{userName}</span>
              <span className="block text-xs text-slate-500">{userRole}</span>
            </span>
            <ChevronDown
              size={16}
              className={cx(
                "hidden text-slate-400 transition-transform duration-200 sm:block",
                menuOpen && "rotate-180",
              )}
            />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-2 text-slate-900 shadow-lg"
              >
                <p className="px-2 py-1.5 text-xs text-slate-500">{t("admin.menuComingSoon")}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <LanguageSwitcher className="ml-1" />
      </div>
    </header>
  );
}
