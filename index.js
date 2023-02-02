const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_pass}@cluster0.uvaek7y.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const DataBase = client.db("DIMITA_Ecommerce");
    const product = DataBase.collection("product");
    const userCollection = DataBase.collection("user_collection");

    // Get all product data start
    app.get("/product", async (req, res) => {
      const query = {};
      const result = await product.find(query).toArray();
      res.send(result);
    });
    // Get all product data end

    // GET FASHION data start
    app.get("/fashion_products", async (req, res) => {
      const query = { category: "FASHION" };
      const result = await product.find(query).toArray();
      res.send(result);
    });
    // GET FASHION data end

    // GET ELECTRONICS data start
    app.get("/electronic_products", async (req, res) => {
      const query = { category: "ELECTRONICS" };
      const result = await product.find(query).toArray();
      res.send(result);
    });
    // GET ELECTRONICS data end

    // GET HOME & GARDEN data start
    app.get("/home_garden_products", async (req, res) => {
      const query = { category: "HOME & GARDEN" };
      const result = await product.find(query).toArray();
      res.send(result);
    });
    // GET HOME & GARDEN data end

    app.get("/view_details/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await product.findOne(query);
      res.send(result);
    });

    // post user data in userCollection start
    app.post("/user_collection", async (req, res) => {
      const data = req.body;
      const postUserData = await userCollection.insertOne(data);
      res.send(postUserData);
    });
    // post user data in userCollection end
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
