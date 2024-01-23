"use strict";

var content = [];
let index = 0;

function loadSlides() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "slides.json");
    xhr.onload = function () {
        content = JSON.parse(this.responseText);
    }
    xhr.send();
}

loadSlides();

function showSlides() {
    var topDiv = document.getElementById("TOP");
    var iframe = document.createElement("iframe");

    while (topDiv.firstChild)
        topDiv.removeChild(topDiv.firstChild);

    iframe.src = content.slides[index].url;

    var time;
    if (index == content.slides.length - 1) {
        time = content.slides[index].time - content.slides[index - 1].time;
        index = 0;
    }
    else {
        time = content.slides[index + 1].time - content.slides[index].time;
        index++;
    }

    time = time * 1000;

    iframe.width = "100%";
    iframe.height = "600px";

    topDiv.appendChild(iframe);
    setTimeout(showSlides, time);
}