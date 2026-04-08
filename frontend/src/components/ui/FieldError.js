import React from 'react';

export default function FieldError({ message }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1.5 text-[12px] text-red-500 mt-1.5 animate-fadeUp">
      <span>⚠</span>
      <span>{message}</span>
    </p>
  );
}