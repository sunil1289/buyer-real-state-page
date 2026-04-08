import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();


  const user = JSON.parse(localStorage.getItem("user"));


  const initials = user?.name
    ? user.name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : "?";


  const handleButtonClick = () => {
    if (user) {
 
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/home");
    } else {
 
      if (location.pathname === "/") {
        navigate("/login");
      } else {
        navigate("/home");
      }
    }
  };


  const buttonText = user
    ? "Logout"
    : location.pathname === "/"
      ? "Login"
      : "Home";

  return (
    <nav className="bg-shaft-900 h-16 px-6 md:px-10 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2.5">
        <img src="/icons/agreement.svg" alt="EstateHub" className="w-7 h-7" />
        <span className="text-[18px] text-white font-semibold tracking-wide">
          EstateHub
        </span>
      </div>


      <div className="flex items-center gap-3 md:gap-5">
        {user && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-sun-500 flex items-center justify-center text-[12px] font-semibold text-white">
              {initials}
            </div>
            <div className="hidden md:block">
              <p className="text-[13px] font-medium text-white leading-tight">
                {user.name}
              </p>
              <p className="text-[11px] text-shaft-400 leading-tight capitalize">
                {user.role}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={handleButtonClick}
          className="px-2 py-1 text-sm rounded-md bg-sun-500 text-white hover:bg-sun-400 transition-all"
        >
          {buttonText}
        </button>
      </div>
    </nav>
  );
}
