const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");

describe("Payment API Tests", () => {
  let customerToken = "";
  let adminToken = "";
  let serviceId = "";
  let bookingId = "";
  let razorpayOrderId = "";

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Register customer
  test("Should register customer", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Payment User",
        email: "paymentuser@gmail.com",
        password: "123456",
        phone: "7777777777"
      });

    customerToken = res.body.token;

    expect(res.statusCode).toBe(201);
  });

  // Register admin
  test("Should register admin", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Payment Admin",
        email: "paymentadmin@gmail.com",
        password: "123456",
        phone: "6666666666",
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
        title: "Electrical Service",
        description: "Fan repair",
        price: 2000,
        duration: 90,
        category: "Repair"
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
        bookingDate: "2026-07-05",
        timeSlot: "2:00 PM - 3:00 PM",
        address: "Hyderabad",
        totalAmount: 2000
      });

    bookingId = res.body.booking._id;

    expect(res.statusCode).toBe(201);
  });

  // Create payment order
  test("Should create Razorpay order", async () => {
    const res = await request(app)
      .post("/api/payments/create-order")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({
        bookingId,
        amount: 2000
      });

    razorpayOrderId = res.body.order.id;

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  // Verify payment
  test("Should verify payment", async () => {
    const res = await request(app)
      .post("/api/payments/verify")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({
        razorpay_order_id: razorpayOrderId,
        razorpay_payment_id: "pay_test123",
        bookingId
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  // Get revenue
  test("Should get revenue", async () => {
    const res = await request(app)
      .get("/api/payments/revenue")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});