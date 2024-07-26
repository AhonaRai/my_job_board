const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Create a new job
router.post('/', async (req, res) => {
    try {
        const job = new Job(req.body);
        await job.save();
        res.status(201).json(job);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Read all jobs
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read a single job by ID
router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ error: 'Job not found' });
        res.status(200).json(job);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a job by ID
router.put('/:id', async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!job) return res.status(404).json({ error: 'Job not found' });
        res.status(200).json(job);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a job by ID
router.delete('/:id', async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) return res.status(404).json({ error: 'Job not found' });
        res.status(200).json({ message: 'Job deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// In your backend routes (e.g., jobRoutes.js)
router.get('/jobs/:id', async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
      if (!job) return res.status(404).send('Job not found');
      res.json(job);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });
  

module.exports = router;
