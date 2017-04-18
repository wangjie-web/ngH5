define(['common'], function(com) {

	com.controller("home_index", ['$scope', '$timeout', function($scope, $timeout) {

		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(e) {
				var coords = e.coords;
				var latitude = coords.latitude;
				var longitude = coords.longitude;

				var map = new AMap.Map('container', {
					resizeEnable: true,
					zoom: 16,
					center: [longitude, latitude]
				});

				var marker = new AMap.Marker({
					icon: 'http://vdata.amap.com/icons/b18/1/2.png', //24px*24px
					position: [longitude, latitude],
					offset: new AMap.Pixel(-12, -12),
					map: map
				});

				marker = new AMap.Marker({
					map: map,
					position: [longitude, latitude]
				})
				marker.setLabel({
					offset: new AMap.Pixel(20, 20), //修改label相对于maker的位置
					content: "点击打开高德地图"
				});
				marker.on('click', function(e) {
					marker.markOnAMAP({
						name: '当前位置',
						position: marker.getPosition()
					})
				})

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