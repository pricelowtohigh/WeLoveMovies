const knex = require("../connection");
const mapProperties = require("../utils/map-properties");
const reduceProperties = require("../utils/reduce-properties")

function list() {
    return knex("movies").select("*");
  }

function listActive() {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("*")
        .where({"mt.is_showing": true})
        .groupBy("m.movie_id")
}

function read(movie_id) {
    return knex("movies")
        .select("*")
        .where({"movie_id": movie_id})
        .first()
}

function readTheaters(movie_id) {
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .join("movies as m", "mt.movie_id", "m.movie_id")
        .select("*")
        .where({"m.movie_id": movie_id})
}

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name"
})


function getReviews(movie_id) {
    return knex('reviews')
    .select('*')
    .where({ movie_id })
    .then((movieReviews) => {
      const mappedReviews = movieReviews.map((review) => {
        return knex('critics')
          .select('*')
          .where({ critic_id: review.critic_id })
          .first()
          .then((firstCritic) => {
            review.critic = firstCritic;
            return review;
          });
      });
      const fulfilledReviewsWithCritics = Promise.all(mappedReviews);
      return fulfilledReviewsWithCritics;
    });
}

module.exports = {
    list,
    listActive,
    read,
    readTheaters,
    getReviews
}