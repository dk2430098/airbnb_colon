const mongoose = require("mongoose");
const Listing = require("../models/listing");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    // We need to use the native driver or a mixed schema to see the old string data
    // because the current strict schema might hide it or cast it to null.
    // The easiest way is to use updateMany with an aggregation pipeline provided by MongoDB 4.2+

    // This pipeline checks if 'image' is a string. If so, it converts it to { url: $image, filename: 'default' }
    // properly handling the schema mismatch at the DB level.

    const result = await Listing.collection.updateMany(
        { image: { $type: "string" } },
        [
            {
                $set: {
                    image: {
                        url: "$image",
                        filename: "default"
                    }
                }
            }
        ]
    );

    console.log(`Matched ${result.matchedCount} documents.`);
    console.log(`Modified ${result.modifiedCount} documents.`);

    // Also handle cases where image might be null or missing, set a default
    // This helps clean up any bad data
    const defaultUrl = "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60";

    const resultNull = await Listing.collection.updateMany(
        { $or: [{ image: null }, { image: { $exists: false } }] },
        {
            $set: {
                image: {
                    url: defaultUrl,
                    filename: "default"
                }
            }
        }
    );
    console.log(`Fixed ${resultNull.modifiedCount} missing/null images.`);

    mongoose.connection.close();
}

main().catch((err) => {
    console.log(err);
});
