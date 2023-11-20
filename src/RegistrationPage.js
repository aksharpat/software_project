import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        // Perform registration logic here
        // You might want to validate the form fields, check for unique usernames or emails, etc.

        // For this example, let's just log the registration information
        console.log('Registration data:', { username, email, password });

        // You can add more sophisticated registration logic here, like making an API request to register the user
    };

    return (
        <div className="registration-page">
            <h1>Registration Page</h1>
            <form>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <label>
                    Confirm Password:
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </label>
                <br />
                <button type="button" onClick={handleRegister}>Register</button>
                <Link to="/">
                    <button type='button'>Go to Login</button>
                </Link>
            </form>
        </div>
    );
};

export default RegistrationPage;