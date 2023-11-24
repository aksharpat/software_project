import React, { useState } from 'react';
import salesData from './data/report.json'; // Adjust the path accordingly

function AdminPage() {
    const [report, setReport] = useState(null);

    const generateReport = () => {
        const totalRevenue = salesData.reduce((total, ticket) => {
            return total + ticket.number_sold * ticket.ticket_price;
        }, 0);

        const generatedReport = salesData.map(ticket => (
            <div key={ticket.name}>
                <p>{ticket.name}: {ticket.number_sold} tickets sold</p>
            </div>
        ));

        generatedReport.push(<p key="total">Total Revenue: ${totalRevenue}</p>);

        setReport(generatedReport);
    };

    return (
        <div className="admin-page">
            <h1>Admin Page</h1>
            <h2>Welcome, Admin!</h2>
            <button onClick={generateReport}>Generate Report</button>
            {report && (
                <div>
                    <h3>Sales Report</h3>
                    {report}
                </div>
            )}
        </div>
    );
}

export default AdminPage;