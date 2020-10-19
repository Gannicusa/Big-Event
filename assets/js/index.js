$(function () {
    var layer = layui.layer;
    getuser();

    $('#outbtn').on('click', function () {
        layer.confirm('确定要退出么', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token');
            location.href = "/login.html";
            layer.close(index);
        });
    })





})
function getuser() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            var data = res.data;
            render(data)
        },
        complete: function (res) {
            // console.log('执行了 complete 回调：')
            // console.log(res)
            console.log(res);
            // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1. 强制清空 token
                localStorage.removeItem('token')
                // 2. 强制跳转到登录页面
                location.href = '/login.html'
            }
        }

    })
}

function render(data) {
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