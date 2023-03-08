"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = void 0;
const express = require('express');
exports.mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { requireAuth, checkCurrentUser } = require('./middleware/authMiddleware');
require('dotenv').config();
const app = express();
//middleware
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    //res.header('Access-Control-Expose-Headers', 'Content-Length, Set-Cookie');
    next();
});
//database connection
const dbURI = process.env.DB_URI;
exports.mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
    app.listen(process.env.PORT || 3000, () => console.log('Server is running and connected to MongoDB'));
})
    .catch((err) => console.error(err));
//routes
app.get('*', checkCurrentUser); //this will check for the jwt in every request and if it exists it will set the user in the res.locals object
app.get('/', (req, res) => res.send('Welcome to my own custom auth system!'));
app.get('/about', requireAuth, (req, res) => res.send('This is my custom auth system made with Node.js, Express.js, MongoDB, Mongoose, and Typescript and I use it for my own projects!. This auth system uses JWT for authentication and cookies for authorization as well as bcrypt for hashing passwords and mongo db for storing user data.'));
app.use(authRoutes);
