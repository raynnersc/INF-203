"use strict";

function send() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'chat.php?phrase=' + document.getElementById("textedit").value, true);
    xhr.onload = function() { }
    xhr.send();
}

function loop() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "chatlog.txt");
    xhr.onload = function() {
        var tarea = document.getElementById("tarea");
        
        while(tarea.firstChild) {
            tarea.removeChild(tarea.firstChild);
        }
        
        var lines = this.responseText.split("\n");
        // lines.reverse();
        // lines.splice(10);

        for (var i = lines.length - 1; i >= lines.length - 11 ; i--) {
            if (lines[i] == "" || lines[i] == null)
                continue;
            var p = document.createElement('p');
            p.textContent = lines[i];
            tarea.appendChild(p);
        }
    } 
    setTimeout(loop, 1000);
    xhr.send();
}

loop();