"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const tasks_1 = require("./routes/tasks");
var urlRequests = {};
var reqCounter;
class App {
    constructor() {
        this.taskRoutes = new tasks_1.Tasks();
        this.Logger = (req, res, next) => {
            reqCounter++;
            if (!(req.originalUrl in urlRequests)) {
                urlRequests[req.originalUrl] = 1;
            }
            else {
                urlRequests[req.originalUrl] += 1;
            }
            console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            Request #${reqCounter}:
            HTTP VERB: ${req.method}
            URL: ${req.originalUrl}
            REQUEST BODY:`);
            console.log(req.body);
            next();
        };
        this.Visited = (req, res, next) => {
            console.log(`\tThis URL has been requested ${urlRequests[req.originalUrl]} times
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            `);
            next();
        };
        this.app = express();
        this.config();
        this.taskRoutes.routes(this.app);
    }
    // Set Up Middlewares
    config() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(this.Logger);
        this.app.use(this.Visited);
    }
}
;
exports.default = new App().app;
