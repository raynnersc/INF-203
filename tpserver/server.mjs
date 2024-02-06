"use strict";

import { createServer } from "http";
import fs from "fs";
import mime from "mime";
import querystring from "querystring";

let users = [];

// process requests
function webserver(request, response) {
    const filepath = request.url.substring(1);

    try {
        if (request.url === '/stop') {
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.end("<!doctype html><html><body>The server will stop now.</body></html>");
            process.exit(0);
        }

        else if (request.url === '/clear') {
            users = [];
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.end("<!doctype html><html><body>The list of users has been cleared.</body></html>");
            return;
        }

        else if (request.method === "GET" && request.url.startsWith("/hi")) {
            const name = querystring.unescape(querystring.parse(request.url.split("?").pop()).visiteur);
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.end(`<!doctype html><html><body>hi ${name}</body></html>`);
            return;
        }

        else if (request.method === "GET" && request.url.startsWith("/ciao")) {
            let name = querystring.unescape(querystring.parse(request.url.split("?").pop()).user);
            name = name.replace(/[<>]/g, "_");
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.end(`<!doctype html><html><body>ciao ${name}, the following users have already visited this page:${users}</body></html>`);
            users.push(name);
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

// start the server
server.listen((process.argv[2] || 8000), (err) => { });