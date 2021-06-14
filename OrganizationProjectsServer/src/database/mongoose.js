// Import the mongoose package.
var mongoose = require('mongoose');

/*
 * Connect to the Mongo Database.
 * Note: If the projects-catalogue does nto exist, it will be created.
 * useNewUrlParser: Allows users to fall back to the old parser if they find a bug in the new parser.
 * useUnifiedTopology: Responsible for server selection, server discovery and monitoring.
 */
mongoose.connect('mongodb://127.0.0.1:27017/projects-catalogue', {useNewUrlParser: true, useUnifiedTopology: true});
