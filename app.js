var express         = require('express'),
    app             = express(),
    path            = require('path'),
    mongoose        = require('mongoose'),
    bodyParser      = require('body-parser'),
    passport        = require('passport'),
    localStrategy   = require('passport-local'),
    plmongoose      = require('passport-local-mongoose'),
    routes          = require('./routes'),
    user            = require('./models/user'),
    port            = 3000,
    ip              = "";


// Basic settings ============================================================================================================
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/stayways');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({
        secret : "Secret word goes here in production",
        resave :false,
        saveUninitialized :false}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');
//routes======================================================================================================================
app.get('/',routes.home);                                            //home page
app.post('/register', routes.register);

//respones erro handling======================================================================================================
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// launch ====================================================================================================================

app.listen(port,function(){
 console.log("The magic happens on port " + port);
});