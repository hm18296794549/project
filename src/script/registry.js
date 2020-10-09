;
(function($) {
    let $user = $('.username');
    console.log($user);
    let $usernameflag = true;
    $user.on('blur', function() {
        $.ajax({
            type: 'post',
            url: 'http://192.168.13.35/js2007/projectname/php/registry.php',
            data: {
                username: $user.val()
            }
        }).done(function(result) {
            console.log(1)
            if ($user.val() != '') {
                if (!result) { //不存在
                    $('.name').html('√').css('color', 'green');
                    $usernameflag = true;
                } else {
                    $('.name').html('该用户名已经存在').css('color', 'red');
                    $usernameflag = false;
                }
            } else {
                $('.name').html('用户名不能为空').css('color', 'red');
            }



        })
    });
    $('.password').blur(function() {
            if ($('.password').val() !== '') {
                $('.p1').html('√').css('color', 'green');
            } else {
                $('.p1').html('密码不能为空').css('color', 'red');
            }
        })
        // $('.password').on('input', function() {
        //     if ($('.password').val() !== '') {
        //         $('.passSpan').html('√').css('color', 'green');
        //     } else {
        //         $('.passSpan').html('密码不能为空').css('color', 'red');
        //     }
        // })
    $('form').on('submit', function() {
        if ($user.val() == '') {
            $('p').html('用户名不能为空').css('color', 'red');
            $usernameflag = false;
        }
        if (!$usernameflag) {
            return false; //阻止提交
        }
    });
})(jQuery);