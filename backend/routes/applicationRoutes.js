// routes/jobRoutes.js or wherever you handle job applications
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const Application = require('../models/Application'); // Import Application model

// Apply for a job with file upload
router.post('/:jobId/apply', upload.single('resume'), async (req, res) => {
  try {
    const application = new Application({
      applicantName: req.body.applicantName,
      applicantEmail: req.body.applicantEmail,
      resume: req.file.path, // Save file path
      coverLetter: req.body.coverLetter,
      jobId: req.params.jobId
    });
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(500).send('Error submitting application');
  }
});

module.exports = router;
