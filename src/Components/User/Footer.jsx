import React, { useState, useEffect } from "react";
import LOGO from "../../assets/Topbar/glow_aesthetic_logo.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        background: "pink",
        width: "100%",
        minHeight: "280px",
        textAlign: "center",
        boxSizing: "border-box",
        padding: "0 16px 20px", // Equal left and right padding
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: isMobile ? "center" : "space-between",
          alignItems: isMobile ? "center" : "flex-start",
          padding: "40px 0",
          gap: isMobile ? "30px" : "0",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {/* Left Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexDirection: isMobile ? "column" : "row",
            textAlign: isMobile ? "center" : "left",
            maxWidth: "400px",
          }}
        >
          <img
            src={LOGO}
            alt="Glowthic Logo"
            style={{
              width: isMobile ? "80px" : "100px",
              height: "auto",
              objectFit: "contain",
            }}
          />
          <div>
            <h1
              style={{
                color: "#D63384",
                fontFamily: "cursive",
                fontWeight: "bolder",
                margin: "0",
              }}
            >
              Glowthic
            </h1>
            <p style={{ marginTop: "5px" }}>
              Your one-stop destination for skincare, self-care, and confidence.
            </p>
          </div>
        </div>

        {/* Right Columns */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "30px" : "60px",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          {/* Quick Links */}
          <div>
            <h3 style={{ marginBottom: "10px" }}>Quick Links</h3>
            <p>
              <Link
                to="/#topcategories"
                style={{ color: "black", textDecoration: "none" }}
              >
                Categories
              </Link>
            </p>
            <p>
              <Link
                to="/Brands"
                style={{ color: "black", textDecoration: "none" }}
              >
                Brands
              </Link>
            </p>
            <p>
              <Link
                to="/About"
                style={{ color: "black", textDecoration: "none" }}
              >
                About
              </Link>
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3>
              <Link
                to="/contact"
                style={{ color: "black", textDecoration: "none" }}
              >
                Contact Us
              </Link>
            </h3>
            <p>Call:</p>
            <p>Whatsapp:</p>
            <p>Email:</p>
          </div>
        </div>
      </div>

      <p style={{ marginTop: "-10px", fontSize: "14px" }}>
        © 2025 Glowthic. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
