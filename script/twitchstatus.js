console.log("Twitchstatus.js loaded!");

const twitchUsers = ["larsvidar", "freecodecamp", "anniefuchsia", "esl_sc2", "esl_csgo", "kig666", "emzia", "voyboy", "strippin", "robotcaleb"];
const defaultImage = "img/twitch-logo.png";
let content = "";

function makeURL(type, user) {
  // type = "users", "channels" or "streams"
  return "https://wind-bow.gomix.me/twitch-api/" + type + "/" + user + "?callback=?";
}


function getUser(user, values) {
  $.getJSON(makeURL("users", user), function(data) {
    var result={};
    values.forEach(function(item) {
      result[item] = data[item];
    });
    getStream(user, ["stream"], result);
  });
}

// function getChannel(user, values, result) {
//   $.getJSON(makeURL("channels", user), function(data) {
//     values.forEach(function(item) {
//       result[item] = data[item];
//     });
//     getStream(user, ["stream"], result);
//   });
// }

function getStream(user, values, results) {
  $.getJSON(makeURL("streams", user), function(data) {
    values.forEach(function(item) {
      results[item] = data[item];
    });
    showUser(results);
  });
}



function showUser(results) {
  console.log(results);
  content += "<li class='user'>";
  content += "<h3 class='name'>" + results.display_name + "</h3>";
  content += "<p class='bio'>" + results.bio + "</p>"
  if (results.logo != null) {
    content += "<img class='logo mr-0' src='" + results.logo + "'>";
  } else {
    content += "<img class='logo mr-0' src='" + defaultImage + "'>";
  }
  if (results.stream != null) {
    content += "<div class='status tag green'></div>";
  } else {
    content += "<div class='status tag red'></div>";
  }
  content += "</li>"
  $("#user-list").html(content);
}

$("#user-list").html("<h2>Loading data from Twitch. Please wait!</h2>");

twitchUsers.forEach(function(userName) {
  getUser(userName, ["display_name", "bio", "logo"]);
});

$(".map").on("click", function() {
  if ($(this).hasClass("green")) {
    $(".status").closest(".user").css("display", "block");
    $(".red").closest(".user").css("display", "none");
  } else if ($(this).hasClass("red")) {
    $(".status").closest(".user").css("display", "block");
    $(".green").closest(".user").css("display", "none");
  } else {
    $(".status").closest(".user").css("display", "block");
  }
});

// $.ajax({
//  type: 'GET',
//  datatype: 'jsonp',
//  url: 'https://api.twitch.tv/kraken/channels/' + twitchUsers[0],
//  headers: {
//    'Client-ID': 'axjhfp777tflhy0yjb5sftsil',
//  },
//  success: function(data) {
//    console.log(data);
//  }
// });
