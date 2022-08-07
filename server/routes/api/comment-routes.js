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
.route('/comments')
.get(getComments)
.post(addComment)

router
.route('/comments/:commentId')
.get(getComment)
.put(updateComment)
.delete(removeComment)
.post(upvote)
.post(downvote)
.post(addReply)
.delete(removeReply);

module.exports = router;