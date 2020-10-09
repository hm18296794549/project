;
(function($) {
    function showlist(sid, num) { //sid：编号  num：数量
        $.ajax({
            url: 'http://192.168.13.35/js2007/projectname/php/alldata.php',
            dataType: 'json'
        }).done(function(data) {
            console.log(data)
            $.each(data, function(index, value) {
                if (sid == value.sid) {
                    console.log(sid)
                    console.log(value.sid)
                    console.log(value.url)
                    let $clonebox = $('.tr1:hidden').clone(true, true); //克隆隐藏元素
                    $clonebox.find('.car-img').find('img').attr('src', value.url);
                    $clonebox.find('.car-img').find('img').attr('sid', value.sid);
                    $clonebox.find('.title').find('p').html(value.title);
                    $clonebox.find('#strong').find('em').html(value.price);
                    $clonebox.find('.strong').find('em').val(num);
                    // 计算单个商品的价格
                    $clonebox.find('.strong').find('em').html((value.price * num).toFixed(2));
                    $clonebox.css('display', 'block');
                    $('.describe').append($clonebox);
                    calcprice(); //计算总价
                }
            });
        });

    } //2.获取cookie渲染数据
    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
        let s = $.cookie('cookiesid').split(','); //获取cookie 同时转换成数组[1,2]
        let n = $.cookie('cookienum').split(','); //获取cookie 同时转换成数组[10,20]
        $.each(s, function(index, value) {
            showlist(s[index], n[index]);
        });
    }


    //3.计算总价--使用次数很多--函数封装
    function calcprice() {
        let $sum = 0; //商品的件数
        let $count = 0; //商品的总价
        $('.describe:visible').each(function(index, ele) {
            if ($(ele).find('#choseAll input').prop('checked')) { //复选框勾选
                $sum += parseInt($(ele).find('#choseAll input').val());
                $count += parseFloat($(ele).find('#choseAll strong').html());
            }
        });
        $('.totalprice').find('em').html($sum);
        $('.price').html($count.toFixed(2));
    }

    //4.全选
    $('#choseAll').on('change', function() {
        $('.describe:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
        $('.allsel').prop('checked', $(this).prop('checked'));
        calcprice(); //计算总价
    });
    let $inputs = $('.describe:visible').find(':checkbox');
    $('.describe').on('change', $inputs, function() {
        //$(this):被委托的元素，checkbox
        if ($('.describe:visible').find(':checkbox').length === $('.describe:visible').find('input:checked').size()) {
            $('#choseAll').prop('checked', true);
        } else {
            $('#choseAll').prop('checked', false);
        }
        calcprice();
    });

    //5.数量的改变
    $('.add').on('click', function() {
        let $num = $(this).parents('#choseAll').find('.changebox input').val();
        $num++;
        $(this).parents('#choseAll').find('.changebox input').val($num);

        $(this).parents('#choseAll').find('.price').html(calcsingleprice($(this)));
        calcprice();
        setcookie($(this));
    });


    $('.minus').on('click', function() {
        let $num = $(this).parents('#choseAll').find('.changebox input').val();
        $num--;
        if ($num < 1) {
            $num = 1;
        }
        $(this).parents('#choseAll').find('.changebox input').val($num);
        $(this).parents('#choseAll').find('.price').html(calcsingleprice($(this)));
        calcprice();
        setcookie($(this));
    });

    $('.changebox input').on('input', function() {
        let $reg = /^\d+$/g;
        let $value = $(this).val();
        if (!$reg.test($value)) {
            $(this).val(1);
        }
        $(this).parents('#choseAll').find('.price').html(calcsingleprice($(this)));
        calcprice();
        setcookie($(this));
    });


    //计算单价
    function calcsingleprice(obj) {
        let $dj = parseFloat(obj.parents('#choseAll').find('#strong').html());
        let $num = parseInt(obj.parents('#choseAll').find('.changebox input').val());
        return ($dj * $num).toFixed(2)
    }

    //将改变后的数量存放到cookie中
    let arrsid = [];
    let arrnum = [];

    function cookietoarray() {
        if ($.cookie('cookiesid') && $.cookie('cookienum')) {
            arrsid = $.cookie('cookiesid').split(',');
            arrnum = $.cookie('cookienum').split(',');
        } else {
            arrsid = [];
            arrnum = [];
        }
    }

    function setcookie(obj) {
        cookietoarray();
        let $sid = obj.parents('#choseAll').find('img').attr('sid');
        arrnum[$.inArray($sid, arrsid)] = obj.parents('#choseAll').find('.changebox input').val();
        $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
    }


    //6.删除
    function delcookie(sid, arrsid) {
        let $index = -1;
        $.each(arrsid, function(index, value) {
            if (sid === value) {
                $index = index;
            }
        });
        arrsid.splice($index, 1);
        arrnum.splice($index, 1);

        $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
        $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
    }
    $('.ano02 a').on('click', function() {
        cookietoarray();
        if (window.confirm('你确定要删除吗?')) {
            $(this).parents('.cat_list').remove();
            delcookie($(this).parents('#choseAll').find('img').attr('sid'), arrsid);
            calcprice();
        }
    });
})(jQuery);