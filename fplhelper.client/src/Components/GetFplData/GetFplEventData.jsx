import React, { useEffect, useState } from 'react';

import { getFplData } from '../../FplApi';


const GetFplEventData = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getFplData();
                setData(result);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <h1>FPL Game Weeks</h1>
            <ul>
                {data.events.map((event) => (
                    <li key={event.id}>
                        <h2>{event.name}</h2>
                        <p>Deadline: {new Date(event.deadline_time).toLocaleString()}</p>
                        <p>Average Entry Score: {event.average_entry_score}</p>
                        <p>Highest Score: {event.highest_score || 'N/A'}</p>
                        <p>Transfers Made: {event.transfers_made}</p>
                        <p>Top Element: {event.top_element_info?.id || 'N/A'}</p>
                        <p>Most Selected: {event.most_selected}</p>
                        {/* Add more details as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetFplData;
