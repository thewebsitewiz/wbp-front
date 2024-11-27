"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { mongoose } = require("mongoose");
const ENV = "dev";
let DB_CONN = process.env.WBP_MONGO_DEV_URI;
let DB_NAME = process.env.WBP_MONGO_DB_NAME;
if (ENV === "prod") {
    // REPLACE WITH PROD URI
    DB_CONN = process.env.WBP_MONGO_DEV_URI;
    // REPLACE WITH PROD DB NAME
    DB_NAME = process.env.WBP_MONGO_DB_NAME;
}
// If the Node process ends, close the Mongoose connection
const gracefulExit = () => {
    console.log("Mongoose connection is disconnecting.");
    mongoose.connection.close().then(() => {
        console.log("Mongoose connection is disconnected.");
        process.exit(0);
    });
};
// Connect to MongoDB
const dbConnect = async (db_connect = DB_CONN) => {
    try {
        mongoose.set("debug", false);
        const conn = await mongoose.connect(db_connect);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log("mongoose.connection.readyState: ", mongoose.connection.readyState);
    }
    catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};
module.exports = { gracefulExit, dbConnect };
