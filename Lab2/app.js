const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const Handlebars = require('handlebars');
const configRoutes = require("./routes");
// const static = express.static(__dirname + "/public");

// app.use("/public", static);
app.use(bodyParser.json);
app.use(bodyParser.urlencoded( {extended: true} ));

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your rootes will be running on http://localhost:3000");
})