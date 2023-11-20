import React, { useState } from 'react';
import { parse } from 'papaparse';
import { Link } from 'react-router-dom';


const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Read the CSV file
        fetch('/credentials.csv') // Adjust the path to your CSV file
            .then(response => response.text())
            .then(data => {
                // Parse the CSV data
                const parsedData = parse(data, { header: true });

                // Check if credentials are valid
                const isValid = parsedData.data.some(row => row.username === username && row.password === password);

                if (isValid) {
                    // Call onLogin when login is successful
                    console.log('logged in');
                    onLogin();
                } else {
                    alert('Invalid credentials. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error reading CSV:', error);
            });
    };

    return (
        <div className='login-page'>
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
                <button type="button" onClick={handleLogin}>Login</button>
                <Link to="/register">
                    <button type='button'>Register</button>
                </Link>
            </form>
        </div>
    );
};

export default LoginPage;