const portfolioRoutes = require("./portfolio");

const constructorMethod = app => {
    app.use("/", portfolioRoutes);

    app.use("*", (req, res) => {
        res.sendStatus(404)
    });
};

module.exports = constructorMethod;