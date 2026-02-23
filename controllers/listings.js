const Listing = require("../models/listing.js");

// // index route callback
module.exports.index = async (req, res) => {
    let { search } = req.query;
    let query = {};
    if (search) {
        query = {
            $or: [
                { title: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } },
                { country: { $regex: search, $options: "i" } }
            ]
        };
    }
    console.log("Searching for:", search);
    const allListings = await Listing.find(query);
    res.render("listings/index.ejs", { allListings });
}

// // new route callback
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs")
}

// // show route callback
module.exports.showListing = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id).

        populate({ path: "reviews", populate: { path: "author" } }).
        populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist")
        res.redirect("/listings")
    }

    res.render("listings/show.ejs", { listing })
}

// // create route callback
module.exports.createListing = async (req, res, next) => {

    if (!req.file) {
        req.flash("error", "Please upload an image for the listing");
        return res.redirect("/listings/new");
    }

    const { isLocal } = require("../cloudConfig.js");
    let url = isLocal ? `/uploads/${req.file.filename}` : req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing)

    newListing.owner = req.user._id;

    newListing.image = { url, filename };

    await newListing.save();

    req.flash("success", "New Listing Created!");

    res.redirect("/listings")
}

// // edit route callback
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params
    const listing = await Listing.findById(id)

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist")
        res.redirect("/listings")
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_100,w_250/e_blur:60");

    res.render("listings/edit.ejs", { listing, originalImageUrl })
}

// // update route callback
module.exports.updateListing = async (req, res) => {

    let { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        const { isLocal } = require("../cloudConfig.js");
        let url = isLocal ? `/uploads/${req.file.filename}` : req.file.path;
        let filename = req.file.filename;

        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success", "Listing Updated!");

    res.redirect(`/listings/${id}`)
}

// // delete route callback
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;

    let deletedListing = await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted!");

    res.redirect("/listings")
}