const express = require("express");
const router = express.Router();
const path = require('path');
const items = require("../data/items");

router.get("/", async (req, res) => {
    try {
        res.render("layouts/main", {"items":items} );
    } catch (err) {
        res.sendStatus(404)
    };
});
module.exports = router;