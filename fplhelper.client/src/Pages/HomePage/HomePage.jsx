import React from 'react';
import GetFplEventData from '../../Components/GetFplData/GetFplEventData';
import GetPlayerData from '../../Components/GetFplData/GetPlayerData';
import GetSinglePlayerData from '../../Components/GetFplData/GetSinglePlayerData';
const HomePage = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
                <h1 className="text-5xl font-bold text-gray-800">Welcome</h1>
                <GetFplEventData />
            <GetPlayerData />
            <GetSinglePlayerData/>
        </div>
    );  
};

export default HomePage;
