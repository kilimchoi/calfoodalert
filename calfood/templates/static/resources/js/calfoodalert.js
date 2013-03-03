$(document).ready(function() {
	$('.auth-info').click(function() {
		document.title = "CubGrub - login";
	});
	$('.reg-button').click(function() {
		document.title = "CubGrub - register";
	});
	$('.cancel').click(function() {
		document.title = "CubGrub";
	});	
	$('#video_cover').click(function(){
		$('#video_player').show();
		$('#video_cover').hide();
	});
	$('.register').click(function() {
		location.href = "index#verify";
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