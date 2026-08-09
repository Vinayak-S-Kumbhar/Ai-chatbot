import { useState } from "react";
import {
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiOutlineEye,
  HiOutlineEyeSlash,
} from "react-icons/hi2";

export default function Auth() {
  const [login, setLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 flex items-center justify-center px-5">
      {/* Animated Background */}

      <div className="absolute inset-0">
        <div className="absolute top-[-150px] left-[-150px] h-96 w-96 rounded-full bg-blue-300/30 blur-[120px] animate-pulse"></div>

        <div className="absolute bottom-[-180px] right-[-150px] h-[450px] w-[450px] rounded-full bg-violet-300/30 blur-[150px] animate-pulse"></div>

        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/20 blur-[180px]"></div>
      </div>

      {/* Card */}

      <div className="relative w-full max-w-md">
        <div className="rounded-3xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.12)] overflow-hidden">
          {/* Header */}

          <div className="p-8 pb-5">
            <h1 className="text-4xl font-bold text-slate-800">
              {login ? "Welcome Back" : "Create Account"}
            </h1>

            <p className="mt-2 text-slate-500">
              {login ? "Login to continue" : "Create your account in seconds"}
            </p>
          </div>

          {/* Form */}

          <div className="px-8 pb-8 transition-all duration-500">
            {login ? (
              /* ---------------- LOGIN FORM ---------------- */
              <form className="space-y-5">
                <div className="relative">
                  <HiOutlineEnvelope
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-xl border border-gray-200 bg-white/70 py-3 pl-12 pr-4 outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div className="relative">
                  <HiOutlineLockClosed
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full rounded-xl border border-gray-200 bg-white/70 py-3 pl-12 pr-12 outline-none focus:border-blue-500"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <HiOutlineEyeSlash size={20} />
                    ) : (
                      <HiOutlineEye size={20} />
                    )}
                  </button>
                </div>

                <button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-3 font-semibold text-white hover:scale-[1.02] active:scale-95 transition">
                  Login
                </button>

                {/* <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t"></div>
                  </div>

                  <div className="relative text-center">
                    <span className="bg-white px-3 text-sm text-gray-500">
                      OR
                    </span>
                  </div>
                </div>

                <button className="w-full rounded-xl border border-gray-200 py-3 hover:bg-gray-50 transition">
                  Continue with Google
                </button> */}
              </form>
            ) : (
              /* ---------------- SIGNUP FORM ---------------- */
              <form className="space-y-5">
                <div className="relative">
                  <HiOutlineUser
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />

                  <input
                    placeholder="Full Name"
                    className="w-full rounded-xl border border-gray-200 bg-white/70 py-3 pl-12 pr-4 outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="relative">
                  <HiOutlineEnvelope
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-xl border border-gray-200 bg-white/70 py-3 pl-12 pr-4 outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="relative">
                  <HiOutlineLockClosed
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full rounded-xl border border-gray-200 bg-white/70 py-3 pl-12 pr-12 outline-none focus:border-blue-500"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <HiOutlineEyeSlash size={20} />
                    ) : (
                      <HiOutlineEye size={20} />
                    )}
                  </button>
                </div>

                <div className="relative">
                  <HiOutlineLockClosed
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="w-full rounded-xl border border-gray-200 bg-white/70 py-3 pl-12 pr-12 outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-3 font-semibold text-white hover:scale-[1.02] active:scale-95 transition">
                  Create Account
                </button>

                {/* <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t"></div>
                  </div>

                  <div className="relative text-center">
                    <span className="bg-white px-3 text-sm text-gray-500">
                      OR
                    </span>
                  </div>
                </div>

                <button className="w-full rounded-xl border border-gray-200 py-3 hover:bg-gray-50 transition">
                  Continue with Google
                </button> */}
              </form>
            )}
          </div>
        </div>

        {/* Toggle */}

        <div className="mt-6 text-center">
          <button
            onClick={() => setLogin(!login)}
            className="font-medium text-blue-600 hover:underline"
          >
            {login
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
