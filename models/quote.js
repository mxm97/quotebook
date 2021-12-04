// Require dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schema
const quoteSchema = new Schema(
    {
        body: String,
        author: String,
    },
    {timestamps: true}
);

// Create Quote model
const Quote = mongoose.model('Quote', quoteSchema);

// Export model to be accessible in server.js
module.exports = Quote;