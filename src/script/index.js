(function($) {
    const $list = $('.list ul');
    $.ajax({
            url: 'http://localhost/js2007/projectname/php/jd_jsonp.php',
            dataType: 'json'
        })
        .done((data) => {
            console.log(data)
            let $strhtml = '';
            $.each(data, function(index, value) {
                $strhtml += `
                    <li style="margin-left: 0;">
                    <div class="top_img">
                        <img src="${value.url}" alt=""></div>
                    <div class="li">
                        <p style="height: 44px;" class="title">${value.title}</p>
                        <p class="wire"></p>
                        <p class="p">${value.price}</p>
                    </div>
                </li>

            `
                if (index === 4) {
                    return false
                }
            })
            $('.list ul').html($strhtml)
        })
})(jQuery)