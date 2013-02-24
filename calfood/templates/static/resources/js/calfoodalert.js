$(document).ready(function() {
	$('.register').click(function() {
		var $tele = $('#register .tele').val();
		var $pwd = $('#register .pwd').val();
		var $pwd_conf = $('#register .pwd_conf').val();
		if ($pwd != $pwd_conf) {
			return 0;
		}
		else if ($tele.length < 10 || $pwd.length < 6 || $pwd_conf.length < 6) {
			return 0;
		}
		else {
			location.href="index#verify";	
		}
	});
	$('#video_cover').click(function(){
		$('#video_player').show();
		$('#video_cover').hide();
	});
});

function adjustSize() {
	var width = $(window).width() - .3 * $(window).width();
	var videoHeight = width/16*9;
	var footerWidth = $(window).width();
	$('#landing .video, body, header, #landing, #favorites, footer > div').width(width);
	$('#landing .video').height(videoHeight);	
	$('footer').width(footerWidth);
	$('#landing .left_column, #landing .right_column').width(width/2);
}

window.onresize = adjustSize;
window.onload = adjustSize;
