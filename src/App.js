import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import Homepage from './Homepage';
import LoginPage from './LoginPage';
import BrowseTicketsPage from './BrowseTicketsPage';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  function logged_in() {
    setLoggedIn(true)
  }

  return (
    <Router>
      <div>
        <nav>
          <ul>
            {loggedIn && <li><Link to="/home">Home</Link></li>}
            {!loggedIn && <li><Link to="/login">Login</Link></li>}
          </ul>
        </nav>
        <Routes>
          <Route path="/home" element={loggedIn ? <Homepage /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage onLogin={() => logged_in()} />} />
          <Route path="/browse-tickets" element={<BrowseTicketsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;