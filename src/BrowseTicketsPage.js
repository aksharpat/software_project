import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getTickets } from './api';


function BrowseTicketsPage() {
    const lotteryTickets = getTickets()

    const [selectedTicket, setSelectedTicket] = useState(null);
    const [numbers, setNumbers] = useState(Array(5).fill(''));
    const [submittedNumbers, setSubmittedNumbers] = useState({});
    const [counter, setCounter] = React.useState(0);


    const handleSelect = (index) => {
        setSelectedTicket(index);
    };

    const handleNumberChange = (index, event) => {
        const newNumbers = [...numbers];
        newNumbers[index] = event.target.value;
        setNumbers(newNumbers);
    };

    const handleSubmit = () => {
        if (selectedTicket === null) {
            alert('Please select a ticket first.');
            return;
        }

        if (counter >= 10) {
            alert('You cannot add more tickets.');
            return;
        }

        const selectedTicketData = {
            name: lotteryTickets[selectedTicket].name,
            numbers: numbers,
            winnings: lotteryTickets[selectedTicket].winnings,
            cost: lotteryTickets[selectedTicket].cost,
            drawDate: lotteryTickets[selectedTicket].drawDate,
            winningNumbers: lotteryTickets[selectedTicket].winningNumbers
        };

        setSubmittedNumbers({
            ...submittedNumbers, [lotteryTickets[selectedTicket].name]: numbers
        });

        let existingTickets =
            JSON.parse(localStorage.getItem(lotteryTickets[selectedTicket].name));

        if (!Array.isArray(existingTickets)) {
            existingTickets = [];
        }
        existingTickets.push(selectedTicketData);

        localStorage.setItem(lotteryTickets[selectedTicket].name, JSON.stringify(existingTickets));

        setNumbers(Array(5).fill(''));
        setCounter(counter + 1);

        console.log(`Counter: ${counter + 1}`);
    }

    const handleRandom = () => {
        if (selectedTicket === null) {
            alert('Please select a ticket first.');
            return;
        }

        if (counter >= 10) {
            alert('You cannot add more tickets.');
            return;
        }

        const randomNumbers = Array.from({ length: 5 }, () =>
            Math.floor(Math.random() * 50) + 1);
        setNumbers(randomNumbers);

        const selectedTicketData = {
            name: lotteryTickets[selectedTicket].name,
            numbers: randomNumbers,
            winnings: lotteryTickets[selectedTicket].winnings,
            cost: lotteryTickets[selectedTicket].cost,
            drawDate: lotteryTickets[selectedTicket].drawDate,
            winningNumbers: lotteryTickets[selectedTicket].winningNumbers
        };

        let existingTickets =
            JSON.parse(localStorage.getItem(lotteryTickets[selectedTicket].name));

        if (!Array.isArray(existingTickets)) {
            existingTickets = [];
        }
        existingTickets.push(selectedTicketData);

        localStorage.setItem(lotteryTickets[selectedTicket].name, JSON.stringify(existingTickets));

        setCounter(counter + 1);

        console.log(`Counter: ${counter + 1}`);
    }

    return (
        <div className='browse-tickets-class'>
            <h1>Ticket Page</h1>
            {lotteryTickets.map((ticket, index) => (
                <div key={index}>
                    <img src={ticket.image} alt={ticket.name} />
                    <h2>{ticket.name}</h2>
                    <p>Cost: {ticket.cost}</p>
                    {selectedTicket === index && (
                        <div>
                            <p>Winnings: {ticket.winnings}</p>
                            <p>Draw Date: {ticket.drawDate}</p>
                            {numbers.map((number, i) => (
                                <input key={i} type="number" min="1" max="50" value={number} onChange={(event) => handleNumberChange(i, event)} />
                            ))}
                            <button onClick={handleSubmit}>Submit Numbers</button>
                            <button onClick={handleRandom}>Random Submit</button>
                        </div>
                    )}
                    <button onClick={() => handleSelect(index)}>Select</button>
                    <button onClick={() => setCounter(0)}>Reset Counter</button>
                </div>
            ))}
            <Link to='/home'>
                <button>Go Back</button>
            </Link>
        </div>
    );
}

export default BrowseTicketsPage;