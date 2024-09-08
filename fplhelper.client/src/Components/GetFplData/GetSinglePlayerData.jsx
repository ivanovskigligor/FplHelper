import React, { useEffect, useState } from 'react';
import { getFplData } from '../../FplApi'; 
import { GetFplElementSummary } from '../../FplApi'; 


const GetSinglePlayerData = ({ playerId }) => {
    const [data, setData] = useState(null);
    const [event, setEvent] = useState(null);
    const [player, setPlayer] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getFplData();
                setEvent(result.events);
                const playerData = result.elements.find(element => element.id === playerId);
                setData(playerData);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [playerId]);

    useEffect(() => {
        const fetchSingleElementData = async () => {
            if (data) {
                try {
                    const element = await GetFplElementSummary(data.id);
                    setPlayer(element.fixtures);
                } catch (error) {
                    setError(error.message);
                }
            }
        };

        fetchSingleElementData();
    }, [data]);

    if (error) return <div className="text-red-600">Error: {error}</div>;
    if (!data) return <div className="text-center text-lg"></div>;


    const imageUrl = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${data.photo.replace('.jpg', '.png') }`;
    const playerFixtures = Array.isArray(player) ? player.slice(0, 3) : [];



    return (
        <div className="px-4 py-4 bg-gray-800">
            <h2 className="text-2xl mb-4 text-white">{data.first_name} {data.second_name}</h2>

            <div className="flex mb-4">
                <img
                    srcSet={imageUrl}
                    sizes="(min-width: 700px) 200px"
                    alt={`${data.first_name} ${data.second_name}`}
                    className="w-auto h-auto"
                    role="presentation"
                />
                <div className="ml-4 inline-flex">
                    {playerFixtures.length > 0 ? (
                        playerFixtures.slice(0, 3).map(fixture => (
                            <div key={fixture.id} className="py-4">
                                <h1 className="text-lg text-white">{fixture.event_name}</h1>
                                <h2 className="text-md text-white">{fixture.team_h} vs {fixture.team_a}</h2>
                            </div>
                        ))
                    ) : (
                        <p className="text-white">No fixtures available.</p>
                    )}
                </div>
            </div>

            <table className="min-w-full border-collapse bg-gray-700 text-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border text-center align-middle">Price</th>
                        <th className="py-2 px-4 border text-center align-middle">Form</th>
                        <th className="py-2 px-4 border text-center align-middle">GW{event.find(ev => ev.is_current === true)?.id} Points</th>
                        <th className="py-2 px-4 border text-center align-middle">Total Points</th>
                        <th className="py-2 px-4 border text-center align-middle">ICT Index</th>
                        <th className="py-2 px-4 border text-center align-middle">Threat</th>
                        <th className="py-2 px-4 border text-center align-middle">Influence</th>
                        <th className="py-2 px-4 border text-center align-middle">Creativity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-2 px-4 border text-center align-middle">{data.now_cost / 10}m</td>
                        <td className="py-2 px-4 border text-center align-middle">{data.form}</td>
                        <td className="py-2 px-4 border text-center align-middle">{data.event_points}</td>
                        <td className="py-2 px-4 border text-center align-middle">{data.total_points}</td>
                        <td className="py-2 px-4 border text-center align-middle">{data.ict_index}</td>
                        <td className="py-2 px-4 border text-center align-middle">{data.threat}</td>
                        <td className="py-2 px-4 border text-center align-middle">{data.influence}</td>
                        <td className="py-2 px-4 border text-center align-middle">{data.creativity}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default GetSinglePlayerData;

