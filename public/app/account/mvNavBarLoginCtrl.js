angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http, mvNotifier, mvIdentity, mvAuth, $location){

	$scope.identity = mvIdentity;
	//console.dir($scope);
	$scope.signin = function(){

		var username = $scope.username;
		var password = $scope.password;
		mvAuth.authenticateUser(username, password).then(function(success){
			if(success){
				mvNotifier.notify("Successfully logged in ");
			}else{
				mvNotifier.notify("Failed to log in");
			}
		});
	}

	$scope.signout = function(){
		mvAuth.logoutUser().then(function(){
			$scope.username = "";
			$scope.password = "";
			mvNotifier.notify("You have sccessfully signed out");
			$location.path('/');
		})
	}
});