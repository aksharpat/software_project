import React, { useState } from 'react';
import { getHistory } from './api';

const OrderHistory = () => {

    const orderHistoryData = getHistory()

    const [showMessage, setShowMessage] = useState(false);
    const [messageText, setMessageText] = useState('');

    const handleDepositWinnings = (order) => {
        // Handle deposit winnings logic
        console.log(`Deposit winnings for order: ${order.Confirmation}`);
    };

    const handleSendEmailConfirmation = (order) => {
        // Handle send email confirmation logic
        console.log(`Send email confirmation for order: ${order.Confirmation}`);
    };

    const handleButtonClick = (message) => {
        // Set the message to be displayed
        setMessageText(message);

        // Show the message when the button is clicked
        setShowMessage(true);

        // Hide the message after a delay (e.g., 3 seconds)
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    };

    return (
        <div className="history-page">
            <h1>Order History</h1>
            {orderHistoryData.map((order, index) => (
                <div key={index}>
                    <h3>{order.Ticket}</h3>
                    <p>Cost: {order.Cost}</p>
                    <p>Winnings: {order.Winnings}</p>
                    <p>Draw Date: {order.Draw_Date}</p>
                    <p>Confirmation: {order.Confirmation}</p>
                    {order['Current'] ? (
                        <p>Your Numbers: {order.Your_Numbers}</p>
                    ) : (
                        <>
                            {order.Your_Numbers === order.Winning_Numbers ? (
                                <>
                                    <p>You won!</p>
                                    <p>Your Numbers: {order.Your_Numbers}</p>
                                    <p>Winning Numbers: {order.Winning_Numbers}</p>
                                    {order.Winnings && order.Winnings.split('$')[1] < 599 && (
                                        <button onClick={() => handleButtonClick('Depositing Winnings...')}>
                                            Deposit Winnings
                                        </button>
                                    )}
                                    {order.Winnings && order.Winnings.split('$')[1] >= 599 && (
                                        <button onClick={() => handleButtonClick('Sending Email Confirmation...')}>
                                            Send Email Confirmation
                                        </button>
                                    )}
                                </>
                            ) : (
                                <>
                                    <p>Your Numbers: {order.Your_Numbers}</p>
                                    <p>Winning Numbers: {order.Winning_Numbers}</p>
                                </>
                            )}
                        </>
                    )}
                    {showMessage && (
                        <div>
                            {messageText}
                        </div>
                    )}
                    <hr />

                </div>
            ))}
        </div>
    );
};

export default OrderHistory;