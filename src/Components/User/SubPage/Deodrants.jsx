import React, { useState, useEffect } from "react";
import { database } from "../../../Firebase";
import { ref, onValue, set, push } from "firebase/database";

const Deodrants = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Check user from localStorage
  const [userId, setUserId] = useState(() => {});

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (isLoggedIn && storedUserId) {
      setUserId(storedUserId);
    } else {
      setUserId(null);
    }

    // Also listen for changes when login/logout happens in Topbar
    const handleStorageChange = () => {
      const storedUserId = localStorage.getItem("userId");

      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (isLoggedIn && storedUserId) {
        setUserId(storedUserId);
      } else {
        setUserId(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const productsRef = ref(database, "products_deodrants");
    const unsubscribeProducts = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      setProducts(data ? Object.values(data) : []);
    });

    return () => unsubscribeProducts();
  }, [userId]);

  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.Heading.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  const handleProductClick = async (product) => {
    if (!userId) {
      // Not logged in → show popup
      window.dispatchEvent(new CustomEvent("openLoginModal"));

      return;
    }

    // Logged in → log click and open link
    try {
      const logRef = push(ref(database, "UserActivityInfo"));
      await set(logRef, {
        userId: userId, // ✅ userId from Firebase login
        productId: product.id || "",
        productName: product.Heading || "",
        category: "Deodrants", // ✅ static or dynamic
        productLink: product.link || "",
        timestamp: new Date().toISOString(),
      });

      if (product.link) window.open(product.link, "_blank");
    } catch (err) {
      console.error("Failed to log product click:", err);
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 20px;
        }
        @media (max-width: 1400px) { .product-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 900px) { .product-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px) { .product-grid { grid-template-columns: 1fr; } }
      `}</style>

      <h2 style={styles.heading}>BUY DEODRANT'S</h2>
      {/* Search */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for Deodrants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div key={index} style={{ position: "relative" }}>
              <div
                onClick={() => handleProductClick(product)}
                style={styles.cardLink}
              >
                <div style={styles.card}>
                  <img
                    src={product.img || "fallback-image.jpg"}
                    alt={product.Heading || "deodrants"}
                    style={styles.cardImage}
                  />
                  <div style={styles.cardText}>
                    <p style={styles.cardTitle}>{product.Heading}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>
            No products found for "{searchTerm}".
          </p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px 20px 40px 20px",
    maxWidth: "1600px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  },
  heading: {
    textAlign: "center",
    fontSize: "28px",
    color: "black",
    fontFamily: "serif",
    background: "linear-gradient(to right, #8B6A2B, #F8E1A1, #C29A4D)",
    width: "20%",
    margin: "0 auto",
  },
  searchContainer: {
    textAlign: "center",
    marginTop: "25px",
  },
  searchInput: {
    padding: "10px",
    width: "90%",
    maxWidth: "400px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #7d0a0a",
  },

  cardLink: { cursor: "pointer" },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    overflow: "hidden",
    transition: "transform 0.2s ease-in-out",
    height: "100%",
    border: "2px solid #D4AF37",
    marginTop: "25px",
  },
  cardImage: { width: "100%", height: "250px", objectFit: "cover" },
  cardText: { padding: "10px", textAlign: "center" },
  cardTitle: {
    margin: 0,
    fontWeight: "bold",
    color: "#7d0a0a",
    fontSize: "16px",
  },
};

export default Deodrants;
