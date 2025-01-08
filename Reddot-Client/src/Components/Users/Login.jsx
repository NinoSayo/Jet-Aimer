import "react";
import { useState } from "react";
import logo from "../../Images/Logo.png";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading,setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    setError("");
    setLoading(true);
    

    try{
        const response = await axios.post('http://localhost:8080/reddot/api/v1/auth/login',{email,password});
        const token = response.data;

        localStorage.setItem('authToken',token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        window.location.href = '/';
    }catch{
        setError('Login Failed.Please check your credentials.');
    }finally{
        setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <img
          src={logo}
          alt="Logo"
          style={{ width: "100px", height: "auto", marginLeft: "-20px" }}
        />
      </div>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "5px", textAlign: "left" }}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "5px", textAlign: "left" }}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
         {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
