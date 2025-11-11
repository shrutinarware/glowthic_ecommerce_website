import React, { useState, useEffect, lazy, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import LOGO from "../../assets/Topbar/glow_aesthetic_logo.svg";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const UserLoginModal = lazy(() => import("../User/UserLoginModal")); // Lazy load

const Topbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const auth = getAuth();
  const location = useLocation();
  const hideAccountPaths = [
    "/admin",
    "/dashboard",
    "/user-response",
    "/user-logindata",
    "/user-activityinfo",
  ];

  const isAdminPage = hideAccountPaths.some((path) =>
    location.pathname.toLowerCase().startsWith(path)
  );

  const navItems = ["Home", "Categories", "Brands", "Contact", "About"];

  // Listen to localStorage changes (for instant update after login)
  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(localStorage.getItem("username"));
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const email =
          user.email || localStorage.getItem("email") || "user@example.com";
        const name = extractNameFromEmail(email);

        // ✅ Update state and localStorage together
        setUsername(name);
        setIsLoggedIn(true);
        localStorage.setItem("username", name);
        localStorage.setItem("email", email);
        localStorage.setItem("isLoggedIn", "true");
      } else {
        // Only clear if explicitly logged out
        const manuallyLoggedOut =
          localStorage.getItem("manualLogout") === "true";
        if (manuallyLoggedOut) {
          localStorage.removeItem("username");
          localStorage.removeItem("email");
          localStorage.removeItem("isLoggedIn");
        }
        setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
        setUsername(localStorage.getItem("username") || "");
      }
      setAuthChecked(true); // ✅ Mark Firebase check done
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const getLinkPath = (item) => {
    if (item === "Home") return "/";
    if (item === "Categories") return "/#topcategories";
    return `/${item}`;
  };

  const extractNameFromEmail = (email) => {
    if (!email) return "User";
    const localPart = email.split("@")[0];
    const nameParts = localPart.split(/[._-]/);
    let firstName = nameParts[0];
    if (/\d/.test(firstName) && nameParts.length > 1) {
      firstName = nameParts[1];
    }
    return firstName.charAt(0).toUpperCase() + firstName.slice(1);
  };

  const handleLoginSuccess = (user) => {
    const email = user.email || user.username || "user@example.com"; // fallback
    const name = extractNameFromEmail(email);
    setUsername(name);
    setIsLoggedIn(true);

    localStorage.setItem("username", name);
    localStorage.setItem("email", email);
    localStorage.setItem("isLoggedIn", "true");
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email");
    window.dispatchEvent(new Event("storage"));
    setShowLogin(false); // ✅ ensure popup doesn’t reopen after logout
    setShowDropdown(false);
  };

  const handleAccountClick = () => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (loggedIn) {
      setShowDropdown((prev) => !prev);
      setShowLogin(false);
    } else {
      setShowLogin(true);
    }
  };

  if (!authChecked) return null; // or a loader div if you prefer

  return (
    <>
      {/* Topbar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100px",
          background: "pink",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          boxSizing: "border-box",
          zIndex: 1000,
          flexWrap: "wrap",
        }}
      >
        {/* Left: Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={LOGO}
            alt="Logo"
            style={{ height: isMobile ? "50px" : "90px" }}
          />
          <h1
            style={{
              color: "#D63384",
              fontFamily: "cursive",
              fontSize: isMobile ? "28px" : "40px",
              margin: 0,
            }}
          >
            Glowthic
          </h1>
        </div>
        {/* Right: Nav links + Account */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "10px" : "30px",
          }}
        >
          {/* Desktop Navigation */}
          {!isMobile && (
            <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
              {navItems.map((item, i) => (
                <h3 key={i} style={{ margin: 0 }}>
                  <Link
                    key={i}
                    to={getLinkPath(item)}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#D63384";
                      e.target.style.textShadow =
                        "0 0 8px rgba(255,215,0,0.6), 0 0 15px rgba(255,215,0,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "white";
                      e.target.style.textShadow = "none";
                    }}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontSize: "18px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {item}
                  </Link>
                </h3>
              ))}
            </div>
          )}
          {/* Account Section */}
          {!isAdminPage && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                position: "relative",
              }}
            >
              <div
                onClick={handleAccountClick}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                  position: "relative",
                  minWidth: isMobile ? "45px" : "55px",
                  marginTop: "10px",
                }}
              >
                {isLoggedIn ? (
                  // Avatar with first letter
                  <div
                    style={{
                      width: isMobile ? "30px" : "40px",
                      height: isMobile ? "30px" : "40px",
                      borderRadius: "10%",
                      backgroundColor: "#D63384",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: isMobile ? "14px" : "18px",
                      fontWeight: "bold",
                      userSelect: "none",
                      marginTop: "-12px",
                    }}
                    title={username}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 0 12px rgba(255,215,0,0.6), 0 0 25px rgba(255,215,0,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {username ? (
                      username.charAt(0).toUpperCase()
                    ) : (
                      <AccountBoxIcon style={{ color: "white" }} />
                    )}
                  </div>
                ) : (
                  <AccountBoxIcon
                    onClick={handleAccountClick}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter =
                        "drop-shadow(0 0 8px rgba(255,215,0,0.6)) drop-shadow(0 0 20px rgba(255,215,0,0.3))";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = "none";
                    }}
                    style={{
                      fontSize: isMobile ? 38 : 55,
                      color: "#D63384",
                      marginTop: "-6px",
                      transition: "all 0.3s ease",
                    }}
                  />
                )}
                {/* Dropdown */}
                {showDropdown && isLoggedIn && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      right: 0,
                      background: "white",
                      border: "1px solid #D63384",
                      borderRadius: "8px",
                      padding: "10px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                      zIndex: 1000,
                      marginTop: "4px",
                    }}
                  >
                    <p
                      style={{ margin: 0, cursor: "pointer", color: "#D63384" }}
                      onClick={handleLogout}
                    >
                      Logout
                    </p>
                  </div>
                )}
                {/* Login Modal */}
                {showLogin && (
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100vw",
                      height: "100vh",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 9999,
                    }}
                    onClick={() => setShowLogin(false)}
                  >
                    <div onClick={(e) => e.stopPropagation()}>
                      <Suspense fallback={<div>Loading...</div>}>
                        {!isLoggedIn && (
                          <UserLoginModal
                            onLoginSuccess={(user) => handleLoginSuccess(user)} // ✅ pass user data
                            onClose={() => setShowLogin(false)}
                          />
                        )}
                      </Suspense>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Hamburger Icon */}
          {isMobile && (
            <div
              onClick={toggleMenu}
              style={{ fontSize: "30px", color: "#D63384", cursor: "pointer" }}
            >
              &#9776;
            </div>
          )}
        </div>
      </div>
      {/* Spacer */}
      {!isAdminPage && <div style={{ height: isMobile ? "95px" : "130px" }} />}
      {/* Mobile Menu */}
      {isMobile && isMobileMenuOpen && (
        <div
          style={{
            background: "pink",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "18px 0",
            textAlign: "center",
            marginBottom: "12px",
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
    </>
  );
};

export default Topbar;
