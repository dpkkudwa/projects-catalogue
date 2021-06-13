// Contributed packages.
var mongoose = require('mongoose');

// Define our product collection.
const projectSchema = new mongoose.Schema({
  project_id: {
    type: String,
    required: true,
  },
  organization_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true
  },
  project_name: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
});

// The products schema is exposed.
const Projects = mongoose.model('Projects', projectSchema);
module.exports = Projects;
