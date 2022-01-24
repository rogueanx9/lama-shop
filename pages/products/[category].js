import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Announcement from "../../components/Announcement";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import Products from "../../components/Products";

function productList() {
  const router = useRouter();
  const { category } = router.query;
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilter = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="productList">
      <Head>
        <title>{category}</title>
        <meta name="prodlist" content="Product List" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Announcement />

      <h1 className="title">{category}</h1>
      <div className="filterCont">
        <div className="filter">
          <span className="filterText">Filter Product:</span>
          <select name="color" id="color" onChange={handleFilter}>
            <option value="" disabled>
              Color
            </option>
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
          </select>
          <select name="size" id="size" onChange={handleFilter}>
            <option value="" disabled>
              Size
            </option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>
        <div className="filter">
          <span className="filterText">Sort Product:</span>
          <select
            name="sort"
            id="sort"
            onChange={(e) => setSort(e.target.value)}
            defaultValue="newest"
          >
            <option value="newest">Newest</option>
            <option value="asc">Price (asc)</option>
            <option value="desc">Price (desc)</option>
          </select>
        </div>
      </div>

      <Products category={category} filters={filter} sort={sort} />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default productList;
