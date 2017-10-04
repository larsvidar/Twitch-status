console.log("Twitchstatus.js loaded!");

var apiUserURL = "https://wind-bow.gomix.me/twitch-api/users/larsvidar?callback=?"
var apiChannelURL = "https://wind-bow.gomix.me/twitch-api/channels/anniefuchsia?callback=?"
var apiStreamURL = "https://wind-bow.gomix.me/twitch-api/streams/anniefuchsia?callback=?"


function getUser() {
  $.getJSON(apiStreamURL, function(data) {
    console.log(data);
  });

}

getUser();
