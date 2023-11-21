import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function OrderPage() {
    const [tickets, setTickets] = React.useState([]);

    React.useEffect(() => {
        const lotteryNames = ['Power Ball', 'Mega Millions', 'Lotto Texas', 'Texas Two Step'];
        const allLotteryTickets = lotteryNames.map(name => JSON.parse(localStorage.getItem(name))).filter(Array.isArray).flat();
        setTickets(allLotteryTickets);
    }, []);

    return (
        <div style ={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
            <h1>Order Page</h1>
            {tickets.map((ticket, index) => (
                <div key={index}>
                    <h2>Ticket: {ticket.name}</h2>
                    <p>Cost: {ticket.cost}</p>
                    <p>Winnings: {ticket.winnings}</p>
                    <p>Draw Date: {ticket.drawDate}</p>
                    <p>Your Numbers: {ticket.numbers.join(' ')}</p>
                </div>
            ))}
        </div>
    );
}

export default OrderPage;