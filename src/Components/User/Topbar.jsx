import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LOGO from "../../assets/Topbar/glow_aesthetic_logo.svg";

const Topbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        // Close mobile menu when switching to desktop
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = ["Home", "Categories", "Brands", "Contact", "About"];

  const getLinkPath = (item) => {
    if (item === "Home") return "/";
    if (item === "Categories") return "/#topcategories";
    return `/${item}`;
  };

  return (
    <>
      <div style={{ position: "relative", width: "100%" }}>
        {/* Topbar */}
        <div
          style={{
            background: "pink",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            boxSizing: "border-box",
            height: "150px",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1000,
            paddingLeft:"20px"
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginLeft: "20px",
            }}
          >
            <img src={LOGO} alt="Website Logo" style={{ height: "100px" }} />
            <h1
              style={{
                color: "#D63384",
                fontSize: "40px",
                fontFamily: "cursive",
                margin: 0,
              }}
            >
              Glowthic
            </h1>
          </div>

          {/* Hamburger Icon */}
          <div

            style={{
              display: isMobile ? "block" : "none",
              fontSize: "30px",
              color: "white",
              cursor: "pointer",
              padding: "10px", // improve touch area without visual change
              userSelect: "none",
            }}
            onClick={toggleMenu}
            role="button"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                toggleMenu();
              }
            }}
          >
            &#9776;
          </div>

          {/* Desktop Nav Links */}
          <div
           
            style={{
              display: isMobile ? "none" : "flex",
              gap: "30px",
              alignItems: "center",
              color: "white",
              cursor: "pointer",
              paddingRight: "30px",
            }}
          >
            {navItems.map((item, i) => (
              <h3 key={i} style={{ margin: 0 }}>
                <Link
                  to={getLinkPath(item)}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {item}
                </Link>
              </h3>
            ))}
          </div>
        </div>

        {/* Spacer so content isn't hidden under fixed topbar */}
        <div style={{ height: "150px", width: "100%" }} />

        {/* Mobile Menu (Dropdown) */}
        {isMobile && isMobileMenuOpen && (
          <div
            style={{
              background: "pink",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: "15px 0",
              textAlign: "center",
            }}
          >
            {navItems.map((item, i) => (
              <Link
                key={i}
                to={getLinkPath(item)}
                onClick={toggleMenu}
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "18px",
                }}
              >
                {item}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Topbar;
