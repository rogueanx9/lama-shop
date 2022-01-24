const Product = require("../models/Product");
const { isAdmin } = require("./verifyToken");

const router = require("express").Router();

//Create
router.post("/", isAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).send(savedProduct);
  } catch (e) {
    console.log(e);
  }
});

//Update
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send(updatedProduct);
  } catch (e) {
    console.log(e);
  }
});

//Delete
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    //Find and Delete
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send("Product successfully deleted.");
  } catch (e) {
    console.log(e);
  }
});

//Get all Product
router.get("/all", async (req, res) => {
  const qNew = req.query.new;
  const qCat = req.query.category;
  try {
    //Find Product
    const productsD = await Product.find();
    let products = productsD.map((product) => product._doc);

    //Filter
    if (qNew) products = products.sort((a, b) => b.createdAt - a.createdAt);
    if (qCat)
      products = products.filter((product) =>
        product.categories.includes(qCat)
      );

    res.status(200).send(products);
  } catch (e) {
    console.log(e);
  }
});

//Get a Product
router.get("/:id", async (req, res) => {
  try {
    //Find User
    const product = await Product.findById(req.params.id);
    const { password, __v, ...productInfo } = product._doc;
    res.status(200).send(productInfo);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
