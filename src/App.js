import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import Homepage from './Homepage';
import LoginPage from './LoginPage';
import BrowseTicketsPage from './BrowseTicketsPage';
import RegistrationPage from './RegistrationPage';
import ProfilePage from './ProfilePage';
import SearchTicket from './SearchTickets';
import OrderPage from './OrderPage';
import AdminPage from './AdminPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  function logged_in(userData) {
    setUser(userData);
    console.log(userData.admin)
    setLoggedIn(true);
  }
  function logged_out() {
    setUser(null);
    setLoggedIn(false);
  }

  return (
    <Router>
      <div>
        <nav className='nav'>
          <ul>
            {loggedIn && <li><Link to="/home">Home</Link></li>}
            {loggedIn && <li><Link to="/profile">Profile</Link></li>}
            {loggedIn && user?.admin === true && <li><Link to="/admin">Admin</Link></li>}
            {loggedIn && <li className='order-link'><Link to="/order">Order</Link></li>}
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
          <Route path="/order" element={<OrderPage />} />
          <Route path="/profile" element={<ProfilePage user={user} />} />
          {loggedIn && user?.admin === true && (
            <Route path="/admin" element={<AdminPage />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;