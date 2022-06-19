if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const moviesRouter = require("./db/movies/movies.router");
const theatersRouter = require("./db/theaters/theaters.router");
const reviewsRouter = require("./db/reviews/reviews.router");
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);


// Not found handler
app.use((req, res, next) => {
    next({ status: 404, message: `Not found: ${req.originalUrl}` });
  });
  
  // Error handler
  app.use((error, req, res, next) => {
    console.error(error);
    const { status = 500, message = "Something went wrong!" } = error;
    res.status(status).json({ error: message });
  });

module.exports = app;