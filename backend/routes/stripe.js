import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_KEY);

const paymentFunction = asyncHandler(async (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "ron",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

router.route("/").post(paymentFunction);

export default router;
