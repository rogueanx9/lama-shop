import Head from "next/head";
import Navbar from "../../components/Navbar";
import Announcement from "../../components/Announcement";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { publicRequest } from "../../utilities/request";
import { isHovered } from "../../utilities/isHovered";
import { addProduct } from "../../redux/cartRedux";
import { useDispatch } from "react-redux";

function product() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      const res = await publicRequest.get("/product/" + id);
      setProduct(res.data);
    };
    getProduct();
  }, [id]);

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  return (
    <div className="productPage">
      <Head>
        <title>Product</title>
        <meta name="Product" content="Product" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <Navbar />
      <Announcement />
      <div className="bungkus">
        <div className="imgCont">
          <img src={product.img} alt="" />
        </div>
        <div className="infoCont">
          <h1 className="title">{product.title}</h1>
          <p className="desc">{product.desc}</p>
          <span className="price">{`$${product.price}`}</span>
          <div className="filterCont">
            <div className="filter">
              <span className="title">Color:</span>
              {product.color?.map((value) => {
                return (
                  <div key={value} className="colorCont">
                    <input
                      type="radio"
                      name="colorRadio"
                      id="colorCheck"
                      onChange={() => setColor(value)}
                    />
                    <div
                      className="color"
                      style={{ backgroundColor: value }}
                    ></div>
                  </div>
                );
              })}
            </div>
            <div className="filter">
              <span className="title">Size:</span>
              <select
                className="size"
                name="size"
                id="size"
                onChange={(e) => setSize(e.target.value)}
              >
                {product.size?.map((value) => {
                  return (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="addCont">
            <div className="amountCont">
              <i
                className="bi bi-dash"
                onClick={() =>
                  setQuantity(quantity > 0 ? quantity - 1 : quantity)
                }
              ></i>
              <span className="amount">{quantity}</span>
              <i
                className="bi bi-plus"
                onClick={() => setQuantity(quantity + 1)}
              ></i>
            </div>
            <button onClick={handleClick}>ADD TO CART</button>
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
}

export default product;
