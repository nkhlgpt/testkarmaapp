var express = require("express"),
	bodyParser = require("body-parser"),
	cookieParser = require("cookie-parser"),
	session = require("express-session"),
	passport = require("passport");
	stylus = require("stylus");

module.exports = function(app, config){
	function compile(str, path){
		return stylus(str).set('filename', path);
	}
 
	console.log("RootPath is " + config.rootPath);
	app.set('views', config.rootPath + '/server/views/');
	// Tell express which engine to use.
	app.set('view engine', 'jade');

	app.use(bodyParser());
	app.use(cookieParser());
	app.use(session({secret: "lego inc first code"}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(stylus.middleware({
		src: config.rootPath + '/public',
		compile: compile
	}));
	app.use(express.static(config.rootPath + '/public'));
}