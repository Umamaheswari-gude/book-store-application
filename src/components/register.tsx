import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { Users } from "../types/types";
import { staticUsers } from "./data/userStore";


const AuthInput:React.FC<{
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
}> = ({ type , placeholder, value, onChange, required = true, autoComplete = "off" }) => (
  <input
     type={type}
     placeholder={placeholder}
     value={value}
     onChange={onChange}
     required={required}
     autoComplete={autoComplete}
  />
);

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
    
    let storedUsers: Users[] = JSON.parse(localStorage.getItem("users") || "[]");

    if (storedUsers.length === 0) {
      localStorage.setItem("users", JSON.stringify(staticUsers));
      storedUsers = staticUsers;
    }

    if (storedUsers.find((u) => u.email === email)) {
      setError("User already exists!");
      return;
    }

    const updateUsers = [...storedUsers, { email, password , firstName, lastName}];
    localStorage.setItem("users", JSON.stringify(updateUsers));
    console.log("Registered new users:", { email, password , firstName, lastName});
    console.log("Update users:", updateUsers);
    alert("Registration successful!");
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
          <AuthInput type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          <AuthInput type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          <AuthInput type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <AuthInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="on" required />
          <AuthInput type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="on" required />
          <button type="submit" className="auth-button">Create account</button>

        </form>
        {error && <p className="error">{error}</p>}
        <p className="auth-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};
export default Register;
