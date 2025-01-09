import React, { useState } from "react";
import { Button, Box, TextField, Typography } from "@mui/material";
import { Google as GoogleIcon, GitHub as GitHubIcon } from "@mui/icons-material";
import logo from "../../Images/Logo.png";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/reddot/api/v1/auth/login",
        { email, password }
      );
      const token = response.data;

      localStorage.setItem("authToken", token);
      window.location.href = "/";
    } catch {
      setError("Login Failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to Spring Security's OAuth2 login flow for Google
    window.location.href = "http://localhost:8080/login/oauth2/code/google";
  };
  
  const handleGithubLogin = () => {
    // Redirect to Spring Security's OAuth2 login flow for GitHub
    window.location.href = "/oauth2/authorization/github";
  };

  return (
    <Box
      sx={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "8px",
        textAlign: "center",
        boxShadow: 3,
      }}
    >
      <Box sx={{ mb: 2 }}>
        <img src={logo} alt="Logo" style={{ width: "100px", height: "auto" }} />
      </Box>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Social Login Buttons */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          sx={{ mb: 2, width: "100%" }}
        >
          Login with Google
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#24292e",
            color: "white",
            "&:hover": {
              backgroundColor: "#1b1f23",
            },
          }}
          startIcon={<GitHubIcon />}
          onClick={handleGithubLogin}
          fullWidth
        >
          Login with GitHub
        </Button>
      </Box>


      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            error={!!error}
            helperText={error ? "Please enter a valid email" : ""}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "black", 
                },
                "&.Mui-focused fieldset": {
                  borderColor: "black", 
                },
              },
            }}

          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            error={!!error}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "black", 
                },
                "&.Mui-focused fieldset": {
                  borderColor: "black", 
                },
              },
            }}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="success"
          fullWidth
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Box>
  );
}
