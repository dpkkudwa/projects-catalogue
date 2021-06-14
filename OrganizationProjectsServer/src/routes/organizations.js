// Import express package.
const express = require('express');
const router = express.Router();

// Organization Upload Controller contains the business logic for uploads.
const organizationUploadController = require('../controller/organizationUploadController');

// File upload is the middleware for uploading a file to /tmp directory.
const fileUpload = require('../services/fileUpload');

// Organization schema for the MongoDB.
const Organization = require('../models/organizations');

/*
 * Post request for the CSV uploads.
 * file: CSV file needs to be updated.
 */
router.post('/organizations', fileUpload.upload.single('file'), organizationUploadController.file_upload);

// Post request to insert single organization.
router.post('/organization', async (req, res) => {
  const organization = new Organization(req.body);
  try {
    await organization.save();
    res.status(201).send({organization});
  } catch (error) {
    res.status(400).send(error);
  }
});

// Returns all the organizations.
router.get('/organizations', async (req, res) => {
  const organizations_list = await Organization.find().sort({ organization_name: 'desc'});
  res.send(organizations_list);
});

/*
 * Returns an organization by its ID.
 * id: Organization ID needs to be passed as an parameter.
 */
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

/*
 * Updates an organization.
 * id: Organization ID needs to be passed as an parameter.
 */
router.patch('/organization/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const organization = await Organization.findOne({organization_id: req.params.id});
    if (!organization) {
      return res.status(404).send();
    }
    updates.forEach((update) => {
      organization[update] = req.body[update]
    });
    await organization.save();
    res.send(organization);
  } catch (error) {
    res.status(500).send(error);
  }
});

/*
 * Deletes an organization.
 * id: Organization ID needs to be passed as an parameter.
 */
router.delete('/organization/:id', async (req, res) => {
  const organization_id = req.params.id;
  try {
    const organization = await Organization.findOneAndDelete({organization_id})
    if (!organization) {
      return res.status(404).send('Organization not found!!');
    }
    res.send(organization);
  } catch (error) {
    res.status(500).send();
  }
});
module.exports = router;
