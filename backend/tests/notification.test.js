const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");

describe("Notification API Tests", () => {
  let customerToken = "";
  let adminToken = "";
  let serviceId = "";
  let bookingId = "";

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Register customer
  test("Should register customer", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Notify User",
        email: "notifyuser@gmail.com",
        password: "123456",
        phone: "5555555555"
      });

    customerToken = res.body.token;

    expect(res.statusCode).toBe(201);
  });

  // Register admin
  test("Should register admin", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Notify Admin",
        email: "notifyadmin@gmail.com",
        password: "123456",
        phone: "4444444444",
        role: "admin"
      });

    adminToken = res.body.token;

    expect(res.statusCode).toBe(201);
  });

  // Create service
  test("Should create service", async () => {
    const res = await request(app)
      .post("/api/services")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Painting Service",
        description: "Wall painting",
        price: 2500,
        duration: 180,
        category: "Home Service"
      });

    serviceId = res.body.service._id;

    expect(res.statusCode).toBe(201);
  });

  // Create booking
  test("Should create booking", async () => {
    const res = await request(app)
      .post("/api/bookings")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({
        service: serviceId,
        bookingDate: "2026-07-10",
        timeSlot: "4:00 PM - 5:00 PM",
        address: "Hyderabad",
        totalAmount: 2500
      });

    bookingId = res.body.booking._id;

    expect(res.statusCode).toBe(201);
  });

  // Send notification
  test("Should send booking notification", async () => {
    const res = await request(app)
      .post("/api/notifications/send")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({
        bookingId,
        type: "email",
        message: "Your booking has been confirmed"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  // Get my notifications
  test("Should get customer notifications", async () => {
    const res = await request(app)
      .get("/api/notifications/my-notifications")
      .set("Authorization", `Bearer ${customerToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  // Get all notifications (admin)
  test("Should get all notifications", async () => {
    const res = await request(app)
      .get("/api/notifications")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});