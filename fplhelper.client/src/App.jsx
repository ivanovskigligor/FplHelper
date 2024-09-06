import { useEffect, useState } from 'react';
 
import './App.css';
import GetFplEventData from "./Components/GetFplData/GetFplEventData";
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter } from "react-router-dom";
import GetPlayerData from './Components/GetFplData/GetPlayerData';

const App = () => {
    return (
        <BrowserRouter>
            <h1>Welcome to the Fantasy Premier League Helper App</h1>
            <GetFplEventData />
            <GetPlayerData />
        </BrowserRouter>
    );
};

export default App;