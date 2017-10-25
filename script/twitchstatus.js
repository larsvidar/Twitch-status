console.log("Twitchstatus.js loaded!");

const twitchUsers = ["freecodecamp", "larsvidar", "anniefuchsia", "esl_sc2", "esl_csgo", "kig666", "emzia", "voyboy", "strippin", "robotcaleb"];
const defaultImage = "img/twitch-logo.png";
const twitchApiKey = "rctgrgi8iefum0m5v3etvuqmtmasbd";
let html = [];

function makeURL(type, user) {
  // type = "users", "channels" or "streams"
  return "https://api.twitch.tv/kraken/" + type + "/" + user;
}

function ajaxCall(type, user) {
  return Promise.resolve($.ajax({
    type: 'GET',
    datatype: 'jsonp',
    url: makeURL(type, user),
    headers: {
      'Client-ID': twitchApiKey,
    }
    // success: function(data) {
    //   console.log(data);
    // }
  }));
}


function getUser(user, values) {
  let response = ajaxCall("users", user);
  response.then(function(data) {
    var result={};
    values.forEach(function(item) {
      result[item] = data[item];
    });
    getStream(user, ["stream"], result);
  }).catch(function(error) {
    throw error.responseText;
  });
}


function getStream(user, values, results) {
  let response = ajaxCall("streams", user);
  response.then(function(data) {
    values.forEach(function(item) {
      results[item] = data[item];
    });
    showUser(results);
  });
}


function showUser(results) {
  let content = `<li class="user">
    <a href="https://go.twitch.tv/${results.display_name}" target="_blank">
      <h3>${results.display_name}</h3>`

  if (results.stream != null) {
    content += `<div class="status tag green"><p class="stream-info">${results.stream.game}</p></div>`;
  } else {
    content += `<div class="status tag red"><p class="stream-info">No stream!</p></div>`;
  }

  if (results.logo != null) {
    content += `<img class="logo" src="${results.logo}">`;
  } else {
    content += `<img class="logo" src="${defaultImage}">`;
  }

  content += `</a>`;

  if (results.bio != null) {
    content += `<p class='bio hidden'>${results.bio}</p>`
  } else {
    content += `<p class='bio hidden'>This user has no bio.</p>`
  }

  content += `</li>`;

  html.push(content);

  $("#user-list").html(html);
}




$("#user-list").html("<h2>Loading data from Twitch. Please wait!</h2>");


let count = 0;
getUser(twitchUsers[count], ["display_name", "bio", "logo"]);
count++;
userListing = setInterval(function() {
  getUser(twitchUsers[count], ["display_name", "bio", "logo"]);
  count++;
  if (count === 10) {
    clearInterval(userListing);
  }
}, 500);



$(".map").on("click", function() {
  if ($(this).hasClass("green")) {
    $(".status").closest(".user").removeClass("hide");
    $(".red").closest(".user").addClass("hide");
  } else if ($(this).hasClass("red")) {
    $(".status").closest(".user").removeClass("hide");
    $(".green").closest(".user").addClass("hide");
  } else {
    $(".status").closest(".user").removeClass("hide");
  }
});
