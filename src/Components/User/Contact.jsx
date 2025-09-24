import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Contact = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (location.hash === "#contactglowthic") {
      setTimeout(() => {
        const element = document.getElementById("contactglowthic");
        if (element) {
          const yOffset = -100;
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  // Reusable input style
  const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  };

  return (
    <div >
      <div style={{ height: "40px" ,}} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1
          id="contactglowthic"
          style={{ fontSize: "40px", color: "#D63384", fontFamily: "cursive" }}
        >
          Contact Glowthic
        </h1>
        <p style={{ fontSize: "18px", color: "#555" }}>
          We'd love to hear from you. Whether it's a question, feedback, or just a hello — reach out!
        </p>
      </div>

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "20px",
          maxWidth: "1000px",
          margin: "30px auto",
          background: "#fff",
          padding: "30px",
          border:"1px solid #D63384",
          borderRadius: "15px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        {/* Contact Info */}
        <div style={{ flex: 1 }}>
          <h2 style={{ color: "#D63384" }}>Get in Touch</h2>
          <p><strong>Email:</strong> support@glowthic.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>WhatsApp:</strong> +91 98765 43210</p>
          <p style={{ marginTop: "20px" }}>
            <strong>Customer Support Hours:</strong><br />
            Monday - Saturday<br />
            10:00 AM - 6:00 PM (IST)
          </p>
        </div>

        {/* Contact Form */}
        <div style={{ flex: 1 }}>
          <h2 style={{ color: "#D63384", marginBottom: "15px" }}>Send us a Message</h2>
          <form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input type="text" placeholder="Your Name" style={inputStyle} />
            <input type="email" placeholder="Your Email" style={inputStyle} />
            <textarea placeholder="Your Message" rows="5" style={inputStyle} />
            <button
              type="button"
              style={{
                padding: "10px 20px",
                background: "#D63384",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
