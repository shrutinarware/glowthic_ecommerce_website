import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const About = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (location.hash === "#hiwe'reglowthic") {
      setTimeout(() => {
        const element = document.getElementById("hiwe'reglowthic");
        if (element) {
          const yOffset = -100;
          const y =
            element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div style={{ padding: "0 10px", boxSizing: "border-box" }}>
      {/* Intro Section */}
      <div
        style={{
          minHeight: "300px",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        <p
          id="hiwe'reglowthic"
          style={{ fontSize: isMobile ? "40px" : "50px" }}
        >
          Hi we're{" "}
          <span
            style={{
              color: "#D63384",
              fontWeight: "bolder",
              fontSize: isMobile ? "60px" : "90px",
              fontFamily: "cursive",
            }}
          >
            Glowthic
          </span>
        </p>
        <p style={{ fontSize: isMobile ? "22px" : "34px", marginTop: "-30px" }}>
          your go-to destination for skincare that celebrates natural beauty and
          effortless glow.
        </p>
      </div>

      {/* Brand Story */}
      <div
        style={{
          background: "#e3e1e1",
          border: "2px solid pink",
          borderRadius: "20px",
          margin: "0 auto",
          padding: isMobile ? "20px" : "40px",
          maxWidth: "1200px",
          textAlign: "justify",
        }}
      >
        <p style={{ fontSize: "18px", lineHeight: "1.8" }}>
          At <strong>Glowthic</strong>, we believe that skincare is more than
          just a routine — it's a form of self-love. Born from a passion for
          radiant skin and clean beauty, Glowthic blends modern aesthetics with
          effective, skin-friendly ingredients to bring you products that
          celebrate your natural glow. We're here for every version of you —
          whether you're chasing hydration, targeting tired skin, or simply
          indulging in a moment of care.
          <br />
          <br />
          Our products are thoughtfully crafted to suit all skin types, with a
          focus on minimalism, nourishment, and long-term results. Our community
          is at the heart of everything we do. We celebrate diversity,
          self-expression, and the beauty of being uniquely you. Whether you're
          just beginning your skincare journey or refining your ritual, we're
          honored to walk beside you every step of the way.
        </p>
      </div>

      {/* Vision and Mission */}
      <div
        style={{
          margin: "30px auto",
          padding: isMobile ? "20px" : "40px",
          maxWidth: "1300px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "30px",
          justifyContent: "center",
        }}
      >
        {/* Vision */}
        <div
          style={{
            background: "#e3e1e1",
            border: "2px solid pink",
            borderRadius: "20px",
            padding: "20px",
            flex: 1,
          }}
        >
          <h1
            style={{
              color: "#D63384",
              fontWeight: "bolder",
              fontFamily: "cursive",
              textAlign: "center",
            }}
          >
            Our Vision
          </h1>
          <p
            style={{
              fontSize: "15px",
              textAlign: "center",
              marginTop: "10px",
              lineHeight: "1.6",
            }}
          >
            To be more than a skincare brand — to become a part of your
            self-care story. We want you to feel beautiful in your skin,
            confident in your choices, and empowered every time you look in the
            mirror. At Glowthic, we envision a future where everyone —
            regardless of skin type, gender, or background — feels seen,
            celebrated, and cared for. A future where glowing skin is not a
            luxury, but a right. And most importantly, a future where beauty is
            inclusive, intentional, and unapologetically real.
          </p>
        </div>

        {/* Mission */}
        <div
          style={{
            background: "#e3e1e1",
            border: "2px solid pink",
            borderRadius: "20px",
            padding: "20px",
            flex: 1,
          }}
        >
          <h1
            style={{
              color: "#D63384",
              fontWeight: "bolder",
              fontFamily: "cursive",
              textAlign: "center",
            }}
          >
            Our Mission
          </h1>
          <p
            style={{
              fontSize: "15px",
              textAlign: "center",
              marginTop: "10px",
              lineHeight: "1.6",
            }}
          >
            To empower individuals to embrace their skin with confidence. We’re
            redefining beauty as something that’s simple, real, and entirely
            yours. At Glowthic, we aim to create high-quality, effective, and
            affordable skincare that supports your unique journey — no matter
            your age, gender, or skin type. We are committed to transparency in
            ingredients, sustainability in practice, and compassion in
            everything we do. Through education, innovation, and community, our
            mission is to make skincare accessible, joyful, and deeply personal
            for everyone.
          </p>
        </div>
      </div>

      {/* Final Message */}
      <div
        style={{
          padding: "0 10px 40px",
          textAlign: "center",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h3 style={{ fontSize: isMobile ? "16px" : "18px", lineHeight: "1.6" }}>
          At Glowthic, we're here to remind you that beauty isn't about
          perfection — it's about feeling good in your own skin. Our goal is to
          make skincare feel less like a chore and more like a moment of care
          you look forward to. Thank you for trusting us with your glow — we
          can’t wait to grow with you.
          <br />
          <br />
          With all our love,
          <br />
          <strong style={{color: "#D63384",fontSize:"25px"}}>Team Glowthic</strong>
        </h3>
      </div>
    </div>
  );
};

export default About;
