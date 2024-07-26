const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Get job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).send('Job not found');
    res.json(job);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
