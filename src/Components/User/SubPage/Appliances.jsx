import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { database } from "../../../Firebase";
import { ref, onValue } from "firebase/database";

// Category Images
import HairDryerImg from "../../../assets/AppliancesSubpage/Acategory/dryer.jpg";
import StraightenerImg from "../../../assets/AppliancesSubpage/Acategory/straightner.jpg";
import CurlingIronImg from "../../../assets/AppliancesSubpage/Acategory/curler.jpg";
import TrimmerImg from "../../../assets/AppliancesSubpage/Acategory/trimmer.jpg";
import FacialSteamerImg from "../../../assets/AppliancesSubpage/Acategory/steamer.jpg";
import EpilatorImg from "../../../assets/AppliancesSubpage/Acategory/epillator.jpg";
import MassageImg from "../../../assets/AppliancesSubpage/Acategory/ftools.jpg";

const AppliancesCategories = [
  { id: 1, heading: "DRYERS", image: HairDryerImg, path: "/hair-dryers" },
  {
    id: 2,
    heading: "STRAIGHTNERS",
    image: StraightenerImg,
    path: "/straighteners",
  },
  { id: 3, heading: "CURLERS", image: CurlingIronImg, path: "/curlers" },
  { id: 4, heading: "TRIMMERS", image: TrimmerImg, path: "/trimmers" },
  {
    id: 5,
    heading: "FACIAL STEAMERS",
    image: FacialSteamerImg,
    path: "/facial-steamers",
  },
  { id: 6, heading: "EPILATORS", image: EpilatorImg, path: "/epilators" },
  { id: 7, heading: "MASSAGE TOOLS", image: MassageImg, path: "/massage" },
];

const Appliances = ({
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
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenWidth <= 480;
  const isTablet = screenWidth > 480 && screenWidth <= 768;

  useEffect(() => {
    const dealsRef = ref(database, "adminDeals/appliances");
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
    const settingsRef = ref(
      database,
      "homepageSettings/sections/appliancesdeals"
    );

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
    const slidesRef = ref(database, "slides_appliances");
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

  const isCompactView = isMenPage || isWomenPage;
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
        .appliances-slide-image {
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
          scrollbar-color: #7d0a0a transparent;
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
  border: 2px solid #7d0a0a ;
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
  minHeight: "40px",
  padding: "0 8px", 
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
      <style>{`
/* DEALS SECTION HEADING */
.appliances-deals-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.appliances-deals-title {
  background: linear-gradient(to right, #8B6A2B, #F8E1A1, #C29A4D);
  padding: 5px 12px;
  border-radius: 4px;
  font-family: serif;
  font-size: 22px;
  
}

.appliances-deals-line {
  flex-grow: 1;
  height: 2px;
  background: #7d0a0a;
  margin-top: 4px;
}

/* DEALS GRID (Makeup जैसा) */
.appliances-deals-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.appliances-deals-card {
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


.appliances-deals-card img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  background: #fff;
}


/* RESPONSIVE */
@media (max-width: 992px) {
  .appliances-deals-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .appliances-deals-grid {
    grid-template-columns: repeat(1, 1fr);
  }

  .appliances-deals-title {
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
                    alt="appliancees"
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
          fontFamily: "serif",
          color: isMenPage
            ? "black"
            : headingColor || (isWomenPage ? "#D63384" : "#333"),
          paddingTop: "20px",
          fontWeight: "400",
        }}
      >
        TOP APPLIANCES & TOOLS CATEGORIES
      </h1>
      {/* Categories */}
      <div
        className={`categories-container ${isCompactView ? "men" : "women"}`}
        style={{
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {AppliancesCategories.map((item) => (
          <Link
            to={item.path}
            key={item.id}
            style={{
              textDecoration: "none",
              flex: isCompactView ? "0 0 auto" : "initial",
            }}
          >
            <div
              className="category-card"
              style={{ width: isCompactView ? "160px" : "230px" }}
            >
              <img
                src={item.image}
                alt={item.heading}
                className="category-image"
                style={{ height: isCompactView ? "180px" : "300px" }}
              />
              <div style={{ padding: "10px", flexGrow: 1 }}>
                <h3
                  className="category-heading"
                  style={{ fontSize: isCompactView ? "14px" : "18px" }}
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
          <h2 className="appliances-deals-wrapper">
            <span className="appliances-deals-title">
              APPLIANCES & <br />
              TOOLS DEALS
            </span>

            {/* Horizontal Line */}
            <span className="appliances-deals-line"></span>
          </h2>

          <div
            style={{
              padding: "20px",
              marginBottom: "30px",
            }}
          >
            <div className="appliances-deals-grid">
              {deals.map((item) => (
                <div
                  key={item.id}
                  className="appliances-deals-card"
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

export default Appliances;
