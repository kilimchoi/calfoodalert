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
});