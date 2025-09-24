import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

// Skincare Banner Images
import Skincare1 from "../../../assets/SkinSubpage/Sslides/SkinMAMA.jpg";
import Skincare2 from "../../../assets/SkinSubpage/Sslides/SkinJoy.webp";
import Skincare3 from "../../../assets/SkinSubpage/Sslides/SkinMINI.webp";
import Skincare4 from "../../../assets/SkinSubpage/Sslides/Skincetaphil.jpg";
import Skincare5 from "../../../assets/SkinSubpage/Sslides/SkinVselline.jpg";

// Category Images
import MoisturizerImg from "../../../assets/SkinSubpage/Scategories/Moisturizer.jpg";
import CleanserImg from "../../../assets/SkinSubpage/Scategories/Cleanser.jpg";
import SerumImg from "../../../assets/SkinSubpage/Scategories/Serum.jpg";
import SunscreenImg from "../../../assets/SkinSubpage/Scategories/Sunscreen.jpg";
import FacemaskImg from "../../../assets/SkinSubpage/Scategories/Facemask.jpg";
import BodylotionImg from "../../../assets/SkinSubpage/Scategories/Bodylotions.jpg";
import ScrubsImg from "../../../assets/SkinSubpage/Scategories/Scrubs.jpg";

const SkincareItems = [
  { image: Skincare1 },
  { image: Skincare2 },
  { image: Skincare3 },
  { image: Skincare4 },
  { image: Skincare5 },
];

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
            autoplay={{ delay: 2500, disableOnInteraction:false }}
            loop={true}
            style={{ paddingBottom: "20px" ,paddingTop:"3%"}}
          >
            {SkincareItems.map((item, index) => (
              <SwiperSlide key={index}>
                <div>
                  <img
                    src={item.image}
                    alt={`Skincare ${index + 1}`}
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
          Top Skincare Categories
        </h1>
      </div>

      {/* Categories */}
      {isMenPage || isWomenPage ? (
        <div
          style={{
            display: "flex",
            gap: "30px",
            overflowX: "auto",
            padding: "10px 0",
            scrollbarWidth: "thin",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {Categories.map((item) => (
            <Link
              to={item.path}
              key={item.id}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  minWidth: "160px",
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
                    height: "180px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ padding: "10px" }}>
                  <h3
                    style={{
                      margin: 0,
                      color: "#D63384",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                  >
                    {item.heading}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <>
          {/* First Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "30px",
              marginBottom: "20px",
            }}
          >
            {Categories.slice(0, 7).map((item, index) => (
              <Link
                to={item.path}
                key={index}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    width: "200px",
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
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ padding: "10px" }}>
                    <h3
                      style={{
                        margin: 0,
                        color: "#D63384",
                        textAlign: "center",
                        fontSize: "18px",
                      }}
                    >
                      {item.heading}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Second Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "30px",
              marginBottom: "20px",
            }}
          >
            {Categories.slice(7).map((item, index) => (
              <Link
                to={item.path}
                key={index + 4}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    width: "200px",
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
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ padding: "10px" }}>
                    <h3
                      style={{
                        margin: 0,
                        color: "#D63384",
                        textAlign: "center",
                        fontSize: "18px",
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
      )}
    </>
  );
};

export default Skin;
