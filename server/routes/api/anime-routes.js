const router = require("express").Router();
const {
    addWatchLater,
    addFavorites,
  } = require("../../controllers/anime-controller");

router
.route('/:animeId/watchLater')
.post(addWatchLater);

router
.route('/:animeId/fave')
.post(addFavorites);

module.exports = router;