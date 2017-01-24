var mongoose    = require('mongoose');
var plmongoose  = require('passport-local-mongoose');



var roomSchema = new mongoose.Schema({
    userId   : {type: mongoose.Schema.Types.ObjectId, ref: 'user'}, 
    type     : String,
    photo    : [String],
    location : String,
    price    : Number,
    zipcode  : Number

});

roomSchema.plugin(plmongoose);
module.exports = mongoose.model('room',roomSchema);