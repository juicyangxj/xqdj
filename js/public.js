document.write(`<script src="../js/jquery-1.11.3.min.js"></script>`);
document.write(`<script src="../js/fastclick.js"></script>`);
document.write(`
	<script>
 $(function() {
    FastClick.attach(document.body);
 });</script>`)

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return decodeURI(r[2]);
	return null;
}

function judge(title) {
	var judge = false;
	var identity = localStorage.getItem("identity");
	if(identity == "dy" && (title == "微心愿" || title == "咨询建议" || title == "入党宣誓厅" || title == "党员视角" || title == "学习心得" || title == "清风论坛")) {
		judge = true;
	} else if(identity == "dzb") {
		judge = true;
	}
	return judge;
}
var count = 0;
var url='';
var filetype = "img";
var total=0;
function uploadfile(type, max, parentId) {
	if(type) {
		filetype = type;
	}
	if(filetype == "img") {
		url = "http://222.191.243.216:6626/mobile/oa/ncjc/file/cjfile.jsp";
	} else if(filetype == "video") {
		url = "http://222.191.243.216:6626/mobile/oa/ncjc/file/videofile.jsp";
	}
	//在app模式下调试，接口不跨域

	
	var camera = $("input[name=file]")[0];
	/* -----------------------------------      添加附件图片         ---------------------------------- */
	camera.onchange = function(event) {
		
		count = 0;
		var files = event.target.files;
		if(files && files.length > 0 &&total<max) {
			$.showLoading();
			upload(files, files.length, parentId);
		}else if(files && files.length > 0 &&total>=max) {
			$.alert("最多只能上传"+max+"个！")
		}else {
			$.alert("您尚未选择文件！")
		}
	}

}

function upload(files, length, parentId) {
	$.showLoading();
	var reader = new FileReader();
	reader.readAsDataURL(files[count]);
	reader.onload = function(event) {
		var form = document.forms[0];
		var formData = new FormData(); //这里连带form里的其他参数也一起提交了,如果不需要提交其他参数可以直接FormData无参数的构造函数
		//接口有跨域问题，要加两个头，貌似有的安卓机无法选择本地图片
		formData.append("file", files[count]);
		$.ajax({
			url: url,
			type: "POST",
			data: formData,
			dataType: "json",
			processData: false, // 告诉jQuery不要去处理发送的数据,这两句话一定要加，不然会报错
			contentType: false, // 告诉jQuery不要去设置Content-Type请求头
			success: function(data) {
				console.log(files)
				var data0 = data.filepath.replace(/\\/g, "");
				if(filetype == "img") {
					var imgn = '<div class="jui-img">' +
						'<img  src="' + data0 + '" ><span class="del">—</span>' +
						'</div>';
				} else if(filetype == "video") {
					var imgn = '<div class="jui-img">' +
						'<video  src="' + data0 + '" controls="controls" class="f-width100"></video><span class="del">—</span>' +
						'</div>';
				}
				$(parentId).append(imgn);
				$.hideLoading();
				count++;
				total++;
				if(count == length) {
					return
				} else {
					upload(files, length, parentId);
				}
			}
		})
	};
}