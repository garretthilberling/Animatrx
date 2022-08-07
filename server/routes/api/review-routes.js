const router = require("express").Router();
const {
    getReview,
    getReviews,
    addReview,
    updateReview,
    removeReview,
    upvote,
    downvote
} = require("../../controllers/review-controller");

router.route("/:animeId/reviews")
.get(getReviews)
.post(addReview);

router.route("/:animeId/reviews/:id")
.get(getReview)
.put(updateReview)
.delete(removeReview)
.post(upvote)
.post(downvote);

module.exports = router;