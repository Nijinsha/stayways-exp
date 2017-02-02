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
    PORT            = process.env.PORT || 3000,
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

// using webpack-dev-server and middleware in development environment
if(process.env.NODE_ENV !== 'production') {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpack = require('webpack');
  var config = require('./webpack.config');
  var compiler = webpack(config);
  
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, 'dist')));
//routes======================================================================================================================

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html')
});


// launch ====================================================================================================================

app.listen(PORT,function(err){
   if (err) {
    console.error(err);
  } else {
    console.log("The magic happens on port " + PORT);
  }
 
});