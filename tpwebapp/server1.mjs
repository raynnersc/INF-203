"use strict";

import fs from "fs";
import { createServer } from "http";
import mime from "mime";
import querystring, { unescape } from "querystring";

const port = process.argv[2] || 8000;
const colorMap = JSON.parse(fs.readFileSync('files/colors.json', 'utf8'));

// allow CORS for local development
// function allowCors(request, response) {
//     response.setHeader('Access-Control-Allow-Origin', '*');
//     response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
// }

// process requests
function webserver(request, response) {
    const filepath = request.url.substring(1);
    const file = "files/storage.json";
    const parameters = new URL(request.url, `http://localhost:${port}`).searchParams;

    try {
        if (request.url === '/kill') {
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.end("<!doctype html><html><body>The server will stop now.</body></html>");
            process.exit(0);
        }

        else if (request.url === '/Slices') {
            if (!fs.existsSync(file)) {
                response.statusCode = 404;
                response.end("the file " + file + " does not exist on the server");
                return;
            }
            response.setHeader("Content-Type", mime.getType(file));
            response.end(JSON.stringify(JSON.parse(fs.readFileSync(file))));
            return;
        }

        else if (request.url === '/clear') {
            fs.writeFileSync(file, `[{"title": "empty", "color": "red", "value": 1}]`);
            response.setHeader("Content-Type", mime.getType(file));
            response.end(JSON.stringify(JSON.parse(fs.readFileSync(file))));
            return;
        }

        else if (request.url === '/restore') {
            fs.writeFileSync(file, `[{"title": "foo", "color": "red", "value": 20}, {"title": "bar", "color": "blue", "value": 10}, {"title": "baz", "color": "green", "value": 70}]`);
            response.setHeader("Content-Type", mime.getType(file));
            response.end(JSON.stringify(JSON.parse(fs.readFileSync(file))));
            return;
        }

        else if (request.url === '/PChart') {
            const data = JSON.parse(fs.readFileSync(file));
            let svgContent = `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">`;
            let startAngle = 0;

            data.forEach(item => {
                const rgb = colorMap[item.color.toLowerCase()];
                const inverseRgb = rgb.map(value => 255 - value);
                const inverseColorName = Object.keys(colorMap).find(key => colorMap[key].toString() === inverseRgb.toString());
                const endAngle = startAngle + (item.value / 100) * 2 * Math.PI;
                const startX = 200 + 200 * Math.cos(startAngle);
                const startY = 200 + 200 * Math.sin(startAngle);
                const endX = 200 + 200 * Math.cos(endAngle);
                const endY = 200 + 200 * Math.sin(endAngle);
                const largeArcFlag = item.value > 50 ? 1 : 0;
                const textX = 200 + 100 * Math.cos((startAngle + endAngle) / 2);
                const textY = 200 + 100 * Math.sin((startAngle + endAngle) / 2);
                startAngle = endAngle;

                svgContent += `<path d="M200,200 L${startX},${startY} A200,200 0 ${largeArcFlag},1 ${endX},${endY} Z" fill="${item.color}"/>`;
                svgContent += `<text x="${textX}" y="${textY}" fill="${inverseColorName}" text-anchor="middle" alignment-baseline="middle">${item.title} ${item.value}%</text>`;
            });
            svgContent += `</svg>`;
            response.setHeader('Content-Type', 'image/svg+xml');
            response.end(svgContent);
        }

        else if (request.method === "GET" && request.url.startsWith("/remove")) {
            const index = unescape(parameters.get("index"));
            const data = JSON.parse(fs.readFileSync(file), "utf8");
            data.splice(index, 1);
            fs.writeFileSync(file, JSON.stringify(data));
            // response.setHeader("Content-Type", mime.getType(file));
            response.end(JSON.stringify(JSON.parse(fs.readFileSync(file))));
            return;
        }

        else if (request.method === "GET" && request.url.startsWith("/add")) {
            const title = unescape(parameters.get("title"));
            const color = unescape(parameters.get("color"));
            const value = unescape(parameters.get("value"));
            const data = JSON.parse(fs.readFileSync(file));
            data.push({ title: title, color: color, value: value });
            fs.writeFileSync(file, JSON.stringify(data));
            // response.setHeader("Content-Type", mime.getType(file));
            response.end(JSON.stringify(JSON.parse(fs.readFileSync(file))));
            return;
        }

        else if (request.url.startsWith("/files")) {
            if (request.url.includes("..")) {
                response.statusCode = 403;
                response.setHeader("Content-Type", "text/html; charset=utf-8");
                response.end("<!doctype html><html><body>Access forbidden!</body></html>");
                return;
            }

            else if (fs.existsSync(filepath) && fs.statSync(filepath).isFile()) {
                response.setHeader("Content-Type", mime.getType(filepath));
                response.setHeader("Content-Length", fs.statSync(filepath).size);
                response.end(fs.readFileSync(filepath));
                return;
            }
            else {
                response.statusCode = 404;
                response.end("the file " + filepath + " does not exist on the server");
                return;
            }
        }

        else {
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.end("<!doctype html><html><body>Server works.</body></html>");
            return;
        }
    }
    catch (err) {
        response.statusCode = 500;
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        response.end("<!doctype html><html><body>Internal server error!</body></html>");
        console.error(err);
    }
}

// server object creation
const server = createServer(webserver);

// server object creation with CORS for local development
// const server = createServer((request, response) => {
//     allowCors(request, response);
//     webserver(request, response);
// });

// start the server
server.listen((process.argv[2] || 8000), (err) => { });