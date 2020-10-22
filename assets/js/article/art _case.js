$(function () {
    var layer = layui.layer;
    var form = layui.form;
    getaticlelist();
    var opennum = null;
    $('#btnAddCate').on('click', function () {
        opennum = layer.open({
            type: 1,
            title: "标题",
            area: ['500px', '250px'],
            content: $('#tem_add').html(),
        })

    })

    $('body').on('submit', '#form_add', function (e) {
        e.preventDefault();
        $.ajax({
            method: "post",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('添加失败！')
                }
                layer.msg('添加成功');
                getaticlelist();
                layer.close(opennum);
            }
        })
    })

    var opennumb = null;
    $('tbody').on('click', '#edit_btn', function () {
        var id = $(this).attr('data-id');
        opennumb = layer.open({
            type: 1,
            title: "修改页面",
            area: ['500px', '250px'],
            content: $('#tem_edit').html(),
        })
        $.ajax({
            method: "get",
            url: "/my/article/cates/" + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('提取数据失败')
                }
                form.val('form_edit', res.data)

            }
        })

        $('#form_edit').on('submit', function (e) {
            e.preventDefault();
            $.ajax({
                method: "post",
                url: "/my/article/updatecate",
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('更新失败')
                    }
                    layer.msg('编辑信息成功！')
                    getaticlelist();
                    layer.close(opennumb)
                }
            })
        })
    })


    $('body').on('click', '#remove_btn', function () {
        var id = $(this).attr('data-id');
        $.ajax({
            method: "GET",
            url: "/my/article/deletecate/" + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('删除数据失败！')
                }
                layer.msg('删除数据成功')
                getaticlelist();
            }
        })
    })

})

function getaticlelist() {
    $.ajax({
        method: "get",
        url: "/my/article/cates",
        success: function (res) {
            var artstr = template('tem_table', res);
            $('tbody').html(artstr)
        }
    })
}