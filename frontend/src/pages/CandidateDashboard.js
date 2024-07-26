// src/pages/CandidateDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CandidateDashboard.css'; // Import the CSS file

const CandidateDashboard = () => {
  const [profile, setProfile] = useState({});
  const [applications, setApplications] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/candidates/me'); // Ensure this is the correct endpoint
        setProfile(response.data);
        setFormData({ name: response.data.name, email: response.data.email });
      } catch (error) {
        setError('Error fetching profile data.');
      }
    };

    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/candidates/me/applications'); // Ensure this is the correct endpoint
        setApplications(response.data);
      } catch (error) {
        setError('Error fetching applications.');
      }
    };

    fetchProfile();
    fetchApplications();
  }, []);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/candidates/me', formData); // Ensure this is the correct endpoint
      setProfile({ ...profile, ...formData });
      setEditing(false);
      setSuccess('Profile updated successfully!');
      setError('');
    } catch (error) {
      setError('Error updating profile.');
    }
  };

  return (
    <div className="candidate-dashboard">
      <h1>Candidate Dashboard</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <section className="profile-section">
        <h2>Profile</h2>
        {editing ? (
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditing(false)}>Cancel</button>
          </form>
        ) : (
          <div>
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <button onClick={handleEditClick}>Edit Profile</button>
          </div>
        )}
      </section>

      <section className="applications-section">
        <h2>Job Applications</h2>
        {applications.length ? (
          <ul>
            {applications.map(application => (
              <li key={application._id} className="application-item">
                <p>Job Title: {application.jobTitle}</p>
                <p>Status: {application.status}</p>
                <p>Date Applied: {new Date(application.date).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No applications found</p>
        )}
      </section>
    </div>
  );
};

export default CandidateDashboard;
