$(function () {

    $('#reg_btn').on('click', function () {
        $(this).parents('.log').hide();
        $('.reg').show()
    })
    $('#log_btn').on('click', function () {
        $(this).parents('.reg').hide();
        $('.log').show()
    })


    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码格式不正确，6~16位数字'],
        uname: [/^[\SA-Za-z]{3,6}$/, '用户名格式不正确'],
        repwd: function (val) {
            var value = $('#regpassword').val();
            if (val !== value) {
                return '两次密码不一致啊'
            }
        }
    })
    // 注册
    $('#regform').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#regusername').val(),
            password: $('#regpassword').val(),
        }
        $.ajax({
            method: 'post',
            url: "/api/reguser",
            data: data,

            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功,可以登录')
                $('#log_btn').click();
            }
        })
    })
    // 登录
    $('#logform').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = "/index.html"
            }
        })
    })


})