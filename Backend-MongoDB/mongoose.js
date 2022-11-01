const mongoose = require("mongoose");

const Product = require("./models/product");

mongoose
  .connect(
    "mongodb+srv://Kush122:<password>@cluster0.tbw9awi.mongodb.net/product_test?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  const result = await createdProduct.save();
  //   id is in object we have to convert it into string (._id for object) (.id for string)
  console.log(typeof createdProduct.id);
  res.json(result);
};

const getProducts = async (req, res, next) => {
  // exec make it into promise
  const products = await Product.find().exec();
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
