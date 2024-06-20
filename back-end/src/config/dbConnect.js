const { default: mongoose } = require("mongoose")

mongoose
  .connect(process.env.WBP_MONGO_DEV_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.WBP_MONGO_DEV_DBNM,
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });


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