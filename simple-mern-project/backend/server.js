const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();

const DUMMY_PRODUCTS = []; //not a databse, just some in-memory storage for now

app.use(bodyParser.json());

//CROS Headers => Required for cross-origin/ cross-server communication

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});

app.get("/products", (req, res, next) => {
  res.status(200).json({ products: DUMMY_PRODUCTS });
});

app.post("/product", (req, res, next) => {
  const { title, price } = req.body;

  if (!title || title.trim().length === 0 || !price || price <= 0) {
    return res.status(422).json({
      message: "Invalid input, please enter a valid title and price.",
    });
  }
  const createdProduct = {
    id: uuidv4(),
    title,
    price,
  };
  DUMMY_PRODUCTS.push(createdProduct);

  res
    .status(201)
    .json({ message: "Created new product.", product: createdProduct });
});

app.listen(5000); // start Node + Express server on port 5000
