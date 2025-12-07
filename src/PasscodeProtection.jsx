import React, { useState, useEffect } from "react";

// Change this passcode anytime you want
const PASSCODE = "123456";

// Session storage key
const AUTH_KEY = "htgym_authenticated";

export default function PasscodeProtection({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Check if already authenticated in this session
  useEffect(() => {
    const authenticated = sessionStorage.getItem(AUTH_KEY);
    if (authenticated === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // Handle passcode submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (passcode === PASSCODE) {
      sessionStorage.setItem(AUTH_KEY, "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect passcode. Please try again.");
      setPasscode("");
    }
  };

  // Handle input change - only allow digits and max 6 characters
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPasscode(value);
    setError("");
  };

  // Show loading state briefly while checking session
  if (isLoading) {
    return null;
  }

  // If authenticated, show the app
  if (isAuthenticated) {
    return children;
  }

  // Show passcode prompt
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        fontFamily: "Lexend, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "50px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: "400px",
          width: "90%",
        }}
      >
        {/* Logo/Title */}
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#000080",
            marginBottom: "10px",
          }}
        >
          Highland Tower Gym
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "#666666",
            marginBottom: "30px",
          }}
        >
          Equipment Evaluation Portal
        </p>

        {/* Passcode Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                color: "#333333",
                marginBottom: "10px",
              }}
            >
              Enter 6-digit passcode
            </label>
            <input
              type="password"
              value={passcode}
              onChange={handleChange}
              placeholder="••••••"
              autoFocus
              style={{
                width: "180px",
                padding: "15px 20px",
                fontSize: "24px",
                textAlign: "center",
                letterSpacing: "8px",
                border: error ? "2px solid #dc2626" : "2px solid #BBBBBB",
                borderRadius: "8px",
                outline: "none",
              }}
            />
          </div>

          {/* Error Message */}
          {error && (
            <p
              style={{
                color: "#dc2626",
                fontSize: "14px",
                marginBottom: "15px",
              }}
            >
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={passcode.length !== 6}
            style={{
              backgroundColor: passcode.length === 6 ? "#000080" : "#CCCCCC",
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: "600",
              padding: "12px 40px",
              borderRadius: "8px",
              border: "none",
              cursor: passcode.length === 6 ? "pointer" : "not-allowed",
              transition: "background-color 0.2s",
            }}
          >
            Enter
          </button>
        </form>

        {/* Footer note */}
        <p
          style={{
            fontSize: "12px",
            color: "#999999",
            marginTop: "30px",
          }}
        >
          Contact the administrator if you need access.
        </p>
      </div>
    </div>
  );
}