import React from 'react';
import { auth } from '../services/firebase';
import './Profile.css';

const Profile = ({ user, setUser }) => {

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        setUser(null);
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>My Profile</h2>
        {user ? (
          <div>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>UID:</strong> {user.uid}</p>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        ) : (
          <p>You are not logged in. Please log in to view your profile.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;