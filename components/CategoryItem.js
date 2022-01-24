import Link from "next/link";

function CategoryItem({ item }) {
  return (
    <Link href={`/products/${item.category}`}>
      <div className="category">
        <div className="imgCont">
          <img src={item.img} alt="" />
        </div>
        <div className="info">
          <h1 className="title">{item.title}</h1>
          <button>SHOP NOW</button>
        </div>
      </div>
    </Link>
  );
}

export default CategoryItem;
