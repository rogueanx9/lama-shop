import Link from "next/link";

function Product({ item }) {
  return (
    <div className="product">
      <div className="circle"></div>
      <img src={item.img} alt="" />
      <div className="info">
        <div className="icon">
          <i className="bi bi-cart"></i>
        </div>
        <Link href={`/product/${item._id}`}>
          <div className="icon">
            <i className="bi bi-search"></i>
          </div>
        </Link>
        <div className="icon">
          <i className="bi bi-heart "></i>
        </div>
      </div>
    </div>
  );
}

export default Product;
