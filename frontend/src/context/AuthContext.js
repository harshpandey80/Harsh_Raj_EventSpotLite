// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) setAuth(true);
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setAuth(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth(false);
    };

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
