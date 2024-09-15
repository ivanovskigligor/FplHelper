import React from 'react';
import GetFplEventData from '../../Components/GetFplData/GetFplEventData';
import GetPlayerData from '../../Components/GetFplData/GetPlayerData';
import GetSinglePlayerData from '../../Components/GetFplData/GetSinglePlayerData';
import AuthorizeView, { AuthorizedUser } from '../../Components/Authorization/AuthorizationView';

const HomePage = () => {

    return (
        <AuthorizeView>
                <GetFplEventData />
                <GetPlayerData />
                <GetSinglePlayerData />
        </AuthorizeView>
        );  
};

export default HomePage;
