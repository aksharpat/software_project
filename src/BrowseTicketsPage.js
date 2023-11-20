import React from 'react';
import { Link } from 'react-router-dom';


function BrowseTicketsPage() {
    return (
        <div className='browse-tickets-class'>
            <h1>Ticket Page</h1>
            <Link to='/home'>
                <button>Go Back</button>
            </Link>
        </div>
    );
}

export default BrowseTicketsPage;