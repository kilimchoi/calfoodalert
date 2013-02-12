function get(el) {
	console.log("getting");
	return document.getElementById(el);
}

function addFavorite(fav) {
	var chooser = get(chosen_favorites);
	console.log("chooser");
	chooser.innerHTML = "<li>" + fav + "</li>";
	console.log(fav + "what happened");
	return false;
}
