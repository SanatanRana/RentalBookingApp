const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { validateListing, isLoggedIn, isOwner } = require("../middleware.js");
const listingController = require("../controllers/listings.js"); // Fixed typo: 'controlleers' to 'controllers'
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// Index route & Create route
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single("listing[image]"), // Multer must come BEFORE validation to parse req.body
        validateListing,
        wrapAsync(listingController.createListing)
    );

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show route, Update route, and Delete route
router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.deleteListing)
    );

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));


module.exports = router;