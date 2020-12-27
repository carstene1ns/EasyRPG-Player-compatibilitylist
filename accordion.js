function on_name_click(event) {
  toggle_info(event.target.parentElement);
}

function on_status_click(event) {
  toggle_info(event.target.parentElement.parentElement);
}

function toggle_info(game) {
  if (game.classList.contains("active")) {
    deactivate_game(game);
  } else {
    activate_game(game);
  }
}

function activate_game(game) {
  game.classList.add("active");

  var info = game.children[0].nextElementSibling;
  info.style.maxHeight = info.scrollHeight + "px";
}

function deactivate_game(game) {
  game.classList.remove("active");

  var info = game.children[0].nextElementSibling;
  info.style.maxHeight = null;
}

var i;

// get all games
var gn = document.getElementsByClassName("name");
var games = new Array(gn.length);
for (i = 0; i < gn.length; i++) {
  gn[i].addEventListener("click", on_name_click);
  gn[i].children[0].addEventListener("click", on_status_click);

  // names
  var name = gn[i].innerText.trim();
  var altname = gn[i].nextElementSibling.children[0].firstElementChild;
  if (altname != null && altname.className == "altname") {
    name += ", " + altname.innerText;
  }
  games[i] = name;
}

// search field
function filter_games() {
  var shown = new Array();
  for (i = 0; i < games.length; i++) {
    var cont = gn[i].parentElement;
    if (games[i].toLowerCase().includes(srch.value.toLowerCase())) {
      cont.hidden = false;
      shown.push(i);
    } else {
      cont.hidden = true;
    }
    deactivate_game(cont);
  }

  // limit info display
  if (shown.length <= 5) {
    for (i = 0; i < shown.length; i++) {
      activate_game(gn[shown[i]].parentElement);
    }
  }
}

var srch = document.getElementById("search").children[0];
srch.addEventListener("input", filter_games);

// permalink
srch.parentElement.addEventListener("submit", function(event) {
  event.preventDefault();
  window.location.hash = encodeURIComponent(srch.value);
});
if (window.location.hash) {
  var hash = window.location.hash.replace(/^#/, '');
  srch.value = decodeURIComponent(hash);
  filter_games();
}
