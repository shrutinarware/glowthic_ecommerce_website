import React, { useState,useEffect } from "react";
import MoisturizerBanner from "../../../assets/SkinSubpage/body.jpg"; // Replace with actual banner image

// Moisturizer Product Images
import Ponds from "../../../assets/SkinSubpage/MoisturizerSubpage/MoisturizerPonds.jpg";
import Nivea from "../../../assets/SkinSubpage/MoisturizerSubpage/MoisturizerNivea.jpg";
import Cetaphil from "../../../assets/SkinSubpage/MoisturizerSubpage/MoisturizerCetaphil.jpg";
import Himalaya from "../../../assets/SkinSubpage/MoisturizerSubpage/MoisturizerHimalay.jpg";
import Neutrogena from "../../../assets/SkinSubpage/MoisturizerSubpage/MoisturizerNeutrogena.jpg";

// Product List
const products = [
  {
    name: "Pond's Light Moisturizer",
    image: Ponds,
    link: "https://amzn.in/d/dFfOhbA",
  },
  {
    name: "Nivea Soft Cream",
    image: Nivea,
    link: "https://amzn.in/d/aC7hoU3",
  },
  {
    name: "Cetaphil Moisturizing Cream",
    image: Cetaphil,
    link: "https://amzn.in/d/jbQqkzB",
  },
  {
    name: "Himalaya Nourishing Cream",
    image: Himalaya,
    link: "https://amzn.in/d/cPxXI1u",
  },
  {
    name: "Neutrogena Hydro Boost",
    image: Neutrogena,
    link: "https://amzn.in/d/59yukJe",
  },
];

const Moisturizers = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount
  }, []);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      `}</style>

      <h2 style={styles.heading}>Buy Moisturizers Online</h2>

      {/* Banner */}
      <div style={styles.bannerContainer}>
        <img
          src={MoisturizerBanner}
          alt="Moisturizer Banner"
          style={styles.bannerImage}
        />
        <div style={styles.bannerText}>
          Hydrate Your Skin <br /> with Top Moisturizers
        </div>
      </div>

      {/* Search */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for a moisturizer..."
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
            No moisturizers found.
          </p>
        )}
      </div>
    </div>
  );
};

// Styles (same as before)
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
    top: "80%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "black",
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "24px",
    fontWeight: "bold",
    fontFamily: "sans-serif",
    maxWidth: "90%",
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

export default Moisturizers;
