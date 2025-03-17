import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, TextField } from "@mui/material";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/products");
    }, 2000);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "32rem" }}>
        <h3 className="text-center mb-3 text-primary">Login</h3>
        {loading && <div className="text-center mb-3"><CircularProgress /></div>}
        <div className="mb-3">
          <TextField
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            placeholder="Enter your email"
            autoFocus
            variant="outlined"
          />
        </div>
        <div className="mb-3">
          <TextField
            fullWidth
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            variant="outlined"
          />
        </div>
        <div className="d-flex justify-content-between mb-3">
          <a href="#" className="text-decoration-none text-primary small">
            You can't sign in with the new Account
          </a>
        </div>
        <button
          className="btn btn-primary w-100"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </div>
    </div>
  );
}