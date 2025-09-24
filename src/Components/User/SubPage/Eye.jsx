import React, { useState } from "react";
import { useEffect } from "react";
import EyeMakeup from "../../../assets/MakeupSubpae/EyeSubpage/eyeM.jpg";

// Import Eye Product Images (Replace with your real assets)
import Mascara from "../../../assets/MakeupSubpae/EyeSubpage/MascaraMaybelline.webp";
import Eyeliner from "../../../assets/MakeupSubpae/EyeSubpage/Eyelinerlakme.webp";
import Kajal from "../../../assets/MakeupSubpae/EyeSubpage/Kajalelle18.jpg";
import Eyeshadow from "../../../assets/MakeupSubpae/EyeSubpage/EyeSSwiss.jpg";
import BrowPencil from "../../../assets/MakeupSubpae/EyeSubpage/EyeBinsight.jpg";

// Sample Eye Products
const products = [
  {
    name: "Maybelline Mascara",
    image: Mascara,
    link: "https://amzn.in/d/fDzwAKJ",
  },
  {
    name: "Lakme Eyeliner",
    image: Eyeliner,
    link: "https://amzn.in/d/7tkifTB",
  },
  { name: "Colossal Kajal", image: Kajal, link: "https://amzn.in/d/iEz6DZH" },
  {
    name: "Swiss Beauty Eyeshadow",
    image: Eyeshadow,
    link: "https://amzn.in/d/6EU0GPQ",
  },
  {
    name: "Insight Brow Pencil",
    image: BrowPencil,
    link: "https://amzn.in/d/9AJVF7b",
  },
];

const Eyes = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount
  }, []);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Responsive Grid CSS */}
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

      <h2 style={styles.heading}>Buy Eye Makeup Products</h2>

      {/* Banner */}
      {/* Banner with Text Overlay */}
      <div style={styles.bannerContainer}>
        <img
          src={EyeMakeup}
          alt="Eye Makeup Banner"
          style={styles.bannerImage}
        />
        <div style={styles.bannerText}>
          Enhance Your Look
          <br /> with Eye Makeup
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

// Styles (reused from Face.js)
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

export default Eyes;
