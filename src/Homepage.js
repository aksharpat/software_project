import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Homepage = () => {

    return (
        <div className='homepage-class'>
            <h1>Welcome to The Lottery Website</h1>
            <Link to='/browse-tickets'>
                <button>Go to Tickets</button>
            </Link>
            <Link to='/search'>
                <button>Search for Tickets</button>
            </Link>

        </div>
    );
};

export default Homepage;