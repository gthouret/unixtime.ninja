var moment = require("moment");
var $ = require("jquery");

let livePaused = false;
let timestamp = 0;

moment.locale('en');
liveUpdate();
window.setInterval(liveUpdate, 500);

$(document).ready(function() {
    $("#live").click(liveClick);
    $("#roundMin").click(function () {
        roundTs(60);
    });
    $("#roundHour").click(function () {
        roundTs(3600);
    });
    $("#roundDay").click(function () {
        roundTs(86400);
    });
    $("#plusMin").click(function () {
        incrementTs(60);
    });
    $("#plusHour").click(function () {
        incrementTs(3600);
    });
    $("#plusDay").click(function () {
        incrementTs(86400);
    });
    $("#minusMin").click(function () {
        decrementTs(60);
    });
    $("#minusHour").click(function () {
        decrementTs(3600);
    });
    $("#minusDay").click(function () {
        decrementTs(86400);
    });
});

function setTimestamp(value) {
    timestamp = parseInt(value);
    $("#timestamp").text(timestamp.toString());

    let d = moment.unix(timestamp);
    $("#human").text(d.format("dddd, MMMM Do YYYY, HH:mm:ss"));
}

function liveUpdate() {
    if (!livePaused)
        setTimestamp(Math.floor(Date.now() / 1000));
}

function liveClick() {
    console.log("liveclick: " + livePaused);
    livePaused = !livePaused;
    if (livePaused)
        $("#live").text("Static");
    else
        $("#live").text("Live");
}

function roundTs(value) {
    setTimestamp(timestamp - (timestamp % value));
}

function incrementTs(value) {
    setTimestamp(timestamp + value);
}

function decrementTs(value) {
    setTimestamp(timestamp - value);
}