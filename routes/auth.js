const CryptoJS = require("crypto-js");
const User = require("../models/User");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

//Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    ...req.body,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (e) {
    console.log(e);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    //Find User
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(200).send("Incorrect username or password");

    //Check Password
    const decrypted = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    ).toString(CryptoJS.enc.Utf8);
    if (decrypted !== req.body.password)
      return res.status(200).send("Incorrect username or password");

    //JWT Sign
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    //Send User
    const { __v, password, ...userInfo } = user._doc;
    res.status(200).send({ ...userInfo, accessToken });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
