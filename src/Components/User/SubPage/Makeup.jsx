// src/pages/Makeup.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { database } from "../../../Firebase";
import { ref, onValue } from "firebase/database";

// Images
import FaceM from "../../../assets/MakeupSubpae/Mcategories/facemakeup.jpg";
import EyeM from "../../../assets/MakeupSubpae/Mcategories/eyes1.jpg";
import LipM from "../../../assets/MakeupSubpae/Mcategories/lip1.jpg";
import NailM from "../../../assets/MakeupSubpae/Mcategories/Nailmakeup.jpg";

const Categories = [
  { id: 1, heading: "Face", image: FaceM, path: "/face" },
  { id: 2, heading: "Eye", image: EyeM, path: "/eye" },
  { id: 3, heading: "Lip", image: LipM, path: "/Lip" },
  { id: 4, heading: "Nails", image: NailM, path: "/Nail" },
];

const Makeup = ({
  showSlider = true,
  headingColor,
  isMenPage = false,
  isWomenPage = false,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [slides, setSlides] = useState([]);
  const [userId, setUserId] = useState(() => {});
  const [deals, setDeals] = useState([]);
  const [showDeals, setShowDeals] = useState(true);

  useEffect(() => {
    const dealsRef = ref(database, "adminDeals/makeup");
    onValue(dealsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const arr = Object.keys(data).map((id) => ({ id, ...data[id] }));
        setDeals(arr);
      } else {
        setDeals([]);
      }
    });
  }, []);
  useEffect(() => {
    const settingsRef = ref(database, "homepageSettings/sections/makeupdeals");

    onValue(settingsRef, (snapshot) => {
      if (snapshot.exists()) {
        setShowDeals(snapshot.val());
      } else {
        setShowDeals(true); // default
      }
    });
  }, []);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (isLoggedIn && storedUserId) {
      setUserId(storedUserId);
    } else {
      setUserId(null);
    }

    const handleStorageChange = () => {
      const storedUserId = localStorage.getItem("userId");
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (isLoggedIn && storedUserId) {
        setUserId(storedUserId);
      } else {
        setUserId(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // 🧠 Fetch slides for Makeup page
  useEffect(() => {
    const slidesRef = ref(database, "slides_makeup"); // 👈 use your Firebase path
    const unsubscribe = onValue(slidesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const slideList = Object.values(data);
        setSlides(slideList);
      } else {
        setSlides([]);
      }
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  // 🔹 Slide click logic
  const handleSlideClick = (slide) => {
    // Wait until Firebase has checked auth state
    if (!userId) {
      setShowPopup(true);
      return;
    }

    if (slide.link) {
      window.open(slide.link, "_blank");
    }
  };
  return (
    <>
      {/* 🔹 Popup (Same style as product login popup) */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowPopup(false)}
        >
          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "12px",
              textAlign: "center",
              width: "300px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ color: "#D63384", marginBottom: "10px" }}>
              Please login first to see product details
            </h3>

            <button
              style={{
                background: "#D63384",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
              onClick={() => {
                setShowPopup(false);
                window.dispatchEvent(new CustomEvent("openLoginModal"));
              }}
            >
              Go to Login
            </button>
          </div>
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        /* Swiper image */
        .makeup-slide-image {
          width: 80%;
          max-width: 1200px;
          height: 550px;
          object-fit: cover;
          margin: 20px auto;
          border: none;
          transition: all 0.3s ease-in-out;
          cursor: pointer; 
        }

        /* Horizontal Scroll Container */
        .categories-container {
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          overflow-y: hidden;
          gap: 30px;
          padding: 20px;
          scrollbar-width: thin;
          scrollbar-color: #d63384 transparent;
          -webkit-overflow-scrolling: touch;
        }

        .categories-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
  padding: 10px;
}

.category-card {
  flex: 0 0 auto;
  width: 230px;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  border: 2px solid #D63384;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.2s ease;
}


 .category-card:hover {
  transform: scale(1.03);
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.6);
  border-color: #D4AF37;
}


.category-image {
  width: 100%;
  height: 280px;
  object-fit: cover;
}

.category-heading {
  margin: 0;
  color: #D63384;
  text-align: center;
  font-size: 18px;
  padding: 10px 0;
}

        /* Responsive Breakpoints */
@media (max-width: 1200px) {
  .category-card { width: 200px; }
  .category-image { height: 250px; }
}

@media (max-width: 992px) {
  .category-card { width: 180px; }
  .category-image { height: 220px; }
}

@media (max-width: 768px) {
  .categories-container { gap: 20px; }
  .category-card { width: 160px; }
  .category-image { height: 180px; }
  .category-heading { font-size: 14px; }
}

@media (max-width: 480px) {
  .categories-container { gap: 15px; }
  .category-card { width: 140px; }
  .category-image { height: 160px; }
  .category-heading { font-size: 13px; }
}
      `}</style>

      {/* 🔹 Swiper Slider */}
      {showSlider && slides.length > 0 && (
        <div
          style={{
            width: "100%",
            overflow: "hidden",
            paddingBottom: "20px",
            marginTop: "10px",
          }}
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                  onClick={() => handleSlideClick(slide)}
                >
                  <img
                    src={slide.img}
                    alt="makeup"
                    className="makeup-slide-image"
                    style={{
                      width: "90%",
                      maxWidth: "1200px",
                      height: "550px",
                      objectFit: "cover",
                      borderRadius: "20px",
                      cursor: "pointer",
                      border: "none",
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Top Categories Heading */}
      <h1
        style={{
          textAlign: "center",
          fontFamily: "sans-serif",
          color: isMenPage
            ? "black"
            : headingColor || (isWomenPage ? "#D63384" : "#333"),
          marginBottom: "20px",
        }}
      >
        Top Makeup Categories
      </h1>
      {/* Categories */}
      <div
        className={`categories-container ${isMenPage ? "men" : "women"}`}
        style={{
          justifyContent: "center",
          flexWrap: "wrap", // ✅ always wraps on smaller screens
        }}
      >
        {Categories.map((item) => (
          <Link
            to={item.path}
            key={item.id}
            style={{
              textDecoration: "none",
              flex: isMenPage ? "0 0 auto" : "initial",
            }}
          >
            <div
              className="category-card"
              style={{
                width: isMenPage || isWomenPage ? "160px" : "250px",
                height: "100%",
              }}
            >
              <img
                src={item.image}
                alt={item.heading}
                className="category-image"
                style={{
                  height: isMenPage || isWomenPage ? "180px" : "300px",
                }}
              />
              <div style={{ padding: "10px", flexGrow: 1 }}>
                <h3
                  className="category-heading"
                  style={{
                    fontSize: isMenPage || isWomenPage ? "14px" : "18px",
                  }}
                >
                  {item.heading}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {showDeals && (
        <div style={{ padding: "20px" }}>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            Makeup Deals
          </h2>

          <div
            style={{
              display: "flex",
              overflowX: "auto",
              gap: "20px",
              paddingBottom: "10px",
            }}
          >
            {deals.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                style={{
                  minWidth: "240px",
                  height: "140px",
                  borderRadius: "14px",
                  overflow: "hidden",
                  border: "2px solid gold",
                }}
              >
                <img
                  src={item.image}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Makeup;
