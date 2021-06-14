// Import the CSV to JSON and file system packages.
const csv=require('csvtojson');
const fs = require("fs");

// Organization Schema.
const Organization = require('../models/organizations');

// Function to upload file.
const file_upload = (req, res) => {
  importCsvDataToMongoDb(req.file.path);
  res.json({
    'msg': 'File uploaded/import successfully!', 'file': req.file
  });
}

/*
 * Import CSV File to MongoDB database.
 * filePath: Path to the CSV File.
 */
function importCsvDataToMongoDb(filePath){
  csv().fromFile(filePath).then((jsonObj) => {
    // Instantiate the organization schema.
    var organization = new Organization();

    // Insert the json into the MongoDB.
    organization.collection.insertMany(jsonObj,(err,data)=>{
      if(err){
        console.log(err);
      }
      else{
        console.log("Number of documents inserted: " + data.insertedCount);
      }
    });

    // Remove the file from the file system.
    fs.unlinkSync(filePath);
  })
}

// Export the file upload module.
module.exports = {
  file_upload
}
