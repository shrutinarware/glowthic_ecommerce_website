import React, { useState } from "react";
import { useEffect } from "react";
import NailBanner from "../../../assets/MakeupSubpae/NailsSubpage/Nailbg.jpg";

// Nail Product Images (Make sure you add these images in your assets folder)
import NailPaint1 from "../../../assets/MakeupSubpae/NailsSubpage/NailpaintLakme.jpg";
import NailRemover1 from "../../../assets/MakeupSubpae/NailsSubpage/RemoverColorbar.jpg";
import NailRemover2 from "../../../assets/MakeupSubpae/NailsSubpage/RemoverBlue.jpg";
import GlitterNail from "../../../assets/MakeupSubpae/NailsSubpage/GelSwiss.jpg";
import NailPaint2 from "../../../assets/MakeupSubpae/NailsSubpage/NailpaintNykaa.jpg";
import NailCareKit from "../../../assets/MakeupSubpae/NailsSubpage/Nailkit1.jpg";

// Nail Product List
const products = [
  {
    name: "Lakme Nail Paint",
    image: NailPaint1,
    link: "https://amzn.in/d/9FbF6FE",
  },
  {
    name: "Colorbar Nail Polish",
    image: NailRemover1,
    link: "https://amzn.in/d/bWmxiYQ",
  },
  {
    name: "Blue Heaven Nail Remover",
    image: NailRemover2,
    link: "https://amzn.in/d/62sOu9B",
  },
  {
    name: "Swiss Beauty Glitter Nail",
    image: GlitterNail,
    link: "https://amzn.in/d/h5FvXFg",
  },
  {
    name: "Nykaa Matte Nail Polish",
    image: NailPaint2,
    link: "https://amzn.in/d/72n5pQd",
  },
  {
    name: "Nail Care Kit",
    image: NailCareKit,
    link: "https://amzn.in/d/b6WgMLQ",
  },
];

const Nails = () => {
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

      <h2 style={styles.heading}>Buy Nail Products</h2>

      {/* Banner */}
      {/* Banner with Text Overlay */}
      <div style={styles.bannerContainer}>
        <img
          src={NailBanner}
          alt="Nail Makeup Banner"
          style={styles.bannerImage}
        />
        <div style={styles.bannerText}>
          Nail the Look <br />
          Stunning Nails Collection
        </div>
      </div>

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

// Shared Styles (Consistent UI)
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
    left: "30%",
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

export default Nails;
