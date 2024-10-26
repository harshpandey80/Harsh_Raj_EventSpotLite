// src/components/Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar({ toggleDarkMode, isDarkMode }) {
  const { isAuth, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
// function for logut which is called when user click on logout buttton
  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);// to close navbar or toogle 
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev); // vice-verca if true false if false true
  };

  const handleLinkClick = () => {
    setIsOpen(false); 
  };

  return (
    //   mostly we are doing conditional rendering for differtent media devices and show toggle and close button according to screen size
    <nav
      className={`bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 backdrop-blur-md p-4 shadow-lg flex justify-between items-center rounded-b-lg transition-all duration-300`}
    >
      
      <h2 className="text-2xl font-bold text-white">EventSpot Lite</h2>
     

      <button
        onClick={toggleDarkMode}
        className="text-white md:hidden focus:outline-none"
      >
        {isDarkMode ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v2m0 14v2m9-9h-2m-14 0H3m15.364 8.364l-1.414-1.414m-12.728 0l-1.414 1.414m15.364-15.364l-1.414 1.414M6.636 5.636L5.222 4.222"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 2v2m0 16v2m9-9h-2m-14 0H3m15.364 8.364l-1.414-1.414m-12.728 0l-1.414 1.414m15.364-15.364l-1.414 1.414M6.636 5.636L5.222 4.222"
            />
          </svg>
        )}
      </button>

      <button
        onClick={toggleMenu}
        className="md:hidden text-white focus:outline-none"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        )}
      </button>

      <div
        className={`flex flex-col md:flex-row items-center md:space-x-6 ${
          isOpen ? "block" : "hidden md:block"
        } transition-all duration-300`}
      >
        <Link
          to="/"
          onClick={handleLinkClick}
          className="text-white hover:bg-blue-700 hover:rounded-md transition duration-300 py-2 px-3"
        >
          Home
        </Link>
        {!isAuth ? ( 
          // conditional rendering because if user is autenticated the isAuth (from authcontext) is true and we display logout button if false then it means user is not authenticated then we show login and signup buttons
          <>
            <Link
              to="/login"
              onClick={handleLinkClick}
              className="text-white hover:bg-blue-700 hover:rounded-md transition duration-300 py-2 px-3"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={handleLinkClick}
              className="text-white hover:bg-blue-700 hover:rounded-md transition duration-300 py-2 px-3"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="text-white hover:bg-blue-700 hover:rounded-md transition duration-300 py-2 px-3"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
