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
		var $tele = $('#register .tele').val();
		var $pwd = $('#register .pwd').val();
		var $pwd_conf = $('#register .pwd_conf').val();
		if ($tele.length < 10) {
			$('#register .error').replaceWith("<p class=\"error\">please enter a 10 digit phone number with only numbers</p>");
		}
		else if ($pwd != $pwd_conf) {
			$('#register .error').replaceWith("<p class=\"error\">passwords do not match</p>");
		} 
		else if ($pwd.length < 6) {
			$('#register .error').replaceWith("<p class=\"error\">length</p>");
		}
		else {
			location.href = "index#verify";	
		}
	});
});

function adjustSize() {
	var width = $(window).width() - .3 * $(window).width();
	var videoHeight = width/16*9;
	var footerWidth = $(window).width();
	$('#landing .video, body, header, #landing, #favorites, footer > div').width(width);
	$('#landing .video').height(videoHeight);	
	$('footer').width(footerWidth);
	$('#landing .left_column, #landing .right_column').width(width/2 - 10);
}

window.onresize = adjustSize;
window.onload = adjustSize;