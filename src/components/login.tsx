import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "./data/userStore";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      console.log("Logged in:", foundUser);
      navigate("/books");
    } else {
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
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
        
      </div>
    </div>
  );
};
export default Login;     