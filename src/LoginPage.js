import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Assume simple validation for demonstration
        if (username === 'demo' && password === 'password') {
            onLogin(); // Call the onLogin callback if credentials are valid
        } else {
            alert('Invalid credentials. Please try again.');
        }
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
            </form>
        </div>
    );
};

export default LoginPage;