const mongoose = require("mongoose");
const Listing = require("../models/listing");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    // Update documents where image is an object with 'url' property
    // We use aggregation pipeline in updateMany to set image to image.url

    const result = await Listing.collection.updateMany(
        { "image.url": { $exists: true } },
        [
            {
                $set: {
                    image: "$image.url"
                }
            }
        ]
    );

    console.log(`Reverted ${result.modifiedCount} documents to string images.`);
    mongoose.connection.close();
}

main().catch((err) => {
    console.log(err);
});
