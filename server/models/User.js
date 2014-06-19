var mongoose = require('mongoose'),
	encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
		firstName: {type: String, required: "{PATH} is required"},
		lastName: {type: String, required: "{PATH} is required"},
		userName: {type: String, required: "{PATH} is required", unique:true},
		salt: {type: String, required: "{PATH} is required"},
		hashed_pwd: {type: String, required: "{PATH} is required"},
		roles: [String]
	});

	userSchema.methods = {
		authenticate: function(passwordToMatch){
			return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
		},
		hasRole: function(role){
			return this.roles.indexOf(role) > -1;
		}
	};

	var User = mongoose.model('User', userSchema);
function createDefaultUsers(){
	User.find({}).exec(function(err, collection){
		if(collection.length === 0){
			var salt;
			var hash;
			salt=encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'Punit'); 
			User.create({
				firstName: 'Punit', 
				lastName: 'Jajodia', 
				userName: 'Punit',
				salt: salt,
				hashed_pwd: hash,
				roles: ['admin']
			});
			
			salt= encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'Punit'); 
			User.create({firstName: 'Nikhil', lastName: 'Gupta', userName: 'Nikhil',
				salt: salt,
				hashed_pwd: hash,
				roles: []
			});
			salt=encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'Punit'); 
			User.create({firstName: 'Utsav', lastName: 'Bhatnagar', userName: 'Utsav',
				salt: salt,
				hashed_pwd: hash
			});
			
			salt=encrypt.createSalt();
			hash = encrypt.hashPwd(salt, 'Punit'); 
			User.create({firstName: 'Manish', lastName: 'Kumar', userName: 'Manish',
				salt: salt,
				hashed_pwd: hash
			});
		}
	})
}

exports.createDefaultUsers = createDefaultUsers;