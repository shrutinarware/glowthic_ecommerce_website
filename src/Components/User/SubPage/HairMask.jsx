import React, { useState,useEffect } from "react";
import HairMaskBanner from "../../../assets/HairSubpage/hair.jpg"; // Replace with your hair mask banner image

// Hair Mask Product Images (replace with real image imports)
import Mask1 from "../../../assets/HairSubpage/HSubpage/MaskLoreal.jpg";
import Mask2 from "../../../assets/HairSubpage/HSubpage/MaskMAMA.jpg";
import Mask3 from "../../../assets/HairSubpage/HSubpage/MaskTresemme.jpg";
import Mask4 from "../../../assets/HairSubpage/HSubpage/MaskBiotique.jpg";

const products = [
  {
    name: "L'Oreal Paris Hair Mask",
    image: Mask1,
    link: "https://amzn.in/d/etsCe0J",
  },
  {
    name: "Mamaearth Argan Hair Mask",
    image: Mask2,
    link: "https://amzn.in/d/dzjzkWT",
  },
  {
    name: "TRESemmé Frizzy Keratin Mask",
    image: Mask3,
    link: "https://amzn.in/d/45LSOR1",
  },
  {
    name: "Biotique Bio Musk Root Hair Mask",
    image: Mask4,
    link: "https://amzn.in/d/3U1G3RE",
  },
];

const HairMask = () => {
  useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top on mount
    }, []);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const productsToShow = searchTerm ? filteredProducts : products;

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

      <h2 style={styles.heading}>Buy Hair Masks Online</h2>

      {/* Banner */}
      <div style={styles.bannerContainer}>
        <img
          src={HairMaskBanner}
          alt="Hair Mask Banner"
          style={styles.bannerImage}
        />
        <div style={styles.bannerText}>
          Deep Nourishment & Repair <br /> with the Best Hair Masks
        </div>
      </div>

      {/* Search */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for a hair mask..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
          aria-label="Search hair masks"
        />
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {productsToShow.length > 0 ? (
          productsToShow.map((product, index) => (
            <a
              key={index}
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.cardLink}
              aria-label={`Buy ${product.name} on Amazon`}
            >
              <div className="card" style={styles.card}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={styles.cardImage}
                  loading="lazy"
                />
                <div style={styles.cardText}>
                  <p style={styles.cardTitle}>{product.name}</p>
                </div>
              </div>
            </a>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%", color: "#666" }}>
            No hair masks found matching "{searchTerm}".
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

export default HairMask;
