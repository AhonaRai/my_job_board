const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Employer = require('../models/Employer');
const authenticate = require('../middleware/auth');


// Middleware to check if employer exists
const checkEmployerExists = async (req, res, next) => {
  try {
    const employer = await Employer.findById(req.params.id);
    if (!employer) return res.status(404).send('Employer not found');
    next();
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Get all jobs posted by an employer
router.get('/jobs', checkEmployerExists, async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.params.id });
    res.json(jobs);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Post a new job
router.post('/jobs', checkEmployerExists, async (req, res) => {
  try {
    const newJob = new Job({
      ...req.body,
      employer: req.params.id,
    });
    const savedJob = await newJob.save();
    res.json(savedJob);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Update employer details
router.put('/:id', async (req, res) => {
  try {
    const updatedEmployer = await Employer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEmployer) return res.status(404).send('Employer not found');
    res.json(updatedEmployer);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
