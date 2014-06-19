angular.module('app').controller('mvMainCtrl', function($scope){
	$scope.courses = [
		{name: 'Node for Beginners', featured: true, published: new Date('1/1/2014')},
		{name: 'Mongo for Beginners', featured: true, published: new Date('1/1/2014')},
		{name: 'Express for Beginners', featured: true, published: new Date('1/1/2014')},
		{name: 'Jade for Beginners', featured: true, published: new Date('1/1/2014')},
		{name: 'Stylus for Beginners', featured: true, published: new Date('1/1/2014')},
		{name: 'Angular for Beginners', featured: true, published: new Date('1/1/2014')}
	]
});