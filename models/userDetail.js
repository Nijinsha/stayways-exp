var mongoose        = require('mongoose'),
    plmongoose      = require('passport-local-mongoose');

var userDetailSchema = new mongoose.Schema({

    fullname    : String,
    email       : String,
    genter      : String,
    hometown    : String,
    Zipcode     : Number,
    phno        : Number,

    
});

userDetailSchema.plugin(plmongoose);
module.exports = mongoose.model('userDetail',studentSchema);