const { User } = require('../models');
const { signToken } = require('../utils/auth.js');

const userController = {
    // signup
    addUser(req, res) {
        User.create(req)
        .then(user => {
            const token = signToken(user);
            res.json(user, { token: token })
        })
        .catch(err => res.json(err));
    },
    // login 
    login({ email, password }, res) {
        User.findOne({ email })
        .then(user => {
            if (!user) {
                throw new Error('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new Error('Incorrect credentials')
            }
    
            const token = signToken(user);

            res.json(user, { token: token });
        })
        .catch(err => res.json(err));
    },
    // profile
    getUserProfile({ params }, res) {
        User.findOne({ _id: params._id })
        .populate({
            path: 'saved',
            select: '-__v'
        })
        .populate({
            path: 'reviews',
            select: '-__v'
        })
        .select('-__v')
        .then(userData => res.json(userData))
        .catch(err => {
            console.error(err);
            res.sendStatus(400);
        });
    }
}

module.exports = userController;