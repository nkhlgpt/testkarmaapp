angular.module('app').controller('ProfileCtrl', function($scope, mvAuth, mvIdentity, mvNotifier){
	$scope.email = mvIdentity.currentUser.userName;
	$scope.firstname = mvIdentity.currentUser.firstName;
	$scope.lastname = mvIdentity.currentUser.lastName;

	$scope.update = function(){
		var newUserData = {
			userName : $scope.email,
			firstName: $scope.firstname,
			lastName : $scope.lastname
		};

		if($scope.password && $scope.password.length > 0){
			newUserData.password = $scope.password;
		}

		mvAuth.updateCurrentUser(newUserData).then(
		function(){
			mvNotifier.notify("Your user account has been updated");
		},
		function(reason){
			mvNotifier.error(reason);
		});
	}

});