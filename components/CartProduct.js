function CartProduct({ details }) {
  return (
    <div className="cartproduct">
      <div className="productDetails">
        <img src={details.img} alt="" />
        <div className="details">
          <span className="name">
            <b>Product:</b> {details.title}
          </span>
          <span className="id">
            <b>ID:</b> {details._id}
          </span>
          <div
            className="color"
            style={{ backgroundColor: details.color }}
          ></div>
          <span className="size">
            <b>Size:</b> {details.size}
          </span>
        </div>
      </div>
      <div className="priceDetails">
        <div className="productAmountCont">
          <i className="bi bi-dash"></i>
          <div className="productAmount">{details.quantity}</div>
          <i className="bi bi-plus"></i>
        </div>
        <span className="price">$ {details.price * details.quantity}</span>
      </div>
    </div>
  );
}

export default CartProduct;
