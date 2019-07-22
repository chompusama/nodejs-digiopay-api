const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

// define path of each routes
const registerRoutes = require("./api/routes/registerRoutes");
const loginRoutes = require("./api/routes/loginRoutes");
const loginJwtRoutes = require("./api/routes/loginJwtRoutes");
const getRoutes = require("./api/routes/getRoutes");

// connect to mongoDB
// username admin is chompusama and password is digio
mongoose.connect(
  process.env.DB_CONNECT,
  function(err) {
        if(err) throw err;
        console.log('Connect to MongoDB success!')
    }
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
// Routes Middlewares
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/v2/login", loginJwtRoutes);
app.use("/v2/user", getRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
  console.log(error);
});


module.exports = app;