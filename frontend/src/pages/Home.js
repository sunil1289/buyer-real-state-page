import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Home() {
  const navigate = useNavigate();

  const stats = [
    { n: "12,400+", label: "Listings" },
    { n: "3,200+", label: "Happy Buyers" },
    { n: "98%", label: "Satisfaction" },
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <Navbar />

      <main style={{ textAlign: "center", padding: "60px 20px", lineHeight: "1.8" }}>
    
        <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>
          Find a home you'll <span style={{ color: "#f5a623" }}>love</span>
        </h1>
        <p style={{ fontSize: "18px", maxWidth: "500px", margin: "0 auto 40px" }}>
          Explore options at your own pace. No pressure, just the right home for you.
        </p>


        <div style={{ marginBottom: "50px" }}>
          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "12px 24px",
              marginRight: "15px",
              backgroundColor: "#f5a623",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Start Browsing
          </button>
          <button
            onClick={() => navigate("/about")}
            style={{
              padding: "12px 24px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            How it works
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "50px", marginTop: "30px" }}>
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "5px" }}>{s.n}</p>
              <p style={{ fontSize: "16px", color: "#555" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}