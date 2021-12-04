// Require dependencies
const express = require('express');
const quoteRouter = express.Router();
const Quote = require('../models/quote')

//// Define routes (INDUCES)

// Seed route
quoteRouter.get('/seed', async (req, res) => {
    const data = [
        {
          body: "I've had a lot of worries in my life, most of which never happened.",
          author: "Mark Twain",
        },
        {
          body: "Does it disturb anyone else that 'The Los Angeles Angels' baseball team translates directly to 'The The Angels Angels'?",
          author: "Neil DeGrasse Tyson",
        },
        {
          body: "If I'm not back in five minutes, just wait longer.",
          author: "Ace Ventura, Pet Detective",
        },
      ];
      await Quote.deleteMany({}); // Can't find notes on what this and line 38 do
      await Quote.create(data);  // Need to figure this out later
      res.redirect('/quotes');
})

quoteRouter.get('/destroy-data', async (req, res) => {
    await Quote.deleteMany({});
    res.redirect('/quotes')
})

// Index
quoteRouter.get('/', (req, res) => {
    Quote.find({}, (error, allQuotes) => { // {} - empty query obj - tells MongoDB that we have no particular condition, and therefore want all results
        res.render('index.ejs', {
            quotes: allQuotes,
        })
    })
});

// New

// Destroy (DELETE)

// Update (PUT)

// Create (POST)

// Edit

// Show
quoteRouter.get('/:id', (req, res) => {
    res.send('Hello show page')
})

// Export router object so we can require it in server.js
module.exports = quoteRouter;