import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔑 Static credentials
  const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("token", "sample-token");
      localStorage.setItem("role", "admin");
      navigate("/Dashboard");
    } else {
      alert("Invalid email or password ❌");
    }
    console.log("Admin Email from ENV:", ADMIN_EMAIL);
    console.log("Admin Password from ENV:", ADMIN_PASSWORD);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f5f5f5",
        fontFamily: "Georgia, serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          height: "auto",
          background: "#D4AF37",
          borderRadius: "45px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          width: "100%",
          maxWidth: "600px",
          padding: "30px 30px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            fontFamily: "Georgia, serif",
            width: "100%",
          }}
        >
          <h1 style={{ textAlign: "center", color: "#7d0a0a" }}>Admin Login</h1>

          {/* Email Input */}
          <TextField
            type="email"
            placeholder="Email"
            variant="outlined"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              width: "100%",
              maxWidth: "400px",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#7d0a0a",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Password Input */}
          <TextField
            type="password"
            placeholder="Password"
            variant="outlined"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              width: "100%",
              maxWidth: "400px",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#7d0a0a",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Button */}
          <Button
            type="submit"
            sx={{
              cursor: "pointer",
              background: "black",
              color: "#D4AF37",
              height: "45px",
              width: "100%",
              maxWidth: "180px",
              marginTop: "20px",
              borderRadius: "25px",
              fontFamily: "Georgia, serif",
              fontSize: "20px",
              textTransform: "none",
              "&:hover": {
                background: "#333",
              },
            }}
          >
            Get started
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
