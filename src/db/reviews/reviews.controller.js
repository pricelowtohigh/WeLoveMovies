const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");

async function list (req, res) {
    const data = await reviewsService.list();
    res.json({data})
}

async function reviewExists (req, res, next) {
    const review = await reviewsService.read(req.params.review_id);
    if (review) {
        res.locals.review = review;
        
        return next();
    }
    next({ status: 404, message: "cannot be found"})
}

async function update(req, res, next) {
    const updatedReview = {
      ...res.locals.review,
      ...req.body.data,
      review_id: res.locals.review.review_id,
    };
    const criticsInfo = await reviewsService.update(updatedReview);
    updatedReview.critic = criticsInfo;
    res.json({ data: updatedReview });
  }

async function destroy (req, res) {
    const { review } = res.locals;
    await reviewsService.delete(review.review_id);
    res.sendStatus(204);
}

module.exports = {
    list,
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)]
}