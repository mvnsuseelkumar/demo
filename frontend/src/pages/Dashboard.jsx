import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome to Your AI Career Companion, {user?.displayName || user?.email}!</h1>
        <p>This is your central hub for managing your career path. Let's get started!</p>
      </header>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>My Profile</h2>
          <p>Keep your skills and preferences up to date.</p>
          <Link to="/profile" className="card-link">Go to Profile</Link>
        </div>

        <div className="dashboard-card">
          <h2>Job Matches</h2>
          <p>Discover job opportunities tailored to your profile.</p>
          <Link to="/jobs" className="card-link">Find Jobs</Link>
        </div>

        <div className="dashboard-card">
          <h2>Learning Paths</h2>
          <p>Get personalized learning recommendations.</p>
          <Link to="/learning" className="card-link">Start Learning</Link>
        </div>

        <div className="dashboard-card">
          <h2>AI Chat</h2>
          <p>Have a career question? Ask our AI assistant.</p>
          {/* This can be a link to a chat modal or a separate page */}
          <Link to="#" className="card-link">Open Chat</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;