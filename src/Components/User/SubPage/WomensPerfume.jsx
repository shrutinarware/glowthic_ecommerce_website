import React, { useState ,useEffect} from "react";
import PerfumeBanner from "../../../assets/FragnanceSubpage/Tperfume.jpg"; // Update this image path

// Women's Perfume Product Images (update these as per your asset folder)
import Perfume1 from "../../../assets/FragnanceSubpage/PerfumeEngageWomen.jpg";


const products = [
  {
    name: "Engage W2 Perfume Spray for Women",
    image: Perfume1,
    link: "https://amzn.in/d/ed64P4x", // Replace with actual product link
  },
];

const WomensPerfume = () => {
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

      <h2 style={styles.heading}>Buy Women's Perfumes Online</h2>

      {/* Banner */}
      <div style={styles.bannerContainer}>
        <img
          src={PerfumeBanner}
          alt="Women's Perfume Banner"
          style={styles.bannerImage}
        />
        <div style={styles.bannerText}>
          Elegant & Long-Lasting <br /> Discover the Best Women's Fragrances
        </div>
      </div>

      {/* Search */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for women's perfume..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
          aria-label="Search women's perfumes"
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
            No perfumes found matching "{searchTerm}".
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

export default WomensPerfume;
