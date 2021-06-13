// Import express and cors.
const express = require('express');
var cors = require('cors');
const projectRoutes = require('./routes/projects');
const organizationRoute = require('./routes/organizations');
require('./database/mongoose');

const app = express();

app.use(express.urlencoded({extended: true}));

app.use(cors());
app.use(express.json());
app.use(projectRoutes);
app.use(organizationRoute);

app.listen(3080);
