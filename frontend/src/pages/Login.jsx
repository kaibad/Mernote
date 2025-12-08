import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import API from "#services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/api/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("User", JSON.stringify(res.data));
    navigate("/");
  };
  return (
    <section className="h-screen flex  items-center justify-center">
      <form className="bg-gray-800 p-6 rounded w-80" onSubmit={handleSubmit}>
        <label className="floating-label">
          <input
            type="text"
            className="input"
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>Enter your Email</span>
        </label>
        <label className="floating-label my-4">
          <input
            type="password"
            className="input"
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>Enter your Password</span>
        </label>

        <button className="btn btn-soft btn-accent">Login</button>
        <div className="text-center">
          Didn't have a account?
          <Link to="/register" className="text-blue-500 hover:underline ml-1">
            Signup
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
