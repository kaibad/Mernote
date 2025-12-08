import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  return (
    <section className="home flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-3 text-white">
          {user ? `Welcome, ${user.name}` : "Welcome to Mernote"}
        </h1>
        <p className="text-gray-400 mb-6">A simple and secure MERN note app</p>
        <div className="flex gap-4 justify-center">
          {user ? (
            <>
              <button
                onClick={() => {
                  navigate("/notes");
                }}
                className="bg-green-600 px-4 py-2 rounded"
              >
                My Notes
              </button>
              <button onClick={logout} className="bg-red-600 px-4 py-2 rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 px-4 py-2 rounded cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-gray-700 px-4 py-2 rounded cursor-pointer"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
