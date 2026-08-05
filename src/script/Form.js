// 入力があるフィールドに not-empty を付与し、ラベルを浮かせる
$(document).ready(function () {
    $('.js-input').keyup(function () {
        if ($(this).val()) {
            $(this).addClass('not-empty');
        } else {
            $(this).removeClass('not-empty');
        }
    })
});
