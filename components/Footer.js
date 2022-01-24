function Footer() {
  return (
    <div className="footer">
      <div className="left">
        <h1 className="logo">LAMA.</h1>
        <p className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quas
          repellendus magni unde rerum nulla dignissimos, cum suscipit nobis
          voluptatibus ea molestias velit. Tempore, repudiandae?
        </p>
        <div className="socialCont">
          <div className="socialIcon" style={{ backgroundColor: "#3b5999" }}>
            <i className="bi bi-facebook"></i>
          </div>
          <div className="socialIcon" style={{ backgroundColor: "#E4405F" }}>
            <i className="bi bi-instagram"></i>
          </div>
          <div className="socialIcon" style={{ backgroundColor: "#55ACEE" }}>
            <i className="bi bi-twitter"></i>
          </div>
          <div className="socialIcon" style={{ backgroundColor: "#E60023" }}>
            <i className="bi bi-pinterest"></i>
          </div>
        </div>
      </div>

      <div className="center">
        <h3 className="title">Useful Links</h3>
        <ul className="items">
          <li className="item">Home</li>
          <li className="item">Cart</li>
          <li className="item">Man Fashion</li>
          <li className="item">Woman Fashion</li>
          <li className="item">Accessories</li>
          <li className="item">My Account</li>
          <li className="item">Order tracking</li>
          <li className="item">Wishlist</li>
          <li className="item">Terms</li>
        </ul>
      </div>
      <div className="right">
        <h3 className="title">Contact</h3>
        <div className="contactItem">
          <i className="bi bi-geo-alt"></i>
          622 Dixie Path, South Tobinchester 98336
        </div>
        <div className="contactItem">
          <i className="bi bi-telephone"></i>
          +1 234 56 78
        </div>
        <div className="contactItem">
          <i className="bi bi-envelope"></i>
          contanct@lama.dev
        </div>
        <img src="https://i.ibb.co/Qfvn4z6/payment.png" alt="" />
      </div>
    </div>
  );
}

export default Footer;
