"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = 3000;
app_1.default.listen(port, () => {
    console.log(`We've now got a server!`);
    console.log(`Your routes will be running on http://localhost:${port}`);
});
