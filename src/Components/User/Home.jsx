import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ref, onValue, push, set } from "firebase/database";
import { database } from "../../Firebase";

// Slider Images
import slide1 from "../../assets/HomeSlides/slide1.jpg";
import slide2 from "../../assets/HomeSlides/slide2.jpg";
import slide3 from "../../assets/HomeSlides/slide3.jpg";
import slide4 from "../../assets/HomeSlides/slide4.jpg";
import slide5 from "../../assets/HomeSlides/slide5.jpg";
import slide6 from "../../assets/HomeSlides/slide6.jpg";
import slide7 from "../../assets/HomeSlides/slide7.jpg";
import slide8 from "../../assets/HomeSlides/slide8.jpg";

// Top Categories Images
import Top1 from "../../assets/Categories/Tmakeup.jpg";
import Top2 from "../../assets/Categories/Tskin.jpg";
import Top3 from "../../assets/Categories/Thair.jpg";
import Top4 from "../../assets/Categories/Tperfume.jpg";
import Top5 from "../../assets/Categories/Tbody.jpg";
import Top6 from "../../assets/Categories/Ttools.jpg";

//Skin Types
import Oily from "../../assets/SkinTypes/oily.jpg";
import Dry from "../../assets/SkinTypes/dry.jpg";
import Combination from "../../assets/SkinTypes/combinition.jpg";
import Normal from "../../assets/SkinTypes/normal.jpg";

//Gender
import Women from "../../assets/Gender/Women.jpg";
import Men from "../../assets/Gender/men.jpg";

// Blog
import blog1 from "../../assets/Blog/eyecare.jpg";
import Blog2 from "../../assets/Blog/facecare.jpg";
import Blog3 from "../../assets/Blog/haircare.jpg";

//Icons
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Divider from "@mui/material/Divider";

const settings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,
};

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const slides = [
  {
    image: slide1,
    title: "Unleash Your Inner Beauty",
    subtitle: "Premium makeup essentials for every skin tone",
  },
  {
    image: slide2,
    title: "Explore Our Beauty Range",
    subtitle: "Curated looks for every occasion",
  },
  {
    image: slide3,
    title: "Bold Eyes, Beautiful You",
    subtitle: "Discover eye makeup magic",
  },
  {
    image: slide4,
    title: "Perfect Lips Every Time",
    subtitle: "Matte, glossy, bold — we have it all",
  },
  {
    image: slide5,
    title: "Glow From Head to Toe",
    subtitle: "Body care products to pamper and protect your skin",
  },
  {
    image: slide6,
    title: "Love Your Hair",
    subtitle: "Shampoos, conditioners & serums for every hair type",
  },
  {
    image: slide7,
    title: "Skincare That Shines",
    subtitle: "Hydrate, nourish, and glow — naturally",
  },
  {
    image: slide8,
    title: "Beauty Tools That Work",
    subtitle: "Explore smart appliances for effortless glam",
  },
];

const Top = [
  { image: Top1, title: "MAKEUP", path: "/Makeup" },
  { image: Top2, title: "SKIN", path: "/Skin" },
  { image: Top3, title: "HAIR", path: "/Hair" },
  { image: Top4, title: "FRAGNANCE", path: "/Fragnance" },
  { image: Top5, title: "BATH & HYGINIE", path: "/bath-hygiene" },
  { image: Top6, title: "APPLIANCES & TOOLS", path: "/appliances" },
];
const Skin = [
  { title: "OILY SKIN", image: Oily, path: "/oily-skin" },
  { title: "DRY SKIN", image: Dry, path: "/dryskin" },
  { title: "COMBINATION SKIN", image: Combination, path: "/combinationskin" },
  { title: "NORMAL SKIN", image: Normal, path: "/normalskin" },
];

const Testinomials = [
  {
    name: "Aarushi verma",
    text: "I've finally found skincare that works! The face serum made my skin glow within days. Absolutely in love!",
    title: "verified customer",
    rating: 5,
  },
  {
    name: "Pragati pare",
    text: "From eye cream to lipsticks, everything feels premium. My skin feels hydrated, and the packaging is gorgeous.",
    title: "Regular Buyer",
    rating: 3,
  },
  {
    name: "Sakshi Rathore",
    text: "Customer service was excellent, and the products smell divine. I’ve already recommended this site to friends!",
    title: "Happy Customer",
    rating: 4,
  },
  {
    name: "Aditya Sharma",
    text: "What I love the most is that everything is cruelty-free and skin-friendly. My sensitive skin usually reacts, but these products are gentle and effective.",
    title: "verified customer",
    rating: 5,
  },
  {
    name: "Mehak Mehra",
    text: "The lipsticks are super pigmented and moisturizing. I get compliments every time I wear them. A must-have in every vanity.",
    title: "Makeup Enthusiast",
    rating: 4,
  },
];

