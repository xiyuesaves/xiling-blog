$(function () {
    //初始化pjax
    $(document).pjax('a', '#main_block',{fragment:"#main_block"})
    $(document).on('pjax:start', function() {
        $('html,body').animate({ scrollTop: 0 }, 300);
        $(".loading_bar").css('transform', 'rotateY(0deg)');
        $(".loading_bar").addClass("loading_active")
    });
    $(document).on('pjax:end', function() {
        $(".loading_bar").css('transform', 'rotateY(90deg)');
        $(".loading_bar").removeClass("loading_active")
        var title_text = $("title").text()
        $("title").text($("#title_text").text())
        // 刷新切换监听
        init_switch_show()
        // 刷新博客状态
        init_blog_status()
        // 刷新监听状态
        init_reply_box_event()
        // 刷新右侧列表
        init_right_list()
    });
    init_reply_box_event()
})

function check_email_avatar(el) {
    var email_path = $(el).val().toLowerCase()
    // 判断是不是qq邮箱
    if (email_path.includes("qq.com")) {
        // 使用qq号获取qq头像
        let qq_num = email_path.split("@qq.com")[0]
        $(".user_name:last").css({
            "background": "url(https://i.loli.net/2020/09/22/xPRBuOGai5jwJFU.png),url(https://q1.qlogo.cn/g?b=qq&nk="+qq_num+"&s=40),url(https://i.loli.net/2019/01/18/5c4165df79ecd.png),#ffffff",
            "background-repeat": "no-repeat",
            "background-size": "30px"
        });
    }else{
        // 不是qq邮箱尝试从gravatar上获取
        let hash_data = hexMD5 (email_path)
        $(".user_name:last").css({
            "background": "url(https://i.loli.net/2020/09/22/xPRBuOGai5jwJFU.png),url(https://www.gravatar.com/avatar/"+ hash_data +".jpg?d=https://i.loli.net/2019/01/18/5c4165df79ecd.png),url(https://i.loli.net/2019/01/18/5c4165df79ecd.png),#ffffff",
            "background-repeat": "no-repeat",
            "background-size": "30px"
        });
    }
}

function init_reply_box_event() {
        //初始化回复功能
    $(".reply_msg").click(function () {
        // 关闭主要回复
        close_main_reply()
        // 清除页面上已有的回复框
        close_rep_flow_box()
        let temp_html = "<div class=\"rep_flow_box\">" +
                                    "<div class=\"input-group\">" +
                                        "<textarea onblur=\"$(this).attr('placeholder','诶 真不说点什么吗')\" onfocus=\"$(this).attr('placeholder','说点什么?')\" placeholder=\"说点什么?\" class=\"form-control write_msg\" placeholder=\"说点什么?\" aria-label=\"With textarea\"></textarea>" +
                                    "</div>" +
                                    "<div class=\"user_detail\">" +
                                        "<label>" +
                                            "<p class=\"user_detail_input_title waring_x\">名称</p>" +
                                            "<div class=\"input-group input-group-sm mt-1\">" +
                                              "<input placeholder=\"2-6字符内\" type=\"text\" class=\"form-control user_name\" aria-label=\"Sizing example input\" aria-describedby=\"inputGroup-sizing-sm\">" +
                                            "</div>" +
                                        "</label>" +
                                        "<label>" +
                                            "<p class=\"user_detail_input_title waring_x \">邮箱</p>" +
                                            "<div class=\"input-group input-group-sm mt-1\">" +
                                              "<input placeholder=\"真实邮箱才会通过审核嗷\" onblur=\"check_email_avatar(this)\" type=\"text\" class=\"form-control user_email\" aria-label=\"Sizing example input\" aria-describedby=\"inputGroup-sizing-sm\">" +
                                            "</div>" +
                                        "</label>" +
                                        "<label>" +
                                            "<p class=\"user_detail_input_title user_blog\">博客地址</p>" +
                                            "<div class=\"input-group input-group-sm mt-1\">" +
                                              "<input placeholder=\"博客或网站\" type=\"text\" class=\"form-control user_blog\" aria-label=\"Sizing example input\" aria-describedby=\"inputGroup-sizing-sm\">" +
                                            "</div>" +
                                        "</label>" +
                                    "</div>" +
                                    "<div class=\"send_msg_and_ver_code mt-2\">" +
                                        "<button onclick='check_data()' type=\"button\" class=\"btn btn-ok btn-sm\">发表评论</button>" +
                                        "<input type=\"number\" onclick=\"$(this).val('');$(this).css('background', 'url(/captchapng.png?'+parseInt(Math.random()*90000+10000)+'),#393e46')\" style=\"background-image: url(./static/img/varimg.jpg);\" class=\"verification_code ml-2\"></input>" +
                                        "<button type=\"button\" onclick='ref_main_reply();close_rep_flow_box()' class=\"btn close_reply btn-secondary btn-sm ml-2\">关闭</button>" +
                                    "</div>";
                                "</div>";
        $(this).parent(".on_msg_det").after(temp_html)
        $(this).addClass("on_reply")
    })
}

