define(['common'], function(com) {

	com.controller("home_index", ['$scope', '$timeout', function($scope, $timeout) {

		$scope.geolocation = function() {
			alert(1235)
			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(e) {
					alert(JSON.stringify(e))
				},function(e){
					console.log(e)
				});
			} else {
				alert("Geolocation is not supported by this browser.");
			}
		}

		console.log("home_index")

	}])
})