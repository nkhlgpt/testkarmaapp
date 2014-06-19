angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider){
	$locationProvider.html5Mode(true);

	var routeRoleChecks ={
		admin: 
			{
				auth: function(mvAuth){
					return mvAuth.authorizeCurrentUserForRoute('admin');
				}
			},
		user: {
				auth: function(mvAuth){
					return mvAuth.authorizeAuthenticatedUserForRoute();
				}
		}
	};

	$routeProvider
		.when("/", {
			templateUrl : '/partials/main/main', controller: 'mvMainCtrl'
		}).when("/admin/users", {
			templateUrl : '/partials/admin/user-list', 
			controller: 'UserCtrl',
			resolve: routeRoleChecks.admin
		}).when("/signup", {
			templateUrl : '/partials/account/signup', 
			controller: 'SignupCtrl'
		}).when("/profile", {
			templateUrl: "./partials/account/profile",
			controller: "ProfileCtrl",
			resolve: routeRoleChecks.user
		});
});



angular.module('app').run(function($rootScope, $location){
	$rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
		if(rejection == "Not Authorized"){
			$location.path("/");
		}
	})
});