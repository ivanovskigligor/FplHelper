import React, { useEffect, useState } from 'react';
import { getFplData } from '../../FplApi';
import { GetFplElementSummary } from '../../FplApi';
import teamBadges from './teamBadges';


const GetSinglePlayerData = ({ playerId, onClose }) => {
    const [data, setData] = useState(null);
    const [event, setEvent] = useState(null);
    const [player, setPlayer] = useState(null);
    const [teams, setTeams] = useState(null);
    const [error, setError] = useState(null);
    const [playerHistory, setPlayerHistory] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const result = await getFplData();
                setTeams(result.teams);
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
                    setPlayerHistory(element.history);
                } catch (error) {
                    setError(error.message);
                }
            }
        };

        fetchSingleElementData();
    }, [data]);

    const getPlayerPosition = (elementType) => {
        switch (elementType) {
            case 1: return 'Goalkeeper';
            case 2: return 'Defender';
            case 3: return 'Midfielder';
            case 4: return 'Forward';
            default: return 'Unknown';
        }
    };

    const getEnemyTeam = (fixture) => {
        return teams[fixture.team_h - 1] && teams[fixture.team_h - 1].name !== (teams[data.team - 1] ? (teams[data.team - 1].name) : "unknown")
            ? teams[fixture.team_h - 1].name
            : (teams[fixture.team_a - 1] ? teams[fixture.team_a - 1].name : 'Unknown Team')
    }
    if (error) return <div className="text-red-600">Error: {error}</div>;
    if (!data) return <div className="text-center text-lg"></div>;

    const playerImageUrl = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${data.photo.replace('.jpg', '.png')}`;
    const playerFixtures = Array.isArray(player) ? player.slice(0, 3) : [];
    const playerForm = Array.isArray(playerHistory) ? playerHistory.slice(0, 3) : [];

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm">
            <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-5xl">
                <button
                    className="absolute top-1 right-1 text-white text-2xl"
                    onClick={() => onClose()}
                >
                    X
                </button>


                <div className="flex">
                    <div className="flex flex-col items-center w-full">
                        <h2 className="text-2xl mb-4 text-white">{data.first_name} {data.second_name} - {getPlayerPosition(data.element_type)}</h2>
                        <h3 className="text-xl mb-4 text-white">{teams[data.team - 1].name}</h3>


                        <img
                            srcSet={playerImageUrl}
                            sizes="(min-width: 700px) 200px"
                            alt={`${data.first_name} ${data.second_name}`}
                            className="w-auto h-full"
                            role="presentation"
                        />
                    </div>

                    <div className="flex flex-col items-center w-full ">

                        <h3 className="text-lg text-white mb-4">Fixtures</h3>
                        <div className="flex justify-center items-center w-full text-center max-w-md w-full">
                            <div className="mx-8 inline-flex border-b  border-white">
                                {playerFixtures.length > 0 ? (
                                    playerFixtures.slice(0, 3).map(fixture => {
                                        const teamName = getEnemyTeam(fixture);

                                        return (
                                            <div key={fixture.id} className="justify-center items-center text-center px-8 flex flex-col items-center">
                                                <h1 className="text-md text-white ">{fixture.event_name}</h1>
                                                <h2 className="text-md text-white my-4">
                                                    {teamName}
                                                </h2>
                                                <img
                                                    srcSet={teamBadges[0][teamName]}
                                                    sizes="24px"
                                                    alt={`Team badge`}
                                                    className=""
                                                    role="presentation"
                                                />
                                                <h2
                                                    className={`
                                                    text-lg text-white p-2 rounded border-black border-2 border-white my-4 w-full
                                                    ${fixture.difficulty === 1 ? 'bg-green-700' : ''}
                                                    ${fixture.difficulty === 2 ? 'bg-green-500' : ''}
                                                    ${fixture.difficulty === 3 ? 'bg-yellow-400' : ''}
                                                    ${fixture.difficulty === 4 ? 'bg-red-600' : ''}
                                                    ${fixture.difficulty === 5 ? 'bg-red-900' : ''}
                                                `}
                                                >
                                                    {fixture.difficulty}
                                                </h2>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-white">No fixtures available.</p>
                                )}
                            </div>
                        </div>

                        <h3 className="text-lg text-white mb-4">From</h3>

                        <div className="flex justify-center items-center w-full text-center max-w-md w-full ">

                            <div className="mx-8 inline-flex ">
                                {playerForm.length > 0 ? (
                                    playerForm.slice(0, 3).map(form => {
                                        const teamName = teams[form.opponent_team - 1].name;
                                        return (
                                            <div key={form.round} className="justify-center items-center text-center px-8 flex flex-col items-center">
                                                <h1 className="text-md text-white ">Gameweek {form.round}</h1>
                                                <h2 className="text-md text-white my-4">
                                                    {teamName}
                                                </h2>
                                                <img
                                                    srcSet={teamBadges[0][teamName]}
                                                    sizes="24px"
                                                    alt={`Team badge`}
                                                    className=""
                                                    role="presentation"
                                                />
                                                <h2
                                                    className=" text-lg text-white p-2 rounded border-black border-2 border-white my-4 w-full">
                                                    {form.total_points}
                                                </h2>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-white">No fixtures available.</p>
                                )}
                            </div>
                        </div>
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
        </div>

    );
};

export default GetSinglePlayerData;
