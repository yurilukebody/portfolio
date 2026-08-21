/*
	トップページのシャッフルテキスト演出。

	trigger  … このクラスの要素が画面に入ったら発火する
	target   … 実際にシャッフルさせる要素
	duration … テキストが最終変化するまでの時間（ms）。規定値 600
*/
var typingGroups = [
	{ trigger: '.js_typing_title', target: '.js_typing_title',       duration: function ()  { return 1000; } },
	{ trigger: '.js_typing_P',     target: '.js_typing_Profile',     duration: function ()  { return 600; } },
	{ trigger: '.js_typing_PT',    target: '.js_typing_ProfileText', duration: function (i) { return i * 200; } },
	{ trigger: '.js_typing_B',     target: '.js_typing_Biography',   duration: function (i) { return i * 200; } },
	{ trigger: '.js_typing_w',     target: '.js_typing_works',       duration: function ()  { return 600; } },
	{ trigger: '.js_typing_f',     target: '.js_typing_form',        duration: function ()  { return 600; } }
];

$(function () {
	// ShuffleText の生成は inview の発火より先に済ませる。
	// 旧実装は window load 待ちだったため、先に inview が来ると未初期化の配列を触って落ちていた
	typingGroups.forEach(function (group) {
		group.shuffles = $(group.target).map(function () {
			return new ShuffleText(this);
		}).get();
	});

	typingGroups.forEach(function (group) {
		$(group.trigger).one('inview', function () {
			$(group.target).each(function (i) {
				group.shuffles[i].start();
				group.shuffles[i].duration = group.duration(i);
				$(this).addClass("endAnime");//１度アニメーションした場合は endAnime クラスを追加
			});
		});
	});
});
