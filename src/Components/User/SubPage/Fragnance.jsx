import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { database } from "../../../Firebase";
import { ref, onValue } from "firebase/database";

// Category Images
import MenPerfumeImg from "../../../assets/FragnanceSubpage/PerfumeMEN.jpg";
import WomenPerfumeImg from "../../../assets/FragnanceSubpage/PerfumeWOMEN.jpg";
import UnisexPerfumeImg from "../../../assets/FragnanceSubpage/PerfumeUNISEX.jpg";
import DeoImg from "../../../assets/FragnanceSubpage/PerfumeDEO.jpg";
import BodyMistImg from "../../../assets/FragnanceSubpage/PErfumeBM.jpg";

const FragnanceCategories = [
  {
    id: 1,
    heading: "Men's Perfumes",
    image: MenPerfumeImg,
    path: "/mensperfumes",
  },
  {
    id: 2,
    heading: "Women's Perfumes",
    image: WomenPerfumeImg,
    path: "/womensperfumes",
  },
  {
    id: 3,
    heading: "Unisex Perfumes",
    image: UnisexPerfumeImg,
    path: "/unisexperfumes",
  },
  { id: 4, heading: "Deodorants", image: DeoImg, path: "/deodorants" },
  { id: 5, heading: "Body Mists", image: BodyMistImg, path: "/bodymists" },
];

const Fragnance = ({
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
    const dealsRef = ref(database, "adminDeals/fragnance");
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
      "homepageSettings/sections/fragnancedeals"
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
    const slidesRef = ref(database, "slides_fragnance");
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
        .fragnance-slide-image {
          width: 80%;
          max-width: 1200px;
          height: 500px;
          object-fit: cover;
          margin: 20px auto;
          border: none;
          transition: all 0.3s ease-in-out;
           cursor: pointer; 
        }

        .categories-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 30px;
          margin-bottom: 20px;
          padding: 10px;
        }

        .categories-container.men {
          flex-wrap: nowrap;
          overflow-x: auto;
          gap: 15px;
          scrollbar-width: thin;
          scrollbar-color: #7d0a0a transparent;
        }

        .category-card {
          width: 250px;
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
          height: 250px;
          object-fit: cover;
        }

        .category-heading {
          margin: 0;
          color: #7d0a0a;
          text-align: center;
          font-size: 18px;
          line-height: 1.2;
        }

        @media (max-width: 1200px) {
          .fragnance-slide-image { width: 90%; height: 400px; }
          .category-card { width: 220px; }
          .category-image { height: 220px; }
        }

        @media (max-width: 992px) {
          .fragnance-slide-image { width: 95%; height: 350px; }
          .category-card { width: 200px; }
          .category-image { height: 200px; }
        }

        @media (max-width: 768px) {
          .fragnance-slide-image { width: 100%; height: 250px; padding: 0 10px; }
          .category-card { width: 160px; }
          .category-image { height: 180px; }
          .category-heading { font-size: 14px; }
        }

        @media (max-width: 480px) {
          .fragnance-slide-image { width: 100%; height: auto; margin-top: 10px; padding: 0; }
          .category-card { width: 140px; }
          .category-heading { font-size: 13px; }
          .categories-container { gap: 15px; }
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
                    alt="Fragnance"
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
            : headingColor || (isWomenPage ? "#7d0a0a" : "#333"),
          paddingTop: "20px",
        }}
      >
        Top Perfume Categories
      </h1>

      {/* Categories */}
      <div className={`categories-container ${isMenPage ? "men" : "women"}`}>
        {FragnanceCategories.map((item) => (
          <Link
            to={item.path}
            key={item.id}
            style={{
              textDecoration: "none",
              flex: isMenPage || isWomenPage ? "0 0 auto" : "initial",
            }}
          >
            <div
              className="category-card"
              style={{ width: isMenPage || isWomenPage ? "160px" : "250px" }}
            >
              <img
                src={item.image}
                alt={item.heading}
                className="category-image"
                style={{ height: isMenPage || isWomenPage ? "180px" : "250px" }}
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
            Fragnance Deals
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

export default Fragnance;
