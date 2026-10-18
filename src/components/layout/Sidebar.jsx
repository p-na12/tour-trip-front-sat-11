import { useState, useEffect, useSyncExternalStore } from "react";
import { Compass, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { LayoutGroup } from "framer-motion";
import { sidebarLinks, sidebarFooterLinks } from "../../constants/sidebarLinks";
import { useActiveRoute } from "../../hooks/useActiveRoute";
import { SidebarItem } from "./SidebarItem";

/**
 * Tiny classname joiner (no clsx / tailwind-merge dependency needed).
 * @param {...any} classes
 */
export function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** Mobile breakpoint helper (no external hook file needed). */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]);

  return isMobile;
}

/**
 * Shared external store for the mobile sidebar drawer, so the admin header
 * hamburger can control this component without any global context.
 */
let mobileOpen = false;
const listeners = new Set();

function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return mobileOpen;
}

function getServerSnapshot() {
  return false;
}

function setMobileOpen(next) {
  if (mobileOpen === next) return;
  mobileOpen = next;
  listeners.forEach((cb) => cb());
}

export function useMobileSidebar() {
  return [useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot), setMobileOpen];
}

/**
 * Admin sidebar: brand, data-driven nav, footer actions, collapsible.
 * Desktop: fixed column. Mobile: slide-out drawer with backdrop.
 * @param {{ className?: string }} props
 */
export function Sidebar({ className }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpenState, setMobileOpen] = useMobileSidebar();
  const isMobile = useIsMobile();
  const isActive = useActiveRoute();

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!mobileOpenState) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileOpenState]);

  const effectiveCollapsed = isMobile ? false : collapsed;

  return (
    <>
      {/* Mobile overlay backdrop */}
      <div
        className={cx(
          "fixed inset-0 z-40 bg-slate-900/40 transition-opacity duration-200 md:hidden",
          mobileOpenState ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={cx(
          "fixed inset-y-0 left-0 z-50 flex shrink-0 flex-col border-r border-slate-200 bg-white",
          "transition-[width,transform] duration-300 ease-out md:relative",
          mobileOpenState ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          collapsed ? "md:w-19" : "md:w-64",
          "w-70",
          className,
        )}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-4 py-5">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-indigo-600 text-white">
            <Compass size={18} />
          </span>
          {!effectiveCollapsed && (
            <span className="truncate text-base font-semibold tracking-tight text-slate-900">
              TOUR TRIP
            </span>
          )}

          {/* Mobile close button */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
            className="ml-auto rounded-lg p-1.5 text-slate-500 transition-colors duration-200 hover:bg-slate-200/70 hover:text-slate-900 md:hidden"
          >
            <X size={18} />
          </button>

          {/* Desktop collapse/expand button */}
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="ml-auto hidden rounded-lg p-1.5 text-slate-500 transition-colors duration-200 hover:bg-slate-200/70 hover:text-slate-900 md:block"
          >
            {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          </button>
        </div>

        {/* Primary navigation */}
        <LayoutGroup id="sidebar">
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-2">
            {sidebarLinks.map((item) => (
              <SidebarItem
                key={item.path}
                {...item}
                collapsed={effectiveCollapsed}
                isActive={isActive(item.path)}
                layoutId="activeSidebarPill"
                onClick={() => setMobileOpen(false)}
              />
            ))}
          </nav>

          {/* Footer actions */}
          <div className="flex flex-col gap-1 border-t border-slate-200 px-3 py-3">
            {sidebarFooterLinks.map((item) => (
              <SidebarItem
                key={item.path}
                {...item}
                collapsed={effectiveCollapsed}
                isActive={isActive(item.path)}
                layoutId="activeSidebarPill"
                onClick={() => setMobileOpen(false)}
              />
            ))}
          </div>
        </LayoutGroup>
      </aside>
    </>
  );
}
