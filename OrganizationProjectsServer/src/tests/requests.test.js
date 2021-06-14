const {MongoClient} = require('mongodb');
const request = require('./common');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const organization = db.collection('organizations');

    const mockOrganization = {organization_id: '5839f859-ee4a-4787-a006-e3a4976e7b90', organization_name: 'Damian Networks'};
    await organization.insertOne(mockOrganization);

    const insertedOrganization = await organization.findOne({organization_id: '5839f859-ee4a-4787-a006-e3a4976e7b90'});
    expect(insertedOrganization).toEqual(mockOrganization);
  });
});

// GET all projest.
describe('GET all projest details', () => {
  try {
    beforeEach(function () {
      console.log('GET all projest details')
    })

    afterEach(function () {
      console.log("All projest details are retrieved")
    })

    test("Projects Listing", async () => {
      const response = await request.request.get("/projects");
      expect(response.statusCode).toBe(200);
    });
  } catch (err) {
    console.log('Exception : ', err)
  }
});


// GET all projects.
describe('GET all projest details', () => {
  try {
    beforeEach(function () {
      console.log('GET all projest details')
    })

    afterEach(function () {
      console.log("All projest details are retrieved")
    })

    test("Projects Listing", async () => {
      const response = await request.request.get("/projects");
      expect(response.statusCode).toBe(200);
    });
  } catch (err) {
    console.log('Exception : ', err)
  }
});

// GET a project.
describe('GET a single projest detail', () => {
  try {
    beforeEach(function () {
      console.log('GET a single projest detail')
    })

    afterEach(function () {
      console.log("A single projest detail is retrieved")
    })

    test("Project Detail", async () => {
      const response = await request.request.get("/project/025efb1b-ab9d-4551-b56c-1732bb4daadc");
      expect(response.statusCode).toBe(200);
    });
  } catch (err) {
    console.log('Exception : ', err)
  }
});
