const express = require('express');
const router = express.Router();
const projectsUploadController = require('../controller/projectsUploadController');
const fileUpload = require('../services/fileUpload');
const Projects = require('../models/projects');

router.post('/projects', fileUpload.upload.single('file'), projectsUploadController.file_upload);

router.post('/project', async (req, res) => {
  const project = new Projects(req.body);
  try {
    await project.save();
    res.status(201).send({project});
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/projects', async (req, res) => {
  const products_list = await Projects.find().sort({ created_at: 'desc'});
  res.send(products_list);
});

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
