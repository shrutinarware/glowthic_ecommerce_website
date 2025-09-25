// src/pages/BeautyAppliances.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

// Beauty Appliances Banner Images (replace with your own images)
import BeautyApp1 from "../../../assets/AppliancesSubpage/Aslider/appliances1.jpg";
import BeautyApp2 from "../../../assets/AppliancesSubpage/Aslider/appliances2.jpg";
import BeautyApp3 from "../../../assets/AppliancesSubpage/Aslider/appliances3.jpg";

// Category Images (replace with your own images)
import HairDryerImg from "../../../assets/AppliancesSubpage/Acategory/dryer.jpg";
import StraightenerImg from "../../../assets/AppliancesSubpage/Acategory/straightner.jpg";
import CurlingIronImg from "../../../assets/AppliancesSubpage/Acategory/curler.jpg";
import TrimmerImg from "../../../assets/AppliancesSubpage/Acategory/trimmer.jpg";
import FacialSteamerImg from "../../../assets/AppliancesSubpage/Acategory/steamer.jpg";
import EpilatorImg from "../../../assets/AppliancesSubpage/Acategory/epillator.jpg";
import MassageImg from "../../../assets/AppliancesSubpage/Acategory/ftools.jpg";

const AppliancesItems = [
  { image: BeautyApp1 },
  { image: BeautyApp2 },
  { image: BeautyApp3 },
];

const AppliancesCategories = [
  { id: 1, heading: "Hair Dryers", image: HairDryerImg, path: "/hair-dryers" },
  { id: 2, heading: " Hair Straighteners", image: StraightenerImg, path: "/straighteners" },
  { id: 3, heading: " Hair Curlers", image: CurlingIronImg, path: "/curlers" },
  { id: 4, heading: "Trimmers", image: TrimmerImg, path: "/trimmers" },
  { id: 5, heading: "Facial Steamers", image: FacialSteamerImg, path: "/facial-steamers" },
  { id: 6, heading: "Epilators", image: EpilatorImg, path: "/epilators" },
  {id:7, heading:"Massage Tools", image:MassageImg, path:"/massage"},
];

const Appliances = ({
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
            style={{ paddingBottom: "20px", paddingTop: "3%" }}
          >
            {AppliancesItems.map((item, index) => (
              <SwiperSlide key={index}>
                <div>
                  <img
                    src={item.image}
                    alt={`Beauty Appliance ${index + 1}`}
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
            paddingTop: "20px",
          }}
        >
          Top Beauty Appliances & Tools
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
        {AppliancesCategories.map((item, index) => (
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

export default Appliances;
