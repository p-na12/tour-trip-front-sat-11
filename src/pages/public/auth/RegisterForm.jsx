import React from "react";
import {User, Mail,Lock, KeyRound, Eye, EyeOff} from "lucide-react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    
  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{backgroundImage:"url('https://i.pinimg.com/736x/a6/85/f8/a685f8f6733ce66f7cd815400d84f25e.jpg')",}}>
   
      <div className="absolute left-4 top-5 z-10 sm:left-8 sm:top-8">
        <Link to="/" className="text-2xl font-bold text-white sm:text-3xl">
          Tour-Trip
        </Link>
      </div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white/90 backdrop-blur-md shadow-2xl p-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-800">
            Start Your Journey
          </h2>

          <p className="mt-3 text-sm text-slate-500">
            Create an account to unlock extraordinary
            destinations.
          </p>
        </div>

        <form className="mt-8 space-y-5">
          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Dy Dara"
                className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                placeholder="dydara12@gmail.com"
                className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>

              <input type={showPassword ? "text" : "password"} placeholder="••••••••"
                className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 outline-none focus:border-blue-500"/>
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
         
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Confirm Password
            </label>

            <div className="relative">
              <KeyRound
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••"
                className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 outline-none focus:border-blue-500"
              />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-900 py-3 font-medium text-white transition hover:bg-blue-800"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">Already have an account? {" "}
            <Link to="/login" className="font-medium text-blue-700 hover:underline">Log in</Link>
          </p>

          <p className="mt-3 text-xs text-slate-400">By signing up, you agree to our Terms of Service and Privacy Policy.</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;