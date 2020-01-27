const taskRoutes = require("./tasks");

const constructorMethod = app => {
    // USE taskRoutes ROUTER FOR REQUESTS AT /api/tasks
    app.use("/api/tasks", taskRoutes);

    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;