import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import HomePage from './Pages/HomePage/HomePage';
import GetSinglePlayerData from './Components/GetFplData/GetSinglePlayerData';
import Login from './Pages/Authorization/Login'
import Register from './Pages/Authorization/Register'

const App = () => {
    return (
        <>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="player/:id" element={<GetSinglePlayerData/>} />

                </Routes>
        </>
    );
};

export default App;