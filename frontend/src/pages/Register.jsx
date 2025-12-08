import API from "#services/api";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/auth/register", { name, email, password });
      navigate("/login"); // Better to go to login after registration
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section className="register h-screen flex items-center justify-center">
      <form className="bg-gray-800 p-6 rounded w-80" onSubmit={handleSubmit}>
        <h2 className="text-xl mb-4">Register</h2>
        <label className="floating-label">
          <input
            type="text"
            className="input"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <span>Enter your Name</span>
        </label>
        <label className="floating-label">
          <input
            type="email"
            className="input"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span>Enter your Email</span>
        </label>
        <label className="floating-label">
          <input
            type="password"
            className="input"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span>Enter your Password</span>
        </label>
        <button type="submit" className="btn btn-soft btn-accent">
          Create Account
        </button>
      </form>
    </section>
  );
};

export default Register;
