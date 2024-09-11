import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import HomePage from './Pages/HomePage/HomePage';
import GetSinglePlayerData from './Components/GetFplData/GetSinglePlayerData';

const App = () => {
    return (
        <>
            <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="player/:id" element={<GetSinglePlayerData/>} />

                </Routes>
        </>
    );
};

export default App;