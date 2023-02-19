"use strict";
const express = require('express');
const mongoose = require('mongoose');
const app = express();
//middleware
app.use(express.static('public'));
//view engine
//app.set('view engine', 'ejs');
//database connection
const dbURI = 'mongodb+srv://thegera:Y6jc4Tux6hOuBsFC@cluster0.doyll2z.mongodb.net/node-auth?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
    console.log('connected to mongoDB');
    console.log('server running on port 3000');
    app.listen(3000);
})
    .catch((err) => console.error(err));
//routes
app.get('/', (req, res) => {
    res.send('home');
});
app.get('/about', (req, res) => {
    res.send('about');
});
