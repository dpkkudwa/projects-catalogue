# Angular, NodeJS, MongoDB Projects Catalogue
This project is a Single Page Application (SPA) with Angular as the front-end framework which calls on to the REST APIs built in NODE.js.

# Technologies
1. Database
    1. Mongo Database (Version: 4.4.4)
2. Backend
    1. Node.js (Version: 14.16.0)
    2. Dependencies:
        * **Nodemon**: Helps to automatically restart the node application whenever changes are detected.
        * **cors**: Allows requests to skip the "Same-Origin Policy" and access resources from remote hosts.
        * **csvtojson**: Helps convert CSVs to JSON.
        * **express**: Used to setup middlewares ro respond to HTTP Requests and setting up routers to perform different actions based on HTTP Method and URL.
        * **mongoose**: It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
        * **multer**: It is a middleware for handling multipart/form-data, which is primarily used for uploading files.
3. Frontend
    1. Angular Framework (Version: 12.0.3)
    2. Dependencies
        * **Angular Material**: Provides out-of-the-box Material Design.

# Project Structure
* **OrganizationProjectsServer**: Contains all the source code for APIs to send and receive data. MongoDB is used for storing information about the organizations and the projects.
* **AngularClientApp**: Contains all the source code for rendering the UI with the data from NodeJS APIs.

# Running the Application Locally
1. Install Node.js (10.16 or higher) and MongoDB (3.4 or higher) on your system.
    * Node.js: https://nodejs.org
    * MongoDB: https://docs.mongodb.com/manual/administration/install-community
2. Execute `mongod` to start the MongoDB daemon if it's not already running
3. Run `npm install -g @angular/cli nodemon` to install the Angular CLI and nodemon.
4. Run `npm install` at the project root to install the app dependencies.
5. Run `ng serve` from 'AngularClientApp' folder to start the angular server.
6. Run `npm run dev` from 'OrganizationProjectsServer' folder to start the NodeJS server.
