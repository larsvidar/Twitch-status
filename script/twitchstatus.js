console.log("Twitchstatus.js loaded!");

const twitchUsers = ["larsvidar", "freecodecamp", "anniefuchsia", "esl_sc2", "esl_csgo", "kig666", "emzia", "voyboy", "strippin", "robotcaleb"];
const defaultImage = "img/twitch-logo.png";
let content = "";

function makeURL(type, user) {
  // type = "users", "channels" or "streams"
  return "https://wind-bow.gomix.me/twitch-api/" + type + "/" + user + "?callback=?";
}


function getUser(type, user, value) {
  $.getJSON(makeURL(type, user), function(data) {
    console.log(data);
    var result={};
    value.forEach(function(item) {
      result[item] = data[item];
    });
    showUser(result);
  });
}

function showUser(values) {
  content += "<li class='user'>";
  content += "<h3 class='name'>" + values.display_name + "</h3>";
  content += "<p class='bio'>" + values.bio + "</p>"
  if (values.logo != null) {
    content += "<img class='logo mr-0' src='" + values.logo + "'>";
  } else {
    content += "<img class='logo mr-0' src='" + defaultImage + "'>";
  }
  content += "</li>"
  $("#user-list").html(content);
}


twitchUsers.forEach(function(userName) {
  getUser("users", userName, ["display_name", "bio", "logo"]);
});

getUser("channels", "esl_csgo", ["display_name"]);
