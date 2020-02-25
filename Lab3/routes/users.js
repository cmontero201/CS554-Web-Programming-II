const data = require("../data/userData");
const express = require("express");
const redis = require("redis");
const bluebird = require("bluebird");
const flat = require("flat");
const unflatten = flat.unflatten;
const client = redis.createClient();
const router = express.Router();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.get("/:id(\\d+)/", async (req, res) => {
    try {
        doesIdExist = await client.existsAsync(req.params.id);
        console.log(doesIdExist)
        
        if (doesIdExist === 1) {
            let flatRedis = await client.hgetallAsync(req.params.id);
            let rebuiltUser = unflatten(flatRedis);

            await client.lpushAsync("Visitors", JSON.stringify(rebuiltUser));
            res.json(rebuiltUser);
        } else {
            let user = await data.getById(req.params.id)
            await client.lpushAsync("Visitors", JSON.stringify(user));
            let flattened = flat(user);
            let hmSetAsyncUser = await client.hmsetAsync(flattened.id, flattened);
            console.log(hmSetAsyncUser)
            res.json(user);
        }

    } catch (err) {
        res.json( {"error": err.message} );
    };
});

router.get("/history", async (req, res) => {
    try {
        let list = await client.lrangeAsync("Visitors",0, 19).map(JSON.parse); 
        console.log(list)
        res.json(list);
       
    } catch (err) {
        res.json( {"error": err.message} );
    };
});

module.exports = router;