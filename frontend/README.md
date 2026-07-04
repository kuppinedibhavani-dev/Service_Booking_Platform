# 🚀 Service Booking Platform

A full-stack web application that allows customers to browse services, book appointments, make secure online payments, and manage their bookings. The platform also provides an admin dashboard to manage services, bookings, revenue, and notifications.

---

## 🌐 Live Demo

### Frontend
https://service-booking-platform-weld.vercel.app

### Backend API
https://service-booking-platform-lakl.onrender.com

---

# 📌 Features

## 👤 User Features

- User Registration
- User Login & Authentication
- JWT Protected Routes
- Browse Available Services
- View Service Details
- Book Services
- Select Booking Date
- Select Time Slot
- Online Payment Integration (Razorpay)
- View Booking History
- Cancel Bookings
- Dark / Light Mode

---

## 👨‍💼 Admin Features

- Admin Login
- Add New Services
- Update Services
- Delete Services
- View All Bookings
- Update Booking Status
- Revenue Dashboard
- View Notifications

---

## 💳 Payment Features

- Razorpay Payment Gateway
- Payment Verification
- Payment Status Tracking

---

## 🔔 Notification Features

- Booking Confirmation Notifications
- Email Notification Integration
- Notification History

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router
- Axios
- CSS3
- React Calendar

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt
- Nodemailer
- Razorpay

## Security

- Helmet
- CORS
- Express Rate Limit
- XSS Clean
- Environment Variables

---

# 📂 Project Structure

```
Service_Booking_Platform
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── tests
│   └── server.js
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── docs
│   ├── PERFORMANCE_REPORT.md
│   ├── SECURITY_AUDIT.md
│   └── TEST_REPORT.md
│
│
└── README.md
```

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Helmet Security Headers
- CORS Protection
- Rate Limiting
- XSS Protection
- Protected Routes
- Environment Variables

---

# ⚡ Performance Optimizations

- Optimized MongoDB Queries
- Backend Caching
- API Performance Improvements
- Reusable Axios Instance
- Optimized React Components

Detailed report available in:

```
docs/PERFORMANCE_REPORT.md
```

---

# 🧪 Testing

The project includes backend and frontend functional testing.

### Backend

- Authentication
- Services CRUD
- Booking APIs
- Payment APIs
- Notification APIs
- Protected Routes

### Frontend

- Registration
- Login
- Booking
- Dashboard
- Payment Flow
- Admin Dashboard

Detailed report:

```
docs/TEST_REPORT.md
```

---

# 🔐 Security Audit

Security audit document:

```
docs/SECURITY_AUDIT.md
```

---

# 📦 Installation

## Clone Repository

```bash
git clone https://github.com/kuppinedibhavani-dev/Service_Booking_Platform
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET

RAZORPAY_KEY_ID=YOUR_KEY

RAZORPAY_KEY_SECRET=YOUR_SECRET

EMAIL_USER=YOUR_EMAIL

EMAIL_PASS=YOUR_PASSWORD
```

Run backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm start
```

---

# 📡 API Endpoints

## Authentication

```
POST /api/auth/register

POST /api/auth/login
```

## Services

```
GET /api/services

POST /api/services

PUT /api/services/:id

DELETE /api/services/:id
```

## Bookings

```
POST /api/bookings

GET /api/bookings

PUT /api/bookings/:id

DELETE /api/bookings/:id
```

## Payments

```
POST /api/payments/create-order

POST /api/payments/verify

GET /api/payments/revenue
```

## Notifications

```
POST /api/notifications/send

GET /api/notifications
```

---

# 🚀 Future Enhancements

- Google Login
- OTP Authentication
- Live Chat Support
- Real-time Notifications
- Booking Calendar Improvements
- Service Reviews & Ratings
- Invoice PDF Generation
- Email Templates
- SMS Notifications
