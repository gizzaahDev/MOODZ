const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8083;

// app middleware
app.use(cors());
app.use(bodyParser.json());

// add routes
// const exRoute = require("route path")

// app.use("/route", exRoute)

// connect database
const URL = process.env.MONGODB_URL;

mongoose
    .connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database is connected successfully!");
    })
    .catch((error) => {
        console.log(`Database connection error - ${error}`);
    });

// listen database
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
