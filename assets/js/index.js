$(function () {


    getuser();

    function getuser() {
        $.ajax({
            method: 'get',
            url: ' http://ajax.frontend.itheima.net/my/userinfo',
            headers: {
                Authorization: localStorage.getItem('token'),
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                var data = res.data;
                render(data)
            }
        })
    }

    function render(data) {
        console.log(data);
        if (data.user_pic == null) {
            $('.layui-nav-img').hide();
            $('#namepic').show().html(data.username[0].toUpperCase())
        } else {
            $('#namepic').hide();
            $('.layui-nav-img').show().attr('src', data.user_pic)
        }

        var username = data.nickname || data.username;
        $('#welcomeword').html(`欢迎你&nbsp;&nbsp;${username}`)

    }


})