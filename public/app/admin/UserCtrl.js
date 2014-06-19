angular.module('app').controller('UserCtrl', function($scope, User){
	console.log("User is ");
	console.log(User);
	$scope.users = User.query();
});