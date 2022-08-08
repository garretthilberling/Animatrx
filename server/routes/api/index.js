const router = require('express').Router();
const reviewRoutes = require('./review-routes');
const commentRoutes = require('./comment-routes');
const userRoutes = require('./user-routes');

router.use('/anime', reviewRoutes, commentRoutes);
// router.use('/review', commentRoutes);
router.use('/', userRoutes);

module.exports = router;