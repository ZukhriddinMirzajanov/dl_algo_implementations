const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// All products route
router.get("/", async (req, res) => {
  let searchOption = {};
  if (req.query.name !== null && req.query.name !== "") {
    searchOption.name = new RegExp(req.query.name, "i");
  }
  try {
    const products = await Product.find(searchOption);
    res.render("products/buy", {
      products: products,
      searchOption: req.query,
    });
  } catch {
    res.redirect("products");
  }
});

// New product route
router.get("/sell", (req, res) => {
  res.render("products/sell", { product: new Product() });
});

// Creating new product
router.post("/", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    cost: req.body.cost,
  });
  try {
    const newProduct = await product.save();
    // res.redirect(`products/${newProduct.id}`);
    res.redirect("products");
  } catch {
    res.render("products/sell", {
      product: product,
      errorMessage: "Error creating product",
    });
  }
});

module.exports = router;
