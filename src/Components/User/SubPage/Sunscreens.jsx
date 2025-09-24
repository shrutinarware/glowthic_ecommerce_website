import React, { useState, useEffect } from "react";
import SunscreenBanner from "../../../assets/SkinSubpage/body.jpg"; // Replace with actual banner if needed

// Sunscreen Product Images (replace with your real paths if different)
import Sunscreen1 from "../../../assets/SkinSubpage/SunscreenSubpage/SSLakme.jpg";
import Sunscreen2 from "../../../assets/SkinSubpage/SunscreenSubpage/SSLotus.jpg";
import Sunscreen3 from "../../../assets/SkinSubpage/SunscreenSubpage/SSMAMA.jpg";
import Sunscreen4 from "../../../assets/SkinSubpage/SunscreenSubpage/SSNeutrogen.jpg";
import Sunscreen5 from "../../../assets/SkinSubpage/SunscreenSubpage/SSWOW.jpg";
import Sunscreen6 from "../../../assets/SkinSubpage/SunscreenSubpage/SSAqua.jpg";

// Product List
const products = [
  {
    name: "Lakmé Sun Expert SPF 50",
    image: Sunscreen1,
    link: "Lakmé Sun Expert SPF 50", // Replace with actual link
  },
  {
    name: "Lotus Herbals Safe Sun",
    image: Sunscreen2,
    link: "https://amzn.in/d/fFNPwyz",
  },
  {
    name: "Mamaearth Ultra Light Indian Sunscreen",
    image: Sunscreen3,
    link: "https://amzn.in/d/eIWf3tS",
  },
  {
    name: "Neutrogena Ultra Sheer SPF 50",
    image: Sunscreen4,
    link: "https://amzn.in/d/3IpFc88",
  },
  {
    name: "WOW Skin Science Sunscreen SPF 55",
    image: Sunscreen5,
    link: "https://amzn.in/d/0XeObB5",
  },
  {
    name: "Aqualogica Radiance+ Dewy Sunscreen",
    image: Sunscreen6,
    link: "https://amzn.in/d/1dg5MkH",
  },
];

const Sunscreens = () => {
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

      <h2 style={styles.heading}>Buy Sunscreens Online</h2>

      {/* Banner */}
      <div style={styles.bannerContainer}>
        <img
          src={SunscreenBanner}
          alt="Sunscreen Banner"
          style={styles.bannerImage}
        />
        <div style={styles.bannerText}>
          Protect Your Skin <br /> from Harmful UV Rays
        </div>
      </div>

      {/* Search */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for a sunscreen..."
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
            No sunscreens found.
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

export default Sunscreens;
