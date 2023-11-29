const express = require('express');
const bodyParser = require('body-parser');
//const salesData = require('./src/data/report.json');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(cors())
const PORT = 3001;

app.use(bodyParser.json());
app.get('/get-tickets', (req, res) => {
    const salesData = JSON.parse(fs.readFileSync('./src/data/tickets.json', 'utf-8'));
    res.json(salesData);
});
app.post('/add-new-ticket', (req, res) => {
    const { name, cost, image, drawDate, winningNumbers, winnings } = req.body;

    // Read existing data from the JSON file
    const existingData = JSON.parse(fs.readFileSync('./src/data/tickets.json'));

    // Create a new ticket object
    const newTicket = {
        name,
        cost,
        image,
        drawDate,
        winningNumbers,
        winnings,
    };

    // Add the new ticket to the existing data
    existingData.push(newTicket);

    // Write the updated data back to the JSON file
    fs.writeFileSync('./src/data/tickets.json', JSON.stringify(existingData, null, 2));

    res.json({ success: true, message: 'Ticket added successfully.' });
});
app.post('/add-history', (req, res) => {
    const { Ticket, Cost, Winnings, Draw_Date, Your_Numbers, Winning_Numbers, Current, Confirmation } = req.body;

    // Read existing data from the JSON file
    const existingData = JSON.parse(fs.readFileSync('./src/data/history.json'));

    // Create a new ticket object
    const newTicket = {
        Ticket, Cost, Winnings, Draw_Date, Your_Numbers, Winning_Numbers, Current, Confirmation,
    };

    // Add the new ticket to the existing data
    existingData.push(newTicket);

    // Write the updated data back to the JSON file
    fs.writeFileSync('./src/data/history.json', JSON.stringify(existingData, null, 2));

    res.json({ success: true, message: 'History added successfully.' });
});
app.post('/update-ticket', (req, res) => {
    const { ticketName, newCost, newWinnings } = req.body;
    const salesData = JSON.parse(fs.readFileSync('./src/data/tickets.json', 'utf-8'));

    // Update salesData JSON
    const updatedSalesData = salesData.map(ticket => {
        if (ticket.name === ticketName) {
            return { ...ticket, cost: newCost, winnings: newWinnings };
        }
        return ticket;
    });

    // Save the updated data to the JSON file
    fs.writeFileSync('./src/data/tickets.json', JSON.stringify(updatedSalesData, null, 2));

    res.json({ success: true, message: 'Ticket updated successfully.' });
});

app.delete('/delete-ticket/:ticketName', (req, res) => {
    const ticketNameToDelete = req.params.ticketName;
    const salesData = JSON.parse(fs.readFileSync('./src/data/tickets.json', 'utf-8'));

    // Filter out the ticket to be deleted
    const updatedSalesData = salesData.filter(ticket => ticket.name !== ticketNameToDelete);

    // Save the updated data to the JSON file
    fs.writeFileSync('./src/data/tickets.json', JSON.stringify(updatedSalesData, null, 2));

    res.json({ success: true, message: 'Ticket deleted successfully.' });
});
app.post('/add-ticket', (req, res) => {
    const { ticketName, numTickets } = req.body;
    const salesData = JSON.parse(fs.readFileSync('./src/data/report.json', 'utf-8'));
    // Update salesData JSON
    const updatedSalesData = salesData.map(ticket => {
        if (ticket.name === ticketName) {
            return { ...ticket, number_sold: ticket.number_sold + numTickets };
        }
        return ticket;
    });

    // Save the updated data to the JSON file (for simplicity, you might use fs or a database)
    // Note: Writing to a file directly may have concurrency issues in a production environment.
    // Consider using a database for a more robust solution.
    fs.writeFileSync('./src/data/report.json', JSON.stringify(updatedSalesData, null, 2));

    res.json({ success: true, message: 'Ticket added successfully.' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});