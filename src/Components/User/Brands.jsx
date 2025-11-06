import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ref, push, set, onValue } from "firebase/database";
import { database } from "../../Firebase";
import UserLogin from "./UserLogin";

const Brands = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [firebaseBrands, setFirebaseBrands] = useState([]);

  // 🔹 Load from Firebase
  useEffect(() => {
    const brandsRef = ref(database, "brands");
    onValue(brandsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list = Object.values(data);
        setFirebaseBrands(list);
      } else {
        setFirebaseBrands([]);
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (location.hash === "#brandsyoulove") {
      setTimeout(() => {
        const element = document.getElementById("brandsyoulove");
        if (element) {
          const yOffset = -100;
          const y =
            element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  const sortedBrands = [...firebaseBrands]
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((brand) =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const getUserEmail = () => {
    return localStorage.getItem("email") || "Guest";
  };

  const handleProductClick = async (product) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userId = localStorage.getItem("userId");

    try {
      const logRef = push(ref(database, "UserProductInfo"));
      await set(logRef, {
        email: getUserEmail(),

        productId: product.id,
        productName: product.name || "",
        category: product.category || "brand",
        productLink: product.link || "",
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      });
      console.log("Logged click:", product.name, product.link);
    } catch (err) {
      console.error("Failed to log product click:", err);
    }
    if (!isLoggedIn || !userId) {
      setShowLogin(true);
      localStorage.setItem("redirectAfterLogin", product.link || "");
      return;
    }

    if (product.link) {
      window.open(product.link, "_blank");
    }
  };

  return (
    <div
      style={{
        padding: "40px 40px",
        fontFamily: "'Segoe UI', sans-serif",
        background: "#fcf6f2",
        minHeight: "100vh",
        marginTop: "-30px",
      }}
    >
      {/* Header */}
      <h1
        id="brandsyoulove"
        style={{
          textAlign: "center",
          fontSize: "38px",
          color: "#D63384",
          fontFamily: "cursive",
          marginBottom: "10px",
          marginTop: "-10px",
        }}
      >
        Brands You Love
      </h1>
      <p
        style={{
          textAlign: "center",
          fontSize: "18px",
          color: "#444",
          marginBottom: "30px",
        }}
      >
        Explore your favorite beauty and skincare brands
      </p>
      {/* Search Input */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "40px",
        }}
      >
        <input
          type="text"
          placeholder="Search brand..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            height: "45px",
            width: "350px",
            border: "1px solid #D63384",
            borderRadius: "10px",
            padding: "0 15px",
            fontSize: "16px",
            background: "#fffaf7",
          }}
        />
      </div>
      {/* Brands Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "25px",
          padding: "0 10px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {sortedBrands.length > 0 ? (
          sortedBrands.map((brand) => (
            <div
              key={brand.id}
              style={{
                textAlign: "center",
                background: "#fff",
                border: "2px solid #D63384",
                borderRadius: "12px",
                padding: "15px 10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 15px rgba(212, 175, 55, 0.6)";
                e.currentTarget.style.borderColor = "#D4AF37"; // gold
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.05)";
                e.currentTarget.style.borderColor = "#D63384"; // back to pink
              }}
            >
              <a
                href={brand.link || "#"}
                onClick={(e) => {
                  e.preventDefault();
                  handleProductClick({
                    name: brand.name,
                    id: brand.id,
                    link: brand.link,
                    category: "brand",
                  });
                }}
                style={{
                  textDecoration: "none",
                  color: "#D63384",
                  fontWeight: "500",
                  fontSize: "18px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {brand.img && (
                  <img
                    src={brand.img}
                    alt={brand.name}
                    style={{
                      width: "75px",
                      height: "65px",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                )}
                {brand.name}
              </a>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            No matching brands found.
          </p>
        )}
      </div>
      {/* Login Modal */}
      {showLogin && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "12px",
              width: "90%",
              maxWidth: "400px",
            }}
          >
            <UserLogin
              onClose={() => setShowLogin(false)}
              onLoginSuccess={() => {
                setShowLogin(false);
                const redirectLink = localStorage.getItem("redirectAfterLogin");
                if (redirectLink) {
                  window.open(redirectLink, "_blank");
                  localStorage.removeItem("redirectAfterLogin");
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Brands;
