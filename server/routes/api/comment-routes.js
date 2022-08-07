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

router.route()

module.exports = router;