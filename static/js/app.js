define(['angular'], function(angular) {
	var controllerProvider = null;
	var module = angular.module("app", ["ngRoute"], function($controllerProvider) {
		controllerProvider = $controllerProvider;
	});
	//分页模版
//	
//	module.directive("pagePagination", function() {
//		return {
//			template: $$.getHtml("main/pagination.html"),
//		}
//	});
	//按需加载路由配置构造
	var asNeededConfig = function(obj) {
		return {
			templateUrl: obj.templateUrl,
			controller: obj.controller,
			resolve: {
				delay: function($q, $rootScope) {
					defer = $q.defer();
					require([obj.controllerSrc], function(controller) {
						controllerProvider.register(obj.controller, controller);
						defer.resolve();
						$rootScope.$apply();
					})
					return defer.promise;
				}
			}
		}
	};
	//路由设置
	module.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/home_detail',
				asNeededConfig({
					templateUrl: 'home/detail.html',
					controller: 'home_detail',
					controllerSrc: 'home/js/detail.js'
				})
			)
			.when('/home_content',
				asNeededConfig({
					templateUrl: 'home/content.html',
					controller: 'home_content',
					controllerSrc: 'home/js/content.js'
				})
			)
			.when('/amap_province',
				asNeededConfig({
					templateUrl: 'amap/province.html',
					controller: 'amap_province',
					controllerSrc: 'amap/js/province.js'
				})
			)
			.when('/home_index', {
				templateUrl: 'home/index.html',
				controller: 'home_index'
			})
			.otherwise({
				redirectTo: '/home_index'
			});
	});

	//预加载控制器引入
	define([
		'main/js/index.js',
		'home/js/index.js',
	]);

	return module;
});