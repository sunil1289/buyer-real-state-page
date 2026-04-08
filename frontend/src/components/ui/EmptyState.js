import React from 'react';

export default function EmptyState({ title, description, icon }) {
  return (
    <div className="bg-white border border-dashed border-shaft-200 rounded-xl py-16 text-center animate-fadeUp">
      <h4 className="text-[17px] font-semibold text-shaft-700 mb-1">{title}</h4>
      <p className="text-shaft-400 text-[13.5px]">{description}</p>
    </div>
  );
}