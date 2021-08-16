const mongoose = require('mongoose');

const dbschema = mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }

});

const entry = mongoose.model('dbscheme', dbschema);
module.exports = entry;