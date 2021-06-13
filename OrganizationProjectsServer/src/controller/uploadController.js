const csv=require('csvtojson');
const fs = require("fs");
const Products = require('../models/products');

const file_upload = (req, res) => {
  importCsvDataToMongoDb(req.file.path);
  res.json({
    'msg': 'File uploaded/import successfully!', 'file': req.file
  });
}

// Import CSV File to MongoDB database.
function importCsvDataToMongoDb(filePath){
  csv().fromFile(filePath).then((jsonObj) => {
    var product = new Products();
    product.collection.insertMany(jsonObj,(err,data)=>{
      if(err){
        console.log(err);
      }
      else{
        console.log("Number of documents inserted: " + data.insertedCount);
      }
    });
    fs.unlinkSync(filePath);
  })
}

module.exports = {
  file_upload
}
