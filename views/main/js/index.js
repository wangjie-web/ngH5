define(['common'], function(com) {

	com.controller("app", ['$scope', '$timeout', function($scope, $timeout) {

		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(e){
				alert(JSON.stringify(e))
			});
		} else {
			alert("Geolocation is not supported by this browser.");
		}

		$scope.$on("$viewContentLoaded", function() {
			//console.log("$viewContentLoaded")
		});

		$scope.$on("$routeChangeStart", function(event, next, current) {
			window.scrollTo(0, 0);
			//console.log("$routeChangeStart");
		});

	}])
})