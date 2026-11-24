import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cx } from "./Sidebar";

/**
 * A single sidebar navigation row.
 *
 * @param {Object} props
 * @param {string} props.label
 * @param {string} props.path
 * @param {import("lucide-react").LucideIcon} props.icon
 * @param {boolean} props.isActive
 * @param {boolean} [props.collapsed] - icon-only mode
 * @param {string} [props.layoutId] - shared layout id for the sliding pill
 * @param {() => void} [props.onClick]
 */
export function SidebarItem({ label, path, icon: Icon, isActive, collapsed = false, layoutId, onClick }) {
  return (
    <Link
      to={path}
      title={collapsed ? label : undefined}
      onClick={onClick}
      className={cx(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
        "transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
        isActive
          ? "bg-emerald-50 text-emerald-700"
          : "text-slate-600 hover:bg-slate-200/60 hover:text-slate-900",
      )}
    >
      {/* Sliding pill: only rendered on the active item, Framer Motion morphs it between items */}
      {isActive && layoutId && (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-0 rounded-xl bg-emerald-50 shadow-sm"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}

      {/* Left accent bar (rides along with the pill) */}
      {isActive && layoutId && (
        <motion.span
          layoutId={`${layoutId}-accent`}
          className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-emerald-600"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}

      <Icon
        size={18}
        className="relative z-10 shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-3"
      />

      {!collapsed && (
        <span className="relative z-10 truncate transition-transform duration-200 group-hover:translate-x-0.5">
          {label}
        </span>
      )}
    </Link>
  );
}
