angular.module('app').controller('SignupCtrl', function($scope, User, mvAuth, mvNotifier, $location){
	$scope.signup = function(){
		var newUserData = {
			userName: $scope.email,
			password: $scope.password,
			firstName: $scope.firstname,
			lastName: $scope.lastname
		};

		mvAuth.createUser(newUserData).then(function(){
			mvNotifier.notify('User account created');
			$location.path('/');	
		}, function(reason){
			mvNotifier.error(reason);
		});
	}
});