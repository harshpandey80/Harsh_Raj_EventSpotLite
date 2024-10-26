// src/components/Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { isAuth, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle

    const handleLogout = () => {
        logout();
        navigate("/");
        setIsOpen(false); // Close the menu on logout
    };

    const toggleMenu = () => {
        setIsOpen((prev) => !prev); // Toggle menu state
    };

    const handleLinkClick = () => {
        setIsOpen(false); // Close the menu when a link is clicked
    };

    return (
        <nav className={`bg-gradient-to-r from-blue-500 to-purple-600 p-4 shadow-lg flex justify-between items-center transition-all duration-300`}>
            {/* Left Side: EventSpot Lite */}
            <h2 className="text-2xl font-bold text-white">EventSpot Lite</h2>

            {/* Mobile Menu Button */}
            <button
                onClick={toggleMenu}
                className="md:hidden text-white focus:outline-none"
            >
                {isOpen ? (
                    // Close Icon
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
                    // Hamburger Icon
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

            {/* Right Side: Menu Links */}
            <div className={`flex flex-col md:flex-row items-center md:space-x-6 ${isOpen ? "block" : "hidden md:block"} transition-all duration-300`}>
                <Link
                    to="/"
                    onClick={handleLinkClick}
                    className="text-white hover:text-blue-200 transition duration-300 py-2"
                >
                    Home
                </Link>
                {!isAuth ? (
                    <>
                        <Link
                            to="/login"
                            onClick={handleLinkClick}
                            className="text-white hover:text-blue-200 transition duration-300 py-2"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            onClick={handleLinkClick}
                            className="text-white hover:text-blue-200 transition duration-300 py-2"
                        >
                            Register
                        </Link>
                    </>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="text-white hover:text-blue-200 transition duration-300 py-2"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
