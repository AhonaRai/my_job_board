import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployerDashboard.css';

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employers/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs', error);
      }
    };

    fetchJobs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/employers/jobs', newJob);
      setSuccess('Job posted successfully!');
      setError('');
      setNewJob({
        title: '',
        description: '',
        location: '',
        salary: '',
      });
      // Refresh the job list
      const response = await axios.get('http://localhost:5000/api/employers/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Error posting job', error);
      setError('Error posting job. Please try again.');
    }
  };

  return (
    <div className="employer-dashboard">
      <h1>Employer Dashboard</h1>
      <form onSubmit={handleSubmit} className="job-post-form">
        <h2>Post a New Job</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <div>
          <label>
            Job Title:
            <input
              type="text"
              name="title"
              value={newJob.title}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              name="description"
              value={newJob.description}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={newJob.location}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Salary:
            <input
              type="number"
              name="salary"
              value={newJob.salary}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Post Job</button>
      </form>
      <div className="job-list">
        <h2>Your Jobs</h2>
        {jobs.length > 0 ? (
          jobs.map(job => (
            <div key={job._id} className="job-item">
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p>Location: {job.location}</p>
              <p>Salary: ${job.salary}</p>
            </div>
          ))
        ) : (
          <p>No jobs posted yet.</p>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;
