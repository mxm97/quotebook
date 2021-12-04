// Require dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const quoteRouter = require('./controllers/quotes');

// Initialize application
const app = express();

// Configure application settings
require('dotenv').config();

// Connect to a database
mongoose.connect(process.env.DATABASE_URL)

// Database connection error/success
const db = mongoose.connection // shorthand variable

db.on("error", (err) => console.log("Error connecting: " + err.message));
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"));

// Mount middleware
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false })); // creates req.body

// Method-override
app.use(methodOverride('_method'));

// Define routes
app.use('/quotes', quoteRouter); // any time a request comes to the '/' path, forward it to quoteRouter

// Tell app to listen on port
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))