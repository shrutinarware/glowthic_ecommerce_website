// src/pages/Haircare.jsx
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

// Haircare Banner Images
import Haircare1 from "../../../assets/HairSubpage/Hslides/HairLoreal.jpg";
import Haircare2 from "../../../assets/HairSubpage/Hslides/HairIndulekha.jpg";
import Haircare3 from "../../../assets/HairSubpage/Hslides/HairLivon.jpg";

// Category Images
import ShampooImg from "../../../assets/HairSubpage/Hcategories/Shampoo.jpg";
import ConditionerImg from "../../../assets/HairSubpage/Hcategories/Conditioner.jpg";
import HairOilImg from "../../../assets/HairSubpage/Hcategories/HAiroil.jpg";
import HairSerumImg from "../../../assets/HairSubpage/Hcategories/HairSerum.jpg";
import HairMaskImg from "../../../assets/HairSubpage/Hcategories/HairMAsk.jpg";
import HairColorImg from "../../../assets/HairSubpage/Hcategories/HAirColor.jpg";
import HairGelImg from "../../../assets/HairSubpage/Hcategories/HAirGel.jpg";

const HaircareItems = [
  { image: Haircare1 },
  { image: Haircare2 },
  { image: Haircare3 },
];

const HairCategories = [
  { id: 1, heading: "Shampoos", image: ShampooImg, path: "/Shampoos" },
  {
    id: 2,
    heading: "Conditioners",
    image: ConditionerImg,
    path: "/conditioners",
  },
  { id: 3, heading: "Hair Oils", image: HairOilImg, path: "/hair-oils" },
  { id: 4, heading: "Hair Serums", image: HairSerumImg, path: "/hair-serum" },
  { id: 5, heading: "Hair Masks", image: HairMaskImg, path: "/hair-mask" },
  { id: 6, heading: "Hair Colors", image: HairColorImg, path: "/hair-color" },
  { id: 7, heading: "Hair Gels", image: HairGelImg, path: "/hair-gels" },
];

const Haircare = ({
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
            {HaircareItems.map((item, index) => (
              <SwiperSlide key={index}>
                <div>
                  <img
                    src={item.image}
                    alt={`Haircare ${index + 1}`}
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

      {/* Heading */}
      <div>
        <h1
          style={{
            textAlign: "center",
            fontFamily: "sans-serif",
            color: isMenPage
              ? "black"
              : headingColor || (isWomenPage ? "#D63384" : "#333"),
              paddingTop:"20px"
          }}
        >
          Top Haircare Categories
        </h1>
      </div>

      {/* Categories Section */}
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
                gap: "20px",
                marginBottom: "20px",
              }
        }
      >
        {HairCategories.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            style={{
              textDecoration: "none",
              flex: isMenPage ? "0 0 auto" : "initial",
            }}
          >
            <div
              style={{
                width: isMenPage || isWomenPage ? "160px" : "230px",
                borderRadius: "10px",
                overflow: "hidden",
                background: "#fff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                cursor: "pointer",
                border: "2px solid #D63384",
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
              <div style={{ padding: "10px" }}>
                <h3
                  style={{
                    margin: 0,
                    color: "#D63384",
                    textAlign: "center",
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
