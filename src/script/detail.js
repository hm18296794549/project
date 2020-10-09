;
//左边小图片
//获取后端传过来的sid，如果没有默认sid为1
(function($) {
    let $sid = location.search.substring(1).split('=')[1];
    if (!$sid) {
        $sid = 1;
    }
    const $left = $('.picture_xiao');
    $.ajax({
            url: 'http://192.168.13.35/js2007/projectname/php/getsid.php',
            data: {
                sid: $sid
            },
            dataType: 'json'
        })
        .done((data) => {
            let $strhtml = '';
            let $arr = data.piclisturl;

            $('.picture_da').attr('src', data.url)
            $('.picture_dada').attr('src', data.url)
            $('.picture_da').attr('sid', data.sid)
            let data1 = $arr.split(',');
            //把图片渲染在li里面
            $.each(data1, function(i, elm) {
                $strhtml += `
                    <li>
                    <img src=${elm} alt="">
                    </li>
                    `;
            });
            $('.picture_xiao').html($strhtml);

        })
        //移入的时候右边也出现一张图片
    $('.picture_xiao').on('mousemove', 'li', function() {
            $(this).find('img').attr('src')
            $('.picture_da').attr({
                src: $(this).find('img').attr('src')
            })
        })
        //放大镜效果
    const $xf = $('.sf'); //盒子
    const $xf_1 = $('.a'); //放大镜
    const $bf = $('.bf>img'); //大图
    const $bfx = $('.bf');
    let $bili = $bf.width() / $xf.width(); //比例大于1 放大效果


    $xf.hover(function(e) {
        e.preventDefault();
        $xf_1.css('visibility', 'visible');
        $bfx.css('display', 'block');
        $bf.css('display', 'block')
        $(this).on('mousemove', function(ev) {
            let $leftvalue = ev.pageX - $xf.offset().left - $xf_1.width() / 2;
            let $topvalue = ev.pageY - $xf.offset().top - $xf_1.height() / 2;


            if ($leftvalue < 0) {
                $leftvalue = 0;
            } else if ($leftvalue >= $xf.width() - $xf_1.width()) {
                $leftvalue = $xf.width() - $xf_1.width()
            }

            if ($topvalue < 0) {
                $topvalue = 0;
                console.log(1)
            } else if ($topvalue >= $xf.height() - $xf_1.height()) {
                $topvalue = $xf.height() - $xf_1.height()
            }


            $xf_1.css({
                left: $leftvalue,
                top: $topvalue
            });

            $bf.css({
                left: -$leftvalue * $bili,
                top: -$topvalue * $bili,
                // display: block
            });

        });
    }, function() {
        $xf_1.css('visibility', 'hidden');
        $bf.css('display', 'none');
    });
})(jQuery);

//h4标题
(function($) {
    let $sid = location.search.substring(1).split('=')[1];
    if (!$sid) {
        $sid = 1;
    }
    $.ajax({
            url: 'http://192.168.13.35/js2007/projectname/php/getsid.php',
            dataType: 'json',
            data: {
                sid: $sid
            }
        })
        .done((data) => {
            let $strhtml = '';
            $strhtml += `
                <h4>${data.title}</h4>
                `;
            $('.right .h').html($strhtml);
        });
})(jQuery);
//渲染价格
(function($) {
    let $sid = location.search.substring(1).split('=')[1];
    if (!$sid) {
        $sid = 1;
    }
    $.ajax({
        url: 'http://192.168.13.35/js2007/projectname/php/getsid.php',
        dataType: 'json',
        data: {
            sid: $sid
        }
    }).done((data) => {
        let $strhtml = '';
        $strhtml += `
            <p>一口价
            <span>￥${data.price}</span>
            </p>
            `;
        $('.price_message .price1').html($strhtml);


    });
})(jQuery);
//这个是网页的标题
(function($) {
    let $sid = location.search.substring(1).split('=')[1];
    if (!$sid) {
        $sid = 1;
    }
    $.ajax({
        url: 'http://192.168.13.35/js2007/projectname/php/getsid.php',
        dataType: 'json',
        data: {
            sid: $sid
        }
    }).done((data) => {
        document.title = data.title
    });
})(jQuery);

// //这个是二级导航栏
(function($) {
    let $bagli1 = $('.bagli1'); //12个li

    $bagli1.on('mouseover', function() {
        $(this).children().show()
    });
    $bagli1.on('mouseout', function() {
        $(this).children().hide()
    });
})(jQuery);

//这是每一个图片对应的颜色
(function($) {
    let $sid = location.search.substring(1).split('=')[1];
    if (!$sid) {
        $sid = 1;
    }
    $.ajax({
        url: 'http://192.168.13.35/js2007/projectname/php/getsid.php',
        dataType: 'json',
        data: {
            sid: $sid
        }
    }).done((data) => {
        const $color = $('.color');
        let $strhtml = '';
        $strhtml += `
        <span>颜色</span>
        <img src="${data.url}" alt="">
        `;
        $color.html($strhtml)
    });
})(jQuery);
//点击加减的点击事件
(function($) {
    $(document).ready(function() {
        //获得文本框对象
        var t = $(".input1").val();
        //初始化数量为1,并失效减
        // $('.a_1').attr('disabled', true);
        //数量增加操作
        $('.a_2').click(function() {


                var t = $(".input1").val();

                if ($(".input1").val() >= 1) {
                    $(".input1").val(t * 1 + 1)
                }
                // console.log(t.prop())
            })
            //数量减少操作
        $('.a_1').click(function() {
            // t.prop(Math.abs(parseInt(t.prop())) - 1);
            // if (parseInt(t.prop()) == 1) {
            //     $('.a_1').attr('disabled', true);
            // };


            var t = $(".input1").val();
            if ($(".input1").val() > 1) {
                $(".input1").val(t * 1 - 1)
            } else if ($(".input1").val() === 1) {
                console.log(1);
                $(".input1").val(t = 1)
            }
        })
    });

    let arrsid = []; //存储商品的编号。
    let arrnum = []; //存储商品的数量。

    function cookietoarray() {
        if ($.cookie('cookiesid') && $.cookie('cookienum')) {
            arrsid = $.cookie('cookiesid').split(','); //获取cookie 同时转换成数组。[1,2,3,4]
            arrnum = $.cookie('cookienum').split(','); //获取cookie 同时转换成数组。[12,13,14,15]
        } else {
            arrsid = [];
            arrnum = [];
        }
    }


    $('.purchase_2').on('click', function() {
        //获取当前商品对应的sid
        let $sid = $('.picture_da').attr('sid');
        console.log($sid)
            //判断是第一次点击还是多次点击
            //多次点击
            //$.inArray(value,array,[fromIndex])
            //确定第一个参数在数组中的位置，从0开始计数(如果没有找到则返回 -1 )。
        cookietoarray();
        if ($.inArray($sid, arrsid) != -1) { //$sid存在，商品列表存在，数量累加
            //先取出cookie中存在的数量+当前添加的数量，一起添加到cookie中。
            let $num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('.input1').val()); //取值
            arrnum[$.inArray($sid, arrsid)] = $num; //赋值
            $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
        } else {
            //第一次点击加入购物车按钮,将商品的sid和商品的数量放到提前准备的数组里面，然后将数组传入cookie.\
            arrsid.push($sid); //将编号$sid push到arrsid数组中
            $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
            arrnum.push($('.input1').val()); //将数量push到arrnum数组中
            $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
        }
        alert('按钮触发了');
    });

})(jQuery)