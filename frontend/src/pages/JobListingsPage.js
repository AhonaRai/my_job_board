// src/pages/JobListingsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './JobListingsPage.css'; // Import the CSS file

const JobListingsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs', error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    setFilteredJobs(
      jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, jobs]);

  return (
    <div className="job-listings-page">
      <input
        type="text"
        placeholder="Search for jobs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="job-listings-container">
        {filteredJobs.map(job => (
          <div className="job-item" key={job._id}>
            <h2>{job.title}</h2>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <div className="job-item-actions">
              <Link to={`/jobs/${job._id}`} className="view-details-link">View Details</Link>
              <Link to={`/apply/${job._id}`} className="apply-now-link">Apply Now</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListingsPage;
