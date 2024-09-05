import { useEffect, useState } from 'react';
import './App.css';
import GetFplEventData from "./Components/GetFplData/GetFplData";


const App = () => {
    return (
        <div>
            <h1>Welcome to the Fantasy Premier League App</h1>
            <GetFplEventData /> 
        </div>
    );
};

export default App;