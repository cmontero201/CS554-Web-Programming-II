const dbConnection = require("./mongoConnection");


// Allow one reference to each collection per app
const getCollectionFn = collection => {
    let _col = undefined;

    return async() => {
        if (!_col) {
            const db = await dbConnection();
            _col = await db.collection(collection);
        }
        return _col;
    };
};

module.exports = {
    tasks: getCollectionFn("tasks")
};