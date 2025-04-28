const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// MongoDB setting
main()
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

// Index Router
app.get("/listings", async (req, res) => {
  let allListing = await Listing.find({});

  res.render("listing/index.ejs", { allListing });
});

// New Router
app.get("/listings/new", (req, res) => {
  res.render("listing/new.ejs");
});

// Show Router
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  res.render("listing/show.ejs", { listing });
});

// Create Router
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing); // Assuming Listing is a Mongoose model
  await newListing.save();

  res.redirect("/listings");
});

// Edit Router
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  res.render("listing/edit.ejs", { listing });
});

// Update Router
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  console.log(id);

  res.redirect(`/listings/${id}`);
});

// Delete Router
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deleteList = await Listing.findByIdAndDelete(id);

  console.log(deleteList);
  res.redirect("/listings");
});

app.get("/", (req, res) => {
  //   res.send("Hi, I'm root");
  res.redirect("/listings");
});

app.listen(port, () => {
  console.log(`server is lisening to port ${port}`);
});
