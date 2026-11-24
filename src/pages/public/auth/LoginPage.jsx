import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthPageShell from "../../../components/auth/AuthPageShell";
import { useAuth } from "../../../context/auth";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const { signIn, notify, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const returnTo = location.state?.from?.pathname || "/my-bookings";

  if (isAuthenticated) {
    return <Navigate to={returnTo} replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    const result = signIn({ email, password, remember });
    if (result.error) {
      setError(result.error);
      return;
    }
    notify(t("auth.welcomeBackName", { name: result.user.name.split(" ")[0] }));
    navigate(returnTo, { replace: true });
  };

  return (
    <AuthPageShell>
      <div className="max-w-md">
        <p className="text-sm font-semibold text-emerald-700">{t("auth.welcomeBack")}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {t("auth.signInTitle")}
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {t("auth.signInSubtitle")}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="login-email" className="block text-sm font-semibold text-slate-800">
              {t("auth.emailAddress")}
            </label>
            <div className="relative mt-2">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t("auth.emailPlaceholder")}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="login-password" className="text-sm font-semibold text-slate-800">
                {t("auth.password")}
              </label>
              <Link to="/forgot-password" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                {t("auth.forgotPassword")}
              </Link>
            </div>
            <div className="relative mt-2">
              <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={t("auth.passwordPlaceholder")}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-12 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? t("auth.hidePassword") : t("auth.showPassword")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-emerald-700"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="h-4 w-4 rounded border-slate-300 accent-emerald-700"
            />
            {t("auth.rememberMe")}
          </label>

          {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

          <button type="submit" className="h-12 w-full rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800">
            {t("auth.signIn")}
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-slate-600">
          {t("auth.dontHaveAccount")}{" "}
          <Link to="/register" state={location.state} className="font-semibold text-emerald-700 hover:text-emerald-800">
            {t("auth.createAccount")}
          </Link>
        </p>
      </div>
    </AuthPageShell>
  );
}
