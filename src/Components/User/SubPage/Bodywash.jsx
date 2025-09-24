import React, { useState } from "react";
import { useEffect } from "react";
import BodyWashBanner from "../../../assets/BodywashSubpage/body.jpg"; // Optional: Replace with a dedicated body wash banner

// Body Wash Product Images
import BodyWash1 from "../../../assets/BodywashSubpage/BWDove.jpg";
import BodyWash2 from "../../../assets/BodywashSubpage/BWNivea.jpg";
import BodyWash3 from "../../../assets/BodywashSubpage/BWFiama.jpg";
import BodyWash4 from "../../../assets/BodywashSubpage/BWPAlmolive.jpg";
import BodyWash5 from "../../../assets/BodywashSubpage/BWLux.jpg";
import BodyWash6 from "../../../assets/BodywashSubpage/BWBodyshop.jpg";

// Product List
const products = [
  {
    name: "Dove Deeply Nourishing Body Wash",
    image: BodyWash1,
    link: "https://amzn.in/d/a40nsNM", // Replace with actual links
  },
  {
    name: "Nivea Fresh Powerfruit Body Wash",
    image: BodyWash2,
    link: "https://amzn.in/d/daexd36",
  },
  {
    name: "Fiama Shower Gel Patchouli & Macadamia",
    image: BodyWash3,
    link: "https://amzn.in/d/iW7rsyI",
  },
  {
    name: "Palmolive Aroma Morning Tonic Body Wash",
    image: BodyWash4,
    link: "https://amzn.in/d/3kowfCp",
  },
  {
    name: "LUX Soft Touch Body Wash",
    image: BodyWash5,
    link: "https://amzn.in/d/haSgysY",
  },
  {
    name: "The Body Shop British Rose Shower Gel",
    image: BodyWash6,
    link: "The Body Shop British Rose Shower Gel",
  },
];

const BodyWash = () => {
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

      <h2 style={styles.heading}>Buy Body Wash Online</h2>

      {/* Banner */}
      <div style={styles.bannerContainer}>
        <img
          src={BodyWashBanner}
          alt="Body Wash Banner"
          style={styles.bannerImage}
        />
        <div style={styles.bannerText}>
          Feel Fresh Every Day <br /> with Soothing Body Wash
        </div>
      </div>

      {/* Search */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for a body wash..."
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
            No body wash found.
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

export default BodyWash;
