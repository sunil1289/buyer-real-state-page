import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { LoginValidator } from "../validation/loginValidator";
import FieldError from "../components/ui/FieldError";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailError = touched.email ? LoginValidator.validateEmail(email) : "";
  const passwordError = touched.password
    ? LoginValidator.validatePasswordBasic(password)
    : "";

  const touch = (field) => setTouched((p) => ({ ...p, [field]: true }));

  const handleSubmit = async () => {
    setError("");
    setTouched({ email: true, password: true });
    if (LoginValidator.validateLogin({ email, password })) return;
    setLoading(true);
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong — try again.");
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => { if (e.key === "Enter") handleSubmit(); };

  return (
    <div className="min-h-screen bg-shaft-50 flex flex-col">
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-[400px] animate-fadeUp">
          <div className="mb-7">
            <h2 className="text-[24px] font-semibold text-shaft-900 mb-1">
              Welcome back
            </h2>
            <p className="text-shaft-400 text-[13.5px]">
              Please enter your details.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="space-y-5">
              <div>
                <label className="block text-[13px] text-shaft-600 mb-1.5">
                  Email
                </label>
                <input
                  className={`w-full border rounded-lg px-3.5 py-2.5 text-[14px] text-shaft-900 outline-none focus:ring-2 focus:ring-sun-200 focus:border-sun-400 transition ${emailError ? "border-red-400" : "border-shaft-200"}`}
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); touch("email"); }}
                  onBlur={() => touch("email")}
                  onKeyDown={onKey}
                  autoFocus
                />
                <FieldError message={emailError} />
              </div>
              <div>
                <label className="block text-[13px] text-shaft-600 mb-1.5">
                  Password
                </label>
                <input
                  className={`w-full border rounded-lg px-3.5 py-2.5 text-[14px] text-shaft-900 outline-none focus:ring-2 focus:ring-sun-200 focus:border-sun-400 transition ${passwordError ? "border-red-400" : "border-shaft-200"}`}
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); touch("password"); }}
                  onBlur={() => touch("password")}
                  onKeyDown={onKey}
                />
                <FieldError message={passwordError} />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-6 py-3 bg-sun-500 text-white rounded-lg text-[14.5px] font-medium hover:bg-sun-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "One moment..." : "Login"}
            </button>

            {error && (
              <p className="flex items-center gap-1.5 text-[12.5px] text-red-500 mt-4 animate-fadeUp">
                <span>⚠</span><span>{error}</span>
              </p>
            )}
          </div>

          <p className="text-center mt-5 text-[13px] text-shaft-400">
            New here?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-sun-600 font-medium hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}