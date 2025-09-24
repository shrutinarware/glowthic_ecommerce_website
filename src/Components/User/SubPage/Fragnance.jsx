// src/pages/Perfume.jsx
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

// Perfume Banner Images

import Perfume2 from "../../../assets/FragnanceSubpage/PerfumeDenver.avif";
import Perfume3 from "../../../assets/FragnanceSubpage/perfumeWild.webp";

// Category Images
import MenPerfumeImg from "../../../assets/FragnanceSubpage/PerfumeMEN.jpg";
import WomenPerfumeImg from "../../../assets/FragnanceSubpage/PerfumeWOMEN.jpg";
import UnisexPerfumeImg from "../../../assets/FragnanceSubpage/PerfumeUNISEX.jpg";
import DeoImg from "../../../assets/FragnanceSubpage/PerfumeDEO.jpg";
import BodyMistImg from "../../../assets/FragnanceSubpage/PErfumeBM.jpg";

const FragnanceItems = [
  
  { image: Perfume2 },
  { image: Perfume3 },
];

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
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount
  }, []);
  return (
    <>
      {/* Swiper Slider */}
      {showSlider && (
        <div>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            style={{ paddingBottom: "20px", paddingTop:"3%" }}
          >
            {FragnanceItems.map((item, index) => (
              <SwiperSlide key={index}>
                <div>
                  <img
                    src={item.image}
                    alt={`Fragnance ${index + 1}`}
                    style={{
                      width: "80%",
                      height: "450px",
                      margin: "0 auto",
                      marginTop: "20px",
                      padding: "30px 190px",
                      border: "none",
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Top Perfume Categories */}
      <div>
        <h1
          style={{
            textAlign: "center",
            fontFamily: "sans-serif",
            color: isMenPage
              ? "black"
              : headingColor || (isWomenPage ? "#D63384" : "#333"),
          }}
        >
          Top Perfume Categories
        </h1>
      </div>

      {/* Categories Container */}
      <div
        style={
          isMenPage
            ? {
                display: "flex",
                overflowX: "auto",
                gap: "15px",
                padding: "10px 0",
                scrollbarWidth: "thin",
                scrollbarColor: "#D63384 transparent",
              }
            : {
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "30px",
                marginBottom: "20px",
              }
        }
      >
        {FragnanceCategories.map((item) => (
          <Link
            to={item.path}
            key={item.id}
            style={{
              textDecoration: "none",
              width: isMenPage || isWomenPage ? "160px" : "250px",
              flex: isMenPage || isWomenPage ? "0 0 auto" : "initial",
            }}
          >
            <div
              style={{
                width: "100%",
                borderRadius: "10px",
                overflow: "hidden",
                background: "#fff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                cursor: "pointer",
                border: "2px solid #D63384",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src={item.image}
                alt={item.heading}
                style={{
                  width: "100%",
                  height: isMenPage || isWomenPage ? "180px" : "250px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "10px", flexGrow: 1 }}>
                <h3
                  style={{
                    margin: 0,
                    color: "#D63384",
                    textAlign: "center",
                    lineHeight: 1.2,
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

export default Fragnance;
