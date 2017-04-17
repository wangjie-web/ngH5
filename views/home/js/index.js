define(['common'], function(com) {

	com.controller("home_index", ['$scope', '$timeout', function($scope, $timeout) {

		$scope.geolocation = function() {
			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(e) {
					var coords = e.coords;
					var latitude = coords.latitude;
					var longitude = coords.longitude;
					alert("lat:"+latitude + "|lng:"+longitude);
				}, function(e) {
					alert(e.message + "[code:"+e.code+"]");
				}, {
					enableHighAccuracy: false,
					timeout: 3000,
					maximumAge: 10 * 1000
				});
			} else {
				alert("Geolocation is not supported by this browser.");
			}
		}

		console.log("home_index")

	}])
})