function get(el) {
	return document.getElementById(el);
}

function addFavorite(fav) {
	var chooser = get(chosen_favorites);
	chooser.innerHTML = "<li>" + fav + "</li>";
}
