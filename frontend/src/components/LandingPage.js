// src/pages/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Import the CSS file

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to JobBoard</h1>
          <p>Find your next job here!</p>
          <input
            type="text"
            placeholder="Search for jobs..."
            className="search-input"
          />
          <Link to="/jobs" className="browse-jobs-button">Browse Jobs</Link>
          <div className="landing-page-buttons">
            <Link to="/login" className="login-button">Login</Link>
            <Link to="/register" className="register-button">Register</Link>
          </div>
        </div>
      </section>
      <section className="featured-jobs">
        <h2>Featured Jobs</h2>
        <div className="job-listings">
          <div className="job-item">
            <h3>Software Engineer</h3>
            <p>Company ABC - Remote</p>
            <p>Develop and maintain software.</p>
           
          </div>
        </div>
        <Link to="/jobs" className="view-all">View All Jobs</Link>
      </section>
      <section className="about">
        <h2>About Us</h2>
        <p>Our job board connects talented professionals with top companies. Explore job opportunities tailored to your skills and interests.</p>
      </section>
      <div className="landing-page-buttons">
        <Link to="/employer-dashboard" className="employer-dashboard-button">Employer Dashboard</Link>
      </div>
    </div>
  );
};

export default LandingPage;
