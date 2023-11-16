// import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import BrowseTicketsPage from "./BrowseTicketsPage";
import Homepage from "./Homepage";
import ReactDOM from "react-dom/client";


function App() {
  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/browse-tickets">Browse Lottery Tickets</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" exact component={Homepage}/>
            <Route path="/browse-tickets" component={BrowseTicketsPage}/>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
