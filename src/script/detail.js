;
//左边小图片
(function($) {
    const $left = $('.picture_xiao');
    $.ajax({
            url: 'http://192.168.13.35/js2007/projectname/php/index1.php',
            dataType: 'json'
        })
        .done((data) => {
            let $strhtml = '';
            $.each(data, function(index, value) {
                let $arr = value.piclisturl.split(',');
                //把图片渲染在li里面
                $.each($arr, function(i, elm) {
                    console.log(elm);
                    $strhtml += `
                    <li>
                    <img src=${elm} alt="">
                    </li>
                    `;
                });
                if (index == 0) {
                    return false
                }
            })
            $('.picture_xiao').html($strhtml);
        })
})(jQuery);
//这个是移入的时候右边有一个大图
// (function($) {
//     const $fdj_img = $('.fdj_img');
//     const $leftli = $('.picture_xiao li');
//     $.ajax({
//             url: 'http://192.168.13.35/js2007/projectname/php/index1.php',
//             dataType: 'json'
//         })
//         .done(data => {
//             $leftli.on('mousever', function() {
//                 $fdj_img.css({
//                     display: 'block'
//                 });
//                 $.each($leftli, function(index, value) {

//                 })
//             })
//         })
// })(jQuery);