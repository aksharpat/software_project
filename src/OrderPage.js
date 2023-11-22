import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';


function OrderPage() {
    const [tickets, setTickets] = React.useState([]);
    const [totalCost, setTotalCost] = React.useState(0);
    const [winnings, setWinnings] = React.useState(0);

    React.useEffect(() => {
        const lotteryNames = ['Power Ball', 'Mega Millions', 'Lotto Texas', 'Texas Two Step'];
        const allLotteryTickets = lotteryNames.map(name => JSON.parse(localStorage.getItem(name))).filter(Array.isArray).flat();
        setTickets(allLotteryTickets);
        const totalCost = allLotteryTickets.reduce((total, ticket) => total + parseFloat(ticket.cost.slice(1)), 0);
        setTickets(allLotteryTickets);
        setTotalCost(totalCost);
    }, []);

    const handleOrder = () => {
        let totalWinnings = 0;
        tickets.forEach(ticket => {
            const winningNumbers = ticket.winningNumbers.split(' ').map(Number);
            const userNumbers = ticket.numbers.map(Number);
            let matches = 0;
            userNumbers.forEach(num => {
                if (winningNumbers.includes(num)) matches++;
            });
            let winningsPercentage;
            switch (matches) {
                case 5:
                    winningsPercentage = 1;
                    break;
                case 4:
                    winningsPercentage = 0.2;
                    break;
                case 3:
                    winningsPercentage = 0.05;
                    break;
                case 2:
                    winningsPercentage = 0.01;
                    break;
                default:
                    winningsPercentage = 0;
            }
            totalWinnings += parseFloat(ticket.winnings.split(' ')[0]) * winningsPercentage;
        });
        setWinnings(totalWinnings);
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1>Order Page</h1>
            {tickets.map((ticket, index) => {
                const winningNumbers = ticket.winningNumbers.split(' ').map(Number);
                const userNumbers = ticket.numbers.map(Number);
                let matches = 0;
                userNumbers.forEach(num => {
                    if (winningNumbers.includes(num)) matches++;
                });
                let winningPercentage;
                switch (matches) {
                    case 5:
                        winningPercentage = 1;
                        break;
                    case 4:
                        winningPercentage = 0.2;
                        break;
                    case 3:
                        winningPercentage = 0.05;
                        break;
                    case 2:
                        winningPercentage = 0.01;
                        break;
                    default:
                        winningPercentage = 0;
                }
                const ticketWinnings = parseFloat(ticket.winnings.split(' ')[0]) * winningPercentage;
                return(
                    <div key={index}>
                        <h2>Ticket: {ticket.name} {ticketWinnings > 0 && <span>: Winning Ticket!</span>}</h2>
                        <p>Cost: {ticket.cost}</p>
                        <p>Winnings: ${ticket.winnings}</p>
                        <p>Draw Date: {ticket.drawDate}</p>
                        <p>Your Numbers: {Array.isArray(ticket.numbers) ? ticket.numbers.join(' ') : 'No numbers'}</p>
                    </div>
                );
            })}
            <p>Total Cost: ${totalCost.toFixed(2)}</p>
            {winnings > 0 && <p>You Won ${winnings.toFixed(2)}!</p>}
            <button onClick={handleOrder}>Order Now</button>
        </div>
    );
}

export default OrderPage;