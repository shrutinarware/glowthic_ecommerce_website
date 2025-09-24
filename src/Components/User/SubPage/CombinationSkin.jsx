import React, { useState,useEffect } from "react";

// Product Images
import Combination1 from "../../../assets/SkinTypes/CombinationCetaphil.jpg";
import Combination2 from "../../../assets/SkinTypes/CombinationSimple.jpg";

// Product List
const products = [
  {
    name: "Cetaphil Gentle Skin Cleanser",
    image: Combination1,
    link: "https://amzn.in/d/gvzsRg9", // Replace with actual link
  },
  {
    name: "Simple Hydrating Light Moisturizer",
    image: Combination2,
    link: "https://amzn.in/d/1NhSqiO", // Replace with actual link
  },
];

const CombinationSkin = () => {
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

      <h2 style={styles.heading}>Buy Skincare Products for Combination Skin</h2>

      {/* Search */}
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

export default CombinationSkin;
