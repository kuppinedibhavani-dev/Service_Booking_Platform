const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");

describe("Auth API Tests", () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  let token = "";

  // Register user
  test("Should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "testuser@gmail.com",
        password: "123456",
        phone: "9876543210"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);

    token = res.body.token;
  });

  // Login user
  test("Should login user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "testuser@gmail.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  // Get profile
  test("Should get user profile", async () => {
    const res = await request(app)
      .get("/api/auth/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});