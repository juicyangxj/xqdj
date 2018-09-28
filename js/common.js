const PAGESIZE = 15;
let URL='';
let loadlist = (pageNo, i, pullclass,callback,resolve) => {
	$(pullclass).eq(i).data("page", pageNo)
	console.log("正在加载第" + i + "个tab项目的第" + pageNo + "页")
	$.ajax({
		type: "get",
		url: URL,
		data:{
			pageNow:pageNo,
			pageSize:PAGESIZE
		},
		async: true,
		dataType: 'json',
		timeout:10000,
		success: function(data) {
			var result = data.result;
			if(!data.success){
				$.alert(data.msg);
				return
			}
			if(result.list.length == 0 && pageNo == 0) {
				//暂无数据
				$(pullclass).eq(i).find("ul").append(`
					 <div class="weui-loadmore weui-loadmore_line">
					<span class="weui-loadmore__tips">暂无数据</span>
					</div>`);
				$(pullclass).eq(i).data("end", 1).find(".doing").hide();
			} else if(result.list.length < PAGESIZE) {
				 //没有数据了
				callback(result,i)
				$(pullclass).eq(i).find("ul").append(`
					 <div class="weui-loadmore weui-loadmore_line">
					<span class="weui-loadmore__tips">没有更多数据了</span>
					</div>`);
				$(pullclass).eq(i).data("end", 1).find(".doing").hide();
				
			}else{
				//还有数据
				callback(result,i)
			}
			if(resolve){
				resolve("11111111")
			}
		},
		error:function(){
			$.alert("网络错误，请重试");
		}
	});
}

function upAdown(pullclass,url,callback) {
	URL = url;
	loadlist(0, 0,pullclass,callback);
	$(pullclass).pullToRefresh().on('pull-to-refresh', function(done){
		var self = this;
		var num = $(self).index();
		console.log(num + "个")
		setTimeout(function() {
			$(pullclass).eq(num).find("ul").html("");
			loadlist(0, num,pullclass,callback);
			$(self).pullToRefreshDone();
			$(pullclass).eq(num).data("end", 0);
		}, 300)
	})
	$(pullclass).infinite().on("infinite", function() {
		var self = this;
		var isend = $(self).data("end");
		if(self.loading||isend==1) {
			return;
		}
		self.loading = true;
		var num = $(self).index();
		var page = $(self).data("page") + 1;
	
		if(isend == 0) {
			$(pullclass).eq(num).find(".doing").show();
			setTimeout(function() {
				new Promise(function (resolve, reject) {
					loadlist(page, num,pullclass,callback,resolve);
				}).then(function(value){
					self.loading = false;
				})
			}, 200)
		} 
	});
}



// $(document.body).pullToRefresh('triggerPullToRefresh')
