// src/pages/JobApplication.js
import React, { useState } from 'react';
import axios from 'axios';
import './JobApplication.css';

const JobApplication = () => {
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail || !resume) {
      setError('Please fill out all fields and upload your resume.');
      return;
    }

    const formData = new FormData();
    formData.append('applicantName', applicantName);
    formData.append('applicantEmail', applicantEmail);
    formData.append('resume', resume);
    formData.append('coverLetter', coverLetter);

    try {
      await axios.post('http://localhost:5000/api/jobs/1/apply', formData); // replace 1 with actual job ID
      setSuccess('Application submitted successfully!');
      setError('');
    } catch (error) {
      console.error('Error submitting application', error);
      setError('Error submitting application. Please try again.');
    }
  };

  return (
    <div className="application-form">
      <h1>Apply for Job</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <div>
          <label>
            Name:
            <input
              type="text"
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={applicantEmail}
              onChange={(e) => setApplicantEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Resume:
            <input
              type="file"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div>
          <label>
            Cover Letter:
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default JobApplication;
