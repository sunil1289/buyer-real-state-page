import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FieldError from "../components/ui/FieldError";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // assword validation
  const validatePassword = (pwd) => {
    if (!pwd) return "Password is required.";
    const hasUpper = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[!@#$%^&*]/.test(pwd);
    if (!hasUpper || !hasNumber || !hasSpecial)
      return "Password must include uppercase, number, and special character.";
    if (pwd.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  // Confirm password validation
  const validateConfirm = (pwd, confirm) => {
    if (!confirm) return "Confirm password is required.";
    if (pwd !== confirm) return "Passwords do not match.";
    return "";
  };

  const touch = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    touch(field);
  };

  const handleSubmit = async () => {
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });
    setError("");

    const nameError = !form.name.trim() ? "Name is required." : "";
    const emailError = !form.email.trim()
      ? "Email is required."
      : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        ? ""
        : "Enter a valid email address.";
    const passwordError = validatePassword(form.password);
    const confirmError = validateConfirm(form.password, form.confirmPassword);

    if (nameError || emailError || passwordError || confirmError) {
      setError("Invalid.");
      return;
    }

    setLoading(true);
    try {
      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      navigate("/login", {
        state: { success: "Account created! Please login." },
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong — try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen bg-shaft-50 flex flex-col">
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-[400px] animate-fadeUp">
          <div className="mb-7">
            <h2 className="text-[24px] font-semibold text-shaft-900 mb-1">
              Create an account
            </h2>
            <p className="text-shaft-400 text-[13.5px]">
              It's free and takes less than a minute.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-[13px] text-shaft-600 mb-1.5">
                  Full name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => touch("name")}
                  onKeyDown={onKey}
                  className={`w-full border rounded-lg px-3.5 py-2.5 text-[14px] text-shaft-900 outline-none focus:ring-2 focus:ring-sun-200 focus:border-sun-400 transition ${touched.name && !form.name.trim() ? "border-red-400" : "border-shaft-200"}`}
                  autoFocus
                />
                {touched.name && !form.name.trim() && (
                  <FieldError message="Name is required." />
                )}
              </div>

      
              <div>
                <label className="block text-[13px] text-shaft-600 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => touch("email")}
                  onKeyDown={onKey}
                  className={`w-full border rounded-lg px-3.5 py-2.5 text-[14px] text-shaft-900 outline-none focus:ring-2 focus:ring-sun-200 focus:border-sun-400 transition ${touched.email && (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) ? "border-red-400" : "border-shaft-200"}`}
                />
                {touched.email &&
                  (!form.email.trim() ||
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) && (
                    <FieldError
                      message={
                        !form.email.trim()
                          ? "Email is required."
                          : "Enter a valid email address."
                      }
                    />
                  )}
              </div>

  
              <div className="relative">
                <label className="block text-[13px] text-shaft-600 mb-1.5">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  onBlur={() => touch("password")}
                  onKeyDown={onKey}
                  className={`w-full border rounded-lg px-3.5 py-2.5 text-[14px] text-shaft-900 outline-none focus:ring-2 focus:ring-sun-200 focus:border-sun-400 transition ${touched.password && validatePassword(form.password) ? "border-red-400" : "border-shaft-200"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute top-2.5 right-3 text-shaft-400 hover:text-shaft-700"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
                {touched.password && validatePassword(form.password) && (
                  <FieldError message={validatePassword(form.password)} />
                )}
              </div>

              <div className="relative">
                <label className="block text-[13px] text-shaft-600 mb-1.5">
                  Confirm Password
                </label>
                <input
                  type={showConfirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  onBlur={() => touch("confirmPassword")}
                  onKeyDown={onKey}
                  className={`w-full border rounded-lg px-3.5 py-2.5 text-[14px] text-shaft-900 outline-none focus:ring-2 focus:ring-sun-200 focus:border-sun-400 transition ${touched.confirmPassword && validateConfirm(form.password, form.confirmPassword) ? "border-red-400" : "border-shaft-200"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((p) => !p)}
                  className="absolute top-2.5 right-3 text-shaft-400 hover:text-shaft-700"
                >
                  {showConfirm ? <FaEye /> : <FaEyeSlash />}
                </button>
                {touched.confirmPassword &&
                  validateConfirm(form.password, form.confirmPassword) && (
                    <FieldError
                      message={validateConfirm(
                        form.password,
                        form.confirmPassword,
                      )}
                    />
                  )}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-6 py-3 bg-sun-500 text-white rounded-lg text-[14.5px] font-medium hover:bg-sun-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "One moment..." : "Create account"}
            </button>

            {error && (
              <p className="flex items-center gap-1.5 text-[12.5px] text-red-500 mt-4 animate-fadeUp">
                <span>⚠</span>
                <span>{error}</span>
              </p>
            )}
          </div>

          <p className="text-center mt-5 text-[13px] text-shaft-400">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-sun-600 font-medium hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
