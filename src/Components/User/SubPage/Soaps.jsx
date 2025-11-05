import React, { useState, useEffect } from "react";
import { database } from "../../../Firebase";
import { ref, onValue, set, push } from "firebase/database";

const Soaps = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoginPopupVisible, setIsLoginPopupVisible] = useState(false);

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
    const productsRef = ref(database, "products_soap");
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProducts(Object.values(data));
      } else {
        setProducts([]);
      }
    });
    return () => unsubscribe();
  }, [userId]);

  const filteredProducts = products.filter((product) =>
    product.Heading?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const productsToShow = searchTerm ? filteredProducts : products;
  const handleProductClick = async (product) => {
    if (!userId) {
      // Not logged in → show popup
      setIsLoginPopupVisible(true);
      return;
    }

    // Logged in → log click and open link
    try {
      const logRef = push(ref(database, "UserActivityInfo"));
      await set(logRef, {
        userId: userId, // ✅ userId from Firebase login
        productId: product.id || "",
        productName: product.Heading || "",
        category: "Soaps", // ✅ static or dynamic
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
        @media (max-width: 1400px) {
          .product-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (max-width: 900px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 500px) {
          .product-grid {
            grid-template-columns: 1fr;
          }
        }
        .card:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(214, 51, 132, 0.4);
          border-color: #d63384;
        }
      `}</style>

      <h2 style={styles.heading}>Buy Soaps Online</h2>

      {/* Search */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for soap..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
          aria-label="Search soaps"
        />
      </div>

      <div className="product-grid">
        {productsToShow.length > 0 ? (
          productsToShow.map((product, index) => (
            <div key={index} style={{ position: "relative" }}>
              <div
                onClick={() => handleProductClick(product)}
                style={styles.cardLink}
              >
                <div style={styles.card}>
                  <img
                    src={product.img || "fallback-image.jpg"}
                    alt={product.Heading || "Soaps"}
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
            No products found "{searchTerm}".
          </p>
        )}
      </div>
      <style>{`
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }

  .popup-box {
    background: white;
    padding: 25px 30px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    max-width: 300px;
    width: 90%;
  }

  .popup-box h3 {
    margin-bottom: 15px;
    color: #d63384;
  }

  .popup-box button {
    background: #d63384;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
  }

  .popup-box button:hover {
    background: #b2276a;
  }
`}</style>

      {isLoginPopupVisible && (
        <div
          className="popup-overlay"
          onClick={() => setIsLoginPopupVisible(false)}
        >
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsLoginPopupVisible(false)}
              style={{
                position: "absolute",
                top: "8px",
                right: "10px",
                border: "none",
                background: "transparent",
                fontSize: "18px",
                cursor: "pointer",
                color: "#d63384",
              }}
            >
              ✕
            </button>

            <h3>Please login first to see product details</h3>
            <a href="/user-login" style={{ color: "#d63384" }}>
              <button style={{ borderRadius: "20%", background: "#d63384" }}>
                Login
              </button>
            </a>
          </div>
        </div>
      )}
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
    marginBottom: "20px",
    color: "#D63384",
    fontFamily: "sans-serif",
  },

  searchContainer: {
    textAlign: "center",
    marginBottom: "30px",
  },
  searchInput: {
    padding: "10px",
    width: "90%",
    maxWidth: "400px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #D63384",
  },
  cardLink: {
    textDecoration: "none",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    height: "100%",
    border: "2px solid pink",
    display: "flex",
    flexDirection: "column",
  },
  cardImage: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
  },
  cardText: {
    padding: "10px",
    textAlign: "center",
    flexGrow: 1,
  },
  cardTitle: {
    margin: 0,
    fontWeight: "bold",
    color: "#333",
    fontSize: "16px",
  },
};

export default Soaps;
