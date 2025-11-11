import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { database } from "../../../Firebase";
import { ref, onValue } from "firebase/database";

// Category Images
import MoisturizerImg from "../../../assets/SkinSubpage/Scategories/Moisturizer.jpg";
import CleanserImg from "../../../assets/SkinSubpage/Scategories/Cleanser.jpg";
import SerumImg from "../../../assets/SkinSubpage/Scategories/Serum.jpg";
import SunscreenImg from "../../../assets/SkinSubpage/Scategories/Sunscreen.jpg";
import FacemaskImg from "../../../assets/SkinSubpage/Scategories/Facemask.jpg";
import BodylotionImg from "../../../assets/SkinSubpage/Scategories/Bodylotions.jpg";
import ScrubsImg from "../../../assets/SkinSubpage/Scategories/Scrubs.jpg";

const Categories = [
  {
    id: 1,
    heading: "Moisturizers",
    image: MoisturizerImg,
    path: "/moisturizers",
  },
  { id: 2, heading: "Cleansers", image: CleanserImg, path: "/cleansers" },
  { id: 3, heading: "Serums", image: SerumImg, path: "/serums" },
  { id: 4, heading: "Sunscreens", image: SunscreenImg, path: "/sunscreens" },
  { id: 5, heading: "Face masks", image: FacemaskImg, path: "/facemasks" },
  { id: 6, heading: "Bodylotions", image: BodylotionImg, path: "/bodylotions" },
  { id: 7, heading: "Scrubs", image: ScrubsImg, path: "/scrubs" },
];

const Skin = ({
  showSlider = true,
  headingColor,
  isMenPage = false,
  isWomenPage = false,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [slides, setSlides] = useState([]);
  const [userId, setUserId] = useState(null);
  const [deals, setDeals] = useState([]);
  const [showDeals, setShowDeals] = useState(true);

  useEffect(() => {
    const dealsRef = ref(database, "adminDeals/skin");
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
    const settingsRef = ref(database, "homepageSettings/sections/skindeals");

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

  // 🔹 Fetch slides from Firebase
  useEffect(() => {
    const slidesRef = ref(database, "slides_skin");
    const unsubscribe = onValue(slidesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSlides(Object.values(data));
      }
    });
    return () => unsubscribe();
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

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        .skin-slide-image {
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
                    alt="skin"
                    className="skin-slide-image"
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

      {/* Heading */}
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
        Top Skincare Categories
      </h1>

      {/* Single Line Categories */}
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
                width: isMenPage || isWomenPage ? "160px" : "230px",
              }}
            >
              <img
                src={item.image}
                alt={item.heading}
                className="category-image"
                style={{
                  height: isMenPage || isWomenPage ? "180px" : "280px",
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
            Skin Care Deals
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

export default Skin;
