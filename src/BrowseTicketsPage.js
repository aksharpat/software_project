import React, {useState} from 'react';
import { Link } from 'react-router-dom';


function BrowseTicketsPage() {
    const lotteryTickets = [
        {name: 'Power Ball', cost: '$2', image: 'PowerBall.png'},
        {name: 'Mega Millions', cost: '$2', image: 'MegaMillions.png'},
        {name: 'Lotto Texas', cost: '$1', image: 'TexasLottery.png'},
        {name: 'Texas Two Step', cost: '$1.50', image: 'TexasTwoStep.png'}
    ];

    return (
        <div className='browse-tickets-class'>
            <h1>Ticket Page</h1>
            {lotteryTickets.map((ticket, index) =>(
                <div key={index}>
                    <img src={ticket.image} alt={ticket.name}/>
                    <h2>{ticket.name}</h2>
                    <p>Cost: {ticket.cost}</p>
                    <p>Winnings: TBD</p>
                </div>
            ))}
            <Link to='/home'>
                <button>Go Back</button>
            </Link>
        </div>
    );
}

export default BrowseTicketsPage;