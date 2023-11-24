import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import emailjs from 'emailjs-com';
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const initialOptions = {
    "client-id": "AfvwQTYUIPvDcqFQO-IV0SrWCPcK9SK0xgt6fOyn-q_wnv34MnZOnCiM-SidFFBDrnWTDW2czoCo4yvW",
    currency: "USD",
    intent: "capture",
};

const OrderPage = ({userData}) => {
    const [tickets, setTickets] = React.useState([]);
    const [totalCost, setTotalCost] = React.useState(0);
    const [winnings, setWinnings] = React.useState(0);
    const [isOrdered, setIsOrdered] = React.useState(false);
    const [isDrawDate, setIsDrawDate] = React.useState(false);

    React.useEffect(() => {
        const lotteryNames = ['Power Ball', 'Mega Millions', 'Lotto Texas', 'Texas Two Step'];
        const allLotteryTickets = lotteryNames.map(name => JSON.parse(localStorage.getItem(name))).filter(Array.isArray).flat();
        setTickets(allLotteryTickets);
        const totalCost = allLotteryTickets.reduce((total, ticket) => total + parseFloat(ticket.cost.slice(1)), 0);
        setTickets(allLotteryTickets);
        setTotalCost(totalCost);
    }, []);

    const handleOrder = async () => {
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
        if (totalWinnings > 0) {

            const userEmail = userData.username; //Getting the email
            console.log(userData)
            // Sending the email to given address
            emailjs.send('service_bmwm2yc', 'template_alcqu2l', {
                to_name: userEmail,
                message: 'YOU WON!',
                from_name: 'LPS',
                image_url: 'https://banner2.cleanpng.com/20180328/tse/kisspng-money-bag-computer-icons-coin-tax-market-5abbb0febf56f2.7630683415222499827837.jpg'
            }, 'Jw4DUr2HVXUwYQMBx').then((result) => {
                console.log('Email succesfully sent!');
            }, (error) => {
                console.log('Failed to send email:', error);
            });

        }

        // Calculating number of bought tickets
        const ticketCount = tickets.reduce((counts, ticket) => {
            if (!counts[ticket.name]) {
                counts[ticket.name] = 1;
            } else {
                counts[ticket.name]++;
            }
            return counts;
        }, {});

        const handleAddTicket = async (ticketName, numTickets) => {
            try {
                const response = await axios.post('http://localhost:3001/add-ticket', {
                    ticketName,
                    numTickets,
                });

                console.log(response.data);
            } catch (error) {
                console.error('Error adding tickets:', error.message);
            }
        };

        for (const [ticketName, numTickets] of Object.entries(ticketCount)) {
            await handleAddTicket(ticketName, numTickets);
        }

        console.log(ticketCount);

        // Calculating the current date
        const today = new Date().toISOString().split('T')[0];
        const hasDrawDate = tickets.some(ticket => ticket.drawDate === today);

        setIsDrawDate(hasDrawDate);

        setIsOrdered(true);
        setWinnings(totalWinnings);
    }

    return (
        <PayPalScriptProvider options={initialOptions}>
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
                return (
                    <div key={index}>
                        <h2>Ticket: {ticket.name} {isDrawDate && isOrdered && ticketWinnings > 0 &&
                            <span>: Winning Ticket!</span>}</h2>
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
            <PayPalButtons createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [{amount: {value: totalCost.toFixed(2),},},],});
            }}
           onApprove={(data, actions) => {
               return actions.order.capture().then((details) => {
                   console.log("Order approved: ", details);
               });
           }}/>
        </div>
        </PayPalScriptProvider>
    );
}

export default OrderPage;