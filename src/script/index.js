;
//这个是首页渲染的li
(function($) {
    const $list = $('.list ul');
    $.ajax({
            url: 'http://192.168.13.56/js2007/projectname/php/jd_jsonp.php',
            dataType: 'json'
        })
        .done((data) => {
            let $strhtml = '';
            $.each(data, function(index, value) {
                $strhtml += `
                    <li style="margin-left: 0;" class="li_1">
                    <div class="top_img">
                        <img src="${value.url}" alt=""></div>
                    <div class="li">
                        <p style="height: 44px;" class="title">${value.title}</p>
                        <p class="wire"></p>
                        <p class="p">${value.price}</p>
                    </div>
                </li>

            `;
                if (index === 29) {
                    return false
                }
            })
            $('.list ul').html($strhtml);



            // let $liW = $('.list').width();
            // let index = null;
            // $('.list ul').width($('.list li').size() / 5 * $liW + 'px');

            // function move() { //右移
            //     index++;
            //     if (index === $(".list li").length / 5 + 1) {
            //         $('.list').css({
            //             left: 0
            //         })
            //         index = 1
            //     }
            //     if (index === -1) {
            //         $('.list').css({
            //             left: -($('.list li').length - 1) * $liW + 'px'
            //         })
            //     }
            //     $(".list").stop(true).animate({ left: -$liW * index });
            // };
            // $('.icon-zuojiantou').click(function() { //点击左箭头
            //     index -= 2;
            //     move();
            // });
            // $('.icon-iconfontjiantou5').click(function() { //点击右箭头
            //     move();
            // });
            const $zuojiantou = $('.icon-zuojiantou'); //左箭头
            const $iconfontjiantou5 = $('.icon-iconfontjiantou5'); //右箭头
            piclen = 5;
            let liwidth = 240; //1个li的长度
            $iconfontjiantou5.on('click', function() {

                if ($('.list ul li').size() > piclen) {
                    $zuojiantou.css({ //右箭头触发一次，左箭头可以显示。
                        color: '#000'
                    });
                    $('.list ul').animate({
                        left: -piclen * liwidth
                    });
                    piclen += 5;
                    if (piclen === 30) { //无法点击右箭头，到底了
                        $iconfontjiantou5.css({
                            color: '#fff'
                        });
                    }
                    // console.log(piclen);
                }
            });

            $zuojiantou.on('click', function() {
                // let liwidth = 230; //1个li的长度
                console.log($('.list ul li').size());
                if (piclen > 0) {
                    $iconfontjiantou5.css({ //左箭头触发一次，右箭头可以显示。
                        color: '#000'
                    });
                    piclen -= 5;
                    console.log(piclen);
                    $('.list ul').animate({
                        left: -(piclen - 5) * liwidth
                    });
                    if (piclen === 5) { //无法点击右箭头，到底了
                        $zuojiantou.css({
                            color: '#fff'
                        });
                    }

                }

            })
        })
})(jQuery);


//这个是二级导航栏
(function($) {
    let $bagli1 = $('.bagli1'); //12个li

    $bagli1.on('mouseover', function() {
        $(this).children().show()
    });
    $bagli1.on('mouseout', function() {
        $(this).children().hide()
    });
})(jQuery);
//中英文切换
(function($) {
    const $zh = $('.logo .zh'); //中文
    const $en = $('.logo .zh .en');
    $zh.on('click', function() {
        $en.css({
            display: 'block'
        });
    });
    $zh.on('mouseout', function() {
        $en.css({
            display: 'none'
        });
    });
})(jQuery);
//搜索框
(function($) {
    const $input = $('.nav_top .input'); //input
    const $search = $('.nav_top .search'); //搜索框
    //判断点击的是否是搜索框，是就隐藏，不是就显示
    $(document).click(function(e) {
        e = window.event || e;
        var obj = e.srcElement || e.target;
        if ($(obj).is(".nav_top .search")) {
            $search.css({
                display: 'none'
            });
        } else {
            $search.css({
                display: 'block'
            });
        };
    });
})(jQuery);



//微信微博移入事件
(function($) {
    const $icon_weibo = $('.icon-weibo'); //微博
    const $icon_weixin = $('.icon-weixin'); //微信
    const $promotion1 = $('.promotion_1'); //微博二维码
    const $promotion2 = $('.promotion .promotion_2'); //微信二维码
    $icon_weibo.on('mouseover', function() {
        $promotion1.css({
            display: 'block'
        });
    });
    $icon_weibo.on('mouseout', function() {
        $promotion1.css({
            display: 'none'
        });
    });
    $icon_weixin.on('mouseover', function() {
        $promotion2.css({
            display: 'block'
        });
    });
    $icon_weixin.on('mouseout', function() {
        $promotion2.css({
            display: 'none'
        });
    });
})(jQuery);