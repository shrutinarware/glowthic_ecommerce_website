import React, { useState, useEffect } from "react";
import LOGO from "../../assets/Topbar/logo.jpg.png";
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

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "normal",
    transition: "all 0.3s ease",
  };

  const hoverStyle = {
    fontWeight: "bold",
  };

  return (
    <div
      style={{
        background: "black",
        width: "100%",
        minHeight: "280px",
        textAlign: "center",
        boxSizing: "border-box",
        padding: "0 16px 20px",
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
            flexDirection: "column",
            textAlign: isMobile ? "center" : "left",
            maxWidth: "400px",
          }}
        >
          <img
            src={LOGO}
            alt="Glowthic Logo"
            style={{
              width: isMobile ? "230px" : "250px",
              height: "auto",
              objectFit: "contain",
              marginTop: "15px",
            }}
          />
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
            <h3 style={{ marginBottom: "10px", color: "#dfb441" }}>
              Quick Links
            </h3>
            <p>
              <Link
                to="/#topcategories"
                style={linkStyle}
                onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
                onMouseLeave={(e) => Object.assign(e.target.style, linkStyle)}
              >
                Categories
              </Link>
            </p>
            <p>
              <Link
                to="/Brands"
                style={linkStyle}
                onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
                onMouseLeave={(e) => Object.assign(e.target.style, linkStyle)}
              >
                Brands
              </Link>
            </p>
            <p>
              <Link
                to="/About"
                style={linkStyle}
                onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
                onMouseLeave={(e) => Object.assign(e.target.style, linkStyle)}
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
                style={{ color: "#dfb441", textDecoration: "none" }}
              >
                Contact Us
              </Link>
            </h3>
            <p style={{ color: "white" }}>
              Call:
              <span style={{ fontWeight: "bolder", color: "white" }}>
                {" "}
                +91 8349759769
              </span>
            </p>
            <p style={{ color: "white" }}>
              Whatsapp:{" "}
              <span style={{ fontWeight: "bolder", color: "white" }}>
                {" "}
                8349759769
              </span>
            </p>
            <p style={{ color: "white" }}>
              Email:
              <span style={{ fontWeight: "bolder", color: "white" }}>
                {" "}
                glowthicteam@gmail.com
              </span>
            </p>
          </div>
        </div>
      </div>
      <p
        style={{
          marginTop: "-10px",
          fontSize: "14px",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        © 2025 Glowthic. All Rights Reserved.
      </p>
    </div>
  );
};
export default Footer;
