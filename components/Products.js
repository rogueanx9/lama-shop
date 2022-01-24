import axios from "axios";
import { useEffect, useState } from "react";
import { popularProducts } from "../data";
import Product from "./Product";

function Products({ category, filters, sort }) {
  const [products, setproducts] = useState([]);
  const [filteredProd, setFilteredProd] = useState([]);

  //Filtered by Category
  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(
        category
          ? `http://localhost:5000/api/product/all?category=${category}`
          : "http://localhost:5000/api/product/all"
      );
      setproducts(res.data);
    };
    getProduct();
  }, [category]);

  //Filtered by Choice
  useEffect(() => {
    if (category) {
      setFilteredProd(
        products.filter((product) =>
          Object.entries(filters).every(([key, value]) =>
            product[key].includes(value)
          )
        )
      );
    }
  }, [products, category, filters]);

  //Sort
  useEffect(() => {
    if (sort == "newest") {
      setFilteredProd((prev) =>
        [...prev].sort((a, b) => b.createdAt - a.createdAt)
      );
    } else if (sort == "asc") {
      setFilteredProd((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilteredProd((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <div className="products">
      {category
        ? filteredProd.map((item) => {
            return <Product key={item.id} item={item} />;
          })
        : products.slice(0, 8).map((item) => {
            return <Product key={item.id} item={item} />;
          })}
    </div>
  );
}

export default Products;
