const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,

    image: {
        type: String,
        default: "https://plus.unsplash.com/premium_photo-1676320526001-07b75bd19ae3?q=80&w=3110&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (v) => {
            return v === "" ?
                "https://plus.unsplash.com/premium_photo-1676320526001-07b75bd19ae3?q=80&w=3110&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v;
        }
    },

    price: Number,
    location: String,
    country: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;