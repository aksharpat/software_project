import React, {useState} from 'react';
import { Link } from 'react-router-dom';


function BrowseTicketsPage() {
    const lotteryTickets = [
        {name: 'Power Ball', cost: '$2', image: 'PowerBall.png', winnings: '5 million', drawDate: '12-31-2023', winningNumbers: '12 43 12 32 27'},
        {name: 'Mega Millions', cost: '$2', image: 'MegaMillions.png', winnings: '4 million', drawDate: '12-30-2023', winningNumbers: '1 23 45 34 25'},
        {name: 'Lotto Texas', cost: '$1', image: 'TexasLottery.png', winnings: '3 million', drawDate: '12-29-2023', winningNumbers: '5 15 25 35 45'},
        {name: 'Texas Two Step', cost: '$1.50', image: 'TexasTwoStep.png', winnings: '2 million', drawDate: '12-28-2023', winningNumbers: '10 20 30 40 50'}
    ];

    const [selectedTicket, setSelectedTicket] = useState(null);
    const [numbers, setNumbers] = useState(Array(5).fill(''));
    const [submittedNumbers, setSubmittedNumbers] = useState({});

    const handleSelect = (index) => {
        setSelectedTicket(index);
    };

    const handleNumberChange = (index, event) => {
        const newNumbers = [...numbers];
        newNumbers[index] = event.target.value;
        setNumbers(newNumbers);
    };

    const handleSubmit = () => {
        const selectedTicketData = {
            numbers : numbers,
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

        if (!Array.isArray(existingTickets)){
            existingTickets = [];
        }
        existingTickets.push(selectedTicketData);

        localStorage.setItem(lotteryTickets[selectedTicket].name, JSON.stringify(existingTickets));

        setNumbers(Array(5).fill(''));
    }

    const handleRandom = () => {
        const selectedTicketData = {
            numbers : numbers,
            winnings: lotteryTickets[selectedTicket].winnings,
            cost: lotteryTickets[selectedTicket].cost,
            drawDate: lotteryTickets[selectedTicket].drawDate,
            winningNumbers: lotteryTickets[selectedTicket].winningNumbers
        };

        const randomNumbers = Array.from({length: 5}, () =>
        Math.floor(Math.random() * 50)+1);
        setNumbers(randomNumbers);

        let existingTickets =
            JSON.parse(localStorage.getItem(lotteryTickets[selectedTicket].name));

        if (!Array.isArray(existingTickets)){
            existingTickets = [];
        }
        existingTickets.push(selectedTicketData);

        localStorage.setItem(lotteryTickets[selectedTicket].name, JSON.stringify(existingTickets));
    }

    return (
        <div className='browse-tickets-class'>
            <h1>Ticket Page</h1>
            {lotteryTickets.map((ticket, index) =>(
                <div key={index}>
                    <img src={ticket.image} alt={ticket.name}/>
                    <h2>{ticket.name}</h2>
                    <p>Cost: {ticket.cost}</p>
                    {selectedTicket === index && (
                        <div>
                            <p>Winnings: {ticket.winnings}</p>
                            <p>Draw Date: {ticket.drawDate}</p>
                            {numbers.map((number, i) =>(
                                <input key={i} type="number" min="1" max="50" value={number} onChange={(event) => handleNumberChange(i, event)}/>
                            ))}
                            <button onClick={handleSubmit}>Submit Numbers</button>
                            <button onClick={handleRandom}>Random Submit</button>
                        </div>
                    )}
                    <button onClick={() => handleSelect(index)}>Select</button>
                </div>
            ))}
            <Link to='/home'>
                <button>Go Back</button>
            </Link>
        </div>
    );
}

export default BrowseTicketsPage;