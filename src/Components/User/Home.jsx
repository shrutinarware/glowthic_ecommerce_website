import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const settings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
};

const sliderSettings = {
  dots: true,
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
  { image: Top1, title: "Makeup", path: "/Makeup" },
  { image: Top2, title: "Skin", path: "/Skin" },
  { image: Top3, title: "Hair", path: "/Hair" },
  { image: Top4, title: "Fragnance", path: "/Fragnance" },
  { image: Top5, title: "Bath & Hygiene", path: "/bath-hygiene" },
  { image: Top6, title: "Appliances & Beauty Tools", path: "/appliances" },
];
const Skin = [
  { title: "Oily skin", image: Oily, path: "/oily-skin" },
  { title: "Dry Skin", image: Dry, path: "/dryskin" },
  { title: "Combination Skin", image: Combination, path: "/combinationskin" },
  { title: "Normal Skin", image: Normal, path: "/normalskin" },
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

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024); // includes tablets
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (location.hash === "#topcategories") {
      setTimeout(() => {
        const element = document.getElementById("topcategories");
        if (element) {
          const yOffset = -100; // 👈 adjust based on Topbar height
          const y =
            element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }

    //.......................................
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // also include tablets
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [location]);

  return (
    <div style={{ padding: "1% 0 10px 10px", fontFamily: "sans-serif" }}>
      <p
        style={{
          textAlign: "center",
          color: "#D63384",
          fontFamily: "cursive",
          fontSize: "30px",
          fontWeight: "bolder",
        }}
      >
        Your Ultimate Makeup and SkinCare Collection: Discover Your Perfect Look
      </p>
      {/* Slider */}
      <div style={{ width: "80%", margin: "0 auto" }}>
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index}>
              <div
                style={{
                  position: "relative",
                  height: "550px",
                  overflow: "hidden",
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
                    borderRadius: "20px",
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
                  <h2 style={{ fontSize: "40px", margin: 0 ,color: "#D63384",}}>{slide.title}</h2>
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
          style={{ color: "#D63384", fontFamily: "cursive", fontSize: "24px" }}
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
      {/* Top Categories */}
      <div
        id="topcategories"
        style={{
          marginTop: "100px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#D63384", fontFamily: "cursive" }}>
          Top Categories
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "30px",
            marginTop: "20px",
          }}
        >
          {Top.map((item, index) => (
            <Link key={index} to={item.path} style={{ textDecoration: "none" }}>
              <div
                className="top-category-card"
                style={{
                  width: "250px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  textAlign: "center",
                  backgroundColor: "#fff",
                  transition: "transform 0.3s ease",
                  color: "#000",
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
                  <h4 style={{ margin: 0, color: "#D63384" }}>{item.title}</h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
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
              width: 150px !important;
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
            
        `}
      </style>
      <div
        style={{
          marginTop: "50px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#D63384", fontFamily: "cursive" }}>
          Shop Skincare Products by Your Skin Type
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "30px",
            marginTop: "20px",
          }}
        >
          {Skin.map((item, index) => (
            <Link
              key={index}
              to={item.path} // ✅ Correct path!
              style={{ textDecoration: "none" }}
            >
              <div
                className="top-category-card"
                style={{
                  width: "300px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  textAlign: "center",
                  backgroundColor: "#fff",
                  transition: "transform 0.3s ease",
                  color: "#000",
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
                  <h4 style={{ margin: 0, color: "#D63384" }}>{item.title}</h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/*SKin................*/}
      {/** gender */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          gap: isMobile ? "20px" : "60px",
          paddingTop: "10px",
          color: "#D63384",
          fontFamily: "cursive",
        }}
      >
        <Link
          to="/women"
          style={{
            textAlign: "center",
            textDecoration: "none",
            color: "#D63384",
          }}
        >
          <h1>Women</h1>
          <img
            src={Women}
            alt="Women"
            style={{
              height: "350px",
              width: isMobile ? "300px" : "600px",
              maxWidth: "100%",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          />
        </Link>

        <Link
          to="/men"
          style={{
            textAlign: "center",
            textDecoration: "none",
            color: "#D63384",
          }}
        >
          <h1>Men</h1>
          <img
            src={Men}
            alt="Men"
            style={{
              height: "350px",
              width: isMobile ? "300px" : "600px",
              maxWidth: "100%",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          />
        </Link>
      </div>
      {/** Blog1..................... */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          background: "#e3e1e1",
          padding: "30px",
          gap: "40px",
          width: "70%",
          margin: "40px auto",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          height: isMobile ? "auto" : "400px",
          borderRadius: "20px",
        }}
      >
        <div style={{ textAlign: "center", flex: 1 }}>
          <h1 style={{ maxWidth: "700px", margin: "0 auto", color: "#D63384" }}>
            Explore our Eyecare essentials and unlock the secret to glowing,
            confident eyes
          </h1>
          <p
            style={{
              Width: "450px",
              margin: "20px auto",
              lineHeight: "1.6",
              fontSize: "16px",
              color: "#333",
            }}
          >
            Your eyes deserve the best care. Whether it's dark circles,
            puffiness, or dryness, our eyecare collection is designed to refresh
            and protect your under-eye area. With hydrating creams and powerful
            serums, we help reduce fine lines, wrinkles, and signs of fatigue
            for a brighter, youthful look.
          </p>
          <h3 style={{ color: "#555", marginTop: "20px" }}>
            Say goodbye to tired eyes and hello to a refreshed, radiant gaze.
          </h3>
        </div>

        <div style={{ flex: 1 }}>
          <img
            src={blog1}
            alt="Eyecare"
            style={{
              width: "100%",
              maxWidth: "550px",
              height: isMobile ? "auto" : "400px",
              borderRadius: "20px",
              mixBlendMode: "multiply",
              objectFit: "cover",
              opacity: 0.9,
            }}
          />
        </div>
      </div>
      {/** Blog1..................... */}
      {/** Blog2..................... */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          background: "#e3e1e1",
          padding: "30px",
          gap: "40px",
          width: "70%",
          margin: "40px auto",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          height: isMobile ? "auto" : "400px",
          borderRadius: "20px",
        }}
      >
        <div style={{ flex: 1 }}>
          <img
            src={Blog2}
            alt="Facecare"
            style={{
              width: "100%",
              maxWidth: "550px",
              height: isMobile ? "auto" : "400px",
              borderRadius: "20px",
              mixBlendMode: "multiply",
              objectFit: "cover",
              opacity: 0.9,
            }}
          />
        </div>
        <div style={{ textAlign: "center", flex: 1 }}>
          <h1 style={{ maxWidth: "700px", margin: "0 auto", color: "#D63384" }}>
            Nourish, Rejuvenate, and Glow: The Ultimate Face Care Ritual
          </h1>
          <p
            style={{
              Width: "450px",
              margin: "20px auto",
              lineHeight: "1.6",
              fontSize: "16px",
              color: "#333",
            }}
          >
            Your face deserves the finest care — it's the canvas of your beauty.
            Whether you're aiming to combat acne, reduce pigmentation, or simply
            maintain radiant, balanced skin, our face care collection has been
            designed with all skin types in mind. From deeply hydrating
            moisturizers and brightening serums to gentle cleansers and
            exfoliants.
          </p>
          <h3 style={{ color: "#555", marginTop: "20px" }}>
            Let your natural beauty shine through with every step.
          </h3>
        </div>
      </div>
      {/** Blog2..................... */}
      {/* Testimonials..................... */}
      <p
        style={{
          textAlign: "center",
          color: "#D63384",
          fontFamily: "cursive",
          fontSize: "40px",
          fontWeight: "bolder",
        }}
      >
        Review by Customers
      </p>
      <div
        style={{
          background: "#e3e1e1",
          padding: "30px",
          width: "80%",
          margin: "0 auto",
          borderRadius: "20px",
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
                    backgroundColor: "#D63384",
                    color: "white",
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
                      color: "#D63384",
                      fontWeight: "bold",
                      fontFamily: "cursive",
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
                          color: i < testimonial.rating ? "#D63384" : "#ccc", // yellow for filled stars
                          fontSize: "30px",
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
