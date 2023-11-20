import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers } from './api';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Read the user data from JSON file using api.js
        const users = getUsers();
        console.log(users);
        // Check if credentials are valid
        const isValid = users.some(user => user.username === username && user.password === password);

        if (isValid) {
            // Call onLogin when login is successful
            console.log('logged in');
            onLogin();
            navigate('/home');
        } else {
            alert('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="login-page">
            <h1>Login Page</h1>
            <form>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
                <Link to="/register">
                    <button type="button">Register</button>
                </Link>
            </form>
        </div>
    );
};

export default LoginPage;