import React, { useEffect, useState } from 'react';
import { getFplData } from '../../FplApi';
import GetSinglePlayerData from './GetSinglePlayerData';



const GetPlayerData = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("dsc");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPlayerId, setCurrentPlayerId] = useState(null);

    const playersPerPage = 10;



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

    const handleClose = () => {
        setCurrentPlayerId(null);
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

    const sortPlayersBy = (players) => {
        const sortedPlayers = [...players];
        sortedPlayers.sort((a, b) => {

            let comparisons;
            switch (sortBy) {
                case "price":
                    comparisons = a.now_cost - b.now_cost;
                    break;
                case "team":
                    comparisons = data.teams[a.team - 1].name.localeCompare(data.teams[b.team - 1]?.name || "");
                    break;
                case "position":
                    comparisons = a.element_type - b.element_type;
                    break;
                case "form":
                    comparisons = a.form - b.form;
                    break;
                default:
                    return 0;
            }
            return sortOrder === "asc" ? comparisons : -comparisons;
        });
        return sortedPlayers;
    };

    const filterBySearch = (players) => {
        return players.filter(player => {
            const teamname = data.teams[player.team - 1]?.name || ''; 
            return (
                player.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                player.second_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                teamname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                getPlayerPosition(player.element_type).toLowerCase().includes(searchQuery.toLowerCase()) 
            );
        });
    };


    if (error) return <div className="text-red-600">Error: {error}</div>;
    if (!data) return <div className="text-center text-lg">Loading...</div>;


    let displayedPlayers = data.elements.slice(); 

    displayedPlayers = sortPlayersBy(displayedPlayers); 
    displayedPlayers = filterBySearch(displayedPlayers); 
    displayedPlayers = displayedPlayers.slice(startIndex, endIndex); 

    const displayTeams = data.teams;

    return (
        <div className="bg-gray-800 px-4 py-4">


            <div className="mb-4 flex items-center justify-between">
                {/* Sorting */}
                <div className="flex items-center">
                    <label htmlFor="sort-by" className="mr-2 text-lg text-white">Sort by:</label>
                    <select
                        id="sort-by"
                        className="px-4 py-2 bg-gray-200 border-gray-900 border rounded hover:bg-gray-300"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">None</option>
                        <option value="price">Price</option>
                        <option value="team">Team</option>
                        <option value="position">Position</option>
                        <option value="form">Form</option>
                    </select>

                    <button
                        className="ml-4 px-4 py-2 bg-gray-200 border-gray-900 border rounded hover:bg-gray-300"
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    >
                        {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                    </button>
                </div>

                {/* Search */}
                <div>
                    <input
                        type="text"
                        className="px-4 py-2 bg-gray-200 border-gray-900 border rounded hover:bg-gray-300"
                        placeholder="Search by player name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            


            <table className="min-w-full  border-collapse bg-gray-700 text-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Team</th>
                        <th className="py-2 px-4 border">Position</th>
                        <th className="py-2 px-4 border">Cost</th>
                        <th className="py-2 px-4 border">Form</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedPlayers.map(player => (
                        <tr key={player.id}>
                            <td className="py-2 px-4 border">
                                <span
                                    className="cursor-pointer text-blue-500 hover:underline text-white"
                                    onClick={() => {
                                        setCurrentPlayerId(player.id);
                                    } }
                                >
                                    {player.first_name} {player.second_name}
                                </span>
                            </td>
                            <td className="py-2 px-4 border">
                                {displayTeams[player.team - 1] ? displayTeams[player.team - 1].name : 'Unknown Team'}
                   </td>
                            <td className="py-2 px-4 border">{getPlayerPosition(player.element_type)}</td>
                            <td className="py-2 px-4 border">{player.now_cost / 10}m</td>
                            <td className="py-2 px-4 border">{player.form}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-4">
                <button
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded mr-2"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}>
                    Previous
                </button>
                <button
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded ml-2"
                    onClick={handleNextPage}
                    disabled={endIndex >= data.elements.length}>
                    Next
                </button>
            </div>

            {currentPlayerId && <GetSinglePlayerData playerId={currentPlayerId} onClose={handleClose} />}

        </div>
    );
};

export default GetPlayerData;
