import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PropertyCard from "../components/property/PropertyCard";
import PropertyForm from "../components/property/PropertyForm";
import EmptyState from "../components/ui/EmptyState";
import { AiOutlineHome } from "react-icons/ai";
import Toast from "../components/ui/Toast";
import {
  getFavourites,
  addFavourite,
  updateFavourite,
  removeFavourite,
} from "../api/favouritesApi";

export default function Dashboard() {
  // Get loggin user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const [favourites, setFavourites] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const firstName = user?.name?.split(" ")[0] || "there";

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "success" }), 3500);
  };

  // Fetch fav from backend
  const fetchFavourites = useCallback(async () => {
    setFetchLoading(true);
    try {
      const res = await getFavourites();
      setFavourites(res.data);
    } catch (err) {
      showToast("Couldn't load your saved properties.", "error");
    } finally {
      setFetchLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavourites();
  }, [fetchFavourites]);

  const handleAdd = async (data) => {
    setAddLoading(true);
    try {
      await addFavourite(data);
      showToast("Property saved to your list.");
      setShowAddForm(false);
      fetchFavourites();
    } catch (err) {
      showToast(
        err.response?.data?.message || "Couldn't save property.",
        "error",
      );
    } finally {
      setAddLoading(false);
    }
  };

  const handleEdit = async (data) => {
    if (!editTarget) return;
    setEditLoading(true);
    try {
      await updateFavourite(editTarget._id, data);
      showToast("Property updated.");
      setEditTarget(null);
      fetchFavourites();
    } catch (err) {
      showToast(
        err.response?.data?.message || "Couldn't update property.",
        "error",
      );
    } finally {
      setEditLoading(false);
    }
  };

  const handleRemove = async (id) => {
    setRemovingId(id);
    try {
      await removeFavourite(id);
      setFavourites((prev) => prev.filter((f) => f._id !== id));
      showToast("Removed from favourites.");
    } catch {
      showToast("Couldn't remove property.", "error");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-shaft-50">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-5 md:px-8 py-10 space-y-8">
        {/*     
 Favourites header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-[17px] font-semibold text-shaft-900">
              My Favourites
            </h3>
            <span className="bg-shaft-100 text-shaft-500 text-[12px] font-medium px-2 py-0.5 rounded-full">
              {favourites.length}
            </span>
          </div>
          <button
            onClick={() => {
              setShowAddForm((v) => !v);
              setEditTarget(null);
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-sun-500 text-white rounded-lg text-[13.5px] font-medium hover:bg-sun-600 transition"
          >
            <span className="text-[16px] leading-none">+</span>
            Add property
          </button>
        </div>

        {showAddForm && (
          <PropertyForm
            onSubmit={handleAdd}
            onCancel={() => setShowAddForm(false)}
            loading={addLoading}
          />
        )}

        {editTarget && (
          <PropertyForm
            initial={editTarget.property}
            onSubmit={handleEdit}
            onCancel={() => setEditTarget(null)}
            loading={editLoading}
          />
        )}

        {fetchLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-shaft-100 h-64 animate-pulse"
              />
            ))}
          </div>
        ) : favourites.length === 0 ? (
          <EmptyState
            icon={
              <div className="flex justify-center mb-3">
                <AiOutlineHome className="text-4xl text-shaft-300" />
              </div>
            }
            title="No properties saved"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {favourites.map((fav) => (
              <PropertyCard
                key={fav._id}
                fav={fav}
                onRemove={handleRemove}
                onEdit={(f) => {
                  setEditTarget(f);
                  setShowAddForm(false);
                  window.scrollTo({ top: 300, behavior: "smooth" });
                }}
                removing={removingId}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
      <Toast message={toast.message} type={toast.type} />
    </div>
  );
}
