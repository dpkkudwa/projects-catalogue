// Import express package.
const express = require('express');
const router = express.Router();

// Porjects Upload Controller contains the business logic for upload.
const projectsUploadController = require('../controller/projectsUploadController');

// File upload is the middleware for uploading a file to /tmp directory.
const fileUpload = require('../services/fileUpload');

// Project schema for the MongoDB.
const Projects = require('../models/projects');

/*
 * Post request for the CSV uploads.
 * file: CSV file needs to be updated.
 */
router.post('/projects', fileUpload.upload.single('file'), projectsUploadController.file_upload);

// Post request to insert single project.
router.post('/project', async (req, res) => {
  const project = new Projects(req.body);
  try {
    await project.save();
    res.status(201).send({project});
  } catch (error) {
    res.status(400).send(error);
  }
});

// Returns all the projects.
router.get('/projects', async (req, res) => {
  const products_list = await Projects.find().sort({ created_at: 'desc'});
  res.send(products_list);
});

/*
 * Returns an organization by its ID.
 * id: organization_id needs to be passed as an parameter.
 */
router.get('/project/:id', async (req, res) => {
  const organization_id = req.params.id;
  try {
    const project = await Projects.find({organization_id})
    if (!project) {
      return res.status(404).send('Project not found!!');
    }
    res.send(project);
  } catch (error) {
    res.status(500).send();
  }
});

/*
 * Updates a project by organization ID.
 * id: project_id needs to be passed as an parameter.
 */
router.patch('/project/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const project = await Projects.findOne({project_id: req.params.id});
    if (!project) {
      return res.status(404).send();
    }
    updates.forEach((update) => {
      project[update] = req.body[update]
    });
    await project.save();
    res.send(project);
  } catch (error) {
    res.status(500).send(error);
  }
});

/*
 * Deletes a project by project ID.
 * id: project_id needs to be passed as an parameter.
 */
router.delete('/project/:id', async (req, res) => {
  const project_id = req.params.id;
  try {
    const project = await Projects.findOneAndDelete({project_id})
    if (!project) {
      return res.status(404).send('Project not found!!');
    }
    res.send(project);
  } catch (error) {
    res.status(500).send();
  }
});


module.exports = router;
