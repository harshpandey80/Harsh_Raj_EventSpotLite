// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

// creating context for authentication
const AuthContext = createContext();

// AuthProvider component banaya hai, jo saare children components ko authentication state aur functions provide karega
export const AuthProvider = ({ children }) => {
  // isAuth variable manages that user is logged in or not
  const [isAuth, setAuth] = useState(false);

  // useEffect because when component mounted toh localStorage se token check kar sake
  useEffect(() => {
    const token = localStorage.getItem("token"); // checking token in local storage
    if (token) setAuth(true); //if token is present then user is authenticated and we mark it true
  }, []);

  //this function add token token comming from backend to local storege which is present in browser
  const login = (token) => {
    localStorage.setItem("token", token); // Token ko localStorage mein save kar rahe hain
    setAuth(true); // if user is authenticated then making it true 
  };

  //this function remove token from local storege which is present in browser
  const logout = () => {
    localStorage.removeItem("token"); // deleting to token from browser
    setAuth(false); //making false and use if loggesd out
  };

  // AuthContext  value provided  - isAuth, login aur logout functions are exposing these valuses
  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children} {/* Children components get this value*/}
    </AuthContext.Provider>
  );
};

// custome hook which help to access AuthContext
export const useAuth = () => useContext(AuthContext);
