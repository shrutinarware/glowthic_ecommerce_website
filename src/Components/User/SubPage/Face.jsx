import React, { useState } from "react";
import { useEffect } from "react";
import FaceMakeup from "../../../assets/MakeupSubpae/FaceSubpage/makeup.jpg";

// Product Images
import Foundation1 from "../../../assets/MakeupSubpae/FaceSubpage/FoundationnMars.jpg";
import Foundation2 from "../../../assets/MakeupSubpae/FaceSubpage/FoundationLakme.jpg";
import Concealer1 from "../../../assets/MakeupSubpae/FaceSubpage/ConcelerSwiss.jpg";
import Primer1 from "../../../assets/MakeupSubpae/FaceSubpage/PrimerMars.jpg";
import Highlighter from "../../../assets/MakeupSubpae/FaceSubpage/HighlighterSwiss.jpg";
import Blush from "../../../assets/MakeupSubpae/FaceSubpage/BlushSwiss.jpg";
import Compact from "../../../assets/MakeupSubpae/FaceSubpage/CompactLakme.jpg";

// Product List (flattened)
const products = [
  { name: "Mars Primer", image: Primer1, link: "https://amzn.in/d/aPv1rJK" },
  {
    name: "Mars Foundation",
    image: Foundation1,
    link: "https://amzn.in/d/gG6Ce32",
  },
  {
    name: "Lakme Foundation",
    image: Foundation2,
    link: "https://amzn.in/d/0MhTzJo",
  },
  {
    name: "Swiss Beauty Concealer",
    image: Concealer1,
    link: "https://amzn.in/d/hFsKoIR",
  },
  {
    name: "Lakme Compact Powder",
    image: Compact,
    link: "https://amzn.in/d/fMoHwS7",
  },

  {
    name: "Swiss Beauty Blush",
    image: Blush,
    link: "https://amzn.in/d/blush1",
  },
  {
    name: "Wet n Wild Highlighter",
    image: Highlighter,
    link: "https://amzn.in/d/hfmarUe",
  },
];

const Face = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount
  }, []);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Inline Responsive Styles */}
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
      `}</style>

      <h2 style={styles.heading}>Buy Face Makeup Products</h2>

      {/* Banner */}
      {/* Banner with Text Overlay */}
      <div style={styles.bannerContainer}>
        <img
          src={FaceMakeup}
          alt="Face Makeup Banner"
          style={styles.bannerImage}
        />
        <div style={styles.bannerText}>
          Discover Top <br />
          Face Makeup Picks
        </div>
      </div>

      {/* Search Bar */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {(searchTerm ? filteredProducts : products).map((product, index) => (
          <a
            key={index}
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.cardLink}
          >
            <div style={styles.card}>
              <img
                src={product.image}
                alt={product.name}
                style={styles.cardImage}
              />
              <div style={styles.cardText}>
                <p style={styles.cardTitle}>{product.name}</p>
              </div>
            </div>
          </a>
        ))}
        {searchTerm && filteredProducts.length === 0 && (
          <p style={{ textAlign: "center", width: "100%" }}>
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "60px 20px 40px 20px", // Replace 10% with fixed units
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
  bannerContainer: {
    position: "relative",
    textAlign: "center",
    marginBottom: "30px",
  },

  bannerImage: {
    width: "100%",
    maxWidth: "1000px",
    height: "500px",
    borderRadius: "10px",
  },
  bannerText: {
    position: "absolute",
    top: "75%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "black",
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "24px",
    fontWeight: "bold",
    fontFamily: "sans-serif",
    maxWidth: "90%",
    zIndex: 1,
  },

  searchContainer: {
    textAlign: "center",
    marginBottom: "30px",
  },
  searchInput: {
    padding: "12px",
    width: "90%",
    maxWidth: "400px",
    fontSize: "clamp(14px, 2vw, 18px)",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },

  cardLink: {
    textDecoration: "none",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    overflow: "hidden",
    transition: "transform 0.2s ease-in-out",
    height: "100%",
    border: "2px solid pink",
  },
  cardImage: {
    width: "100%",
    aspectRatio: "3 / 4", // Maintain 3:4 ratio
    objectFit: "cover",
  },

  cardText: {
    padding: "10px",
    textAlign: "center",
  },
  cardTitle: {
    margin: 0,
    fontWeight: "bold",
    color: "#333",
    fontSize: "16px",
  },
};

export default Face;
