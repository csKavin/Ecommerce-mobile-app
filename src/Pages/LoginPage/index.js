import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, TextField, Alert } from "@mui/material";
import {register,login} from "../../utils/services"
export default function AuthScreen({ isRegister = false }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async () => {
  setLoading(true);
  setError("");
  try {
    if (isRegister) {
      await register(formData);
      navigate("/products"); // Only navigates after login
      // Do not navigate after registration
    } else {
      await login(formData);
      navigate("/products"); // Only navigates after login
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "32rem" }}>
        <h3 className="text-center mb-3 text-primary">
          {isRegister ? "Register" : "Login"}
        </h3>
        {error && <Alert severity="error" className="mb-3">{error}</Alert>}
        {loading && <div className="text-center mb-3"><CircularProgress /></div>}

        <div className="mb-3">
          <TextField
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            placeholder="Enter your email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <TextField
            fullWidth
            id="password"
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button
          className="btn btn-primary w-100"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (isRegister ? "Creating Account..." : "Signing in...") : isRegister ? "Register" : "Sign in"}
        </button>
        {!isRegister && (
          <div className="text-center mt-3">
            <a href="/register" className="text-decoration-none text-primary small">
              Don't have an account? Register here
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
