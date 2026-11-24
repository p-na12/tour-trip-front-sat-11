import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AuthPageShell from "../../../components/auth/AuthPageShell";
import { useAuth } from "../../../context/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);
  const { t } = useTranslation();
  const { resetPassword, notify } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Your password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }
    const result = resetPassword({ email, password });
    if (result.error) {
      setError(result.error);
      return;
    }
    setCompleted(true);
    notify(t("auth.passwordUpdated"));
  };

  return (
    <AuthPageShell>
      <div className="max-w-md">
        <p className="text-sm font-semibold text-emerald-700">{t("auth.accountAssistance")}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{t("auth.forgotPasswordTitle")}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {t("auth.forgotPasswordText")}
        </p>
        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div>
            <label htmlFor="forgot-email" className="block text-sm font-semibold text-slate-800">{t("auth.emailAddress")}</label>
            <input id="forgot-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder={t("auth.emailAddress")} className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50" />
          </div>
          <div>
            <label htmlFor="forgot-password" className="block text-sm font-semibold text-slate-800">{t("auth.newPassword")}</label>
            <input id="forgot-password" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50" />
          </div>
          <div>
            <label htmlFor="forgot-confirm-password" className="block text-sm font-semibold text-slate-800">{t("auth.confirmNewPassword")}</label>
            <input id="forgot-confirm-password" type="password" autoComplete="new-password" required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50" />
          </div>
          {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          {completed && <p role="status" className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{t("auth.passwordUpdatedSuccess")}</p>}
          <button type="submit" className="h-12 w-full rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800">{t("auth.resetPassword")}</button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600"><Link to="/login" className="font-semibold text-emerald-700 hover:text-emerald-800">{t("auth.backToSignIn")}</Link></p>
      </div>
    </AuthPageShell>
  );
}
