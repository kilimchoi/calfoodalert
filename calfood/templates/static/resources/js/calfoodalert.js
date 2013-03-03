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
		var $pwd = $('#register .pwd').val();
		var $pwd_conf = $('#register .pwd_conf').val();
		if ($pwd != $pwd_conf) {
			$('#register .error').replaceWith("<p class=\"error\">passwords do not match</p>");
			return false;
		} 
		else if ($pwd.length < 6) {
			$('#register .error').replaceWith("<p class=\"error\">length</p>");
			return false;
		}
		else {
			location.href = "index#verify";	
		}
	});
	$('.verify').click(function() {
		var $code = $('#verify .code').val();
		if ($code.length < 6) {
			$('#verify .error').replaceWith("<p class=\"error\">length</p>");
			return false;
		}
		else if ($code.type() != "number" && Math.floor($code) != $code) {
			$('#verify .error').replaceWith("<p class=\"error\">length</p>");
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