"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const https = require("https");
const readline = require("readline");
const url = require("url");
function request(options) {
    const parsedUrl = url.parse(options.url);
    const hostname = parsedUrl.hostname;
    if (typeof options.pretty === "undefined") {
        options.pretty = exports.config.pretty.enabled;
    }
    const requestOptions = {
        hostname: parsedUrl.hostname,
        path: parsedUrl.path,
        port: parsedUrl.port,
        headers: options.headers,
        timeout: options.timeout || 10000,
        method: options.method || "GET",
    };
    return new Promise((resolve, reject) => {
        let completed = false;
        let waitingInterval;
        let waitingTimeout;
        let hasPrintedWaitingMessage = false;
        const clearLine = () => {
            readline.clearLine(process.stdout, 0);
        };
        const resetCursor = () => {
            readline.cursorTo(process.stdout, 0);
        };
        const req = https.request(requestOptions, (res) => {
            const statusCode = res.statusCode || 200;
            let data = "";
            res.on("data", (d) => {
                data += d;
            });
            res.on("end", () => {
                completed = true;
                if (waitingInterval) {
                    clearInterval(waitingInterval);
                }
                if (waitingTimeout) {
                    clearTimeout(waitingTimeout);
                }
                if (hasPrintedWaitingMessage) {
                    clearLine();
                    resetCursor();
                }
                resolve({
                    statusCode,
                    data,
                });
            });
        });
        req.on("error", (err) => {
            reject(err);
        });
        if (options.pretty) {
            let progress = 0;
            const chars = exports.config.pretty.characters;
            waitingTimeout = setTimeout(() => {
                if (completed) {
                    return;
                }
                waitingInterval = setInterval(() => {
                    if (completed) {
                        return;
                    }
                    hasPrintedWaitingMessage = true;
                    clearLine();
                    resetCursor();
                    process.stdout.write(chalk_1.default.gray(`Waiting for ${hostname}... ${chars[progress]}`));
                    progress++;
                    if (progress >= chars.length) {
                        progress = 0;
                    }
                }, exports.config.pretty.characterDelay);
            }, exports.config.pretty.initialDelay);
        }
        req.end();
    });
}
exports.request = request;
exports.config = {
    pretty: {
        enabled: false,
        characters: ["/", "|", "\\", "-"],
        initialDelay: 1000,
        characterDelay: 250,
    },
};
