import { Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { userRequest } from "../utilities/request";

function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = JSON.parse(
      JSON.parse(localStorage.getItem("persist:root")).user
    ).currentUser.accessToken;
    const getUsers = async () => {
      try {
        const res = await userRequest(token).get("/user/all?new=true");
        setUsers(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUsers();
  }, []);
  return (
    <div className="widgetsm">
      <h3 className="title">New Join Members</h3>
      <ul className="items">
        {users.map((user) => {
          return (
            <li className="item" key={user._id}>
              <img
                src={
                  user.img ||
                  "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                }
                alt=""
              />
              <div className="userDetails">
                <div className="name">{user.username}</div>
              </div>
              <button>
                <Visibility className="icon" /> Display
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default WidgetSm;
