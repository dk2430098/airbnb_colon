const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const initData = require("./data.js");
const Listing = require("../models/listing.js");

// MongoDB Connection
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB successfully");
  } catch (err) {
    console.error("Error connecting to DB:", err);
    process.exit(1);
  }
}

// Initialize Database
const initDB = async () => {
  try {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Database initialized with sample data");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
};

main().then(initDB);
