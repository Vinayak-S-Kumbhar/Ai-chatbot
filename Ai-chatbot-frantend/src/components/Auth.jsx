import { useState } from "react";
import {
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiOutlineEye,
  HiOutlineEyeSlash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Auth() {
  const [login, setLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const initializeValue = (key, vale) => {
    setUserData((prev) => ({ ...prev, [key]: vale }));
  };

  const loginfun = async (e) => {
    e.preventDefault();

    try {
      const responce = await fetch("http://localhost:8080/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
      });
      const data = await responce.json();

      if (!responce.ok) {
        toast.error(data.message || "login fiald");
        return;
      }

      cookieStore.set("userId", data.id);
      cookieStore.set("accessToken", data.secretKey);
      navigate("/");
    } catch (error) {
      toast.error(error.message || "someting went wrong");
    }
  };

  const signUpfun = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPass) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/Auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          password: userData.password,
        }),
      });

      const text = await response.text();

      // Convert JSON string into JavaScript object
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (!response.ok) {
        toast.error(data.message || "Signup failed");
        return;
      }

      toast.success(data.message || "Signup successful");
      setLogin(true);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

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
                    value={userData.email}
                    onChange={(e) => {
                      console.log(e);
                      initializeValue("email", e.target.value);
                    }}
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
                    value={userData.password}
                    onChange={(e) =>
                      initializeValue("password", e.target.value)
                    }
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

                <button
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-3 font-semibold text-white hover:scale-[1.02] active:scale-95 transition"
                  onClick={(e) => loginfun(e)}
                >
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
                    onChange={(e) =>
                      initializeValue("username", e.target.value)
                    }
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
                    onChange={(e) => initializeValue("email", e.target.value)}
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
                    onChange={(e) =>
                      initializeValue("password", e.target.value)
                    }
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
                    type={showConfPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="w-full rounded-xl border border-gray-200 bg-white/70 py-3 pl-12 pr-12 outline-none focus:border-blue-500"
                    required
                    onChange={(e) =>
                      initializeValue("confirmPass", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfPassword(!showConfPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfPassword ? (
                      <HiOutlineEyeSlash size={20} />
                    ) : (
                      <HiOutlineEye size={20} />
                    )}
                  </button>
                </div>

                <button
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-3 font-semibold text-white hover:scale-[1.02] active:scale-95 transition"
                  onClick={(e) => signUpfun(e)}
                >
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
