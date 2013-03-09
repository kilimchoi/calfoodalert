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
	$('.verify').click(function() {
		var code = $('#verify .code').val();
		if (code.length != 6) {
			humane.log("please enter only the 6 digits you were sent");
			return false;
		}
		else if (typeof code != "number") {
			humane.log("no special characters");
			return false;
		}
		else {
			location.href = "favorites";
		}
	});
	$('#verify .code').keyup(function(){
		if($(this).val().length>=$(this)[0].maxLength){
			$('#verify .verify').focus();
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
	$('#fav_search').keypress(function(e) {
		if(e.which == 13) {
			addFav();
			return false;
		}
	});
	$('#fav_add').click(function() {
		addFav();
		return false;
	});

});
	function searchOpen() {
    	var search = $('#fav_search').val()
    	var keyword = {
        	search: search
    	};
    	$.ajax({
        	url: 'api/fav_search',
        	data: keyword,
        	dataType: 'jsonp',
        	jsonp: 'callback',
        	jsonpCallback: 'searchResult'
    	});
	}
$(document).on("dblclick", "li.24hrs", function(){ 
	var el = $(this);
	var inside = el.html();
	el.remove();
	$.post('api/remove_favorite', inside);
	humane.log("unloved", {timeout:400});
});
function searchResult(data) {
   	$( "#fav_search" ).autocomplete ({
       	source: data
   	});
}

function addFav() {
	var fav = $('#fav_search').val();
	$('#chosen_favorites').prepend("<li class=\"24hrs\">" + fav + "</li>");
	$('#fav_search').val('');
	humane.log("added", {timeout:500});
	$.post('api/add_favorite', fav);
}

function adjustSize() {
	var width = $(window).width() - .3 * $(window).width();
	var videoHeight = width/2.39;
	var footerWidth = $(window).width();
	$('#landing .video, body, header, #landing, #favorites, footer > div').width(width);
	$('#landing .video').height(videoHeight);	
	$('footer').width(footerWidth);
	$('#landing .left_column, #landing .right_column').width(width/2 - 10);
	$('#favorites #fav_search').width(width/7 * 6 - 10);
	$('#favorites #fav_add').width(width/7 - 30);
}


window.onresize = adjustSize;
window.onload = adjustSize;
