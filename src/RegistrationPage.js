// RegistrationPage.js
import React, { useState } from 'react';
import { addUser, getUsers } from './api';
//import { writeCredentials } from './api'; // Import the writeCredentials function
import { useNavigate } from 'react-router-dom';


const RegistrationPage = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [homeAddress, setHomeAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        const emailExists = getUsers().some(user => user.username === username);

        if (emailExists) {
            alert('Email already exists. Please use a different email.');
        } else {
            const newUser = { name, username, homeAddress, phoneNumber, password };
            addUser(newUser);

            console.log('Registration successful');
            navigate('/')
            // You can add further logic, such as redirecting the user to the login page
        }
    };

    return (
        <div className="registration-page">
            <h1>Registration Page</h1>
            <form>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Home Address:
                    <input type="text" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} />
                </label>
                <br />
                <label>
                    Phone Number:
                    <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="button" onClick={handleRegister}>Register</button>
            </form>
        </div>
    );
};

export default RegistrationPage;