"use strict";
/* /* const { default: mongoose } = require("mongoose")

const dbConnect = () => {
    try {
        const  conn = mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('connected')
    }
    catch (error) {
        console.log('error')
    }
}

module.exports = dbConnect;


 */
Object.defineProperty(exports, "__esModule", { value: true });
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
