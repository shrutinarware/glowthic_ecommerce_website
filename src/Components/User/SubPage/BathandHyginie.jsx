// src/pages/BathAndHygiene.jsx
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

// Bath & Hygiene Banner Images
import Bath1 from "../../../assets/BathSubpage/fiamaproduct.jpg";
import Bath2 from "../../../assets/BathSubpage/gilleteproduct.png";
import Bath3 from "../../../assets/BathSubpage/Bodywash1.jpg";

// Category Images
import SoapImg from "../../../assets/BathSubpage/Soap.jpg";
import BodywashImg from "../../../assets/BathSubpage/Bodywash.jpg";
import ShavingCImg from "../../../assets/BathSubpage/ShavingCream.jpg";
import WaxingImg from "../../../assets/BathSubpage/Waxing.jpg";

const BathItems = [{ image: Bath1 }, { image: Bath2 }, { image: Bath3 }];

const BathCategories = [
  { id: 1, heading: "Soaps", image: SoapImg, path: "/soaps" },
  { id: 2, heading: "Body Wash", image: BodywashImg, path: "/bodywash" },
  {
    id: 3,
    heading: "Shaving Creams",
    image: ShavingCImg,
    path: "/shavingcreams",
  },
  { id: 4, heading: "Waxing Needs", image: WaxingImg, path: "/waxingneeds" },
];

const BathAndHygiene = ({
  showSlider = true,
  headingColor,
  isMenPage = false,
  isWomenPage = false,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount
  }, []);
  const isCompactView = isMenPage || isWomenPage;

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
            {BathItems.map((item, index) => (
              <SwiperSlide key={index}>
                <div>
                  <img
                    src={item.image}
                    alt={`Bath ${index + 1}`}
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

      {/* Top Bath & Hygiene Categories */}
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
          Top Bath & Hygiene Categories
        </h1>
      </div>

      {/* Categories Container */}
      <div
        style={
          isCompactView
            ? {
                display: "flex",
                overflowX: "auto",
                gap: "15px",
                padding: "10px 0",
                scrollbarWidth: "thin",
                scrollbarColor: "#D63384 transparent",
                WebkitOverflowScrolling: "touch",
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
        {BathCategories.map((item) => (
          <Link
            to={item.path}
            key={item.id}
            style={{
              textDecoration: "none",
              width: isCompactView ? "160px" : "250px",
              flex: isCompactView ? "0 0 auto" : "initial",
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
                  height: isMenPage ? "180px" : isWomenPage ? "180px" : "250px",
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
                    fontSize: isCompactView ? "14px" : "18px",
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

export default BathAndHygiene;
