const MongoClient = require("mongodb").MongoClient;

const url =
  "mongodb+srv://Kush122:<password>@cluster0.tbw9awi.mongodb.net/?retryWrites=true&w=majority";

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  const client = new MongoClient(url); //tells which server we want to connect

  try {
    await client.connect();
    const db = client.db();
    const result = db.collection("products").insertOne(newProduct);
  } catch (error) {
    return res.json({ message: "Could not store data." });
  }
  client.close();

  res.json(newProduct);
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);

  let products;

  try {
    await client.connect();
    const db = client.db();
    products = db.collection("products").find().toArray();
  } catch (error) {
    return res.json({ message: "Could not retrive products." });
  }
  client.close();

  res.json(products);
};

exports.createProduct = createProduct;

exports.getProducts = getProducts;
