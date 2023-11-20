import React from 'react';

const ProfilePage = ({ user }) => {
    console.log(user)
    return (
        <div className="profile-page">
            <h1>Profile Page</h1>
            <div>
                <strong>Name:</strong> {user.name}
            </div>
            <div>
                <strong>Email:</strong> {user.username}
            </div>
            <div>
                <strong>Home Address:</strong> {user.homeAddress}
            </div>
            <div>
                <strong>Phone Number:</strong> {user.phoneNumber}
            </div>
            {/* Add more fields as needed */}
        </div>
    );
};

export default ProfilePage;