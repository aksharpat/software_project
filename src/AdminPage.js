import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getNumbers, getTickets } from './api';

function AdminPage() {
    const [reportVisible, setReportVisible] = useState(false);
    const [ticketsData, setTicketsData] = useState([]);
    const [ticketsData2, setTicketsData2] = useState([]);
    const [ticketUpdates, setTicketUpdates] = useState({});
    const [newTicket, setNewTicket] = useState({
        name: '',
        cost: '',
        image: '',
        drawDate: '',
        winningNumbers: '',
        winnings: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            setTicketsData(getNumbers());
            setTicketsData2(getTickets());
        };

        fetchData();
    }, []);

    const generateReport = () => {
        const totalRevenue = ticketsData.reduce((total, ticket) => {
            return total + ticket.number_sold * ticket.ticket_price;
        }, 0);

        const generatedReport = ticketsData.map(ticket => (
            <div key={ticket.name}>
                <p>{ticket.name}: {ticket.number_sold} SOLD</p>
            </div>
        ));

        generatedReport.push(<p key="total">Total Revenue: ${totalRevenue}</p>);

        return generatedReport;
    };

    const toggleReportVisibility = () => {
        setReportVisible(!reportVisible);
    };

    const handleUpdateTicket = async (name) => {
        try {
            const updateData = ticketUpdates[name];

            if (updateData) {
                const response = await axios.post('http://localhost:3001/update-ticket', {
                    ticketName: name,
                    newCost: updateData.newCost,
                    newWinnings: updateData.newWinnings,
                });

                console.log(response.data);

                setTicketsData(getNumbers());
                setTicketsData2(getTickets());
            }
        } catch (error) {
            console.error('Error updating ticket:', error.message);
        }
    };

    const handleAddTicket = async () => {
        try {
            const response = await axios.post('http://localhost:3001/add-new-ticket', newTicket);
            console.log(response.data);
        } catch (error) {
            console.error('Error adding ticket:', error.message);
        }
    };

    const handleDeleteTicket = async (ticketNameToDelete) => {
        try {
            const response = await axios.delete(`http://localhost:3001/delete-ticket/${ticketNameToDelete}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error deleting ticket:', error.message);
        }
    };

    const handleInputChange = (name, field, value) => {
        setTicketUpdates(prevUpdates => ({
            ...prevUpdates,
            [name]: {
                ...prevUpdates[name],
                [field]: value,
            },
        }));
    };

    const handleInputChange2 = (e) => {
        const { name, value } = e.target;
        console.log(`Input changed - Name: ${name}, Value: ${value}`);
        setNewTicket((prevTicket) => ({
            ...prevTicket,
            [name]: value,
        }));
    };

    return (
        <div className="admin-page">
            <h1>Admin Page</h1>
            <h2>Welcome, Admin!</h2>
            <button onClick={toggleReportVisibility}>Generate Report</button>

            {reportVisible && (
                <div className="report-container">
                    <h3>Sales Report</h3>
                    {generateReport()}
                    <button onClick={toggleReportVisibility}>Hide Report</button>
                </div>
            )}
            {/* Display all tickets and allow admin to update */}
            <div>
                <h3>All Tickets</h3>
                {ticketsData2.map(ticket => (
                    <div key={ticket.name}>
                        <p>{ticket.name}</p>
                        <p>Cost: {ticket.cost}</p>
                        <p>Winnings: {ticket.winnings}</p>
                        {/* Input fields for modifying cost and winnings */}
                        <div>
                            <label>New Cost: </label>
                            <input
                                type="text"
                                value={ticketUpdates[ticket.name]?.newCost || ''}
                                onChange={(e) => handleInputChange(ticket.name, 'newCost', e.target.value)}
                            />
                        </div>
                        <div>
                            <label>New Winnings: </label>
                            <input
                                type="text"
                                value={ticketUpdates[ticket.name]?.newWinnings || ''}
                                onChange={(e) => handleInputChange(ticket.name, 'newWinnings', e.target.value)}
                            />
                        </div>
                        <button onClick={() => handleUpdateTicket(ticket.name)}>
                            Update Ticket
                        </button>
                        <button onClick={() => handleDeleteTicket(ticket.name)}>
                            Delete Ticket
                        </button>
                    </div>
                ))}
            </div>
            <div>
                <h3>Add New Ticket</h3>
                <label>Name: </label>
                <input type="text" name="name" value={newTicket.name} onChange={handleInputChange2} />
                <label>Cost: </label>
                <input type="text" name="cost" value={newTicket.cost} onChange={handleInputChange2} />
                <label>Image: </label>
                <input type="text" name="image" value={newTicket.image} onChange={handleInputChange2} />
                <label>Draw Date: </label>
                <input type="text" name="drawDate" value={newTicket.drawDate} onChange={handleInputChange2} />
                <label>Winning Numbers: </label>
                <input type="text" name="winningNumbers" value={newTicket.winningNumbers} onChange={handleInputChange2} />
                <label>Winnings: </label>
                <input type="text" name="winnings" value={newTicket.winnings} onChange={handleInputChange2} />
                <button onClick={handleAddTicket}>Add Ticket</button>
            </div>
        </div>
    );
}

export default AdminPage;