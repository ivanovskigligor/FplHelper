import axios from 'axios';

const BACKEND_URL = "https://localhost:7215/api/fpl";

export const getFplData = async () => {
    try {
        const response = await axios.get(BACKEND_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching FPL data", error);
        throw error;
    }
};

export const GetFplElementSummary = async (playerId) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/${playerId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data for player ${playerId}`, error);
        throw error;
    }
};
