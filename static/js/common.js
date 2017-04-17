define(['angular', 'app'], function(angular, app) {
	window.$$ = {
		getHtml: function(url) {
			var html = '';
//			$.ajax({
//				url: url,
//				type: "GET",
//				async: false,
//				cache: true,
//				success: function(e) {
//					html = e;
//				}
//			})
			return html;
		},
		getQueryString: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var serch = window.location.hash.split("?")[1];
			var r = serch && serch.match(reg);
			if(r != null) return decodeURI(r[2]);
			return "";
		},
		toArray: function(obj) {
			var _array = [];
			for(i in obj) {
				_array.push(obj[i]);
			}
			return _array;
		},
		toCommas: function(array) {
			if(!array) return "";
			return array.join(",");
		},
		PCAJson: function(cb) {
			$.getJSON("main/js/city.json", function(e) {
				var provinceJson = {};
				for(i in e) {
					e[i].text = e[i].name;
					if(e[i].level == 1) {
						e[i].id = e[i].sheng;
						provinceJson["s" + e[i].sheng] = e[i];
					}
					if(e[i].level == 2) {
						e[i].id = e[i].di;
						var _sObj = provinceJson["s" + e[i].sheng];
						if(_sObj && !_sObj["s" + e[i].sheng]) _sObj["s" + e[i].sheng] = {};
						if(_sObj) _sObj["s" + e[i].sheng]["d" + e[i].di] = e[i];
					}
					if(e[i].level == 3) {
						e[i].id = e[i].code;
						var _dObj = provinceJson["s" + e[i].sheng]["s" + e[i].sheng]["d" + e[i].di];
						if(_dObj && !_dObj["d" + e[i].di]) _dObj["d" + e[i].di] = [];
						if(_dObj) _dObj["d" + e[i].di].push(e[i]);
					}
				}
				cb && cb($$.toArray(provinceJson), provinceJson)
			})
		},
		PCAcode: {
			province: "",
			city: "",
			area: ""
		},
		PCAreset: function(opt) {
			var PCAcode = $$.PCAcode;
			var opt = opt || {};
			PCAcode.province = opt.province / 10000 || "";
			var city = (opt.city + "").substring(2, 4) || "";
			var area = opt.area || "";
			PCAcode._province.val(PCAcode.province).trigger("change");
			if(city && area) {
				PCAcode._citySelect.val(city).trigger("change");
				PCAcode._districtSelect.val(area).trigger("change");
			} else {
				PCAcode._citySelect.html("<option value=''>请选择城市</option>");
				PCAcode._districtSelect.html("<option value=''>请选择地区</option>");
			}
		},
		PCAinit: function(obj) {
			var PCAcode = $$.PCAcode;
			$$.PCAJson(function(d, dd) {
				var provinceSelect = $(obj.province || ".provinceSelect");
				var citySelect = $(obj.city || ".citySelect");
				var districtSelect = $(obj.area || ".districtSelect");
				var province = "";
				var psCode = "";
				PCAcode._province = provinceSelect;
				PCAcode._citySelect = citySelect;
				PCAcode._districtSelect = districtSelect;
				provinceSelect.select2({
					data: d
				});
				citySelect.select2({
					data: []
				});
				districtSelect.select2({
					data: []
				});
				provinceSelect.on("change", function(e) {
					psCode = "s" + provinceSelect.val();
					province = dd[psCode];
					PCAcode.province = "";
					PCAcode.city = "";
					PCAcode.area = "";
					citySelect.html("<option value=''>请选择城市</option>");
					districtSelect.html("<option value=''>请选择地区</option>");
					if(province && province.code) {
						PCAcode.province = parseInt(province.code);
						var cityList = $$.toArray(province[psCode]);
						citySelect.select2({
							data: cityList
						});
					}
				});
				citySelect.on("change", function(e) {
					var csCode = "d" + citySelect.val();
					var city = province[psCode][csCode];
					PCAcode.city = "";
					PCAcode.area = "";
					districtSelect.html("<option value=''>请选择地区</option>");
					if(city && city.code) {
						PCAcode.city = parseInt(city.code);
						var districtList = $$.toArray(city[csCode]);
						districtSelect.select2({
							data: districtList
						});
					}
				});
				districtSelect.on("change", function(e) {
					PCAcode.area = "";
					if(districtSelect.val()) {
						PCAcode.area = parseInt(districtSelect.val());
					}
				});
			})
		},
	};
	return app;
});