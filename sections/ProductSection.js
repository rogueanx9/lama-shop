import { Publish } from "@mui/icons-material";
import Link from "next/link";
import Chart from "../components/Chart";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../utilities/request";

function ProductSection({ id }) {
  const [prodStats, setProdStats] = useState([]);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const product = useSelector((state) =>
    state.product.products.find((item) => item._id == id)
  );

  useEffect(() => {
    const token = JSON.parse(
      JSON.parse(localStorage.getItem("persist:root")).user
    ).currentUser.accessToken;
    const getUsers = async () => {
      try {
        const res = await userRequest(token).get("/order/income?pid=" + id);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) => {
          setProdStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ]);
        });
      } catch (e) {
        console.log(e);
      }
    };
    getUsers();
  }, [MONTHS]);
  return (
    <div className="productSection">
      <div className="titleCont">
        <h1 className="title">Edit Product</h1>
        <Link href="/newProduct">
          <button>Create</button>
        </Link>
      </div>
      <div className="prodTop">
        <div className="left">
          <Chart title="Sales" data={prodStats} dataKey="Sales" grid />
        </div>
        <div className="right">
          <div className="infoTop">
            <img src={product.img} alt="" />
            <span className="name">{product.title}</span>
          </div>
          <div className="infoBottom">
            <div className="item">
              <span className="key">ID:</span>
              <span className="value">{product._id}</span>
            </div>
            <div className="item">
              <span className="key">Sales:</span>
              <span className="value">5123</span>
            </div>
            <div className="item">
              <span className="key">In Stock:</span>
              <span className="value">
                {product.inStock ? "Available" : "Not Available"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="prodBottom">
        <form action="">
          <div className="formLeft">
            <label htmlFor="">Product Name</label>
            <input type="text" placeholder={product.title} />
            <label htmlFor="">Product Description</label>
            <input type="text" placeholder={product.desc} />
            <label htmlFor="">Price</label>
            <input type="text" placeholder={product.price} />
            <label htmlFor="">In Stock</label>
            <select name="instock" id="instock">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="formRight">
            <div className="upload">
              <img src={product.img} alt="" />
              <label htmlFor="file">
                <Publish className="icon" />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="updateButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductSection;
