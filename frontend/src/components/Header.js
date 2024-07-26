import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file
const Header = () => {
  return (
    <header>
      <Link to="/" className="logo">JobBoard</Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/jobs">Job Listings</Link>
        <Link to="/candidate-dashboard">Candidate Dashboard</Link>
        <Link to="/employer-dashboard">Employer Dashboard</Link>
      </nav>
      {/* Add navigation links if needed */}
    </header>
  );
};

export default Header;
