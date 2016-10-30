;(function($){
	var jqueryMap,
		stateMap,
		noteJsUrl,
		noteHtmlUrl,
		nid,
		notePath;
	jqueryMap = {
		articalTitle : $(".js-artical-title"),
		articalContent : $(".js-artical-content")
	};
	nid = getUrlParam("id"); // 文章id
	notePath = "./content/"+nid+"/"; // 文章的路径
	noteJsUrl = notePath + nid +".js"; // 文章的js文件
	noteHtmlUrl = notePath + nid + ".html"; //文章的html文件
	ajax(noteJsUrl,"script",function(){
		jqueryMap.articalTitle.empty()
								.append("<h3>"+content["name"]+"</h3>");
		jqueryMap.articalContent.html("<div id='loadTip'>正在加载...</div>")
								.load(noteHtmlUrl,function(){
									$("#loadTip").remove();
									jqueryMap.articalContent.find("img",function(){
										$(this).attr("src",notePath + nid + $(this).attr("src"))
									})
								})
	},function(xhr,text,error){
		console.log(text); // 输出错误信息
	})

	$("#backList").on("click",function(){
		history.go(-1);
	})

	// jquery ajax方法
	function ajax(url,type,callback1,callback2){
		$.ajax({
		  url: url,
		  type:"GET",
		  dataType: type,
		  success: callback1,
		  error:callback2
		});
	}
	//获取url中的参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }
})(jQuery)