function close_rep_flow_box() {
    let del_node = $(".rep_flow_box")
    del_node.addClass("close_rep_flow_box")
    $(".on_reply").removeClass("on_reply")
    setTimeout(function () {
        del_node.remove()
    },300)
}

function close_main_reply() {
    $(".write_msg_box").addClass('write_msg_hiden')
    setTimeout(function () {
        $(".write_msg_hiden").remove()
    },300)
}

function ref_main_reply() {
    let temp_html = "<div class=\"write_msg_box write_msg_hiden\">" +
                        "<p class=\"mb-1 un_msg\">评论</p>" +
                        "<div class=\"input-group\">" +
                            "<textarea class=\"form-control write_msg\" onblur=\"$(this).attr('placeholder','诶 真不说点什么吗')\" onfocus=\"$(this).attr('placeholder','说点什么?')\" placeholder=\"说点什么?\" aria-label=\"With textarea\"></textarea>" +
                        "</div>" +
                        "<div class=\"user_detail\">" +
                            "<label>" +
                                "<p class=\"user_detail_input_title waring_x\">名称</p>" +
                                "<div class=\"input-group input-group-sm mt-1\">" +
                                  "<input maxlength=\"6\" placeholder=\"2-6字符内\" type=\"text\" class=\"form-control user_name\" aria-label=\"Sizing example input\" aria-describedby=\"inputGroup-sizing-sm\">" +
                                "</div>" +
                            "</label>" +
                            "<label>" +
                                "<p class=\"user_detail_input_title waring_x\">邮箱</p>" +
                                "<div class=\"input-group input-group-sm mt-1\">" +
                                  "<input onblur=\"check_email_avatar(this)\" placeholder=\"真实邮箱才会通过审核嗷\" type=\"text\" class=\"form-control user_email\" aria-label=\"Sizing example input\" aria-describedby=\"inputGroup-sizing-sm\">" +
                                "</div>" +
                            "</label>" +
                            "<label>" +
                                "<p class=\"user_detail_input_title\">地址</p>" +
                                "<div class=\"input-group input-group-sm mt-1\">" +
                                  "<input placeholder=\"博客或网站\" type=\"text\" class=\"form-control user_blog\" aria-label=\"Sizing example input\" aria-describedby=\"inputGroup-sizing-sm\">" +
                                "</div>" +
                            "</label>" +
                        "</div>" +
                        "<div class=\"send_msg_and_ver_code mt-2\">" +
                            "<button type=\"button\" onclick=\"check_data()\" class=\"btn btn-ok btn-sm\">发表评论</button>" +
                            "<input type=\"number\" maxlength=\"5\" onclick=\"$(this).val('');$(this).css('background', 'url(/captchapng.png?'+parseInt(Math.random()*90000+10000)+'),#393e46')\" class=\"verification_code ml-2\" style=\"background-image: url(./static/img/varimg.jpg);\" ></input>" +
                        "</div>" +
                    "</div>";
    $(".msg_title").after(temp_html)
    setTimeout(function () {
        $(".write_msg_box").removeClass('write_msg_hiden')
    },0)
}

// 检查主评论提交的留言是否符合规格
function check_data() {
    let user_name = $(".user_name:last")
    let user_email = $(".user_email:last")
    let user_blog = $(".user_blog:last")
    let on_message = $(".write_msg:last")
    let var_code = $(".verification_code:last")

    // 判断邮箱格式
    var pattern= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

    if (user_name.val().length > 2) {
        if (pattern.test(user_email.val())) {
            if (user_blog.val().length >= 0) {
                if (on_message.val().length >= 6) {
                    if (var_code.val().length == 5) {
                        send_message()
                    }else{
                        var_code.addClass("err_msg")
                        setTimeout(function () {
                            var_code.removeClass("err_msg")
                        },300)
                    }
                }else{
                    on_message.addClass("err_msg")
                    setTimeout(function () {
                        on_message.removeClass("err_msg")
                    },300)
                }
            }else{
                user_blog.addClass("err_msg")
                setTimeout(function () {
                    user_blog.removeClass("err_msg")
                },300)
            }
        }else{
            user_email.addClass("err_msg")
            setTimeout(function () {
                user_email.removeClass("err_msg")
            },300)
        }
    }else{
        user_name.addClass("err_msg")
        setTimeout(function () {
            user_name.removeClass("err_msg")
        },300)
    }
}

