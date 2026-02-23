const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middleware.js");
const bookingController = require("../controllers/bookings.js");

router.post("/", isLoggedIn, wrapAsync(bookingController.createBooking));
router.get("/", isLoggedIn, wrapAsync(bookingController.index));

module.exports = router;
