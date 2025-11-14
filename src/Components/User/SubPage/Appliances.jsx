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
  { id: 1, heading: "Hair Dryers", image: HairDryerImg, path: "/hair-dryers" },
  {
    id: 2,
    heading: "Hair Straighteners",
    image: StraightenerImg,
    path: "/straighteners",
  },
  { id: 3, heading: "Hair Curlers", image: CurlingIronImg, path: "/curlers" },
  { id: 4, heading: "Trimmers", image: TrimmerImg, path: "/trimmers" },
  {
    id: 5,
    heading: "Facial Steamers",
    image: FacialSteamerImg,
    path: "/facial-steamers",
  },
  { id: 6, heading: "Epilators", image: EpilatorImg, path: "/epilators" },
  { id: 7, heading: "Massage Tools", image: MassageImg, path: "/massage" },
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

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const isCompactView = isMenPage || isWomenPage;

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
          fontFamily: "sans-serif",
          color: isMenPage
            ? "black"
            : headingColor || (isWomenPage ? "#D63384" : "#333"),
          paddingTop: "20px",
        }}
      >
        Top Beauty Appliances & Tools
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
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            Appliances Deals
          </h2>

          <div
            style={{
              padding: "20px",
              background: "rgba(255, 242, 215, 0.3)", // light premium glow bg
              boxShadow: "0 0 40px rgba(212, 175, 55, 0.4)", // GOLD GLOW in background
              marginBottom: "30px",
            }}
          >
            <div
              onClick={handleSlideClick}
              style={{
                display: "flex",
                overflowX: "auto",
                gap: "20px",
                padding: "10px",
              }}
            >
              {deals.map((item) => (
                <div
                  key={item.id}
                  style={{
                    minWidth: "400px",
                    height: "200px",
                    overflow: "hidden",
                    border: "4px solid #D4AF37",
                    borderRadius: "20px",
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
