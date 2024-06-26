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

const dbConnect = async () => {
  try {
    mongoose.set("debug", true);
    const conn = await mongoose.connect(DB_CONN);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};


module.exports = dbConnect;

/*
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoUri =
  process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(mongoUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    module.exports = client;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
 */
