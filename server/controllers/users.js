var User = require('mongoose').model('User'),
	encrypt = require('../utilities/encryption');

exports.getUsers = function(req, res){
		User.find({}).exec(function(err, collection){
			res.send(collection);
		});
};

exports.createUser = function(req, res, next){
	var userData = req.body;
	userData.userName = userData.userName.toLowerCase();
	userData.salt = encrypt.createSalt();
	userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
	User.create(userData, function(err, user){
		if(err){
			if(err.toString().indexOf("E11000") > -1){
				err = new Error("Duplicate Username");
			}
			res.status(400);
			return res.send({reason: err.toString()});
		} else {
			req.logIn(user, function(err){
				if(err) {
					return next(err);
				}
				res.send(user);
			});
		}
	});
};

exports.updateUser = function(req, res){

	console.log(req.body);
	var userUpdate = req.body;
	if(req.user._id != userUpdate._id){
		res.status(403);
		return res.end();
	}

	req.user.firstName = userUpdate.firstName;
	req.user.lastName = userUpdate.lastName;
	req.user.userName = userUpdate.userName;
	if(userUpdate.password && userUpdate.password.length > 0){
		req.user.salt = encrypt.createSalt();
		req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, userUpdate.password);
	}

	req.user.save(function(err){
		if(err) {
			res.status(400);
			return res.send({
				reason: err.toString()
			});
		}
		res.send(req.user);
	})
}