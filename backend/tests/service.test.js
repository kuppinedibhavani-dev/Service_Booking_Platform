const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");

describe("Service API Tests", () => {
  let adminToken = "";
  let serviceId = "";

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Register admin
  test("Should register admin user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Admin User",
        email: "adminuser@gmail.com",
        password: "123456",
        phone: "9876543210",
        role: "admin"
      });

    adminToken = res.body.token;

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  // Create service
  test("Should create a service", async () => {
    const res = await request(app)
      .post("/api/services")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Plumbing Service",
        description: "Pipe repair and maintenance",
        price: 1000,
        duration: 60,
        category: "Repair"
      });

    serviceId = res.body.service._id;

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  // Get all services
  test("Should get all services", async () => {
    const res = await request(app).get("/api/services");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  // Get single service
  test("Should get single service", async () => {
    const res = await request(app).get(`/api/services/${serviceId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  // Update service
  test("Should update service", async () => {
    const res = await request(app)
      .put(`/api/services/${serviceId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        price: 1200
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  // Delete service
  test("Should delete service", async () => {
    const res = await request(app)
      .delete(`/api/services/${serviceId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});