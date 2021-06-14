const supertest = require("supertest");
const request = supertest('http://localhost:3080');

module.exports = {
  request
}
