require.config({
	baseUrl: '../static/',
	// path映射那些不直接放置于baseUrl下的模块名。
	paths:{
		//一些库文件
		//"angular":"lib/angular/angular.min", 
		"angular":"//cdn.bootcss.com/angular.js/1.3.15/angular.min",
		"angular-route":"//cdn.bootcss.com/angular.js/1.3.15/angular-route.min",
		//"angular-animate":"//cdn.bootcss.com/angular.js/1.3.15/angular-animate.min",
		'app':"js/app",
		'common':"js/common",
	},
	shim:{
		'angular':{
			exports:'angular'
		},
		'angular-route':{
			deps:['angular'],
			exports: 'angular-route'
		},
		'angular-animate':{
			deps:['angular-route'],
			exports: 'angular-animate'
		},
	},
	// 防止读取缓存，调试用
	//urlArgs: "bust=" + (new Date()).getTime(),
	//更新用户缓存一次
	urlArgs: "bust=" + 5,
	waitSeconds: 0 
});
define(['angular',
		'angular-route',
		//'angular-animate',
		'app',
],function(angular){
	angular.bootstrap(document,["app"]);
});