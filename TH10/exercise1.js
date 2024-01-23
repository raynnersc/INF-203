"use strict";

function loadDoc() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "text.txt");
    xhr.onload = function() { 
        document.getElementById("tarea").value = this.responseText;
    } 
    xhr.send();
}

function loadDoc2() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "text.txt");
    xhr.onload = function() {
        var lines = this.responseText.split("\n");
        var tarea2 = document.getElementById("tarea2");
        for (var i = 0; i < lines.length; i++) {
            var p = document.createElement('p');
            p.textContent = lines[i];
            p.style.color = "#" + Math.floor(Math.random()*16777215).toString(16);
            tarea2.appendChild(p);
        }
    } 
    xhr.send();
}