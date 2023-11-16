import React from 'react';
import { useNavigate } from 'react-router-dom';

function Homepage(){
    const history = useNavigate();
    const navigateToBrowseTickets = () => history.push('/browse-tickets');
    return (
        <div>
            <h1>Welcome to The Lottery Website</h1>
            <button onClick={navigateToBrowseTickets}>Go to Browse Tickets</button>
        </div>
    );
}

export default Homepage;