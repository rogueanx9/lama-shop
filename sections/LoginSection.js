import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginCall } from "../redux/apiCall/currentUser";

function LoginSection() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { currentUser, error } = useSelector((state) => state.user);
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    //Login
    loginCall(dispatch, { username, password });
    console.log(error);
    if (currentUser?.isAdmin && !error) {
      router.push("/home");
    }
  };

  return (
    <div className="loginSection">
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick}>Login</button>
    </div>
  );
}

export default LoginSection;
