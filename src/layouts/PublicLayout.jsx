import { Outlet, useLocation } from "react-router-dom";
import PublicFooter from "../components/public/Footer";
import PublicNavbar from "../components/public/Navbar";

export default function PublicLayout() {
  const { pathname } = useLocation();
  const showFooter = pathname !== "/login" && pathname !== "/register";

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <PublicNavbar />
      <Outlet />
      {showFooter && <PublicFooter />}
    </div>
  );
}
