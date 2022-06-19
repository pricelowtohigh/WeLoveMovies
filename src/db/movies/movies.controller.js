const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");

async function list(req, res) {
    const data = await moviesService.list();
    const query = req.query
    if (query.is_showing) {
        const active = await moviesService.listActive();
        res.json({data: active})
    } else {
        res.json({ data });
    }
  }

async function read (req, res) {
    const data = await moviesService.read(req.params.movie_id)
    res.json({data})
}

async function movieExists (req, res, next) {
    const movieId = req.params.movie_id;
    const movie = await moviesService.read(movieId)
    if (movie) {
        return next();
    }
    return next({ status: 404, message: "Movie cannot be found."})
}

async function readTheaters (req, res) {
    const { movie_id } = req.params;
    const data = await moviesService.readTheaters(movie_id);
    res.json({data});
}

async function getReviews (req, res) {
    const { movie_id } = req.params;
    const data = await moviesService.getReviews(movie_id);
    res.json({data});
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    readTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readTheaters)],
    getReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(getReviews)]
}