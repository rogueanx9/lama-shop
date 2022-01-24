import Head from "next/head";
import { useSelector } from "react-redux";
import Announcement from "../components/Announcement";
import CartProduct from "../components/CartProduct";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../utilities/request";
import { useRouter } from "next/router";

function cart() {
  const router = useRouter();
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const payment = async () => {
      try {
        const res = await userRequest.post("/stripe/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        console.log(res.data);
        router.push("/success");
      } catch (e) {
        console.log(e);
      }
    };
    stripeToken && cart.total > 0 && payment();
  }, [stripeToken]);
  return (
    <div className="cart">
      <Head>
        <title>Cart</title>
        <meta name="cart" content="cart" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Navbar />
      <Announcement />
      <div className="bungkus">
        <h1 className="title">YOUR BAG</h1>
        <div className="top">
          <button>CONTINUE SHOPPING</button>
          <div className="topTexts">
            <span className="topText">Shopping Bag(2)</span>
            <span className="topText">Your Wishlist (0)</span>
          </div>
          <button className="filled">CHEECKOUT NOW</button>
        </div>
        <div className="bottom">
          <div className="info">
            {cart.products.map((product) => {
              return (
                <>
                  <CartProduct details={product} />
                  <hr />
                </>
              );
            })}
          </div>
          <div className="summary">
            <h1 className="title">ORDER SUMMARY</h1>
            <div className="summaryItem">
              <span className="text">Subtotal</span>
              <span className="price">$ {cart.total}</span>
            </div>
            <div className="summaryItem">
              <span className="text">Estimated Shipping</span>
              <span className="price">$ 6</span>
            </div>
            <div className="summaryItem">
              <span className="text">Shipping Discount</span>
              <span className="price">$ -6</span>
            </div>
            <div className="summaryItem total">
              <span className="text">Total</span>
              <span className="price">$ {cart.total}</span>
            </div>
            <StripeCheckout
              name="Lama Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={process.env.NEXT_PUBLIC_STRIPE_KEY}
            >
              <button>CHECKOUT</button>
            </StripeCheckout>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default cart;
