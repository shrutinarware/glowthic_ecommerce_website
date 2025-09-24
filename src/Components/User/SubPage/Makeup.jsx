// src/pages/Makeup.jsx
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

// Images
import Makeup1 from "../../../assets/MakeupSubpae/Mslides/swissbeautymakeup.jpg";
import Makeup2 from "../../../assets/MakeupSubpae/Mslides/elle18makeup.jpg";
import Makeup3 from "../../../assets/MakeupSubpae/Mslides/maybellinemakeup.jpg";
import Makeup4 from "../../../assets/MakeupSubpae/Mslides/kaybeautymakeup.jpg";
import Makeup5 from "../../../assets/MakeupSubpae/Mslides/rennemakeup.jpg";
import Makeup6 from "../../../assets/MakeupSubpae/Mslides/blueheavenmakeup.jpg";
import FaceM from "../../../assets/MakeupSubpae/Mcategories/facemakeup.jpg";
import EyeM from "../../../assets/MakeupSubpae/Mcategories/eyes1.jpg";
import LipM from "../../../assets/MakeupSubpae/Mcategories/lip1.jpg";
import NailM from "../../../assets/MakeupSubpae/Mcategories/Nailmakeup.jpg";

const MakeupItems = [
  { image: Makeup1 },
  { image: Makeup2 },
  { image: Makeup3 },
  { image: Makeup4 },
  { image: Makeup5 },
  { image: Makeup6 },
];

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
            style={{ paddingBottom: "20px" ,paddingTop:"3%"}}
          >
            {MakeupItems.map((item, index) => (
              <SwiperSlide key={index}>
                <div>
                  <img
                    src={item.image}
                    alt={`Makeup ${index + 1}`}
                    style={{
                      width: "80%",
                      height: "550px",
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

      {/* Top Categories Heading */}
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
          Top Makeup Categories
        </h1>
      </div>

      {/* Categories container */}
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
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "30px",
                marginBottom: "20px",
              }
        }
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
              style={{
                width: isMenPage || isWomenPage ? "160px" : "250px",
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
                  height: isMenPage || isWomenPage ? "180px" : "300px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "10px", flexGrow: 1 }}>
                <h3
                  style={{
                    margin: 0,
                    color: "#D63384",
                    textAlign: "center",
                    fontSize: isMenPage || isWomenPage ? "14px" : "18px",
                    lineHeight: 1.2,
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

export default Makeup;
