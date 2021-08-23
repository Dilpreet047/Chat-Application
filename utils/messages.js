const moment = require('moment');

function formatMessage(username, text, room){

    return {
        username,
        text,
        date: moment().format("MMM Do YY"), 
        time: moment().format('h:mm a'),
        room
    }

}


module.exports = formatMessage