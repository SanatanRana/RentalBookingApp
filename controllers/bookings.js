const Booking = require("../models/booking.js");
const Listing = require("../models/listing.js");

module.exports.createBooking = async (req, res) => {
    let { id } = req.params;
    let { booking } = req.body;
    let listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    const newBooking = new Booking(booking);
    newBooking.listing = listing._id;
    newBooking.user = req.user._id;

    // Calculate total price if not provided (simple logic)
    const days = (new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24);
    newBooking.totalPrice = days * listing.price;

    await newBooking.save();
    req.flash("success", "Booking successful!");
    res.redirect(`/listings/${id}`);
};

module.exports.index = async (req, res) => {
    const allBookings = await Booking.find({ user: req.user._id }).populate("listing");
    res.render("bookings/index.ejs", { allBookings });
};
