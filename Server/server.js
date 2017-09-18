const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/meanproject');


const userRouter = require('./routes/user.router.js');
const crimeRouter = require('./routes/crime.router.js');
const bodyParser   = require('body-parser');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
    res.header('Content-Type', 'application/json');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/", userRouter);
app.use("/", crimeRouter);

app.listen(3100, function () {
  console.log('Example app listening on port 3100!');
});