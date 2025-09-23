import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "./data/userStore";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (users.find((u) => u.email === email)) {
      setError("User already exists!");
      return;
    }
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign up</h2>
        <p className="auth-subtitle">
          Books kavala nayana!!!
        </p>
        <form onSubmit={handleRegister} className="auth-form">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="on"
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="on"
            required
          />
          <button type="submit" className="auth-button">Create account</button>
        </form>
        {error && <p className="error">{error}</p>}
       
      </div>
    </div>
  );
};
export default Register;
