var auth = require('./auth');
var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	users = require('../controllers/users');

module.exports = function(app){
	app.get('/partials/*', function(req, res){
		res.render('../../public/app/' + req.params['0']);
	});

	app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
	app.post('/api/users', users.createUser);
	app.put('/api/users', users.updateUser);

	app.post('/login', auth.authenticate);
	app.post('/logout', function (req, res){
		req.logout();
		res.end();
	});
	app.get("*", function(req, res){
		console.log("Rendering index");
		res.render("index", {
			bootstrappedUser: req.user
		});
		//res.send("index");
	});
};