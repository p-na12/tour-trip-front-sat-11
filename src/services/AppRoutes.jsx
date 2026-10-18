import { Navigate, Route, Routes } from "react-router-dom";
import MastersTabs from "../components/common/MastersTabs";
import CreateTour from "../components/tour/CreateTour";
import DashboardOverview from "../pages/admin/dashboard/DashboardOverview";
import ManageBooking from "../pages/admin/bookings/ManageBooking";
import CategoriesPage from "../pages/admin/categories/CategoriesPage";
import CreateCategoryPage from "../pages/admin/categories/CreateCategoryPage";
import CreateCustomer from "../pages/admin/customers/CreateCustomer";
import CustomerList from "../pages/CustomerList";
import CreateDestination from "../pages/admin/destinations/CreateDestination";
import DestinationsPage from "../pages/admin/destinations/DestinationsPage";
import GuidesPage from "../pages/admin/guides/GuidesPage";
import ReviewsPage from "../pages/admin/reviews/ReviewsPage";
import TourSchedules from "../pages/admin/tours/TourSchedules";
import AboutPage from "../pages/public/about/AboutPage";
import MyBookingsPage from "../pages/public/bookings/MyBookingsPage";
import ContactPage from "../pages/public/contact/ContactPage";
import DestinationsPagePublic from "../pages/public/destinations/DestinationsPage";
import DestinationPage from "../components/public/DestinationPage";
import PublicHome from "../pages/public/PublicHome";
import ForgotPassword from "../pages/customer/ForgotPassword";
import LoginForm from "../components/auth/LoginForm";
import OtpVerifyPage from "../pages/public/auth/OtpVerifyPage";
import RegisterForm from "../pages/public/auth/RegisterForm";
import TourDetail from "../components/tour/TourDetailHero";
import TripDetailPage from "../pages/public/trips/TripDetailPage";
import ToursPage from "../pages/public/tours/ToursPage";
import TourDetailPage from "../pages/public/tours/TourDetailPage";
import { AdminLayout } from "../layouts/AdminLayout";
import PublicLayout from "../layouts/PublicLayout";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<PublicHome />} />
        <Route path="destinations" element={<DestinationPage />} />
        <Route path="destinations/all" element={<DestinationsPagePublic />} />
        <Route path="destinations/:id" element={<DestinationPage />} />
        <Route path="tours" element={<ToursPage />} />
        <Route path="tours/:slug" element={<TourDetailPage />} />
        <Route path="trips/:id" element={<TripDetailPage />} />
        <Route path="my-bookings" element={<MyBookingsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="verify-otp" element={<OtpVerifyPage />} />
        <Route path="tour/detail" element={<TourDetail />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="bookings" element={<ManageBooking />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/create" element={<CreateCategoryPage />} />
        <Route path="customers" element={<CustomerList />} />
        <Route path="customers/create" element={<CreateCustomer />} />
        <Route path="destinations" element={<DestinationsPage />} />
        <Route path="destinations/create" element={<CreateDestination />} />
        <Route path="guides" element={<GuidesPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="schedules" element={<TourSchedules />} />
        <Route path="settings" element={<Navigate to="/admin" replace />} />
        <Route path="tours" element={<TourSchedules />} />
        <Route path="tours/create" element={<CreateTour />} />

        <Route path="manageBooking" element={<ManageBooking />} />
        <Route path="categoriesPage" element={<CategoriesPage />} />
        <Route path="customerList" element={<CustomerList />} />
        <Route path="stepPersonal" element={<Navigate to="/admin/settings" replace />} />
        <Route path="tour-schedules" element={<TourSchedules />} />
        <Route path="tour-schedules/create" element={<CreateTour />} />
        <Route path="masters" element={<MastersTabs />} />
        <Route path="masters/tours" element={<TourSchedules />} />
        <Route path="masters/tours/new" element={<CreateTour />} />
        <Route path="masters/categories" element={<CategoriesPage />} />
        <Route path="masters/destinations" element={<DestinationsPage />} />
        <Route
          path="masters/destinations/create"
          element={<CreateDestination />}
        />
        <Route path="masters/guides" element={<GuidesPage />} />
        <Route path="masters/schedules" element={<TourSchedules />} />
        <Route path="reports" element={<Navigate to="/admin" replace />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
