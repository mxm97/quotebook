// Require dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema; //shorthand variable for mongoose Schema constructor


// Define Schema
const quoteSchema = new Schema(
    {
        body: String,
        author: String,
        favorited: Boolean,
    },
    {timestamps: true}
);

// Create Quote model
const Quote = mongoose.model('Quote', quoteSchema);

// Export model to be accessible in server.js
module.exports = Quote;