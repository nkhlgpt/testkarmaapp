var path = require('path');
var rootPath = path.normalize(__dirname + '../../../');

module.exports = {
	development: {
		db: 'mongodb://localhost/lego',
		rootPath: rootPath,
		port: process.env.PORT || 8000
	},
	production: {
		db: 'mongodb://localhost/lego',
		rootPath: rootPath,
		port: process.env.PORT || 8000
	}
}