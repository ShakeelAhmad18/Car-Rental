const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    rentPerkm: {
        type: String,
        required: true,
    },
    image: {
        type: Object,
        default: {},   
    },
    AC: {
        type: String,
        default: "Yes",
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    transmission: {
        type: String,
        required: true,
    },
    fuelType: {
        type: String,
        required: true,
    },
    driveTrain: {
        type: String,
        required: true,
    },
    seats: {
        type: String,
        required: true,
    },
    doors: {
        type: String,
        required: true,
    },
    VIN: {
        type: String,
        required: true,
    },
    Engine: {
        type: String,
        required: true,
    },
    mileage: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "No description available",
    },
    isBooked: {
        type: Boolean,
        default: false,
    },
    address: {
        street: {
             type: String, 
             required: true 
            },
        city: { 
            type: String,
            required: true 
        },
        country: { 
            type: String, 
            required: true 
        },
        lat: { 
            type: Number, 
            required: true 
        },
        lng: { 
            type: Number, 
            required: true 
        },
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',  // Reference to the user who left the review
                required: true,
            },
            rating: {
                type: Number,
                min: 1,
                max: 5,  // Rating scale (1-5 stars)
            },
            comment: {
                type: String,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],

}, {
    timestamps: true,
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;
