$(function () {
    tinymce.init({
        selector: '#mytinymce',
        //skin:'oxide-dark',
        language: 'zh_CN',

        toolbar: 'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
        styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
        table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs',
        height: 250, //编辑器高度
        min_height: 202,
        /*content_css: [ //可设置编辑区内容展示的css，谨慎使用
            '/static/reset.css',
            '/static/ax.css',
            '/static/css.css',
        ],*/
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
        font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
        link_list: [
            { title: '预置链接1', value: 'http://www.tinymce.com' },
            { title: '预置链接2', value: 'http://tinymce.ax-z.cn' }
        ],
        image_list: [
            { title: '预置图片1', value: 'https://www.tiny.cloud/images/glyph-tinymce@2x.png' },
            { title: '预置图片2', value: 'https://www.baidu.com/img/bd_logo1.png' }
        ],
        image_class_list: [
            { title: 'None', value: '' },
            { title: 'Some class', value: 'class-name' }
        ],
        importcss_append: true,
        file_picker_callback: function (callback, value, meta) {
            if (meta.filetype === 'file') {
                callback('https://www.baidu.com/img/bd_logo1.png', { text: 'My text' });
            }
            if (meta.filetype === 'image') {
                callback('https://www.baidu.com/img/bd_logo1.png', { alt: 'My alt text' });
            }
            if (meta.filetype === 'media') {
                callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.baidu.com/img/bd_logo1.png' });
            }
        },
        autosave_ask_before_unload: false,
    });

    var op
    $('.bigpic > img').cropper({
        aspectRatio: 14 / 10,
        preview: '.avatar-preview',
    });


    var layer = layui.layer;
    var form = layui.form;

    getlist();
    function getlist() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类失败')
                }

                var casestr = template('tem_case', res);
                $('#caselist').html(casestr);
                form.render();

            }
        })
    }

    $('#file_btn').on('click', function () {
        $('#filechoose').click();
    })

    $('#filechoose').on('change', function (e) {
        if (e.target['files'].length == 0) {
            return layer.msg('请选择图片')
        }
        console.dir(e.target['files'][0]);
        var imgurl = URL.createObjectURL(e.target['files'][0]);
        $('.bigpic > img').cropper('destroy').attr('src', imgurl).cropper(
            {
                aspectRatio: 14 / 10,
                preview: '.avatar-preview',
            }
        )
    })
    var state = '已发布';
    $('#byn_b').on('click', function () {
        state = '草稿';
    })


    $('#art_form').on('submit', function (e) {
        e.preventDefault();
        var formdata = new FormData($(this)[0])
        formdata.append('state', state)
        $('.bigpic > img').cropper('getCroppedCanvas', {
            width: 400,
            height: 280
        }).toBlob(function (blob) {
            formdata.append('cover_img', blob)

            $.ajax({
                method: "post",
                url: "/my/article/add",
                data: formdata,
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    location.href = "/article/art_list.html"
                    console.dir(window.parent);
                    window.parent.clickli();
                }
            })

        })

    })








})