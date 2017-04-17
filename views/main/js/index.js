define(['common'], function(com) {

	com.controller("app", ['$scope', '$timeout', function($scope, $timeout) {


		$scope.$on("$viewContentLoaded", function() {
			//console.log("$viewContentLoaded")
		});

		$scope.$on("$routeChangeStart", function(event, next, current) {
			window.scrollTo(0, 0);
			//console.log("$routeChangeStart");
		});

	}])
})