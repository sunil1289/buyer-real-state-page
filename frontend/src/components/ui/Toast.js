import React from "react";

export default function Toast({ message, type }) {
  if (!message) return null;
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl
        text-[13.5px] shadow-lg animate-fadeUp
        ${
          type === "error"
            ? "bg-red-50 border border-red-200 text-red-600"
            : "bg-green-50 border border-sun-400  text-sun-600"
        }`}
    >
      <span>{type === "error" ? "⚠" : "✓"}</span>
      <span>{message}</span>
    </div>
  );
}
