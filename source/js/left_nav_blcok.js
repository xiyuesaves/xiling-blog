$(function () {
	var settimout_ins = null
	$(".left_nav_show_box").click(function (e) {
		var click_index = $(".left_nav_show_box").index(this)
		var hide_num = $(".left_nav_link_flod:eq("+click_index+") .left_nav_link_flod_hid").length
		var time = 50
		var times = 0
		if (!$(".left_nav_link_flod").eq(click_index).hasClass("active")) {
			$(".left_nav_link_flod").css({
				"height":40 +"px"
			})
			$(".left_nav_link_flod").removeClass("active")
			$(".left_nav_link_flod").eq(click_index).css({
				"height":hide_num*40 + 40 +"px"
			})
			$(".left_nav_link_flod").eq(click_index).addClass("active")
		}else{
			$(".left_nav_link_flod").eq(click_index).css({
				"height":40+"px"
			})
			$(".left_nav_link_flod").eq(click_index).removeClass("active")
		}
	})
})