const CryptoJs = require("crypto-js");
const User = require("../models/User");
const { isAuthorize, isAdmin } = require("./verifyToken");

const router = require("express").Router();

//Update
router.put("/:id", isAuthorize, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).send(updatedUser);
  } catch (e) {
    console.log(e);
  }
});

//Delete
router.delete("/:id", isAuthorize, async (req, res) => {
  try {
    //Find and Delete
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User successfully deleted.");
  } catch (e) {
    console.log(e);
  }
});

//Get all user
router.get("/all", isAdmin, async (req, res) => {
  const qNew = req.query.new;
  try {
    //Find User
    const users = qNew ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
    const filteredUsers = users.map((user) => {
      const { password, __v, ...others } = user._doc;
      return others;
    });
    res.status(200).send(filteredUsers);
  } catch (e) {
    console.log(e);
  }
});

//Get User Stats
router.get("/stats", isAdmin, async (req, res) => {
  const date = new Date();
  const year = req.query.year ? req.query.year : 1;
  const lastYear = new Date(date.setFullYear(date.getFullYear() - year));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
  }
});

//Get a User
router.get("/:id", isAdmin, async (req, res) => {
  try {
    //Find User
    const user = await User.findById(req.params.id);
    const { password, __v, ...userInfo } = user._doc;
    res.status(200).send(userInfo);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
