import React, { useEffect, useState } from 'react';
import { getFplData } from '../../FplApi';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const GetFplEventData = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [currentWeek, setCurrentWeek] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getFplData();
                setData(result);

                const currentEvent = result.events.find(event => event.is_current === true);
                setCurrentWeek(currentEvent.id);


            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    const handlePreviousWeek = () => {
        if (currentWeek > 1) {
            setCurrentWeek(currentWeek - 1);
        }
    };

    const handleNextWeek = () => {
        if (currentWeek < data.events.length) {
            setCurrentWeek(currentWeek + 1);
        }
    };

    if (error) return <div className="text-red-600">Error: {error}</div>;
    if (!data) return <div className="text-center text-lg">Loading...</div>;

    const currentEvent = data.events.find(event => event.id === currentWeek);
    const currentMostCaptainedIndex = currentEvent.most_captained;

    const currentMostCaptained = data.elements.find(el => el.id === currentMostCaptainedIndex);


    return (
        <div className="bg-gray-800 px-4 py-4">
            <div className="flex justify-center mb-6 space-x-4 ">

                <IconButton
                    onClick={handlePreviousWeek}
                    disabled={currentWeek === 1}
                    className="px-4 py-2 rounded disabled:opacity-50"
                    aria-label="back"
                >
                    <ArrowBackIcon className="text-white"/>
                </IconButton>

                <h2 className="pt-1 mx-4 text-xl font-bold text-white">GW {currentWeek}</h2>
                <IconButton
                    onClick={handleNextWeek}
                    disabled={currentWeek === data.events.length}
                    className="px-4 py-2 rounded disabled:opacity-50"
                    aria-label="back"
                >

                    <ArrowForwardIcon className="text-white" />
                </IconButton>
            </div>

            {currentEvent && (
                <table className="min-w-full border-collapse bg-gray-900 text-white">
                    <thead className="bg-gray-700">
                        <tr className="py-2 px-4 ">
                            <th className="py-2 px-4 border text-center align-middle border-gray-900">Average Score</th>
                            <th className="py-2 px-4 border text-center align-middle border-gray-900">Highest Score</th>
                            <th className="py-2 px-4 border text-center align-middle border-gray-900">Transfers Made</th>
                            <th className="py-2 px-4 border text-center align-middle border-gray-900">Week's Deadline</th>
                            <th className="py-2 px-4 border text-center align-middle border-gray-900">Week's Most Captained</th>
                            <th className="py-2 px-4 border text-center align-middle border-gray-900">Bench Boosts Played</th>
                            <th className="py-2 px-4 border text-center align-middle border-gray-900">Triple Captain Played</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-700 text-lg text-semibold font-semibold">
                            <td className="py-2 px-4 border border-b-2 border-gray-900 text-center align-middle">{currentEvent.average_entry_score}</td>
                            <td className="py-2 px-4 border border-b-2 border-gray-900 text-center align-middle">{currentEvent.highest_score || 'N/A'}</td>
                            <td className="py-2 px-4 border border-b-2 border-gray-900 text-center align-middle">{currentEvent.transfers_made}</td>
                            <td className="py-2 px-4 border border-b-2 border-gray-900 text-center align-middle">
                                {currentEvent.finished ? "Week has passed" : currentEvent.deadline_time}
                            </td>

                            <td className="py-2 px-4 border border-b-2 border-gray-900 text-center align-middle">
                                {currentMostCaptained ? `${currentMostCaptained.first_name} ${currentMostCaptained.second_name}` : "N/A"}

                            </td>
                            <td className="py-2 px-4 border border-b-2 border-gray-900 text-center align-middle">{currentEvent.chip_plays[0] ? currentEvent.chip_plays[0].num_played : "N/A"}</td>
                            <td className="py-2 px-4 border border-b-2 border-gray-900 text-center align-middle">{currentEvent.chip_plays[1]  ? currentEvent.chip_plays[1].num_played : "N/A"}</td>

                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default GetFplEventData;
