"use strict";

var content = [];
var timeoutID;
let index = 0;
let paused = false;
let loaded = false;
let forceReproduce = false;
let firstTime = true;
let remainingTime = 0;
let startTime = 0;
let previousTime = 0;

function loadSlides() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "slides.json");
    xhr.onload = function () {
        content = JSON.parse(this.responseText);
        loaded = true;
    }
    xhr.send();
}

loadSlides();

function showSlides() {
    if ((!paused || forceReproduce) && loaded) {
        firstTime = false;

        console.log("showing slide " + index);

        var topDiv = document.getElementById("TOP");
        var iframe = document.createElement("iframe");

        var time;
        if(remainingTime > 0){
            time = remainingTime;
            index--;
        }
        else {
            while (topDiv.firstChild)
                topDiv.removeChild(topDiv.firstChild);

            if (index == content.slides.length - 1) {
                time = content.slides[index].time - content.slides[index - 1].time;
            }
            else {
                time = content.slides[index + 1].time - content.slides[index].time;
            }
            time = time * 1000;
            
            iframe.src = content.slides[index].url;
            iframe.width = "100%";
            iframe.height = "600px";

            topDiv.appendChild(iframe);
        }
        
        if(!forceReproduce){
            if (index < content.slides.length - 1)
                index++;
            else
                index = 0
            
            startTime = Date.now();
            timeoutID = setTimeout(showSlides, time);
        }

        forceReproduce = false;

        previousTime = time;
        remainingTime = 0;
    }
}

function pauseSlides() {
    paused = !paused;
    
    if(paused) {
        console.log("paused");
        document.getElementById("pauseButton").textContent = "continue";
        clearTimeout(timeoutID);
        remainingTime = previousTime - (Date.now() - startTime);
    }
    else{
        document.getElementById("pauseButton").textContent = "pause";
        forceReproduce = false;
        showSlides();
    }
}

function nextSlide() {
    clearTimeout(timeoutID);
    remainingTime = 0;

    if (firstTime || index == content.slides.length - 1)
        index = 0;
    else
        index++;
    
    firstTime = false;
    forceReproduce = true;
    paused = true;

    console.log("next slide");
    document.getElementById("pauseButton").textContent = "continue";
    
    showSlides();
}

function previousSlide() {
    clearTimeout(timeoutID);
    remainingTime = 0;

    if (firstTime || index == 0){

        console.log("index = " + index);
        index = content.slides.length - 1;
    }
    else
        index--;

    forceReproduce = true;
    paused = true;

    console.log("previous slide");
    document.getElementById("pauseButton").textContent = "continue";

    showSlides();

    firstTime = false;
}