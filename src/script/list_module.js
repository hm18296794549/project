;
//二级导航栏
(function($) {
    let $bagli1 = $('.bagli1'); //12个li

    $bagli1.on('mouseover', function() {
        $(this).children().show()
    });
    $bagli1.on('mouseout', function() {
        $(this).children().hide()
    });
})(jQuery);
//列表页的渲染
;
(function($) {
    //1.渲染列表页的数据-默认渲染第一页
    //排序的变量
    let array_default = []; //排序前的li数组，默认数组
    let array = []; //排序中的数组
    let prev = null; //前一个价格
    let next = null; //后一个价格
    const $list = $('.rendererlist');
    $.ajax({
        url: 'http://192.168.13.35/js2007/projectname/php/listdata.php',
        dataType: 'json'
    }).done(function(data) {
        let $strhtml = '<ul>';
        $.each(data, function(index, value) {
            $strhtml += `
                        <li>
                            <a href="detail.html?sid=${value.sid}" target="_blank">
                                <img class="lazy" data-original="${value.url}" width="200" height="200"/>
                                <p>${value.title}</p>
                                <span class="price">￥${value.price}</span>
                                <span>库存${value.sailnumber}</span>
                            </a>
                        </li>
                    `;
        });
        $strhtml += '</ul>';
        $list.html($strhtml);

        //重置数组
        array_default = []; //排序前的li数组
        array = []; //排序中的数组
        prev = null;
        next = null;
        //将页面的li元素追加到两个数组中。
        $('.rendererlist li').each(function(index, element) {
            array[index] = $(this);
            array_default[index] = $(this);
        });

        //懒加载
        $(function() {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });
    });

    //2.分页思路
    //告知后端当前请求的是第几页数据。将当前的页面页码传递给后端(get)
    $('.page').pagination({
        pageCount: 3, //总的页数 - 后端传入的。
        jump: true, //是否开启跳转到指定的页数，布尔值。
        coping: true, //是否开启首页和尾页，布尔值。
        prevContent: '上一页',
        nextContent: '下一页',
        homePage: '首页',
        endPage: '尾页',
        callback: function(api) {
            console.log(api.getCurrent()); //获取的页码给后端
            $.ajax({
                url: 'http://192.168.13.35/js2007/projectname/php/listdata.php',
                data: {
                    page: api.getCurrent() //传输页面
                },
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '<ul>';
                $.each(data, function(index, value) {
                    $strhtml += `
                                <li>
                                    <a href="detail.html?sid=${value.sid}" target="_blank">
                                        <img src="${value.url}"/>
                                        <p class="img_p"><i>自营</i><b>直降</b><p>
                                        <p >${value.title}</p>
                                        <span class="price">￥${value.price}</span>
                                        <span>${value.sailnumber}</span>
                                    </a>
                                </li>
                            `;
                });
                $strhtml += '</ul>';
                $list.html($strhtml);

                //重置数组
                array_default = []; //排序前的li数组
                array = []; //排序中的数组
                prev = null;
                next = null;
                //将页面的li元素追加到两个数组中。
                $('.list li').each(function(index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });
            });
        }
    });


    //3.排序
    //默认排序：如果已经排序了，恢复最初的排序。
    $('button').eq(0).on('click', function() {
        //array_default = [li,li,li,li......]
        $.each(array_default, function(index, value) {
            $('.list ul').append(value);
        });
        return;
    });

    //升序
    $('button').eq(1).on('click', function() {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.price').html().substring(1)); //获取上一个价格
                next = parseFloat(array[j + 1].find('.price').html().substring(1)); //获取下一个价格
                //通过价格的判断，改变的是li的位置。
                if (prev > next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        $.each(array, function(index, value) {
            $('.list ul').append(value);
        });
    });
})(jQuery);