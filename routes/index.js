var bodyParser      = require('body-parser'),
    passport        = require('passport'),
    localStrategy   = require('passport-local'),
    user            = require('../models/user');





exports.home = function(req,res){
    res.render('home');
}



exports.register = function(req,res){           //adding user
user.register(
    new user({
                username    :  req.body.email, 
                joinedAt : new Date()
    }),req.body.password,function(err,users){
        if (!err) {
                res.redirect('/');
        }
        else{
            console.log(err);
        }
        
    }
);

}