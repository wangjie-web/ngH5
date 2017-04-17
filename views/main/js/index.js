define(['common'], function(com) {

	com.controller("app", ['$scope', '$timeout', function($scope, $timeout) {

		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(e) {
				var coords = e.coords;
				var latitude = coords.latitude;
				var longitude = coords.longitude;
				alert("lat:" + latitude + "|lng:" + longitude);
			}, function(e) {
				alert(e.message + "[code:" + e.code + "]");
			}, {
				enableHighAccuracy: false,
				timeout: 3000,
				maximumAge: 10 * 1000
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