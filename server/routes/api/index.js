const router = require('express').Router();
const reviewRoutes = require('./review-routes');
const commentRoutes = require('./comment-routes');
const userRoutes = require('./user-routes');
const animeRoutes = require('./anime-routes');

router.use('/anime', reviewRoutes, commentRoutes, animeRoutes);
router.use('/', userRoutes);

module.exports = router;