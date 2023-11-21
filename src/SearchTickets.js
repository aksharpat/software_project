import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchTicket = () => {
    const [ticketName, setTicketName] = useState('');
    const [searchResults, setSearchResults] = useState(null);

    const handleSearch = async () => {
        try {
            const lotteryTickets = [
                { name: 'Power Ball', cost: '$2', image: 'PowerBall.png' },
                { name: 'Mega Millions', cost: '$2', image: 'MegaMillions.png' },
                { name: 'Lotto Texas', cost: '$1', image: 'TexasLottery.png' },
                { name: 'Texas Two Step', cost: '$1.50', image: 'TexasTwoStep.png' }
            ];
            const foundTickets = lotteryTickets.filter(ticket =>
                ticket.name.toLowerCase().includes(ticketName.toLowerCase())
            );

            setSearchResults(foundTickets);
        } catch (error) {
            console.error('Error during ticket search:', error);
        }
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setTicketName(inputValue);
        handleSearch(); // Trigger search as the user types
    };

    return (
        <div className='search-ticket'>
            <h1>Search for a Specific Lottery Ticket</h1>
            <Link to='/browse-tickets'>
                <button>Browse Tickets</button>
            </Link>
            <div>
                <label>Ticket Name:</label>
                <input type="text" value={ticketName} onChange={handleInputChange} />
            </div>
            {searchResults && searchResults.length > 0 ? (
                <div>
                    <h2>Search Results</h2>
                    {searchResults.map((result, index) => (
                        <div key={index}>
                            <p>Ticket Name: {result.name}</p>
                            <p>Cost: {result.cost}</p>
                            {/* Add other ticket details as needed */}
                            <img src={result.image} alt={result.name} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>No matching tickets found.</p>
            )}
        </div>
    );
};

export default SearchTicket;