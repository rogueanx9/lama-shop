const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

//Payment
router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) return res.status(500).send(stripeErr);
      res.status(200).send(stripeRes);
    }
  );
});

module.exports = router;
