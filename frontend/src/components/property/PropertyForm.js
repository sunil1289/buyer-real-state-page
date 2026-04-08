import React, { useState, useRef } from "react";

export default function PropertyForm({
  initial = {},
  onSubmit,
  onCancel,
  loading,
}) {
  const [form, setForm] = useState({
    title: initial.title || "",
    location: initial.location || "",
    price: initial.price || "",
    image: initial.image || "",
  });
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(initial.image || "");
  const fileRef = useRef();

  const setField = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((p) => ({ ...p, image: "Please select an image file" }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((p) => ({ ...p, image: "Image too large (max 5MB)" }));
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm((p) => ({ ...p, image: ev.target.result }));
      setPreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setForm((p) => ({ ...p, image: "" }));
    setPreview("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Property name is required";
    if (!form.location.trim()) e.location = "Location is required";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      e.price = "Enter a valid price";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    onSubmit({ ...form, price: Number(form.price) });
  };

  return (
    <div className="bg-white rounded-xl border border-shaft-100 p-5 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[13px] text-shaft-600 mb-1">
            Property Name
          </label>
          <input
            value={form.title}
            onChange={setField("title")}
            className={`w-full px-3 py-2 text-[14px] rounded border focus:ring-2 focus:ring-sun-200 ${
              errors.title ? "border-red-400" : "border-shaft-200"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-[12px] mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-[13px] text-shaft-600 mb-1">
            Location
          </label>
          <input
            value={form.location}
            onChange={setField("location")}
            className={`w-full px-3 py-2 text-[14px] rounded border focus:ring-2 focus:ring-sun-200 ${
              errors.location ? "border-red-400" : "border-shaft-200"
            }`}
          />
          {errors.location && (
            <p className="text-red-500 text-[12px] mt-1">{errors.location}</p>
          )}
        </div>

        <div>
          <label className="block text-[13px] text-shaft-600 mb-1">
            Price (Rs.)
          </label>
          <input
            value={form.price}
            type="number"
            onChange={setField("price")}
            className={`w-full px-3 py-2 text-[14px] rounded border focus:ring-2 focus:ring-sun-200 ${
              errors.price ? "border-red-400" : "border-shaft-200"
            }`}
          />
          {errors.price && (
            <p className="text-red-500 text-[12px] mt-1">{errors.price}</p>
          )}
        </div>

        <div>
          <label className="block text-[13px] text-shaft-600 mb-1">Photo</label>
          {preview ? (
            <div className="relative w-full h-32 border border-shaft-200 rounded overflow-hidden">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                onClick={removeImage}
                className="absolute top-1 right-1 bg-red-500 text-white text-[12px] px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileRef.current?.click()}
              className="w-full h-32 border-2 border-dashed border-shaft-200 rounded flex flex-col items-center justify-center text-shaft-400 hover:border-sun-400 hover:text-sun-500"
            >
              Click to upload
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {errors.image && (
            <p className="text-red-500 text-[12px] mt-1">{errors.image}</p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-5 py-2 bg-sun-500 text-white rounded hover:bg-sun-600 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save property"}
        </button>
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-5 py-2 border border-shaft-200 rounded text-shaft-600 hover:border-shaft-400"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
