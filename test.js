const assert = require("assert");
const request = require("supertest");

describe("developer API should have endpoints to", () => {
  it("get all developers", function (done) {
    // arrange
    const api = require("./api.js");

    // act and assert
    request(api.app)
      .get("/api/developers")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done)
      .expect((res) => {
        assert.strictEqual(res.body.length, 2);
      });
  });

  it("get the first developer", function (done) {
    //arrange
    const api = require("./api.js");

    //act and assert
    request(api.app)
      .get("/api/developers/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done)
      .expect((res) => {
        assert.strictEqual(res.body.name, "Marcus Dev");
      });
  });

  it("add a new developer", function (done) {
    //arrange
    const api = require("./api.js");

    //act and assert
    request(api.app)
      .post("/api/developers/")
      .set("Accept", "application/json")
      .send({ name: "John", email: "john@salt.dev" })
      .expect("Content-Type", /json/)
      .expect("location", /\/api\/developers\//)
      .expect((res) => {
        assert.strictEqual(res.body.name, "John");
      })
      .expect(201, done);
  });

  it("update the first developer", function (done) {
    //arrange
    const api = require("./api.js");

    request(api.app)
      .patch("/api/developers/1")
      .set("Accept", "application/json")
      .send({ name: "Andrea" })
      .expect("Content-Type", /json/)
      .expect((res) => {
        assert.strictEqual(res.body.name, "Andrea");
      })
      .expect(200, done);
  });

  it("delete the developer with id 2", function (done) {
    //arrange
    const api = require("./api.js");

    //act and assert
    request(api.app).delete("/api/developers/2").expect(204, done);
  });
});
