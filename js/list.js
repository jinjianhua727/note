;(function($){
	// 初始化操作
	var jqueryMap,
		stateMap,
		data = notes,
		types = [],
		tags = [];
	jqueryMap = {
		noteList : $(".js-note-list"),
		typeList : $(".js-note-type-list"),
		tagList : $(".js-note-tag-list"),
		resetBtn : $("#reset-aside-btn")
	};

	createNote(jqueryMap.noteList,data);
	createAsideType(jqueryMap.typeList,data);
	createAsideTag(jqueryMap.tagList,data);

	// 事件处理
	jqueryMap.typeList.on("click",".js-tab",function(){
		if ($(this).hasClass("active")) {
			return
		}
		var type = $(this).attr("data-type");
		jqueryMap.typeList.find("a").removeClass("active");
		jqueryMap.tagList.find("a").removeClass("active")
		toggleClass($(this),"active");
		filterNote("type",type);
	});
	jqueryMap.tagList.on("click",".js-tab",function(){
		if ($(this).hasClass("active")) {
			return
		}
		var tag = $(this).attr("data-tag");
		jqueryMap.typeList.find("a").removeClass("active");
		jqueryMap.tagList.find("a").removeClass("active")
		toggleClass($(this),"active");
		filterNote("tags",tag);
	});
	jqueryMap.resetBtn.on("click",function(){
		jqueryMap.typeList.find(".js-tab").removeClass("active");
		jqueryMap.tagList.find(".js-tab").removeClass("active");
		filterNote("reset");
	});

	// 方法
	// 文章列表
	function createNote($wrap,data){
		$wrap.empty();
		var html = '';
		$.each(data,function(index,value){
			html += '<li data-type="'+value["type"]+'" data-tags="'+value["tags"]+'"> \
						<h3 class="note-title"><a href="detail.html?id='+value["id"]+'" title="'+value["name"]+'">'+value["name"]+'</a></h3> \
						<div class="note-description"> \
							<p>'+value["description"]+'</p> \
						</div> \
						<div class="note-mark"> \
							<span>发表于：'+value["time"]+'</span> \
							<span>分类：'+value["type"]+'</span> \
						</div> \
					</li>'
		});
		$wrap.append(html);
	}
	// 遍历文章列表，str为type或tags
	function filterNote(str,value){
		jqueryMap.noteList.find("li").each(function(){
			var flag;
			if (str === "type") {
				flag = $(this).attr("data-"+str+"") !== value
			}else if (str === "tags") {
				flag = $(this).attr("data-tags").indexOf(value) === -1
			}else if (str === "reset") {
				$(this).removeAttr("data-hide");
				return;
			}
			if (flag) {
				$(this).attr("data-hide","true");
			}else if($(this).attr("data-hide") == "true"){
				$(this).removeAttr("data-hide");
			}
		})
	}
	// 侧边类型栏
	function createAsideType($wrap,data){
		$wrap.empty();
			html = "";
		$.each(data,function(index,value){
			if ($.inArray(value["type"], types) === -1) {
				types.push(value["type"]);
				html += '<a class="js-tab aside-tab" data-type="'+value["type"]+'">'+value["type"]+'</a>';
			}
		});
		$wrap.append(html)
	}
	// 侧边标签栏
	function createAsideTag($wrap,data){
		$wrap.empty();
		var tags = [],
			html = "";
		$.each(data,function(index,value){
			var arr = value["tags"].split(" ");
			$.each(arr,function(idx,val){
				if ($.inArray(val, tags) === -1) {
					tags.push(val);
					//console.log(val)
					html += '<a class="js-tab aside-tab" data-tag="'+val+'">'+val+'</a>';
				}
			})
			
		});
		$wrap.append(html)
	}
	// toggle class
	function toggleClass($elem,str){
		if ($elem.hasClass(str)) {
			$elem.removeClass(str);
		}else{
			$elem.addClass(str).siblings().removeClass(str);
		}
	}
})(jQuery)