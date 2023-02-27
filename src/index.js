

const express = require('express');
const { notFoundMIDWR, errMIDWR } = require('./middlewares/middleware');
const mongoose = require('mongoose');
require("dotenv").config();

const app = express();
app.use(express.json());
const api = require('./routes/api.routes');
const uri = process.env.MONGO_DB_URI;
mongoose.connect(uri,{autoIndex: true});
const connection = mongoose.connection

connection.once('open', () => {
    console.log('connected to mongodb')
})


app.use('/api',api)
app.use(notFoundMIDWR);
app.use(errMIDWR);
module.exports = app;