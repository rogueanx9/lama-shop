import Head from "next/head";
import { useEffect, useState } from "react";
import { loginCall } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

function login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error, currentUser } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(dispatch, { username, password });
  };

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser]);

  return (
    <div className="login">
      <Head>
        <title>LOG IN</title>
        <meta name="login" content="login" />
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
      </Head>

      <div className="bungkus">
        <h1 className="title">SIGN IN</h1>
        <form action="">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleClick} disabled={isFetching}>
            {isFetching ? "Logging in. Please Wait." : "LOG IN"}
          </button>
          {error && <span className="error">Something went wrong.</span>}
          <a href="#" className="link">
            DO NOT YOU REMEMBER THE PASSWORD?
          </a>
          <a href="#" className="link">
            CREATE A NEW ACCOUNT
          </a>
        </form>
      </div>
    </div>
  );
}

export default login;
