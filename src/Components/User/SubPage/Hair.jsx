import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { database } from "../../../Firebase";
import { ref, onValue } from "firebase/database";

// Category Images
import ShampooImg from "../../../assets/HairSubpage/Hcategories/Shampoo.jpg";
import ConditionerImg from "../../../assets/HairSubpage/Hcategories/Conditioner.jpg";
import HairOilImg from "../../../assets/HairSubpage/Hcategories/HAiroil.jpg";
import HairSerumImg from "../../../assets/HairSubpage/Hcategories/HairSerum.jpg";
import HairMaskImg from "../../../assets/HairSubpage/Hcategories/HairMAsk.jpg";
import HairColorImg from "../../../assets/HairSubpage/Hcategories/HAirColor.jpg";
import HairGelImg from "../../../assets/HairSubpage/Hcategories/HAirGel.jpg";

const HairCategories = [
  { id: 1, heading: "Shampoos", image: ShampooImg, path: "/shampoos" },
  {
    id: 2,
    heading: "Conditioners",
    image: ConditionerImg,
    path: "/conditioners",
  },
  { id: 3, heading: "Hair Oils", image: HairOilImg, path: "/hair-oils" },
  { id: 4, heading: "Hair Serums", image: HairSerumImg, path: "/hair-serums" },
  { id: 5, heading: "Hair Masks", image: HairMaskImg, path: "/hair-masks" },
  { id: 6, heading: "Hair Colors", image: HairColorImg, path: "/hair-colors" },
  { id: 7, heading: "Hair Gels", image: HairGelImg, path: "/hair-gels" },
];

const Haircare = ({
  showSlider = true,
  headingColor,
  isMenPage = false,
  isWomenPage = false,
}) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [slides, setSlides] = useState([]);
  const [userId, setUserId] = useState(() => {});

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
    const slidesRef = ref(database, "slides_hair");
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
                navigate("/user-login");
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
        .hair-slide-image {
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
  justify-content: center;
  align-items: flex-start;
  flex-wrap: nowrap;          /* keep in one line */
  gap: 20px;
  padding: 20px;
  overflow: hidden;           /* prevent scroll */
  width: 100%;
  flex-shrink: 0;
}


        .categories-container::-webkit-scrollbar {
          height: 8px;
        }

        .categories-container::-webkit-scrollbar-thumb {
          background: #d63384;
          border-radius: 10px;
        }

        .category-card {
          flex: 1;
          max-width: 240px;  
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
          .hair-slide-image { width: 90%; height: 500px; }
          .category-card { width: 200px; }
          .category-image { height: 250px; }
        }

        @media (max-width: 992px) {
          .hair-slide-image { width: 95%; height: 420px; }
          .category-card { width: 180px; }
          .category-image { height: 200px; }
        }

        @media (max-width: 768px) {
          .hair-slide-image { width: 100%; height: 320px; }
          .category-card { width: 160px; }
          .category-image { height: 180px; }
          .category-heading { font-size: 14px; }
        }

        @media (max-width: 480px) {
          .hair-slide-image { width: 100%; height: auto; margin-top: 10px; padding: 0; }
          .category-card { width: 140px; }
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
                    alt="hair"
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
        Top Haircare Categories
      </h1>

      {/* Categories */}
      <div
        className={`categories-container ${isMenPage ? "men" : "women"}`}
        style={{
          flexWrap: isMenPage ? "nowrap" : "wrap",
          justifyContent: "center",
          gap: isMenPage ? "10px" : "20px",
        }}
      >
        {HairCategories.map((item) => (
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
    </>
  );
};

export default Haircare;
