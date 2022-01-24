import { Language, NotificationsNone, Settings } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logoutCall } from "../redux/apiCall/currentUser";

function Topbar() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  return (
    <div className="topbar">
      <div className="topbarCont">
        <div className="left">
          <span className="logo">LAMA.</span>
        </div>
        <div className="right">
          <div className="icon">
            <Badge badgeContent={2} color="primary">
              <NotificationsNone />
            </Badge>
          </div>

          <div className="icon">
            <Badge badgeContent={2} color="primary">
              <Language />
            </Badge>
          </div>

          <div className="icon">
            <Settings />
            <div className="popUp">
              <ul className="popItems">
                <li className="popItem">Profile</li>
                <li className="popItem">Settings</li>
                <li className="popItem" onClick={() => logoutCall(dispatch)}>
                  Log Out
                </li>
              </ul>
            </div>
          </div>
          <img
            src={
              user?.img ||
              "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"
            }
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
