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

router.route("/:animeId/reviews/:reviewId")
.get(getReview)
.put(updateReview)
.delete(removeReview);
router.route("/:animeId/reviews/:reviewId/upvote")
.post(upvote);
router.route("/:animeId/reviews/:reviewId/downvote")
.post(downvote);

module.exports = router;