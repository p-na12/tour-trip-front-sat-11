import {
  LayoutDashboard,
  LayoutGrid,
  CalendarCheck,
  BarChart3,
  Star,
  Settings,
  LogOut,
  CalendarDays,
  Users
} from "lucide-react";

/**
 * @typedef {Object} NavLinkItem
 * @property {string} label - Visible text
 * @property {string} path  - Route path used for navigation + active matching
 * @property {import("lucide-react").LucideIcon} icon
 */

/** @type {NavLinkItem[]} */
export const sidebarLinks = [
  { label: "Dashboard", labelKey: "dashboard", path: "/admin", icon: LayoutDashboard },
  {
    label: "Manage Masters",
    labelKey: "manageMasters",
    path: "/admin/masters",
    icon: LayoutGrid,
  },
  {
    label: "Manage Bookings",
    labelKey: "manageBookings",
    path: "/admin/bookings",
    icon: CalendarCheck,
  },
  { label: "Manage Categories", labelKey: "manageCategories", path: "/admin/categories", icon: LayoutGrid },
  { label: "Tour Schedules", labelKey: "tourSchedules", path: "/admin/schedules", icon: CalendarDays },
  { label: "Manage Customers", labelKey: "manageCustomers", path: "/admin/customers", icon: Users },
  { label: "Reports", labelKey: "reports", path: "/admin/reports", icon: BarChart3 },
  { label: "Reviews", labelKey: "reviews", path: "/admin/reviews", icon: Star },
];

/** @type {NavLinkItem[]} */
export const sidebarFooterLinks = [
  { label: "System Settings", labelKey: "systemSettings", path: "/admin/settings", icon: Settings },
  { label: "Logout", labelKey: "logout", path: "/logout", icon: LogOut },
];
