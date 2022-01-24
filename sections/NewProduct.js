import { useState } from "react";
import { addProducts } from "../redux/apiCall/products";
import { useDispatch } from "react-redux";
import upload from "../firebase/upload";
import TOKEN from "../TOKEN";

function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };
  const handleClick = (e) => {
    e.preventDefault();

    const token = TOKEN();

    upload(file, (downloadURL) => {
      const product = { ...inputs, img: downloadURL, categories: cat };
      addProducts(product, dispatch, token);
    });
  };
  return (
    <div className="newProduct">
      <h1 className="title">New Product</h1>
      <form action="">
        <div className="item">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="item">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Apple Ipod"
            onChange={handleChange}
          />
        </div>
        <div className="item">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="Description"
            onChange={handleChange}
          />
        </div>
        <div className="item">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="item">
          <label>Categories</label>
          <input
            type="text"
            placeholder="Dress, Jeans, ..."
            onChange={handleCat}
          />
        </div>
        <div className="item">
          <label>In Stock</label>
          <select name="inStock" id="" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button onClick={handleClick} className="createButton">
          Create
        </button>
      </form>
    </div>
  );
}

export default NewProduct;
