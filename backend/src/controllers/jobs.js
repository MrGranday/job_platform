const Job = require('../models/Job');

// @desc      Get all jobs
// @route     GET /api/v1/jobs
// @access    Public
exports.getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().populate('company', 'name company');

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (err) {
    next(err);
  }
};

// @desc      Get single job
// @route     GET /api/v1/jobs/:id
// @access    Public
exports.getJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate('company', 'name company');

    if (!job) {
      return res.status(404).json({ success: false, error: `Job not found with id of ${req.params.id}` });
    }

    res.status(200).json({
      success: true,
      data: job
    });
  } catch (err) {
    next(err);
  }
};

// @desc      Create new job
// @route     POST /api/v1/jobs
// @access    Private (Employer/Admin)
exports.createJob = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.company = req.user.id;

    // Check for published job (optional logic to limit jobs per employer)
    
    const job = await Job.create(req.body);

    res.status(201).json({
      success: true,
      data: job
    });
  } catch (err) {
    next(err);
  }
};

// @desc      Update job
// @route     PUT /api/v1/jobs/:id
// @access    Private (Employer/Admin)
exports.updateJob = async (req, res, next) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, error: `Job not found with id of ${req.params.id}` });
    }

    // Make sure user is job owner
    if (job.company.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: `User ${req.user.id} is not authorized to update this job` });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: job
    });
  } catch (err) {
    next(err);
  }
};

// @desc      Delete job
// @route     DELETE /api/v1/jobs/:id
// @access    Private (Employer/Admin)
exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, error: `Job not found with id of ${req.params.id}` });
    }

    // Make sure user is job owner
    if (job.company.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: `User ${req.user.id} is not authorized to delete this job` });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};
