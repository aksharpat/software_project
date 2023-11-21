import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import Homepage from './Homepage';
import LoginPage from './LoginPage';
import BrowseTicketsPage from './BrowseTicketsPage';
import RegistrationPage from './RegistrationPage';
import ProfilePage from './ProfilePage';
import SearchTicket from './SearchTickets';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  function logged_in(userData) {
    setUser(userData);
    console.log(userData)
    setLoggedIn(true);
  }
  function logged_out() {
    setUser(null);
    setLoggedIn(false);
  }

  return (
    <Router>
      <div>
        <nav>
          <ul>
            {loggedIn && <li><Link to="/home">Home</Link></li>}
            {loggedIn && <li><Link to="/profile">Profile</Link></li>}
            {loggedIn && <li><Link to="/" onClick={logged_out}>Log Out</Link></li>}
          </ul>
        </nav>
        <Routes>
          <Route path="/home" element={loggedIn ? <Homepage /> : <Navigate to="/" />} />
          {/* Pass onLogin as a prop to LoginPage */}
          <Route path="/" element={<LoginPage onLogin={logged_in} />} />
          <Route path="/browse-tickets" element={<BrowseTicketsPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/search" element={<SearchTicket />} />
          <Route path="/profile" element={<ProfilePage user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;