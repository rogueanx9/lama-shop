const Cart = require("../models/Cart");
const { isAdmin, isAuthorize, verifyToken } = require("./verifyToken");

const router = require("express").Router();

//Create
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).send(savedCart);
  } catch (e) {
    console.log(e);
  }
});

//Update
router.put("/:id", isAuthorize, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).send(updatedCart);
  } catch (e) {
    console.log(e);
  }
});

//Delete
router.delete("/:id", isAuthorize, async (req, res) => {
  try {
    //Find and Delete
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).send("Cart successfully deleted.");
  } catch (e) {
    console.log(e);
  }
});

//Get all Cart
router.get("/all", isAdmin, async (req, res) => {
  try {
    //Find Cart
    const carts = await Cart.find();
    res.status(200).send(carts);
  } catch (e) {
    console.log(e);
  }
});

//Get User Cart
router.get("/:userId", isAuthorize, async (req, res) => {
  try {
    //Find User
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).send(cart);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
