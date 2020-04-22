import * as mongodb from "mongodb";

class DbClient {
    public client: mongodb.MongoClient;

    public async connect() {
        this.client = await mongodb.MongoClient.connect("mongodb://localhost:27017/Montero-Christian-CS554-Lab1",  { useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Connected to db");
        return this.client;
    }
}
export = new DbClient();