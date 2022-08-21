const { User } = require("../models");

const animeController = {
    addWatchLater({ params, body, headers }, res) {
        if(headers.authorization) {
            console.log(headers.authorization, body);
            User.findOne({ username: body.username })
            .then(async user => {
              let date = new Date;
                if(!user.watchLater.includes(user.watchLater.find(wl => wl.id === params.animeId))) {
                   return User.findByIdAndUpdate(
                    { _id: user._id },
                    { $push: { "watchLater": {id: params.animeId, dateAdded: date.getTime()} } },
                    { upsert: true, new: true }
                   );
                } else {
                    // remove from watchLater
                    return User.findByIdAndUpdate(
                        { _id: user._id },
                        { $pull: { watchLater: {id: params.animeId} } },
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
            User.findOne({ username: body.username })
            .then(async user => {
              let date = new Date;
                if(!user.favorites.includes(user.favorites.find(fave => fave.id === params.animeId))) {
                   return User.findByIdAndUpdate(
                    { _id: user._id },
                    { $push: { "favorites": {id: params.animeId, dateAdded: date.getTime()} } },
                    { upsert: true, new: true }
                   );
                } else {
                    // remove from favorites
                    return User.findByIdAndUpdate(
                        { _id: user._id },
                        { $pull: { favorites: {id: params.animeId} } },
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