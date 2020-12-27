function on_game_click(event) {
  toggle_info(event.target)
}

function on_status_click(event) {
  toggle_info(event.target.parentElement)
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

  var info = game.nextElementSibling;
  info.style.maxHeight = info.scrollHeight + "px";
}

function deactivate_game(game) {
  game.classList.remove("active");

  var info = game.nextElementSibling;
  info.style.maxHeight = null;
}

var i;

// get all games
var acc = document.getElementsByClassName("name");
var games = new Array(acc.length);
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", on_game_click);
  acc[i].children[0].addEventListener("click", on_status_click);

  // names
  var name = acc[i].innerText.trim();
  var altname = acc[i].nextElementSibling.children[0].firstElementChild;
  if (altname != null && altname.className == "altname") {
    name += ", " + altname.innerText;
  }
  games[i] = name;
}

// search field
function filter_games() {
  var shown = new Array();
  for (i = 0; i < games.length; i++) {
    var cont = acc[i].parentElement;
    if (games[i].toLowerCase().includes(srch.value.toLowerCase())) {
      cont.hidden = false;
      activate_game(acc[i]);
      shown.push(i);
    } else {
      cont.hidden = true;
      deactivate_game(acc[i]);
    }
  }

  // limit info
  if (shown.length > 5) {
    for (i = 0; i < shown.length; i++) {
      deactivate_game(acc[shown[i]]);
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
