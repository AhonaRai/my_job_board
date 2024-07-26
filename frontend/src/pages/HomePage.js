import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file

function HomePage() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Job Board</h1>
        <p>Find your next job here!</p>
        <Link to="/jobs">View Job Listings</Link>
      </header>
    </div>
  );
}

export default HomePage;
