var express = require("express"),
	mongoose = require("mongoose"),
	app = express();

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";
var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
var models = require('./server/config/mongoose')(config);


var debug = function(message){
	if(process.env.NODE_ENV == "development"){
		console.log(message);
	}
};

require('./server/config/passport')(models.User);

require('./server/config/routes')(app);

app.listen(config.port);
console.log("Listening on port " + config.port); 