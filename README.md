# Major-Project

# RentalBookingApp

RentalBookingApp is a full-stack **MERN-based web application** designed for listing, managing, and booking stays (similar to a rental or accommodation platform). This repository currently contains the **backend (Node.js + Express + MongoDB)** with server-side rendering using **EJS**.

---

## Project Overview

StayHub provides the following core functionalities:

* User authentication (register, login, logout)
* Create, read, update, and delete stay listings
* Image upload using Cloudinary
* Session-based authentication using Passport.js
* Server-side rendered views using EJS

This project follows the **MVC (Model–View–Controller)** architecture.

---

## Tech Stack

### Backend

* **Node.js** – JavaScript runtime environment
* **Express.js** – Web application framework
* **MongoDB** – NoSQL database
* **Mongoose** – ODM for MongoDB

### Frontend (Server-side)

* **EJS** – Template engine
* **EJS-Mate** – Layout support

### Authentication & Utilities

* **Passport.js** – Authentication
* **express-session** – Session management
* **connect-mongo** – MongoDB session store
* **Joi** – Data validation
* **Multer & Cloudinary** – Image uploads
* **dotenv** – Environment variables

---

## Folder Structure

```
StayHub/
│
├── controllers/     # Application logic
├── models/          # Mongoose schemas
├── routes/          # Express routes
├── views/           # EJS templates
├── public/          # Static files (CSS, JS)
├── utils/           # Helper utilities
├── app.js           # Main server entry point
├── package.json
└── README.md
```

---

## How the Project Works (Simple Explanation)

1. **Client Request**: User requests a page (e.g., view listings)
2. **Routes**: Express routes receive the request
3. **Controllers**: Business logic is executed
4. **Models**: Data is fetched or stored in MongoDB
5. **Views**: EJS renders HTML and sends it to the browser

---

## Installation & Setup

### Prerequisites

* Node.js (v20 or above)
* MongoDB (local or Atlas)
* Git

### Steps to Run Locally

1. Clone the repository:

```bash
git clone https://github.com/your-username/StayHub.git
cd StayHub
```

2. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm run dev
```

OR

```bash
npm start
```

5. Open browser:

```
http://localhost:3000
```

---

## Scripts

```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}
```

---

## Features

* Secure authentication using Passport.js
* CRUD operations for listings
* Image upload and storage via Cloudinary
* Flash messages for user feedback
* Session persistence using MongoDB

---

## Future Enhancements

* React frontend (complete MERN)
* Booking & payment system
* Review and rating system
* Admin dashboard

---

## Learning Outcomes

* Understanding MVC architecture
* Hands-on experience with Express and MongoDB
* Authentication and authorization
* Image upload handling
* Environment configuration and deployment readiness

---

## License

This project is for **educational purposes**.
