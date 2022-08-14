const { User } = require("../models");

const animeController = {
    addWatchLater({ params, body, headers }, res) {
        if(headers.authorization) {
            User.findOne({ _id: body.userId })
            .then(async user => {
                if(!user.watchLater.includes(params.animeId)) {
                   return User.findByIdAndUpdate(
                    { _id: body.userId },
                    { $push: { watchLater: params.animeId } },
                    { new: true }
                   );
                } else {
                    // remove from watchLater
                    return User.findByIdAndUpdate(
                        { _id: body.userId },
                        { $pull: { watchLater: params.animeId } },
                        { new: true }
                       ); 
                }
            })
            .then(user => res.json(user))
            .catch(err => res.json(err));
        } else {
            throw new Error('must be logged in!')
          }
    },

    addFavorites({ params, body, headers }, res) {
        if(headers.authorization) {
            User.findOne({ _id: body.userId })
            .then(async user => {
                if(!user.favorites.includes(params.animeId)) {
                   return User.findByIdAndUpdate(
                    { _id: body.userId },
                    { $push: { favorites: params.animeId } },
                    { new: true }
                   );
                } else {
                    // remove from favorites
                    return User.findByIdAndUpdate(
                        { _id: body.userId },
                        { $pull: { favorites: params.animeId } },
                        { new: true }
                       ); 
                }
            })
            .then(user => res.json(user))
            .catch(err => res.json(err));
        } else {
            throw new Error('must be logged in!')
          }
    }
}

module.exports = animeController;