import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import OtpVerifyForm from "../../../components/auth/OtpVerifyForm";
import { verifyOtp, resendOtp } from "../../../services/authService";
import otpBackground from "../../../assets/images/common/otp_background.jpg";
import { ShieldCheck } from "lucide-react";

const OtpVerifyPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // passed from signup page

  const handleVerify = async (code) => {
    setLoading(true);
    setError("");
    try {
      await verifyOtp({ email, code });
      navigate("/login");
    } catch (err) {
      const message = err.response?.data?.message;
      const code = err.response?.data?.code;
      const localizedMessage = typeof message === "object" ? message?.[i18n.language] : null;
      setError(localizedMessage || (code === "INVALID_OTP" ? t("auth.invalidCode") : t("auth.requestFailed")));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp({ email });
    } catch (err) {
      const message = err.response?.data?.message;
      const localizedMessage = typeof message === "object" ? message?.[i18n.language] : null;
      setError(localizedMessage || t("auth.resendFailed"));
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center px-4 py-8"
      style={{
        backgroundImage: `linear-gradient(rgba(10, 30, 45, 0.62), rgba(10, 30, 45, 0.62)), url(${otpBackground})`,
      }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl sm:p-8">
        <ShieldCheck className="mx-auto mb-4 h-12 w-12 text-blue-700" />
        <h2 className="text-2xl font-bold text-slate-800">{t("auth.verifyEmail")}</h2>
        <p className="mt-2 text-slate-600">
          {t("auth.otpInstructions")} {email || ""}
        </p>
        <p className="mt-2 mb-10 text-blue-700">{email || "explorer@example.com"}</p>
        <OtpVerifyForm onSubmit={handleVerify} loading={loading} />
        {error && <p className="mt-5 text-red-600">{error}</p>}
        <p className="mt-4 text-slate-600">
          {t("auth.didNotReceiveCode")}
        </p>
        <button
          onClick={handleResend}
          className="mt-4 font-medium text-blue-700 hover:text-blue-800"
        >
          {t("auth.resendCode")}
        </button>
      </div>
    </div>
  );
};

export default OtpVerifyPage;
