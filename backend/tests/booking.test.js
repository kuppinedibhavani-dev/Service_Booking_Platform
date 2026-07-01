const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");

describe("Booking API Tests", () => {
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
        name: "Booking User",
        email: "bookinguser@gmail.com",
        password: "123456",
        phone: "9999999999"
      });

    customerToken = res.body.token;

    expect(res.statusCode).toBe(201);
  });

  // Register admin
  test("Should register admin", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Booking Admin",
        email: "bookingadmin@gmail.com",
        password: "123456",
        phone: "8888888888",
        role: "admin"
      });

    adminToken = res.body.token;

    expect(res.statusCode).toBe(201);
  });

  // Create service for booking
  test("Should create service", async () => {
    const res = await request(app)
      .post("/api/services")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Cleaning Service",
        description: "Home cleaning",
        price: 1500,
        duration: 120,
        category: "Cleaning"
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
        bookingDate: "2026-07-01",
        timeSlot: "10:00 AM - 11:00 AM",
        address: "Hyderabad",
        totalAmount: 1500
      });

    bookingId = res.body.booking._id;

    expect(res.statusCode).toBe(201);
  });

  // Get my bookings
  test("Should get customer bookings", async () => {
    const res = await request(app)
      .get("/api/bookings/my-bookings")
      .set("Authorization", `Bearer ${customerToken}`);

    expect(res.statusCode).toBe(200);
  });

  // Get all bookings (admin)
  test("Should get all bookings", async () => {
    const res = await request(app)
      .get("/api/bookings")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });

  // Update booking status
  test("Should update booking status", async () => {
    const res = await request(app)
      .put(`/api/bookings/${bookingId}/status`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        status: "confirmed"
      });

    expect(res.statusCode).toBe(200);
  });

  // Cancel booking
  test("Should cancel booking", async () => {
    const res = await request(app)
      .put(`/api/bookings/${bookingId}/cancel`)
      .set("Authorization", `Bearer ${customerToken}`);

    expect(res.statusCode).toBe(200);
  });
});