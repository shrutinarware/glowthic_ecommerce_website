import React, { useState ,useEffect} from "react";
import CleanserBanner from "../../../assets/SkinSubpage/body.jpg"; // Replace with actual banner image

// Cleanser Product Images (replace these with actual product images)
import Cleanser1 from "../../../assets/SkinSubpage/CleanserSubpage/CleanserHimalaya.jpg";
import Cleanser2 from "../../../assets/SkinSubpage/CleanserSubpage/CleanserCetaphil.jpg";
import Cleanser3 from "../../../assets/SkinSubpage/CleanserSubpage/CleanserMAMA.jpg";
import Cleanser4 from "../../../assets/SkinSubpage/CleanserSubpage/CleanserSimple.jpg";
import Cleanser5 from "../../../assets/SkinSubpage/CleanserSubpage/CleanserNeutrogena.jpg";
import Cleanser6 from "../../../assets/SkinSubpage/CleanserSubpage/CleanserWOW.jpg";

// Product List
const products = [
  {
    name: "Himalaya Purifying Neem Face Wash",
    image: Cleanser1,
    link: "https://amzn.in/d/3HyOWqA",
  },
  {
    name: "Cetaphil Gentle Skin Cleanser",
    image: Cleanser2,
    link: "https://amzn.in/d/3NJmTnM",
  },
  {
    name: "Mamaearth Vitamin C Face Wash",
    image: Cleanser3,
    link: "https://amzn.in/d/9PkukHr",
  },
  {
    name: "Simple Refreshing Facial Wash",
    image: Cleanser4,
    link: "https://amzn.in/d/cs6i79r",
  },
  {
    name: "Neutrogena Oil-Free Acne Wash",
    image: Cleanser5,
    link: "https://amzn.in/d/ij9ogz7",
  },
  {
    name: "WOW Foaming Face Wash",
    image: Cleanser6,
    link: "https://amzn.in/d/iiodlSs",
  },
];

const Cleansers = () => {
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

      <h2 style={styles.heading}>Buy Face Cleansers Online</h2>

      {/* Banner */}
      <div style={styles.bannerContainer}>
        <img
          src={CleanserBanner}
          alt="Cleanser Banner"
          style={styles.bannerImage}
        />
        <div style={styles.bannerText}>
          Refresh Your Skin <br /> with Gentle Cleansers
        </div>
      </div>

      {/* Search */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for a cleanser..."
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
            No cleansers found.
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

export default Cleansers;
