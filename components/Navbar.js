import { Badge } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutCall } from "../redux/apiCalls";

function Navbar() {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <span className="lang">EN</span>
          <div className="searchCont">
            <input placeholder="Search" className="input" type="text" />
            <i style={{ color: "gray" }} className="bi bi-search"></i>
          </div>
        </div>
        <div className="center">
          <Link href="/">
            <h1 className="logo">LAMA.</h1>
          </Link>
        </div>
        <div className="right">
          {user ? (
            <>
              <div className="menuItem">{user.username.toUpperCase()}</div>
              <div className="menuItem" onClick={(e) => logoutCall(dispatch)}>
                LOG OUT
              </div>
            </>
          ) : (
            <>
              <Link href="/register">
                <div className="menuItem">REGISTER</div>
              </Link>
              <Link href="/login">
                <div className="menuItem">SIGN IN</div>
              </Link>
            </>
          )}
          <Link href="/cart">
            <div className="menuItem">
              <Badge badgeContent={quantity} color="primary">
                <i style={{ fontSize: "22px" }} className="bi bi-cart"></i>
              </Badge>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
