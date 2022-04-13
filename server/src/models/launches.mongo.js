const mongoose = require('mongoose')

const launchSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
    },
    launchDate: {
        type: Date,
        required: true,
    },
    mission: {
        type: String,
        required: true
    },
    rocket: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        // required: true,
    },
    upcoming: {
        type: Boolean,
        required: true,
        default: true,
    },
    success: {
        type: Boolean,
        required: true,
        default: true,
    },
    customers: {
        type: [String]
    }
})

// connect launchesSchema with "launches" collection
module.exports = mongoose.model('Launch', launchSchema)