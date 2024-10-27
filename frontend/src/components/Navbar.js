import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar({ toggleDarkMode, isDarkMode }) {
  const { isAuth, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-700 p-4 shadow-xl flex justify-between items-center rounded-b-lg transition-all duration-300">
      {/* Left Side Links */}
      <div className="flex space-x-4 items-center">
        <button onClick={toggleMenu} className="md:hidden text-cyan-400 focus:outline-none">
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
        <div className={`flex-col md:flex-row items-center md:space-x-4 ${isOpen ? "flex" : "hidden md:flex"} transition-all duration-500`}>
          <Link to="/" onClick={handleLinkClick} className="text-cyan-400 text-xl hover:text-pink-400 hover:scale-105 transform transition-all duration-300 py-2 px-3 glow">
            Home
          </Link>
          {!isAuth ? (
            <>
              <Link to="/login" onClick={handleLinkClick} className="text-cyan-400 text-xl hover:text-pink-400 hover:scale-105 transform transition-all duration-300 py-2 px-3 glow">
                Login
              </Link>
              <Link to="/register" onClick={handleLinkClick} className="text-cyan-400 text-xl hover:text-pink-400 hover:scale-105 transform transition-all duration-300 py-2 px-3 glow">
                Register
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="text-cyan-400 text-xl hover:text-pink-400 hover:scale-105 transform transition-all duration-300 py-2 px-3 glow">
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Center Theme Toggle Button */}
      <button onClick={toggleDarkMode} className="text-cyan-400 focus:outline-none transform transition duration-300 hover:scale-110">
        {isDarkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 14v2m9-9h-2m-14 0H3" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2m0 16v2m9-9h-2m-14 0H3" />
          </svg>
        )}
      </button>

      {/* Right Side Logo */}
      <h2 className="text-3xl font-extrabold text-cyan-400 glow">EventSpot Lite</h2>
    </nav>
  );
}

export default Navbar;
