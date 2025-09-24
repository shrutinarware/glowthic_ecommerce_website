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
  const ADMIN_EMAIL = "shrutinarware03@gmail.com";
  const ADMIN_PASSWORD = "shruti@03";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Save token & role in localStorage
      localStorage.setItem("token", "sample-token");
      localStorage.setItem("role", "admin");


      navigate("/Dashboard"); // redirect to admin dashboard
    } else {
      alert("Invalid email or password ❌");
    }
    
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
        padding: "20px", // ✅ padding for small screens
      }}
    >
      <div
        style={{
          height: "auto", // ✅ auto height for smaller devices
          background: "pink",
          borderRadius: "45px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          width: "100%",
          maxWidth: "600px", // ✅ responsive width
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
          <h1 style={{ textAlign: "center",color:"#D63384" }}>Admin Login</h1>

          {/* Email Input */}
          <TextField
            type="email"
            placeholder="Email"
            variant="outlined"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              width: "100%", // ✅ responsive
              maxWidth: "400px",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "black",
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
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              width: "100%", // ✅ responsive
              maxWidth: "400px",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "black",
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
              color:"#D63384",
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