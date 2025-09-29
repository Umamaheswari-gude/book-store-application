import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { useAuth } from "../context/userAuthentication";
import { staticUsers } from "./data/userStore";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

  const staticUserList = staticUsers;
  const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
  const allUsers = [...staticUserList, ...storedUsers];

    const foundUser = allUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      console.log("Logged in:", foundUser);
      login(foundUser);
      navigate("/books");
    } else {
      setError("Invalid email or password! Please enter the correct");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <p className="auth-subtitle">Login to access your BookMart account</p>
        <form onSubmit={handleLogin} className="auth-form">
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
          <button type="submit" className="auth-button">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p className="auth-footer">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Sign up</span>
        </p>
      </div>
    </div>
  );
};
export default Login;
