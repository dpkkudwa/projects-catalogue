const express = require('express');
const router = express.Router();
const organizationUploadController = require('../controller/organizationUploadController');
const fileUpload = require('../services/fileUpload');
const Organization = require('../models/organizations');

router.post('/organizations', fileUpload.upload.single('file'), organizationUploadController.file_upload);

router.post('/organization', async (req, res) => {
  const organization = new Organization(req.body);
  try {
    await organization.save();
    res.status(201).send({organization});
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/organizations', async (req, res) => {
  const organizations_list = await Organization.find().sort({ organization_name: 'desc'});
  res.send(organizations_list);
});

router.get('/organization/:id', async (req, res) => {
  const organization_id = req.params.id;
  try {
    const organization = await Organization.findOne({organization_id})
    if (!organization) {
      return res.status(404).send('Organization not found!!');
    }
    res.send(organization);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
