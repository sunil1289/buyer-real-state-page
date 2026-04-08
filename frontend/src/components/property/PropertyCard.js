import React from "react";

export default function PropertyCard({ fav, onRemove, onEdit, removing }) {
  const isRemoving = removing === fav._id;

  return (
    <div className="bg-white rounded-xl border border-shaft-100 overflow-hidden flex flex-col">
      <div className="relative h-40 w-full overflow-hidden">
        {fav.property.image ? (
          <img
            src={fav.property.image}
            alt={fav.property.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-shaft-300 text-[13px]">
            No photo
          </div>
        )}
        <button
          onClick={() => onRemove(fav._id)}
          disabled={isRemoving}
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-[12px] disabled:opacity-40"
        >
          {isRemoving ? "Removing…" : "Remove"}
        </button>
      </div>
      <div className="p-3 flex flex-col flex-1">
        <p className="font-semibold text-shaft-900 text-[15px]">
          {fav.property.title}
        </p>
        <p className="text-shaft-400 text-[13px]">{fav.property.location}</p>
        <p className="text-sun-600 font-semibold mt-auto text-[15px]">
          Rs. {Number(fav.property.price).toLocaleString()}
        </p>
        <button
          onClick={() => onEdit(fav)}
          className="mt-2 py-2 text-[13px] border border-shaft-200 rounded text-shaft-600 hover:border-shaft-400 hover:text-shaft-900 transition"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
