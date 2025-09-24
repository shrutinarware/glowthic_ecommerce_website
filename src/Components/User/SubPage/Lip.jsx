import React, { useState } from "react";
import { useEffect } from "react";
import LipBanner from "../../../assets/MakeupSubpae/LipSubpage/lip2.jpg";

// Import Lip Product Images (Replace these with your actual assets)
import Lipstick from "../../../assets/MakeupSubpae/LipSubpage/LipstickMaybelline.jpg";
import LipGloss from "../../../assets/MakeupSubpae/LipSubpage/LipGlossSwiss.jpg";
import LipBalm from "../../../assets/MakeupSubpae/LipSubpage/LipbalmNivea.jpg";
import LipLiner from "../../../assets/MakeupSubpae/LipSubpage/LiplinerLakme.jpg";
import LiquidLipstick from "../../../assets/MakeupSubpae/LipSubpage/LipstickSugar.jpg";
import LipCrayon from "../../../assets/MakeupSubpae/LipSubpage/LipcrayonInsight.jpg";

// Lips Products List
const products = [
  {
    name: "Maybelline Lipstick",
    image: Lipstick,
    link: "https://amzn.in/d/co3PWRi",
  },
  {
    name: "Swiss Beauty Lip Gloss",
    image: LipGloss,
    link: "https://amzn.in/d/gkD0WrL",
  },
  { name: "Nivea Lip Balm", image: LipBalm, link: "https://amzn.in/d/goizJxx" },
  {
    name: "Lakme Lip Liner",
    image: LipLiner,
    link: "https://amzn.in/d/7MQrebG",
  },
  {
    name: "Sugar Liquid Lipstick",
    image: LiquidLipstick,
    link: "https://amzn.in/d/9h9thJd",
  },
  {
    name: "Insight Lip Crayon",
    image: LipCrayon,
    link: "https://amzn.in/d/2Px2CFD",
  },
];

const Lips = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount
  }, []);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Inline CSS for responsive grid */}
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

      <h2 style={styles.heading}>Buy Lip Makeup Products</h2>

      {/* Banner */}
      {/* Banner with Text Overlay */}
      <div style={styles.bannerContainer}>
        <img
          src={LipBanner}
          alt="Lips Makeup Banner"
          style={styles.bannerImage}
        />
        <div style={styles.bannerText}>
          Pout Perfection, <br />
          Shop Lip Essentials
        </div>
      </div>

      {/* Search Input */}
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

// Styles (Same as Face.js)
const styles = {
  container: {
    padding: "60px 20px 40px 20px",
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
    color: "Black",
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
    padding: "10px",
    width: "90%",
    maxWidth: "400px",
    fontSize: "16px",
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
    height: "250px",
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

export default Lips;
