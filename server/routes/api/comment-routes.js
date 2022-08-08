const router = require("express").Router();
const {
    getComment,
    getComments,
    addComment,
    updateComment,
    removeComment,
    upvote,
    downvote,
    addReply,
    removeReply,
} = require("../../controllers/comment-controller");

router
.route('/:reviewId/comments')
.get(getComments)
.post(addComment);

router
.route('/:reviewId/comments/:commentId')
.get(getComment)
.put(updateComment)
.delete(removeComment)

router
.route('/:reviewId/comments/:commentId/reply')
.post(addReply)
.delete(removeReply);

router
.route('/:reviewId/comments/:commentId/upvote')
.post(upvote);

router
.route('/:reviewId/comments/:commentId/downvote')
.post(downvote);

module.exports = router;