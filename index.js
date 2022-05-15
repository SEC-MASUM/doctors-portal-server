const express = require("express");
const app = express();
var cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const host = "localhost";
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sw0ry.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();

    const serviceCollection = client
      .db("doctors_portal")
      .collection("services");
    const bookingCollection = client
      .db("doctors_portal")
      .collection("bookings");

    // GET Services
    app.get("/service", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();

      res.send(services);
    });

    // POST Booking
    app.post("/booking", async (req, res) => {
      const booking = req.body;
      const result = await bookingCollection.insertOne(booking);
      res.send(result);
    });

    /**
     * API Naming Convention
     * app.get("/booking") // get all booking in this collection or get more than one or by filter
     * app.get("/booking/:id") // get a specific booking
     * app.post("/booking") // add a new booking
     * app.patch("/booking/:id") // update booking
     * app.delete("/booking/:id") // delete booking
     */
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Doctors Portal Server is Running");
});

app.listen(port, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
