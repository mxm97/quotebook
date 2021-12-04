// Require dependencies
const express = require('express');
const quoteRouter = express.Router();
const Quote = require('../models/quote')

//// Define routes (INDUCES)

// Seed route

// Index
quoteRouter.get('/', (req, res) => {
    res.send('Hello')
});

// New

// Destroy (DELETE)

// Update (PUT)

// Create (POST)

// Edit

// Show

// Export router object so we can require it in server.js
module.exports = quoteRouter;