const Home = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const isTablet = window.innerWidth > 480 && window.innerWidth <= 768;
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [trending, setTrending] = useState([]);
  const [homeSections, setHomeSections] = useState({
    topCategories: true,
    trending: true,
    blogs: true,
    skinType: true,
    genderSection: true,
  });
  const [userId, setUserId] = useState(() => {});

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

  const handleTrendingClick = async (item) => {
    if (!userId) {
      window.dispatchEvent(new CustomEvent("openLoginModal"));
      return;
    }

    try {
      const logRef = push(ref(database, "UserActivityInfo"));
      await set(logRef, {
        userId: userId,
        productId: item.id || "",
        productName: item.Heading || "",
        category: "Trending",
        productLink: item.link || "",
        timestamp: new Date().toISOString(),
      });

      if (item.link) window.open(item.link, "_blank");
    } catch (err) {
      console.error("Failed to log trending product click:", err);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (location.hash === "#topcategories") {
      setTimeout(() => {
        const element = document.getElementById("topcategories");
        if (element) {
          const yOffset = -100;
          const y =
            element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [location]);

  useEffect(() => {
    const starRef = ref(database, "trendingProducts");
    onValue(starRef, (snap) => {
      const data = snap.val();
      if (data) {
        const arr = Object.values(data).filter((item) => item.active === true);
        setTrending(arr);
      }
    });
  }, []);

  const settingsRef = ref(database, "homepageSettings/sections");

  useEffect(() => {
    onValue(settingsRef, (snapshot) => {
      if (snapshot.exists()) {
        setHomeSections(snapshot.val());
      }
    });
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div
      style={{
        padding: "0 0 10px 0",
        fontFamily: "serif",
        marginTop: "-10px",
      }}
    >
      <p
        style={{
          textAlign: "center",
          color: "black",
          paddingTop: "30px",
          background: "linear-gradient(to right, #8B6A2B, #F8E1A1, #C29A4D)",
          fontFamily: "serif",
          fontSize: "35px",
          fontWeight: "bolder",
          flex: "1 1 100%",
          marginTop: "-20px",
          paddingBottom: "10px",
        }}
      >
        ⭐YOUR ULTIMATE MAKEUP,SKINCARE AND HAIRCARE COLLECTION:DISCOVER YOUR
        PERFECT LOOK⭐
      </p>
      {/* Slider */}
      <div style={{ width: "100%", margin: "0 auto" }}>
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index}>
              <div
                style={{
                  position: "relative",
                  height: "550px",
                  overflow: "hidden",
                  width: "90%",
                  margin: "0 auto",
                  border: "none",
                  borderRadius: "20px",
                }}
              >
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "20%",
                    left: "8%",
                    color: "black",
                    fontWeight: "bolder",
                  }}
                >
                  <h2 style={{ fontSize: "40px", margin: 0, color: "#7d0a0a" }}>
                    {slide.title}
                  </h2>
                  <p style={{ fontSize: "16px", marginTop: "10px" }}>
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {/* Description */}
      <div
        style={{
          marginTop: "40px",
          textAlign: "center",
          maxWidth: "80%",
          marginInline: "auto",
        }}
      >
        <h3
          style={{
            color: "#7d0a0a",
            fontFamily: "serif",
            fontSize: "24px",
          }}
        >
          Discover the Products You Love
        </h3>
        <p style={{ fontSize: "18px", lineHeight: "1.6", color: "#444" }}>
          From bold lipsticks and smudge-proof eyeliners to radiant foundations,
          nourishing skin care, luxurious hair products, and high-tech beauty
          tools — our wide range is designed to bring out your unique beauty
          every day. Explore quality, color, and care — all in one place.
        </p>
      </div>
      <div
        style={{
          width: "100%",
          marginTop: "40px",
        }}
      >
        {/* ✅ Trending Products Section */}
        <div>
          {homeSections.trending && (
            <div
              style={{
                height: "auto",
                marginTop: "20px",
              }}
            >
              <p
                style={{
                  padding: "5px",
                  fontSize: "15px",
                  color: "black",
                  fontFamily: "serif",
                  background:
                    "linear-gradient(to right, #8B6A2B, #F8E1A1, #C29A4D)",
                  width:
                    window.innerWidth <= 480
                      ? "110px" // Mobile
                      : window.innerWidth <= 768
                      ? "130px" // Tablet
                      : "150px", // Desktop (original)
                  marginLeft: "20px",
                  fontWeight: "bold",
                }}
              >
                TRENDING NOW
              </p>
              <h1
                style={{
                  fontFamily: "serif",
                  padding: "5px",
                  marginTop: "-20px",
                  marginLeft: "15px",
                  fontWeight: "400",
                  fontSize:
                    window.innerWidth <= 480
                      ? "18px"
                      : window.innerWidth <= 768
                      ? "22px"
                      : "26px",
                }}
              >
                NEW ARRIVALS
              </h1>

              <Slider
                {...{
                  dots: false,
                  infinite: true,
                  speed: 600,
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  autoplay: true,
                  autoplaySpeed: 2500,
                  responsive: [
                    { breakpoint: 1200, settings: { slidesToShow: 3 } },
                    { breakpoint: 992, settings: { slidesToShow: 3 } },
                    { breakpoint: 768, settings: { slidesToShow: 2 } },
                    { breakpoint: 480, settings: { slidesToShow: 1 } },
                  ],
                }}
              >
                {trending.map((item, index) => (
                  <div
                    key={index}
                    style={{ padding: "6px" }}
                    onClick={() => handleTrendingClick(item)}
                  >
                    <div style={{ textDecoration: "none" }}>
                      <div
                        style={{
                          border: "2px solid #dfb441",
                          padding: "12px",
                          textAlign: "center",
                          boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
                          transition: "0.3s",
                          cursor: "pointer",
                          width: isMobile
                            ? "130px"
                            : window.innerWidth <= 768
                            ? "150px"
                            : "180px",

                          margin: "0 auto",
                          position: "relative",
                        }}
                      >
                        <div>
                          <p
                            style={{
                              background:
                                "linear-gradient(to right, #8B6A2B, #F8E1A1, #C29A4D)",
                              textAlign: "left",
                              width: window.innerWidth < 480 ? "35px" : "40px", // responsive
                              padding: window.innerWidth < 480 ? "2px" : "3px",
                              marginTop: "-5px",
                              fontSize:
                                window.innerWidth < 480 ? "10px" : "12px",
                              fontWeight: "bold",
                              marginLeft: "-10px",
                              position: "absolute",
                            }}
                          >
                            NEW
                          </p>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            height: "auto",
                            aspectRatio: "4/ 4",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={item.image}
                            alt="Product"
                            style={{
                              width: isMobile
                                ? "85%"
                                : window.innerWidth <= 768
                                ? "82%"
                                : "80%",

                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </div>

                        <h4
                          style={{
                            fontSize: isMobile
                              ? "12px"
                              : window.innerWidth <= 768
                              ? "14px"
                              : "15px",

                            fontWeight: "600",
                            color: "#333",
                            marginTop: "10px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.title}
                        </h4>

                        <p
                          style={{
                            fontSize: isMobile
                              ? "18px"
                              : isMobile
                              ? "22px"
                              : "25px",
                            color: "#7d0a0a",
                            marginTop: "4px",
                            fontWeight: "bold",
                          }}
                        >
                          ₹{item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>
      </div>
      {/* Top Categories */}
      {homeSections.topCategories && (
        <div
          id="topcategories"
          style={{ marginTop: "40px", textAlign: "center" }}
        >
          <h2
            className="esponsive-heading"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "black",
              fontFamily: "serif",
              width: "100%",
              marginBottom: "30px",
            }}
          >
            {/* Horizontal Line */}
            <span
              style={{
                flexGrow: 1,
                height: "2px",
                background: "#7d0a0a",
                marginTop: "2px",
              }}
            ></span>
            <span
              style={{
                background:
                  "linear-gradient(to right, #8B6A2B, #F8E1A1, #C29A4D)",
                padding: "5px 10px",
                borderRadius: "4px",
                whiteSpace: "nowrap",
              }}
            >
              TOP CATEGORIES
            </span>

            {/* Horizontal Line */}
            <span
              style={{
                flexGrow: 1,
                height: "2px",
                background: "#7d0a0a",
                marginTop: "2px",
              }}
            ></span>
          </h2>

          <div className="top-categories-grid">
            {Top.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="top-category-card"
                  style={{
                    width: "220px",
                    borderRadius: "18px",
                    overflow: "hidden",
                    background: "black",
                    border: `2px solid #dfb441`,
                    boxShadow: "0 4px 15px rgba(212,175,55,0.2)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ padding: "10px" }}>
                    <h4
                      style={{
                        margin: 0,
                        color: "#dfb441",
                        fontFamily: "serif",
                      }}
                    >
                      {item.title}
                    </h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* Responsive Styles */}
      <style>
        {`
    @media (max-width: 768px) {
      .slider-container {
        height: 300px !important;
      }
      .text-overlay {
        top: 20% !important;
        left: 5% !important;
      }
      .slide-title {
        font-size: 20px !important;
      }
      .slide-subtitle {
        font-size: 14px !important;
      }
      p {
        font-size: 16px !important;
      }
      h3 {
        font-size: 20px !important;
      }
      .top-category-card {
        width: 350px !important;
      }
    }

    @media (max-width: 480px) {
      .slider-container {
        height: 250px !important;
      }
      .slide-title {
        font-size: 18px !important;
      }
      .slide-subtitle {
        font-size: 12px !important;
      }
      .top-category-card {
        width: 180px !important;
      }
    }

    .topbar-search-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1.5%;
      padding: 0 5%;
      flex-wrap: nowrap;
    }
    .icon-section {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      gap: 30px;
      margin-right: 0;
    }

    @media (max-width: 900px) {
      .topbar-search-container {
        justify-content: center;
        padding: 0 3%;
        gap: 10px;
      }
      .search-section input {
        width: 230px !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      .icon-section {
        gap: 25px !important;
      }
      .icon-section svg {
        width: 38px !important;
        height: 38px !important;
      }
    }

    @media (max-width: 600px) {
      .topbar-search-container {
        justify-content: space-around;
        padding: 0 10px;
      }
      .search-section input {
        width: 200px !important;
        height: 32px !important;
        font-size: 14px !important;
      }
      .icon-section {
        gap: 20px !important;
      }
      .icon-section svg {
        width: 34px !important;
        height: 34px !important;
      }
    }

    @media (max-width: 400px) {
      
      .search-section input {
        width: 170px !important;
        font-size: 13px !important;
      }
      .icon-section svg {
        width: 30px !important;
        height: 30px !important;
      }
      .icon-section {
        gap: 15px !important;
      }
    }

    /* ✅ FIXED: Category grid + title text */
    .top-categories-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 10px;
      justify-items: center;
      margin-top: 20px;
    }

    @media (max-width: 1024px) {
      .top-categories-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 768px) {
      .top-categories-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 480px) {
      .top-categories-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* ✅ Text fix for long category names */
    .top-category-card h4 {
      font-size: 16px;
      text-align: center;
      display: -webkit-box;
      -webkit-line-clamp: 2;     /* max 2 lines */
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 40px;
      line-height: 20px;
    }

    .skin-type-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      justify-items: center;
      gap: 30px;
      margin-top: 20px;
    }

    @media (max-width: 1024px) {
      .skin-type-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .skin-type-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 480px) {
      .skin-type-card {
        width: 90% !important;
      }
    }
  `}
      </style>
      <style>
        {`
      
  @media (max-width: 768px) {
    .responsive-heading {
      font-size: 20px !important;
      text-align: center;
      line-height: 1.3;
    }

    .responsive-para {
      font-size: 14px !important;
      line-height: 1.5;
      padding: 0 10px;
      text-align: center;
    }
  }

  @media (max-width: 480px) {
    .responsive-heading {
      font-size: 18px !important;
    }

    .responsive-para {
      font-size: 13px !important;
    }
  }


    @media (max-width: 768px) {
      .slider-container {
        height: 300px !important;
      }
      .text-overlay {
        top: 20% !important;
        left: 5% !important;
      }
      .slide-title {
        font-size: 20px !important;
      }
      .slide-subtitle {
        font-size: 14px !important;
      }
      p {
        font-size: 16px !important;
      }
      h3 {
        font-size: 20px !important;
      }
      .top-category-card {
        width: 180px !important;
      }
    }

    @media (max-width: 480px) {
      .slider-container {
        height: 250px !important;
      }
      .slide-title {
        font-size: 18px !important;
      }
      .slide-subtitle {
        font-size: 12px !important;
      }
      .top-category-card {
        width: 130px !important;
      }
    }

    .topbar-search-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1.5%;
      padding: 0 5%;
      flex-wrap: nowrap;
    }
    .icon-section {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      gap: 30px;
      margin-right: 0;
    }

    @media (max-width: 900px) {
      .topbar-search-container {
        justify-content: center;
        padding: 0 3%;
        gap: 10px;
      }
      .search-section input {
        width: 230px !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      .icon-section {
        gap: 25px !important;
      }
      .icon-section svg {
        width: 38px !important;
        height: 38px !important;
      }
    }

    @media (max-width: 600px) {
      .topbar-search-container {
        justify-content: space-around;
        padding: 0 10px;
      }
      .search-section input {
        width: 200px !important;
        height: 32px !important;
        font-size: 14px !important;
      }
      .icon-section {
        gap: 20px !important;
      }
      .icon-section svg {
        width: 34px !important;
        height: 34px !important;
      }
    }

    @media (max-width: 400px) {
      .topbar-search-container {
        justify-content: space-between;
        padding: 0 5px;
      }
      .search-section input {
        width: 170px !important;
        font-size: 13px !important;
      }
      .icon-section svg {
        width: 30px !important;
        height: 30px !important;
      }
      .icon-section {
        gap: 15px !important;
      }
    }

    /* ✅ FIXED: Category grid + title text */
    .top-categories-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 10px;
      justify-items: center;
      margin-top: 20px;
    }

    @media (max-width: 1024px) {
      .top-categories-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 768px) {
      .top-categories-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 480px) {
      .top-categories-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* ✅ Text fix for long category names */
    .top-category-card h4 {
      font-size: 16px;
      text-align: center;
      display: -webkit-box;
      -webkit-line-clamp: 2;     /* max 2 lines */
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 40px;
      line-height: 20px;
    }

    .skin-type-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      justify-items: center;
      gap: 30px;
      margin-top: 20px;
    }

    @media (max-width: 1024px) {
      .skin-type-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .skin-type-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 480px) {
      .skin-type-card {
        width: 90% !important;
      }
    }
      .gender-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 60px;
  }

  @media (max-width: 600px) {
    .gender-wrapper {
      flex-direction: column;
      gap: 25px;
    }
  }
      
  `}
      </style>
      {homeSections.skinType && (
        <div
          style={{
            marginTop: "80px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: "black",
              fontFamily: "serif",
              background:
                "linear-gradient(to right, #8B6A2B, #F8E1A1, #C29A4D)",
              margin: "0 auto",
              width: "40%",
              padding: "5px",
              // Responsive width
              width: isMobile
                ? "90%" // mobile
                : window.innerWidth <= 1024
                ? "60%" // tablet
                : "40%", // desktop

              // Responsive font size
              fontSize:
                window.innerWidth <= 480
                  ? "16px"
                  : window.innerWidth <= 1024
                  ? "18px"
                  : "20px",
            }}
          >
            SHOP SKINCARE PRODUCTS BY YOUR SKIN TYPE
          </h2>
          <p
            className="responsive-para"
            style={{
              fontFamily: "serif",
              marginTop: "20px",
              margin: "0 auto",
              width: "50%", // Responsive width
              width:
                window.innerWidth <= 480
                  ? "90%" // mobile
                  : window.innerWidth <= 1024
                  ? "70%" // tablet
                  : "50%", // desktop

              // Responsive font size
              fontSize:
                window.innerWidth <= 480
                  ? "13px"
                  : window.innerWidth <= 1024
                  ? "14px"
                  : "15px",
            }}
          >
            "Your skin type plays a major role in choosing the right skincare
            and makeup products. Different skin types require different kinds of
            care and attention. Select your skin type below to receive
            personalized product suggestions.
          </p>
          <div className="skin-type-grid">
            {Skin.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="top-category-card"
                  style={{
                    width: "300px",
                    borderRadius: "18px",
                    overflow: "hidden",
                    background: "black",
                    border: `2px solid #dfb441`,
                    boxShadow: "0 4px 15px rgba(212,175,55,0.2)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "pointer",
                    marginTop: "20px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.06)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 25px rgba(212,175,55,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(212,175,55,0.2)";
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ padding: "10px" }}>
                    <h4
                      style={{
                        margin: 0,
                        color: "#dfb441",
                        fontFamily: "serif",
                      }}
                    >
                      {item.title}
                    </h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {/*SKin................*/}
      {/** gender */}
      {homeSections.genderSection && (
        <div style={{ marginTop: "80px", textAlign: "center" }}>
          <h2
            style={{
              color: "black",
              fontFamily: "serif",
              background:
                "linear-gradient(to right, #8B6A2B, #F8E1A1, #C29A4D)",
              margin: "0 auto",
              width: "15%",
              padding: "5px",
              marginBottom: "20px",
              // Responsive width
              width:
                window.innerWidth <= 480
                  ? "55%" // mobile
                  : window.innerWidth <= 1024
                  ? "30%" // tablet
                  : "15%", // desktop (your original UI)

              // Responsive font size
              fontSize:
                window.innerWidth <= 480
                  ? "16px"
                  : window.innerWidth <= 1024
                  ? "18px"
                  : "20px",
            }}
          >
            SHOP BY GENDER
          </h2>

          <div className="gender-wrapper">
            {/* Women */}
            <Link to="/women" style={{ textDecoration: "none" }}>
              <div
                style={{
                  width: "300px",
                  borderRadius: "18px",
                  overflow: "hidden",
                  background: "black",
                  border: "2px solid #dfb441",
                  boxShadow: "0 4px 15px rgba(212,175,55,0.2)",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
              >
                <img
                  src={Women}
                  alt="Women"
                  style={{ width: "100%", height: "250px", objectFit: "cover" }}
                />
                <div style={{ padding: "10px" }}>
                  <h4
                    style={{ color: "#dfb441", margin: 0, fontFamily: "serif" }}
                  >
                    WOMEN
                  </h4>
                </div>
              </div>
            </Link>

            {/* Men */}
            <Link to="/men" style={{ textDecoration: "none" }}>
              <div
                style={{
                  width: "300px",
                  borderRadius: "18px",
                  overflow: "hidden",
                  background: "black",
                  border: "2px solid #dfb441",
                  boxShadow: "0 4px 15px rgba(212,175,55,0.2)",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
              >
                <img
                  src={Men}
                  alt="Men"
                  style={{ width: "100%", height: "250px", objectFit: "cover" }}
                />
                <div style={{ padding: "10px" }}>
                  <h4
                    style={{ color: "#dfb441", margin: 0, fontFamily: "serif" }}
                  >
                    MEN
                  </h4>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
      {/** Blog1..................... */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap", // ✅ allows responsive wrapping
          justifyContent: "center", // ✅ centers content on all screens
          alignItems: "center",
          gap:
            window.innerWidth <= 480
              ? "15px"
              : window.innerWidth <= 1024
              ? "25px"
              : "40px", // ✅ dynamic spacing
          padding: window.innerWidth <= 480 ? "15px" : "30px",

          marginTop: "10px",
          boxSizing: "border-box",
        }}
      >
        {homeSections.blogs && (
          <div
            style={{
              width:
                window.innerWidth <= 480
                  ? "90%" // mobile
                  : window.innerWidth <= 1024
                  ? "55%" // tablet
                  : "40%", // desktop
              background: "white",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              overflow: "hidden",
              textAlign: "center",
              padding: "10px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              minHeight: "430px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "2px Solid #dfb441",
              borderRadius: "12px",
            }}
          >
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  margin: "0 auto",
                  color: "#7d0a0a",
                }}
              >
                Explore our Eyecare essentials and unlock the secret to glowing,
                confident eyes
              </h2>
              <p
                style={{
                  width: "100%",
                  maxWidth: "450px",
                  margin: "20px auto",
                  lineHeight: "1.4",
                  fontSize: "14px",
                  color: "#333",
                }}
              >
                Your eyes deserve the best care. Whether it's dark circles,
                puffiness, or dryness, our eyecare collection is designed to
                refresh and protect your under-eye area. With hydrating creams
                and powerful serums, we help reduce fine lines, wrinkles, and
                signs of fatigue for a brighter, youthful look.
              </p>
            </div>
            <div style={{ flex: 1 }}>
              <img
                src={blog1}
                alt="Eyecare"
                style={{
                  width: "100%",
                  height:
                    window.innerWidth <= 480
                      ? "180px"
                      : window.innerWidth <= 1024
                      ? "200px"
                      : "250px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>
        )}
        {/** Blog1..................... */}
        {/** Blog2..................... */}
        {homeSections.blogs && (
          <div
            style={{
              width:
                window.innerWidth <= 480
                  ? "90%" // mobile
                  : window.innerWidth <= 1024
                  ? "55%" // tablet
                  : "40%", // desktop
              background: "white",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              overflow: "hidden",
              textAlign: "center",
              padding: "12px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              minHeight: "400px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "2px solid #dfb441",
              borderRadius: "12px",
            }}
          >
            <div style={{ flex: 1 }}>
              <img
                src={Blog2}
                alt="Facecare"
                style={{
                  width: "100%",
                  height:
                    window.innerWidth <= 480
                      ? "180px"
                      : window.innerWidth <= 1024
                      ? "200px"
                      : "250px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  margin: "0 auto",
                  color: "#7d0a0a",
                }}
              >
                Nourish, Rejuvenate, and Glow: The Ultimate Face Care Ritual
              </h2>
              <p
                style={{
                  width: "100%", // <-- full width so text never overflows
                  maxWidth: "450px", // <-- desktop par same UI rahe
                  margin: "20px auto",
                  lineHeight: "1.4",
                  fontSize: "14px",
                  color: "#333",
                }}
              >
                Your face deserves the finest care — it's the true canvas of
                your beauty. Whether you're targeting acne, reducing
                pigmentation, or keeping your skin naturally radiant, the right
                products make all the difference.Nourish it with gentle
                cleansers,moisturizers,and brightening serums for a radiant
                glow.
              </p>
            </div>
          </div>
        )}
        {/** Blog2..................... */}
        {/** Blog 3................. */}
      </div>
      {/* Testimonials..................... */}
      <h2
        style={{
          color: "black",
          fontFamily: "serif",
          background: "linear-gradient(to right, #8B6A2B, #F8E1A1, #C29A4D)",
          margin: "0 auto",
          width: "15%",
          padding: "5px",
          marginBottom: "20px",
          textAlign: "center",
          // Responsive Width
          width:
            window.innerWidth <= 480
              ? "60%" // Mobile
              : window.innerWidth <= 1024
              ? "35%" // Tablet
              : "18%", // Desktop (your original)

          // Responsive Font Size
          fontSize:
            window.innerWidth <= 480
              ? "16px"
              : window.innerWidth <= 1024
              ? "18px"
              : "20px",
        }}
      >
        REVIEW BY CUSTOMER
      </h2>
      <div
        style={{
          background: "linear-gradient(to right, #8B6A2B, #F8E1A1, #C29A4D)",
          padding: "30px",
          width: "80%",
          margin: "0 auto",
          borderRadius: "20px",
          marginBottom: "15px",
        }}
      >
        <Slider {...sliderSettings}>
          {Testinomials.map((testimonial, index) => (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: "30px",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                {/* Circle with first letter */}
                <div
                  style={{
                    borderRadius: "50%",
                    height: "200px",
                    width: "200px",
                    backgroundColor: "white",
                    color: "black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "50px",
                    fontWeight: "bold",
                    userSelect: "none",
                  }}
                >
                  {testimonial.name.charAt(0).toUpperCase()}
                </div>
                <div style={{ maxWidth: isMobile ? "90%" : "100%" }}>
                  <h2
                    style={{
                      color: "#7d0a0a",
                      fontWeight: "bold",
                      fontFamily: "serif",
                    }}
                  >
                    {testimonial.name}
                  </h2>
                  <p>"{testimonial.text}"</p>
                  {/* Star rating */}
                  <div>
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        style={{
                          color: i < testimonial.rating ? "#7d0a0a" : "#D4AF37",
                          fontSize: "25px",
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>{" "}
      {/* Testimonials..................... */}
    </div>
  );
};

export default Home;
