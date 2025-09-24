import React, { useState,useEffect } from "react";
import ShampooBanner from "../../../assets/HairSubpage/HSubpage/shampoo.jpg"; // Replace with your shampoo banner

// Shampoo Product Images
import Shampoo1 from "../../../assets/HairSubpage/HSubpage/ShampooDove.jpg";
import Shampoo2 from "../../../assets/HairSubpage/HSubpage/ShampooHS.jpg";
import Shampoo3 from "../../../assets/HairSubpage/HSubpage/ShampooPathene.jpg";
import Shampoo4 from "../../../assets/HairSubpage/HSubpage/ShampooTresemme.jpg";

// Product List
const products = [
  {
    name: "Dove Intense Repair Shampoo",
    image: Shampoo1,
    link: "https://amzn.in/d/2x8SIKx", // Replace with actual Amazon/product link
  },
  {
    name: "Head & Shoulders Anti-Dandruff",
    image: Shampoo2,
    link: "https://amzn.in/d/3SLa4WF",
  },
  {
    name: "Pantene Advanced Hair Fall Solution",
    image: Shampoo3,
    link: "https://amzn.in/d/bO7XImI",
  },
  {
    name: "Tresemme Keratin Smooth",
    image: Shampoo4,
    link: "https://amzn.in/d/4GDk52K",
  },
];

const Shampoo = () => {
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

      <h2 style={styles.heading}>Buy Shampoos Online</h2>

      {/* Banner */}
      <div style={styles.bannerContainer}>
        <img
          src={ShampooBanner}
          alt="Shampoo Banner"
          style={styles.bannerImage}
        />
        <div style={styles.bannerText}>
          Cleanse, Nourish & Shine <br /> with the Best Shampoos
        </div>
      </div>

      {/* Search */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for a shampoo..."
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
            No shampoos found.
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

export default Shampoo;
