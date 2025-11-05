import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { database } from "../../Firebase"; // Make sure your Firebase config is correct
import { ref, push, set } from "firebase/database";

const Contact = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll to top or hash
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (location.hash === "#contactglowthic") {
      setTimeout(() => {
        const element = document.getElementById("contactglowthic");
        if (element) {
          const yOffset = -100;
          const y =
            element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid  #D63384",
    fontFamily: "cursive",
    fontSize: "16px",
    color: "black",
  };
  const handleSubmit = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedContact = contact.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedContact || !trimmedMessage) {
      setError("Please fill all fields!");
      return;
    }
    // Email validation (simple regex)
    const validEmailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/;
    if (!validEmailRegex.test(trimmedEmail)) {
      setError("Please enter a valid Gmail, Yahoo, or Outlook email.");
      return;
    }
    // Contact number validation: exactly 10 digits
    const validPhoneRegex = /^[6-9][0-9]{9}$/;
    if (!validPhoneRegex.test(trimmedContact)) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    // If everything is valid, submit
    setLoading(true);
    setError("");
    try {
      const newMessageRef = push(ref(database, "contactDetails"));
      await set(newMessageRef, {
        name: trimmedName,
        contact: trimmedContact,
        email: trimmedEmail,
        message: trimmedMessage,
        timestamp: new Date().toISOString(),
      });
      setSuccess(true);
      setName("");
      setContact("");
      setEmail("");
      setMessage("");
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ height: "40px" }} />
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
          marginTop: "-60px",
        }}
      >
        <h1
          id="contactglowthic"
          style={{ fontSize: "40px", color: "#D63384", fontFamily: "cursive" }}
        >
          Contact Glowthic
        </h1>
        <p style={{ fontSize: "18px", color: "#555" }}>
          We'd love to hear from you. Whether it's a question, feedback, or just
          a hello — reach out!
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
          border: "1px solid #D63384",
          borderRadius: "15px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          marginBottom: "100px",
        }}
      >
        {/* Contact Info */}
        <div style={{ flex: 1 }}>
          <h2 style={{ color: "#D63384" }}>Get in Touch</h2>
          <p>
            <strong>Email:</strong> glowthicteam@gmail.com
          </p>
          <p>
            <strong>Phone:</strong> +91 8349759769
          </p>
          <p>
            <strong>WhatsApp:</strong> 8349759769
          </p>
          <p style={{ marginTop: "20px" }}>
            <strong>Customer Support Hours:</strong>
            <br />
            Monday - Saturday
            <br />
            10:00 AM - 6:00 PM (IST)
          </p>
        </div>
        {/* Contact Form */}
        <div style={{ flex: 1 }}>
          <h2 style={{ color: "#D63384", marginBottom: "15px" }}>
            Send us a Message
          </h2>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Your Name"
              style={inputStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="Number"
              placeholder="Your Contact"
              style={inputStyle}
              value={contact}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setContact(value.slice(0, 10));
              }}
            />
            <input
              type="email"
              placeholder="Your Email"
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              type="text"
              placeholder="Your Message"
              rows="5"
              style={inputStyle}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && (
              <p style={{ color: "green" }}>Message sent successfully!</p>
            )}
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                padding: "10px 20px",
                background: "#D63384",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
