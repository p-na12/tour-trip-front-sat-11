import { Outlet, useLocation } from "react-router-dom";
import PublicFooter from "../components/public/Footer";
import PublicNavbar from "../components/public/Navbar";

export default function PublicLayout() {
  const { pathname } = useLocation();
  const showFooter = !["/login", "/register", "/forgot-password", "/profile"].includes(pathname);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <PublicNavbar />
      <Outlet />
      {showFooter && <PublicFooter />}
    </div>
  );
}
