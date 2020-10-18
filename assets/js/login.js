$(function () {

    $('#reg_btn').on('click', function () {
        $(this).parents('.log').hide();
        $('.reg').show()
    })
    $('#log_btn').on('click', function () {
        $(this).parents('.reg').hide();
        $('.log').show()
    })



})