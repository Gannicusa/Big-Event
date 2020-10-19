$(function () {

    var layer = layui.layer;
    var form = layui.form;
    getuserinfo();

    function getuserinfo() {
        $.ajax({
            method: "get",
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('formUserInfo', res.data)

            }
        })
    }

    $('#infoform').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: "post",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('更新用户信息成功')
                window.parent.getuser();
            }
        })
    })


})