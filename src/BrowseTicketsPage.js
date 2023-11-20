import React, {useState} from 'react';
import { Link } from 'react-router-dom';


function BrowseTicketsPage() {
    const lotteryTickets = [
        {name: 'Power Ball', cost: '$2', image: 'PowerBall.png'},
        {name: 'Mega Millions', cost: '$2', image: 'MegaMillions.png'},
        {name: 'Lotto Texas', cost: '$1', image: 'TexasLottery.png'},
        {name: 'Texas Two Step', cost: '$1.50', image: 'TexasTwoStep.png'}
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
        setSubmittedNumbers({
            ...submittedNumbers, [lotteryTickets[selectedTicket].name]: numbers
        });
        setNumbers(Array(5).fill(''));

        localStorage.setItem(lotteryTickets[selectedTicket].name, JSON.stringify(numbers));
    }

    return (
        <div className='browse-tickets-class'>
            <h1>Ticket Page</h1>
            {lotteryTickets.map((ticket, index) =>(
                <div key={index}>
                    <img src={ticket.image} alt={ticket.name}/>
                    <h2>{ticket.name}</h2>
                    <p>Cost: {ticket.cost}</p>
                    <p>Winnings: TBD</p>
                    <button onClick={() => handleSelect(index)}>Select</button>
                    {selectedTicket === index && numbers.map((number, i) =>(
                        <input key={i} type="number" min="1" max="50" value={number} onChange={(event) => handleNumberChange(i, event)}/>
                    ))}
                    {selectedTicket === index && <button onClick={handleSubmit}>Submit</button> }
                </div>
            ))}
            <Link to='/home'>
                <button>Go Back</button>
            </Link>
        </div>
    );
}

export default BrowseTicketsPage;