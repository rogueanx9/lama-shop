const Order = require("../models/Order");
const { isAdmin, isAuthorize, verifyToken } = require("./verifyToken");

const router = require("express").Router();

//Create
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).send(savedOrder);
  } catch (e) {
    console.log(e);
  }
});

//Update
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send(updatedOrder);
  } catch (e) {
    console.log(e);
  }
});

//Delete
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    //Find and Delete
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).send("Order successfully deleted.");
  } catch (e) {
    console.log(e);
  }
});

//Get all Product
router.get("/all", isAdmin, async (req, res) => {
  try {
    //Find Cart
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (e) {
    console.log(e);
  }
});

//Get monthly Income
router.get("/income", isAdmin, async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const month = req.query.month ? req.query.month : 1;
  const lastMonth = new Date(date.setFullYear(date.getFullYear() - month));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: lastMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).send(income);
  } catch (e) {
    console.log(e);
  }
});

//Get User Cart
router.get("/:userId", isAuthorize, async (req, res) => {
  try {
    //Find User
    const order = await Order.find({ userId: req.params.userId });
    res.status(200).send(order);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
