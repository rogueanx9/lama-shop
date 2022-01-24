import Head from "next/head";

function register() {
  return (
    <div className="register">
      <Head>
        <title>Register</title>
        <meta name="register" content="register" />
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
      </Head>

      <div className="bungkus">
        <h1 className="title">CREATE AN ACCOUNT</h1>
        <form action="">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Password" />
          <input type="text" placeholder="Confirm Password" />
          <span className="agreement">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. <b>Aspernatur, perferendis?</b>
          </span>
          <button>CREATE</button>
        </form>
      </div>
    </div>
  );
}

export default register;
