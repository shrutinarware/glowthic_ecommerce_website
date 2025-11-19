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
  { id: 1, heading: "SHAMPOOS", image: ShampooImg, path: "/shampoos" },
  {
    id: 2,
    heading: "CONDITIONERS",
    image: ConditionerImg,
    path: "/conditioners",
  },
  { id: 3, heading: "HAIR OILS", image: HairOilImg, path: "/hair-oils" },
  { id: 4, heading: "HAIR SERUMS", image: HairSerumImg, path: "/hair-serums" },
  { id: 5, heading: "HAIR MASKS", image: HairMaskImg, path: "/hair-masks" },
  { id: 6, heading: "HAIR COLORS", image: HairColorImg, path: "/hair-colors" },
  { id: 7, heading: "HAIR GELS", image: HairGelImg, path: "/hair-gels" },
];

const Haircare = ({
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
    const dealsRef = ref(database, "adminDeals/hair");
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
    const settingsRef = ref(database, "homepageSettings/sections/hairdeals");

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
  const handleDealsClick = (item) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      setShowPopup(true);
      return;
    }

    if (item?.link) {
      window.open(item.link, "_blank");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
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
            <h3 style={{ color: "#7d0a0a", marginBottom: "10px" }}>
              Please login first to see product details
            </h3>

            <button
              style={{
                background: "#D4AF37",
                color: "#7d0a0a",
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
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  width: 100%;
  overflow: hidden;  /* prevents scrollbar */
  box-sizing: border-box;          
}


        .categories-container::-webkit-scrollbar {
          height: 8px;
        }

        .categories-container::-webkit-scrollbar-thumb {
          background: #7d0a0a;
          border-radius: 10px;
        }

        .category-card {
          flex: 1;
          max-width: 240px;  
          border-radius: 10px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          border: 2px solid #7d0a0a;
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
          color: #7d0a0a;
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
      <style>{`
/* DEALS SECTION HEADING */
.hair-deals-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.hair-deals-title {
  background: linear-gradient(to right, #8B6A2B, #F8E1A1, #C29A4D);
  padding: 5px 12px;
  border-radius: 4px;
  font-family: serif;
  font-size: 22px;
  white-space: nowrap;
}

.hair-deals-line {
  flex-grow: 1;
  height: 2px;
  background: #7d0a0a;
  margin-top: 4px;
}

/* DEALS GRID (Makeup जैसा) */
.hair-deals-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.hair-deals-card {
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;   /* fixed ratio like Lakme cards */
  border: 2px solid #D4AF37;
  border-radius: 20px;
  overflow: hidden;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}


.hair-deals-card img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  background: #fff;
}


/* RESPONSIVE */
@media (max-width: 992px) {
  .hair-deals-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .hair-deals-grid {
    grid-template-columns: repeat(1, 1fr);
  }

  .hair-deals-title {
    font-size: 18px;
  }
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
            boxSizing: "border-box",
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
                    className="hair-slide-image"
                    style={{
                      width: "100%",
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
          fontFamily: "serif",
          color: isMenPage
            ? "black"
            : headingColor || (isWomenPage ? "#7d0a0a" : "#333"),
          marginBottom: "20px",
          fontWeight: "400",
        }}
      >
        TOP HAIR CARE CATEGORIES
      </h1>

      {/* Categories */}
      <div
        className="categories-container"
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
      {!isMenPage && !isWomenPage && showDeals && (
        <div style={{ padding: "20px" }}>
          <h2 className="hair-deals-wrapper">
            <span className="hair-deals-title">HAIR CARE DEALS</span>

            {/* Horizontal Line */}
            <span className="hair-deals-line"></span>
          </h2>

          <div
            style={{
              padding: "20px",
              marginBottom: "30px",
            }}
          >
            <div className="hair-deals-grid">
              {deals.map((item) => (
                <div
                  key={item.id}
                  className="hair-deals-card"
                  onClick={() => handleDealsClick(item)}
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
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Haircare;
