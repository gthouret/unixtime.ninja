var moment = require("moment");
var $ = require("jquery");
import './style.css';

let livePaused = false;
let timestamp = 0;

import pauseIcon from '../node_modules/open-iconic/svg/media-pause.svg';
import playIcon from '../node_modules/open-iconic/svg/media-play.svg';

liveUpdate();
window.setInterval(liveUpdate, 500);

$(document).ready(function() {
    $("#liveIcon").attr("src", pauseIcon);
    $("#liveIcon").attr("alt", "pause");

    $("#live").click(liveClick);

    $('#timestamp').bind('paste', function(e) {
        var data = e.originalEvent.clipboardData.getData('Text');
        timestamp = parseInt(data);
        setTimeout(function () {
            pauseLive();
            setTimestamp(timestamp);
        }, 10);
    });

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
    $("#timestamp").val(timestamp.toString());
    updateHumanReadable();
}

function liveUpdate() {
    if (!livePaused)
        setTimestamp(Math.floor(Date.now() / 1000));
}

function liveClick() {
    if (livePaused)
        resumeLive();
    else
        pauseLive();
}

function pauseLive() {
    livePaused = true;
    $("#liveIcon").attr("src", playIcon);
    $("#liveIcon").attr("alt", "Resume Clock");
}

function resumeLive() {
    livePaused = false;
    $("#liveIcon").attr("src", pauseIcon);
    $("#liveIcon").attr("alt", "Pause Clock");
}

function updateHumanReadable() {
    let tz = moment.unix(timestamp);
    let utc = moment.unix(timestamp).utc();
    $("#humanUtc").text(utc.format("dddd, MMMM Do YYYY, HH:mm:ss UTC"));
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