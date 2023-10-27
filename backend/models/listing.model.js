import mongoose from "mongoose";

const listingSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    regularPrice: {
        type: Number,
        required: true
    },
    discountedPrice: {
        type: Number,
        required: true,
    },
    type:  {
        type: String,
        required: true,
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    furnished: {
        type: Boolean,
        required: true
    },
    parking: {
        type: Boolean,
        required: true
    },
    offer: {
        type: Boolean,
        default: false
    },
    imageUrls: {
        type: Array,
        required: true
    },
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

const listing = mongoose.model('Listing', listingSchema);

export default listing;