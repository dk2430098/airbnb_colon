const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    // Find a user to be the owner (e.g., the first one)
    const user = await User.findOne({});
    if (!user) {
        console.log("No users found! Please signup a user first.");
        process.exit(1);
    }
    console.log(`Assigning orphan listings to user: ${user.username} (${user._id})`);

    const result = await Listing.updateMany(
        { owner: { $exists: false } },
        { $set: { owner: user._id } }
    );

    // Also catch nulls
    const resultNull = await Listing.updateMany(
        { owner: null },
        { $set: { owner: user._id } }
    );

    console.log(`Updated ${result.modifiedCount + resultNull.modifiedCount} listings.`);
    mongoose.connection.close();
}

main().catch((err) => {
    console.log(err);
});
