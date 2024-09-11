import React from 'react';
import GetFplEventData from '../../Components/GetFplData/GetFplEventData';
import GetPlayerData from '../../Components/GetFplData/GetPlayerData';
import GetSinglePlayerData from '../../Components/GetFplData/GetSinglePlayerData';
const HomePage = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
                <GetFplEventData />
            <GetPlayerData />
            <GetSinglePlayerData/>
        </div>
    );  
};

export default HomePage;
