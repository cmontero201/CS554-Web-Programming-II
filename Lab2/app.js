const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const Handlebars = require('handlebars');
const configRoutes = require("./routes");
const static = express.static(__dirname + "/public");   // Middleware to pull static assets

app.use("/", static);   // When navigate to "/" use static middleware correspodning files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));

// app.use( function(req, res, next) {
//     console.log(
//         `HTTP VERB: ${req.method}
//         URL: ${req.originalUrl}
//         REQUEST BODY:`
//     );
//     console.log(req.body);

// })

app.engine('handlebars', exphbs( {defaultLayout: 'main'} ));    // Set Engine to Handlebars, w/ instance of exphbs
app.set('view engine', 'handlebars')    // Set Express View Engine to Handlebars

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
})