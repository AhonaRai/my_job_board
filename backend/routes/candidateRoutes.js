const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Use bcryptjs instead of bcrypt

const Candidate = require('../models/Candidate'); // Import Candidate model
const Application = require('../models/Application'); // Import Application model
const authenticate = require('../middleware/auth');


// Candidate registration route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).send('All fields are required');
    }

    // Check if candidate already exists
    const existingCandidate = await Candidate.findOne({ email });
    if (existingCandidate) {
      return res.status(400).send('Candidate already registered');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new candidate
    const newCandidate = new Candidate({ name, email, password: hashedPassword });
    await newCandidate.save();
    res.status(201).json(newCandidate);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering candidate');
  }
});

// Get the profile of the currently authenticated candidate
router.get('/me', authenticate, async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.user._id);
    if (!candidate) return res.status(404).send('Candidate not found');
    res.json(candidate);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching candidate profile');
  }
});

// Update the profile of the currently authenticated candidate
router.put('/me', authenticate, async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.user._id, req.body, { new: true });
    if (!candidate) return res.status(404).send('Candidate not found');
    res.json(candidate);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating candidate profile');
  }
});

// Get job applications for the currently authenticated candidate
router.get('/me/applications', authenticate, async (req, res) => {
  try {
    const applications = await Application.find({ applicantId: req.user._id });
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching applications');
  }
});

// Apply for a job
router.post('/:id/applications', authenticate, async (req, res) => {
  try {
    const jobId = req.params.id;
    const { coverLetter } = req.body;

    // Ensure the cover letter is provided
    if (!coverLetter) {
      return res.status(400).send('Cover letter is required');
    }

    // Create a new application
    const application = new Application({
      jobId,
      applicantId: req.user._id,
      coverLetter,
      status: 'Submitted',
      appliedAt: new Date(),
    });

    await application.save();
    res.status(201).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error submitting application');
  }
});

module.exports = router;
