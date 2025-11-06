import React, { useState, useEffect } from "react";
import { database } from "../../Firebase";
import { ref, set, push, get, child } from "firebase/database";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import BrandLogo from "../../assets/Topbar/glow_aesthetic_logo.svg";
import { useNavigate } from "react-router-dom";

const UserLogin = ({ onLoginSuccess = () => {}, onClose = () => {} }) => {
  const [email, setEmail] = useState("");
  const [mobilenumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  // Responsive
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isMobile = screenSize <= 768;
  const isTablet = screenSize > 768 && screenSize <= 1024;
  // Validators
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (number) => /^[0-9]{10}$/.test(number);

  // 🔹 SIGNUP
  const handleSignUp = async () => {
    setSignupError("");
    if (!username || !email || !mobilenumber || !password) {
      setSignupError("All fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      setSignupError("Enter a valid email address.");
      return;
    }
    if (!validatePhone(mobilenumber)) {
      setSignupError("Contact number must be exactly 10 digits.");
      return;
    }
    if (!validatePassword(password)) {
      setSignupError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, "UserLoginData"));
      let newUserId = "0001"; // default if no user exists yet

      if (snapshot.exists()) {
        const users = snapshot.val();

        // Duplicate checks
        const emailExists = Object.values(users).some((u) => u.email === email);
        if (emailExists) {
          setSignupError("An account with this email already exists.");
          return;
        }
        const phoneExists = Object.values(users).some(
          (u) => u.phone === mobilenumber
        );
        if (phoneExists) {
          setSignupError("An account with this phone number already exists.");
          return;
        }
        const passwordUsed = Object.values(users).some(
          (u) => u.password === password
        );
        if (passwordUsed) {
          setSignupError(
            "This password is already taken by another user. Choose a different password."
          );
          return;
        }

        // Generate next 4-digit ID
        const ids = Object.values(users)
          .map((u) => parseInt(u.userId || "0"))
          .filter((n) => !isNaN(n));
        const nextId = ids.length ? Math.max(...ids) + 1 : 1;
        newUserId = nextId.toString().padStart(4, "0");
      }

      // Save to Firebase
      const loginRef = push(ref(database, "UserLoginData"));
      await set(loginRef, {
        userId: newUserId,
        username: username,
        email,
        phone: mobilenumber,
        password,
        timestamp: new Date().toISOString(),
      });

      // Save to localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("email", email);
      localStorage.setItem("userId", newUserId);
      localStorage.setItem("username", username);
      window.dispatchEvent(new Event("storage")); // 🔥 instantly updates Topbar
      onLoginSuccess({ username: username, email, userId: newUserId });
      onClose();
    } catch (err) {
      setSignupError("Signup failed. Try again.");
      console.error(err);
    }
  };

  // 🔹 LOGIN
  const handleLogin = async () => {
    setLoginError("");
    if (!email || !password) {
      setLoginError("All fields are required.");
      return;
    }
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, "UserLoginData"));
      if (!snapshot.exists()) {
        setLoginError("No users found. Please sign up first.");
        return;
      }

      const users = snapshot.val();
      const user = Object.values(users).find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        setLoginError("Incorrect email or password.");
        return;
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("email", user.email);
      localStorage.setItem("userId", user.userId || "0000");
      localStorage.setItem("username", user.username);

      window.dispatchEvent(new Event("storage"));
      onLoginSuccess(user); // ✅ correct variable
      window.dispatchEvent(new Event("storage")); // 🔥 triggers Topbar update

      onClose?.();
    } catch (err) {
      setLoginError("Login failed. Try again.");
      console.error(err);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "auto", // ✅ allow scroll
        padding: isMobile || isTablet ? "20px 0" : "0",
        zIndex: 9999,
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          width: isMobile ? "90%" : isTablet ? "80%" : "900px",
          height: "auto",
          maxHeight: isMobile ? "none" : "95vh",
          overflow: "visible",
          background: "rgba(255,192,203,0.95)",
          position: "relative",
          transition: "all 0.3s ease",
          margin: isMobile || isTablet ? "40px 0" : "0",
          boxShadow:
            "0 0 35px rgba(255,182,193,0.45), 0 0 10px rgba(255,215,0,0.25)",
          borderRadius: "18px",
        }}
      >
        {/* ❌ Close Button */}
        <span
          onClick={() => {
            if (onClose) onClose();
          }}
          style={{
            position: "absolute",
            top: isMobile ? "8px" : "10px",
            right: isMobile ? "10px" : "15px",
            fontSize: isMobile ? "22px" : "28px",
            cursor: "pointer",
            color: "#D63384",
            fontWeight: "bold",
            transition: "0.3s",
          }}
        >
          &times;
        </span>
        {/* LEFT - Logo */}
        <div
          style={{
            flex: isMobile ? "none" : 1,
            width: isMobile ? "100%" : "auto",
            background: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: isMobile ? "20px 0" : "0",
            boxSizing: "border-box",
          }}
        >
          <img
            src={BrandLogo}
            alt="Brand Logo"
            style={{
              width: isMobile ? "65%" : isTablet ? "70%" : "75%",
              objectFit: "contain",
              marginTop: 0,
              marginBottom: isMobile ? "10px" : "0",
            }}
          />
          {isMobile && <div style={{ height: "10px" }}></div>}
        </div>
        {/* RIGHT - Form */}
        <div
          style={{
            flex: isMobile ? "none" : 1,
            width: "100%",
            padding: isMobile ? "20px 25px" : "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            marginTop: "10%",
            boxSizing: "border-box",
          }}
        >
          {/* PRIVACY VIEW */}
          {showPrivacy ? (
            <>
              <h2
                style={{
                  textAlign: "center",
                  color: "#D63384",
                  marginBottom: "15px",
                }}
              >
                Terms & Privacy Policy
              </h2>
              <div
                style={{
                  border: "1px solid #D63384",
                  borderRadius: "10px",
                  padding: "10px",
                  background: "#fff",
                }}
              >
                <h4 style={{ color: "#D63384" }}>Privacy Policy</h4>
                <p style={{ fontSize: "14px" }}>
                  We collect only necessary user data for account and service
                  personalization. Your information will never be sold or
                  misused. You have the right to access, update, or delete your
                  personal information by contacting our support team.
                </p>
                <h4 style={{ color: "#D63384" }}>Terms of Use</h4>
                <p style={{ fontSize: "14px" }}>
                  By using Glowthic, you agree to maintain the confidentiality
                  of your account and comply with our usage policies. All
                  content on Glowthic, including text, images, and logos, is the
                  property of Glowthic and may not be copied or reproduced
                  without prior permission.
                </p>
              </div>
              <p
                onClick={() => setShowPrivacy(false)}
                style={{
                  textAlign: "center",
                  color: "#D63384",
                  marginTop: "15px",
                  cursor: "pointer",
                }}
              >
                ← Back
              </p>
            </>
          ) : !showLogin ? (
            <>
              {/* Signup Form */}
              <h2
                style={{
                  textAlign: "center",
                  color: "#D63384",
                  fontFamily: "cursive",
                  marginBottom: "20px",
                  marginTop: "-40px",
                }}
              >
                Welcome to Glowthic Community
              </h2>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "12px",
                  cursor: "pointer",
                  marginTop: "-15px",
                }}
                onClick={() => setShowLogin(true)}
              >
                Already have an Account?{" "}
                <span style={{ color: "#D63384", fontWeight: "bold" }}>
                  Log in
                </span>
              </p>
              <p style={{ color: "#D63384", marginBottom: "5px" }}>Name</p>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  border: "1px solid #D63384",
                  borderRadius: "10px",
                  outline: "none",
                  marginBottom: "10px",
                }}
              />

              {/* Email */}
              <p style={{ color: "#D63384", marginBottom: "5px" }}>Email</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  border: "1px solid #D63384",
                  borderRadius: "10px",
                  outline: "none",
                  marginBottom: "10px",
                }}
              />
              {email && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "#D63384",
                    marginTop: "2px",
                    fontStyle: "italic",
                  }}
                >
                  Your email will be used as your username.
                </p>
              )}
              {/* Contact */}
              <p style={{ color: "#D63384", marginBottom: "5px" }}>
                Contact No.
              </p>
              <input
                type="number"
                value={mobilenumber}
                onChange={(e) => setMobileNumber(e.target.value.slice(0, 10))}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  border: "1px solid #D63384",
                  borderRadius: "10px",
                  outline: "none",
                  marginBottom: "10px",
                }}
              />
              {/* Password */}
              <p style={{ color: "#D63384", marginBottom: "5px" }}>Password</p>
              <div style={{ position: "relative", marginBottom: "15px" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "16px",
                    border: "1px solid #D63384",
                    borderRadius: "10px",
                    outline: "none",
                  }}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "-18%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#D63384",
                    fontSize: "20px",
                  }}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
                {password && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: validatePassword(password) ? "green" : "red",
                    }}
                  >
                    {validatePassword(password)
                      ? "✅ Strong password"
                      : "❌ Must contain at least 8 chars, uppercase, lowercase, number & symbol"}
                  </p>
                )}
              </div>
              {/* Terms */}
              <p style={{ fontSize: "12px" }}>
                By creating an Account, you agree to our{" "}
                <span
                  style={{
                    color: "#D63384",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() => setShowPrivacy(true)}
                >
                  Terms of Use & Privacy Policy
                </span>
                .
              </p>
              <button
                onClick={handleSignUp}
                style={{
                  width: "100%",
                  background: "#D63384",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px",
                  fontSize: "16px",
                  cursor: "pointer",
                  marginBottom: "15px",
                  marginTop: "30px",
                }}
              >
                Create an Account
              </button>
            </>
          ) : (
            <>
              {/* Login Form */}
              <h2
                style={{
                  textAlign: "center",
                  color: "#D63384",
                  fontFamily: "cursive",
                  marginBottom: "20px",
                }}
              >
                Login to Glowthic
              </h2>

              <p style={{ color: "#D63384", marginBottom: "5px" }}>Email</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  border: "1px solid #D63384",
                  borderRadius: "10px",
                  outline: "none",
                  marginBottom: "10px",
                }}
              />
              <p style={{ color: "#D63384", marginBottom: "5px" }}>Password</p>
              <div style={{ position: "relative", marginBottom: "15px" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "16px",
                    border: "1px solid #D63384",
                    borderRadius: "10px",
                    outline: "none",
                  }}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "-18%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#D63384",
                    fontSize: "20px",
                  }}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
              <button
                onClick={handleLogin}
                style={{
                  width: "100%",
                  background: "#D63384",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px",
                  fontSize: "16px",
                  cursor: "pointer",
                  marginBottom: "15px",
                }}
              >
                Sign In
              </button>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "12px",
                  cursor: "pointer",
                  color: "#D63384",
                }}
                onClick={() => setShowLogin(false)}
              >
                Back to Create Account
              </p>
            </>
          )}
          {signupError && (
            <p
              style={{
                color: "red",
                textAlign: "center",
                marginTop: "10px",
                fontSize: "14px",
              }}
            >
              {signupError}
            </p>
          )}
          {loginError && (
            <p
              style={{
                color: "red",
                textAlign: "center",
                marginTop: "10px",
                fontSize: "14px",
              }}
            >
              {loginError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
