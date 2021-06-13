// Contributed packages.
var mongoose = require('mongoose');

// Define our organization collection.
const organizationSchema = new mongoose.Schema({
  organization_id: {
    type: String,
    required: true,
  },
  organization_name: {
    type: String,
    required: true
  }
});

// The organization schema is exposed.
const Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;
