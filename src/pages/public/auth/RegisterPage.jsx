import { useState } from "react";
import { Eye, EyeOff, KeyRound, LockKeyhole, Mail, Phone, UserRound } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthPageShell from "../../../components/auth/AuthPageShell";
import { useAuth } from "../../../context/auth";

const inputClass = "h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-11 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const { register, notify } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));
  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    if (form.password.length < 8) {
      setError("Your password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }
    const result = register(form);
    if (result.error) {
      setError(result.error);
      return;
    }
    notify("Your account has been created. Sign in to continue.");
    navigate("/login", { replace: true, state: location.state });
  };

  return (
    <AuthPageShell>
      <div className="max-w-md">
        <p className="text-sm font-semibold text-emerald-700">Your next adventure starts here</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Create your account</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">Save your plans and make your Cambodia trip your own.</p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div>
            <label htmlFor="register-name" className="block text-sm font-semibold text-slate-800">Full name</label>
            <div className="relative mt-2">
              <UserRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input id="register-name" type="text" autoComplete="name" required minLength={2} value={form.name} onChange={update("name")} placeholder="Your name" className={inputClass} />
            </div>
          </div>
          <div>
            <label htmlFor="register-email" className="block text-sm font-semibold text-slate-800">Email address</label>
            <div className="relative mt-2">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input id="register-email" type="email" autoComplete="email" required value={form.email} onChange={update("email")} placeholder="you@example.com" className={inputClass} />
            </div>
          </div>
          <div>
            <label htmlFor="register-phone" className="block text-sm font-semibold text-slate-800">Phone number</label>
            <div className="relative mt-2">
              <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input id="register-phone" type="tel" autoComplete="tel" required value={form.phone} onChange={update("phone")} placeholder="+855 12 345 678" className={inputClass} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="register-password" className="block text-sm font-semibold text-slate-800">Password</label>
              <div className="relative mt-2">
                <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input id="register-password" type={showPassword ? "text" : "password"} autoComplete="new-password" required minLength={8} value={form.password} onChange={update("password")} placeholder="At least 8 characters" className={inputClass} />
                <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-700">
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="register-confirm-password" className="block text-sm font-semibold text-slate-800">Confirm password</label>
              <div className="relative mt-2">
                <KeyRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input id="register-confirm-password" type={showConfirmPassword ? "text" : "password"} autoComplete="new-password" required value={form.confirmPassword} onChange={update("confirmPassword")} placeholder="Re-enter password" className={inputClass} />
                <button type="button" onClick={() => setShowConfirmPassword((visible) => !visible)} aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-700">
                  {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>
          </div>
          {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          <button type="submit" className="h-12 w-full rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800">Create account</button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" state={location.state} className="font-semibold text-emerald-700 hover:text-emerald-800">Sign in</Link>
        </p>
      </div>
    </AuthPageShell>
  );
}
