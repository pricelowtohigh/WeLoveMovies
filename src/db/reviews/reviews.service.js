const knex = require("../connection");

function list () {
    return knex("reviews").select("*")
}

function read (review_id) {
    return knex("reviews").select("*").where({review_id}).first()
}

function update(review) {
    return knex('reviews')
      .where({ review_id: review.review_id })
      .update(review, '*')
      .then(() => {
        return knex('critics')
          .select('*')
          .where({ critic_id: review.critic_id })
          .first();
      });
  }

function destroy(review_id) {
    return knex("reviews")
        .where({"review_id": review_id})
        .del()
}

module.exports = {
    list,
    read,
    update,
    delete: destroy
}