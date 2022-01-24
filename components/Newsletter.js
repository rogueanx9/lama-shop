function Newsletter() {
  return (
    <div className="newsletter">
      <h1 className="title">Newsletter</h1>
      <p className="desc">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur, quae!
      </p>
      <div className="inputCont">
        <input type="text" placeholder="Your Email" />
        <button>
          <i className="bi bi-send"></i>
        </button>
      </div>
    </div>
  );
}

export default Newsletter;
