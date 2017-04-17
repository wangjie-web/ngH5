define(['common'], function(com) {

	com.controller("home_index", ['$scope', '$timeout', function($scope, $timeout) {

		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(e) {
				var coords = e.coords;
				var latitude = coords.latitude;
				var longitude = coords.longitude;

				var map = new AMap.Map('container', {
					resizeEnable: true,
					zoom: 12,
					center: [longitude, latitude]
				});

				AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function() {
					map.addControl(new AMap.ToolBar());
					map.addControl(new AMap.Scale());
				})

			}, function(e) {
				alert(e.message + "[code:" + e.code + "]");
			}, {
				enableHighAccuracy: true,
				timeout: 3000,
				maximumAge: 10 * 1000
			});
		} else {
			alert("Geolocation is not supported by this browser.");
		}

		console.log("home_index")

	}])
})