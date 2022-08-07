const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/youranimelist');

module.exports = mongoose.connection;
