// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        
        <div>
        <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
                <ToastContainer 
                        position="top-right" 
                        autoClose={5000} 
                        hideProgressBar={false} 
                        closeOnClick 
                        pauseOnHover 
                        draggable 
                        theme="light"
                    />
        </div>
        
                    
            
    );
}

export default App;
