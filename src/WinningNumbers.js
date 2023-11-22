import React from 'react';
import { useState, useEffect } from 'react';
import data from './data/win_numbers.json';

const WinningNumbers = ({ user }) => {
    const [lotteryData, setLotteryData] = useState([]);

    useEffect(() => {
        setLotteryData(data);
        const filteredLotteryData = user.admin
            ? data // Display all data for admins
            : data.filter(item => item.previous); // Display only non-previous data for non-admins

        setLotteryData(filteredLotteryData);
        console.log(lotteryData)
    }, [user.admin]); // Run the effect only once on mount
    return (
        <div>
            <h1>Previous Winning Numbers</h1>
            {lotteryData.map((item, index) => (
                <div key={index} >
                    <h2>{item.name}</h2>
                    <p>Winning Numbers: {item.winningNumbers}</p>
                    {/* Display other details */}
                    {item.previous && <p className='previous'>Previous Draw</p>}
                    {!item.previous && <p className='current'>Current Draw</p>}
                </div>
            ))}
        </div>
    );
}

export default WinningNumbers;