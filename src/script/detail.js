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
            url: 'http://127.0.0.1/js2007/projectname/php/getsid.php',
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
    // const $bfx = $('.bf');

    // $xf_1.width($xf.width() * $bf.width() / $xf.width());
    // $xf_1.height($xf.height() * $bf.height() / $xf.height());
    let $bili = $bf.width() / $xf.width(); //比例大于1 放大效果


    $xf.hover(function(e) {
        e.preventDefault();
        $xf_1.css('visibility', 'visible');
        $bf.css('visibility', 'visible');
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
            } else if ($topvalue >= $xf.height() - $xf_1.height()) {
                $topvalue = $xf.height() - $xf_1.height()
            }


            $xf_1.css({
                left: $leftvalue,
                top: $topvalue
            });

            $bf.css({
                left: -$leftvalue * $bili,
                top: -$topvalue * $bili
            });

        });
    }, function() {
        $xf_1.css('visibility', 'hidden');
        $bf.css('visibility', 'hidden');
    });
})(jQuery);



//h4标题
(function($) {
    let $sid = location.search.substring(1).split('=')[1];
    if (!$sid) {
        $sid = 1;
    }
    $.ajax({
            url: 'http://127.0.0.1/js2007/projectname/php/getsid.php',
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
        url: 'http://127.0.0.1/js2007/projectname/php/getsid.php',
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
        console.log($strhtml);
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
        url: 'http://127.0.0.1/js2007/projectname/php/getsid.php',
        dataType: 'json',
        data: {
            sid: $sid
        }
    }).done((data) => {
        document.title = data.title
    });
})(jQuery)