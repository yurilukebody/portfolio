
$(function () {
	$('.RXimage').one('inview', function (event, isInView, visiblePartX, visiblePartY) {
		$(this).addClass("is-inview");//１度アニメーションした場合はendAnimeクラスを追加
});

	$('.LXimage').one('inview', function (event, isInView, visiblePartX, visiblePartY) {
		$(this).addClass("is-inview");//１度アニメーションした場合はendAnimeクラスを追加
	});

	$('.PYimage').one('inview', function (event, isInView, visiblePartX, visiblePartY) {
		$(this).addClass("is-inviewTitle");//１度アニメーションした場合はendAnimeクラスを追加
	});

	$('.PYimageText').one('inview', function (event, isInView, visiblePartX, visiblePartY) {
		$(this).addClass("is-inviewTitle");//１度アニメーションした場合はendAnimeクラスを追加
	});
});
