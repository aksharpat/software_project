import React, { useState } from 'react';
import salesData from './data/report.json'; // Adjust the path accordingly

function AdminPage() {
    const [reportVisible, setReportVisible] = useState(false);

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

        return generatedReport;
    };

    const toggleReportVisibility = () => {
        setReportVisible(!reportVisible);
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
        </div>
    );
}

export default AdminPage;