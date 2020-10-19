$(function () {
    var layer = layui.layer;
    var $image = $('#image');
    var options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }
    $image.cropper(options)

    $('#btnChooseImage').on('click', function () {
        $('#file').click();
    })

    $('#file').on('change', function (e) {
        var picfile = e.target.files;
        if (picfile.length == 0) {
            return layer.msg('请选择照片！')
        }
        console.log(picfile);
        var imageurl = URL.createObjectURL(picfile[0]);
        $image.cropper('destroy').attr('src', imageurl).cropper(options);
    })



    $('#btnUpload').on('click', function () {
        var dataURL = $image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100,
        }).toDataURL('image/png');
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL,
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换图片失败！')
                }
                layer.msg('更换图片成功')
                window.parent.getuser();
            }
        })




    })
})