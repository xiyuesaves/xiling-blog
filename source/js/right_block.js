var server_link = document.location.protocol+"//"+window.location.host
$(function () {
	init_switch_show()
	init_blog_status()
	init_right_list()
})

// 初始化切换显示
function init_switch_show() {
	on_active = 1
	$(".mbr_t_link_active").css({"transform":" translateX(0%) translateY(-50%)",'transition':'0ms'})
	$(".sm_list_block").css({"transform":" translateX(0%)",'transition':'0ms'})
	$(".mbr_t_link").click(function(e) {
		let link_index = $(this).index()
		let sm_blog_num = $(".sm_list_block").length
		let sto = null
		let tim = 40
		$(".mbr_t_link_active").css({"transform":" translateX("+(link_index-1)*100+"%) translateY(-50%)",'transition': Math.abs(on_active - link_index)*300+'ms'})
		$(".sm_list_block").css('transition', Math.abs(on_active - link_index)*300+'ms');
		if (Math.abs(on_active - link_index) !== 0) {
			for (let i = 0; i < sm_blog_num; i++) {
				let tims = tim * i
				set_css(i,tims,link_index,tims)
			}
			on_active = link_index
		}
		function set_css(i,tim,link_index,tims) {
			sto = setTimeout(function () {
				$(".sm_list_block").eq(i).css("transform","translateX(-"+(link_index-1)*33.333+"%)")
			},tims)
		}
	})
}

// 初始化随机文章/热门文章/最新回复
function init_right_list() {
	$.ajax({
		url: server_link+'/right_list',
		type: 'GET',
		dataType: 'json',
		success(data){
			set_right_list(data)
		},
		error(data){
			console.error("请求右侧数据失败");
			console.log(data);
		}
	});
	function set_right_list(data) {
		data.blog_list.sort(function (a,b) {
			return (a.read_num + "" + a.time) - (b.read_num + "" + b.time)
		})
		let list_num = 6
		if (data.blog_list.length < 6 || data.new_msg.length < 6) {
			data.blog_list.length > data.new_msg.length ? list_num = data.new_msg.length : list_num = data.blog_list.length
		}
		$(".sm_list_block_ajax").remove()
		let temp_arr = []
		for (var i = 0; i < list_num; i++) {
			temp_arr.push(i)		
		}
		for (var i = temp_arr.length-1; i >= 0; i--) {
			let temp_arr_num = Math.floor(Math.random()*temp_arr.length)
			let k = temp_arr[temp_arr_num]
			temp_arr.splice(temp_arr_num,1)
			let temp_html = "<div class=\"sm_list_block sm_list_block_ajax\">" +
							    "<div class=\"sm_list_b_box\">" +
							        "<a href=\""+ data.blog_list[k].blog_link +"\"><p class=\"title_text mb-0 of_ellipsis_2\">"+ data.blog_list[k].blog_name +"</p></a>" +
							        "<i class=\"blog_sm_icon icon iconfont icon-chakan\"><p class=\"mb-0 of_ellipsis\">"+ data.blog_list[k].read_num +"</p></i>" +
							        "<div class=\"sm_list_bgi\">" +
							            "<img src=\""+ data.blog_list[k].banner_img +"\">" +
							        "</div>" +
							    "</div>" +
							    "<div class=\"sm_list_b_box\">" +
							        "<a href=\""+ data.blog_list[i].blog_link +"\"><p class=\"title_text mb-0 of_ellipsis_2\">"+ data.blog_list[i].blog_name +"</p></a>" +
							        "<i class=\"blog_sm_icon icon iconfont icon-chakan\"><p class=\"mb-0 of_ellipsis\">"+ data.blog_list[i].read_num +"</p></i>" +
							        "<div class=\"sm_list_bgi\">" +
							            "<img src=\""+ data.blog_list[i].banner_img +"\">" +
							        "</div>" +
							    "</div>" +
							    "<div class=\"sm_list_b_box\">" +
							        "<div class=\"sm_li_msg\">" +
							            "<div class=\"sm_avatar_img\">" +
							                "<img src=\""+ data.new_msg[i].avatar +"\">" +
							            "</div>" +
							            "<div class=\"sm_li_det\">" +
							                "<a href=\"\" title=\""+ data.new_msg[i].links +"\"><p class=\"sl_li_user of_ellipsis mb-0\">"+ data.new_msg[i].name +"</p></a>" +
							                "<p class=\"sl_li_msg of_ellipsis_2 mb-0\">"+ data.new_msg[i].on_msg_data +"</p>" +
							            "</div>" +
							        "</div>" +
							    "</div>" +
							"</div>";
				$(".sm_list_block_list").append(temp_html)
		}
	}
}

// 初始化博客状态
function init_blog_status() {
	$.ajax({
		url: server_link+'/blog_status.json',
		type: 'GET',
		dataType: 'json',
		success(data){
			var this_date = new Date().getTime()
			var on_time = this_date - data.last_update
			var run_time = this_date - data.start_time
			$(".last_update").text(format_time(on_time)+"前")
			$(".on_mesage").text(data.message_num)
			$(".blog_num").text(data.blog_num)
			$(".normal_run").text(format_time(run_time))

		}
	});
}

// 计算时间单位
function format_time(time) {
	var dt = [1000,60,60,24,30,12,1000]
	var dy = [" 毫"," 秒"," 分"," 时"," 天"," 月"," 年"]
	var t_time = 0
	for (var i = 0; i < dt.length; i++) {
		t_time = time / dt[i]
		if (!Math.floor(t_time) || i === dt.length) {
			return Math.floor(time)+dy[i]
			i = dt.length
		}else{
			time = t_time
		}
	}
}