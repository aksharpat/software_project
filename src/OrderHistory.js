import React from 'react';
import { getHistory } from './api';

const OrderHistory = () => {

    const orderHistoryData = getHistory()
    return (
        <div className="history-page">
            <h1>Order History</h1>
            {orderHistoryData.map((order, index) => (
                <div key={index}>
                    <h3>{order.Ticket}</h3>
                    <p>Cost: {order.Cost}</p>
                    <p>Winnings: {order.Winnings}</p>
                    <p>Draw Date: {order.Draw_Date}</p>

                    {order['Current?'] ? (
                        <p>Your Numbers: {order.Your_Numbers}</p>
                    ) : (
                        <>
                            {order.Your_Numbers === order.Winning_Numbers ? (
                                <>
                                    <p>You won!</p>
                                    <p>Your Numbers: {order.Your_Numbers}</p>
                                    <p>Winning Numbers: {order.Winning_Numbers}</p></>
                            ) : (
                                <>
                                    <p>Your Numbers: {order.Your_Numbers}</p>
                                    <p>Winning Numbers: {order.Winning_Numbers}</p>
                                </>
                            )}
                        </>
                    )}
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default OrderHistory;