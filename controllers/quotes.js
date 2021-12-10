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
          favorited: true,
        },
        {
          body: "Does it disturb anyone else that 'The Los Angeles Angels' baseball team translates directly to 'The The Angels Angels'?",
          author: "Neil DeGrasse Tyson",
          favorited: true,
        },
        {
          body: "If I'm not back in five minutes, just wait longer.",
          author: "Ace Ventura, Pet Detective",
          favorited: false,
        },
        {
            body: "Some people drink from the fountain of knowledge, others just gargle.",
            author: "Robert Anthony",
            favorited: false,
        },
        {
            body: "Why do they call it rush hour when nothing moves?",
            author: "Robin Williams",
            favorited: false,
        },
        {
            body: "A man is not old until regrets take the place of dreams.",
            author: "John Barrymore",
            favorited: false,
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

quoteRouter.get('/favorites', (req, res) => {
    Quote.find({}, (error, favoriteQuotes) => {
        res.render('favorites.ejs', {
            quotes: favoriteQuotes
        })
    })
});

// New
quoteRouter.get('/new', (req, res) => {
    res.render('new.ejs')
});

// Destroy (DELETE)
quoteRouter.delete('/:id', (req, res) => {
    Quote.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/quotes')
    });
});

// Remove from Favorites route
quoteRouter.put('/favorites/:id', (req, res) => {

    if(req.body.favorited === 'on') {
        req.body.favorited = true
    } else {
        req.body.favorited = false;
    };

    Quote.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (error, updatedQuote) => {
            res.redirect(`/quotes/favorites`)
        }
    )
});

// Update (PUT)
quoteRouter.put('/:id', (req, res) => {

    console.log(req.body)

    if(req.body.favorited === 'on') {
        req.body.favorited = true
    } else {
        req.body.favorited = false;
    };

    Quote.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (error, updatedQuote) => {
            res.redirect(`/quotes`)
        }
    )
});

// Create (POST)
quoteRouter.post('/', (req, res) => {

    req.body.favorited = !!req.body.favorited;

    Quote.create(req.body, (error, createdQuote) => {
        res.redirect('/quotes')
    });
});

// Edit
quoteRouter.get('/:id/edit', (req, res) => {
    Quote.findById(req.params.id, (error, foundQuote) => {
        res.render('edit.ejs', {
            quote: foundQuote,
        });
    });
});

// Show
quoteRouter.get('/:id', (req, res) => {
    Quote.findById(req.params.id, (err, quote) => {
        res.render('show.ejs', { quote });
    });
});

// Export router object so we can require it in server.js
module.exports = quoteRouter;