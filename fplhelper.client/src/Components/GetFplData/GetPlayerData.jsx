import React, { useEffect, useState } from 'react';
import { getFplData } from '../../FplApi';

const GetPlayerData = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const playersPerPage = 10;

    // calc index range

    const startIndex = (currentPage - 1) * playersPerPage;
    const endIndex = startIndex + playersPerPage;

 
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

    const handleNextPage = () => {
        if (endIndex < data.elements.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const getPlayerPosition = (elementType) => {
        switch (elementType) {
            case 1: return 'Goalkeeper';
            case 2: return 'Defender';
            case 3: return 'Midfielder';
            case 4: return 'Forward';
            default: return 'Unknown';
        }
    };

    if (error) return <div className="text-red-600">Error: {error}</div>;
    if (!data) return <div className="text-center text-lg">Loading...</div>;

    const displayedPlayers = data.elements.slice(startIndex, endIndex);
    const displayTeams = data.teams;

    return (
        <div className="player-list">
            <h2 className="text-2xl mb-4">Player List</h2>
            <table className="min-w-full bg-white border-collapse bg-gray-700 text-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Team</th>
                        <th className="py-2 px-4 border">Position</th>
                        <th className="py-2 px-4 border">Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedPlayers.map(player => (
                        <tr key={player.id}>
                            <td className="py-2 px-4 border">
                                {player.first_name} {player.second_name}
                            </td>
                            <td className="py-2 px-4 border">{displayTeams[player.team].name}</td>
                            <td className="py-2 px-4 border">{getPlayerPosition(player.element_type)}</td>
                            <td className="py-2 px-4 border">{player.now_cost / 10}m</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between mt-4">
                <button
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}>
                    Previous
                </button>
                <button
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                    onClick={handleNextPage}
                    disabled={endIndex >= data.elements.length}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default GetPlayerData;
