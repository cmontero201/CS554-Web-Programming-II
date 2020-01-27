// CREATE SERVER
const express = require("express");     // Utilize Express Module
const app = express();                  // Generate Express Application
const bodyParser = require("body-parser"); // JSON Parsing
const configRoutes = require("./routes");  // Establish Routes

// PACKAGE USED TO PARSE JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));

/******************
LOGGING MIDDLEWARES
******************/
// Log All Request Bodies, As Well As The Url Path They Are Requesting, And The HTTP Verb They Are Using To Make The Request
let urlRequests = {};
let reqCounter = 0;
app.use( function(req, res, next) {
    reqCounter++;
    if(!(req.originalUrl in urlRequests)) {
        urlRequests[req.originalUrl] = 1;
    } else {
        urlRequests[req.originalUrl] += 1;
    }
    console.log(
        `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Request #${reqCounter}:
        HTTP VERB: ${req.method}
        URL: ${req.originalUrl}
        REQUEST BODY:`
    );
    console.log(req.body);
    next();
});

// Keep Track Of Many Times A Particular URL Has Been Requested, Updating And Logging With Each Request
app.use( function(req, res, next) {
    console.log(
        `\tThis URL has been requested ${urlRequests[req.originalUrl]} times
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        `
    );
    next();
});

configRoutes(app); 

// RUN SERVER
app.listen(3000, () => {        // Listen For Requests on Port 3000
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");

})