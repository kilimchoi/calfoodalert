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
		var area = $('#register .area').val();
		var first = $('#register .first').val();
		var last = $('#register .last').val();
		var tele = area + first + last;
		var pwd = $('#register .pwd').val();
		var pwd_conf = $('#register .pwd_conf').val();
		if (tele.length != 10) {
			$('#register .error').replaceWith("<p class=\"error\">please enter only 10 digits for your phone</p>");
			return false;
		}
		else if (typeof parseInt(tele) != "number") {
			$('#register .error').replaceWith("<p class=\"error\">please enter only numbers for your phone</p>");
			return false;
		}
		else if (pwd != pwd_conf) {
			$('#register .error').replaceWith("<p class=\"error\">passwords do not match</p>");
			return false;
		} 
		else if (pwd.length < 6) {
			$('#register .error').replaceWith("<p class=\"error\">please choose a longer password</p>");
			return false;
		}
		else {
			location.href = "index#verify";	
		}
	});
	$('.verify').click(function() {
		var code = $('#verify .code').val();
		if (code.length != 6) {
			$('#verify .error').replaceWith("<p class=\"error\">please enter only the 6 digits you were sent</p>");
			return false;
		}
		else if (typeof code != "number") {
			$('#verify .error').replaceWith("<p class=\"error\">please only enter numbers for the code</p>");
			return false;
		}
		else {
			location.href = "favorites";
		}
	});
	$('#register .phone.area').keyup(function(){
		if($(this).val().length>=$(this)[0].maxLength){
			$('#register .phone.first').focus();
		}
	});
	$('#login .phone.area').keyup(function(){
		if($(this).val().length>=$(this)[0].maxLength){
			$('#login .phone.first').focus();
		}
	});
	$('#register .phone.first').keyup(function(){
		if($(this).val().length>=$(this)[0].maxLength){
			$('#register .phone.last').focus();
		}
	});
	$('#login .phone.first').keyup(function(){
		if($(this).val().length>=$(this)[0].maxLength){
			$('#login .phone.last').focus();
		}
	});	
	$('#register .phone.last').keyup(function(){
		if($(this).val().length>=$(this)[0].maxLength){
			$('#register .pwd').focus();
		}
	});
	$('#login .phone.last').keyup(function(){
		if($(this).val().length>=$(this)[0].maxLength){
			$('#login .pwd').focus();
		}
	});
});

function adjustSize() {
	var width = $(window).width() - .3 * $(window).width();
	var videoHeight = width/2.39;
	var footerWidth = $(window).width();
	$('#landing .video, body, header, #landing, #favorites, footer > div, #favorites #fav_search').width(width);
	$('#landing .video').height(videoHeight);	
	$('footer').width(footerWidth);
	$('#landing .left_column, #landing .right_column').width(width/2 - 10);
}

window.onresize = adjustSize;
window.onload = adjustSize;