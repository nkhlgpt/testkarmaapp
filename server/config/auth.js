var passport = require('passport');

module.exports.authenticate = function(req, res, next){
	console.log(req.body);
		req.body.userName = req.body.username.toLowerCase();
		var auth = passport.authenticate('local', function(err, user){
			if(err){
				return next(err);
			}
			if(!user) {
				res.send({success:false});
			}
			req.login(user, function(err){
				if(err){
					return next(err);
				}
				res.send({success:true, user: user});
			});
		});
		auth(req,res,next);
	};

module.exports.requiresApiLogin = function(req, res, next){
	if(!req.isAuthenticated()){
		res.status(403);
		res.end();
	} else {
		next();
	}
};

module.exports.requiresRole = function(role){
	return function(req, res, next){
		if(!req.isAuthenticated() || req.user.roles.indexOf('admin') === -1){
			res.status(403);
			res.end();
		} else {
			next();
		}
	};
};