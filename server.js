const express = require('express');
const bodyParser = require('body-parser');
//const salesData = require('./src/data/report.json');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(cors())
const PORT = 3001;

app.use(bodyParser.json());

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