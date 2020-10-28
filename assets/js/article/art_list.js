$(function () {

    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;

    var q = {
        pagenum: 1,
        pagesize: 3,
        cate_id: '',
        state: ''
    }

    template.defaults.imports.formDate = function (date) {
        var date = new Date(date);
        var y = date.getFullYear();

        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? '0' + d : d;

        var hh = date.getHours();
        hh = hh < 10 ? '0' + hh : hh;
        var mm = date.getMinutes();
        mm = mm < 10 ? '0' + mm : mm;
        var ss = date.getSeconds();
        ss = ss < 10 ? '0' + ss : ss;

        return (`${y}-${m}-${d} ${hh}:${mm}:${ss}`)
    }

    selectlist();
    getlist();


    function getlist() {
        $.ajax({
            method: "get",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取数据失败！')
                }
                // console.log(res);
                var liststr = template('tem_list', res);
                $('tbody').html(liststr);
                page(res.total);
            }
        })
    }

    function selectlist() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取数据类型失败！')
                }
                var tem_select = template('tpl-cate', res);
                $('[name=cate_id]').html(tem_select);
                form.render();
            }
        })
    }



    $('#fillter_btn').on('click', function (e) {
        e.preventDefault();
        q.cate_id = $('[name=cate_id]').val();
        q.state = $('[name=state]').val();
        getlist();

    })


    function page(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limits: [2, 3, 5, 8, 10],
            limit: q.pagesize,

            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function (obj, first) {
                // console.log(q);
                // console.log(obj.limit);
                q.pagesize = obj.limit;
                q.pagenum = obj.curr;
                if (!first) {
                    getlist();
                }
            }
        });
    }

    $('tbody').on('click', '.removebtn', function () {
        var num = $('.removebtn').length;
        console.log(num);
        var id = $(this).attr('data-id');
        $.ajax({
            method: "get",
            url: "/my/article/delete/" + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('删除文章失败！')
                }
                layer.msg('删除文章成功');
                if (num == 1) {
                    q.pagenum = q.pagenum == 1 ? 1 : q.pagenum - 1
                }
                getlist();
            }
        })
    })



    $('body').on('click', '#edit_btn', function () {
        var art_id = $(this).attr('data-Id');
        console.log(art_id);
        localStorage.removeItem('art_id');
        localStorage.setItem('art_id', art_id)
    })


})