"use strict";

var PAGESIZE = 12;
var loadlist = function loadlist(pageNo, i, pullclass, url, callback) {
	$(pullclass).eq(i).data("page", pageNo);
	console.log("正在加载第" + i + "个tab项目的第" + pageNo + "页");
	var url = url;
	$.ajax({
		type: "get",
		url: url,
		data: {
			pageNow: pageNo,
			pageSize: PAGESIZE
		},
		async: true,
		dataType: 'json',
		success: function success(data) {
			var result = data.result;
			if (!data.success) {
				console.log(data.msg);
				return;
			}
			if (result.list.length == 0 && pageNo == 0) {
				//暂无数据
				$(pullclass).eq(i).find("ul").append("\n\t\t\t\t\t <div class=\"weui-loadmore weui-loadmore_line\">\n\t\t\t\t\t<span class=\"weui-loadmore__tips\">\u6682\u65E0\u6570\u636E</span>\n\t\t\t\t\t</div>");
				$(pullclass).eq(i).data("end", 1).find(".doing").hide();
			} else if (result.list.length < PAGESIZE) {
				//没有数据了
				callback(result.list, i);
				$(pullclass).eq(i).find("ul").append("\n\t\t\t\t\t <div class=\"weui-loadmore weui-loadmore_line\">\n\t\t\t\t\t<span class=\"weui-loadmore__tips\">\u6CA1\u6709\u66F4\u591A\u6570\u636E\u4E86</span>\n\t\t\t\t\t</div>");
				$(pullclass).eq(i).data("end", 1).find(".doing").hide();
			} else {
				//还有数据
				callback(result.list, i);
			}
		}
	});
};

function upAdown(pullclass, url, callback) {
	loadlist(0, 0, pullclass, url, callback);
	$(pullclass).pullToRefresh().on('pull-to-refresh', function (done) {
		var self = this;
		var num = $(self).index();
		console.log(num + "个");
		$(pullclass).eq(num).data("end", 0).find(".doing").show();
		setTimeout(function () {
			$(pullclass).eq(num).find("ul").html("");
			loadlist(0, num, pullclass, url, callback);
			$(self).pullToRefreshDone();
		}, 300);
	});
	$(pullclass).infinite().on("infinite", function () {
		var self = this;
		if (self.loading) return;
		self.loading = true;
		var num = $(self).index();
		var page = $(self).data("page") + 1;
		var isend = $(self).data("end");
		if (isend == 0) {
			setTimeout(function () {
				self.loading = false;
				loadlist(page, num, pullclass, url, callback);
			}, 300);
		} else {
			self.loading = false;
		}
	});
}