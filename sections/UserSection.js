import {
  CalendarToday,
  Cancel,
  LocationCity,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import upload from "../firebase/upload";
import { updateUsers } from "../redux/apiCall/users";

function UserSection({ id }) {
  const date = new Date();
  const created = `${date.getDate(user?.createdAt)}-${
    date.getMonth(user?.createdAt) + 1
  }-${date.getFullYear(user?.createdAt)}`;

  const user = useSelector((state) => state.users.userList).filter(
    (user) => user._id === id
  )[0];

  const [updatedUser, setUpdatedUser] = useState({});
  const [updatedImg, setUpdatedImg] = useState(null);

  const dispatch = useDispatch();

  const handleInputs = (e) => {
    setUpdatedUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    const TOKEN = JSON.parse(
      JSON.parse(localStorage.getItem("persist:root")).user
    ).currentUser.accessToken;

    if (updatedImg) {
      upload(updatedImg, (imgUrl) => {
        updateUsers(dispatch, id, { ...updatedUser, img: imgUrl }, TOKEN);
      });
    } else {
      updateUsers(dispatch, id, updatedUser, TOKEN);
    }
  };

  return (
    <div className="userSection">
      <div className="titleCont">
        <h1 className="title">Edit User</h1>
        <Link href="/newUser">
          <button>Create</button>
        </Link>
      </div>
      <div className="userCont">
        <div className="show">
          <div className="top">
            <img
              src={
                user.img ||
                "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"
              }
              alt=""
            />
            <div className="details">
              <div className="name">{user.username}</div>
              {/* <div className="job">Software Engineer</div> */}
            </div>
          </div>
          <div className="bottom">
            <span className="title">Account Details</span>
            <div className="infoCont">
              <PermIdentity className="icon" />
              <span className="info">{user.username}</span>
            </div>
            <div className="infoCont">
              <CalendarToday className="icon" />
              <span className="info">{created}</span>
            </div>
            <span className="title">Contact Details</span>
            {/* <div className="infoCont">
              <PhoneAndroid className="icon" />
              <span className="info">+1 123 456 67</span>
            </div> */}
            <div className="infoCont">
              <MailOutline className="icon" />
              <span className="info">{user.email}</span>
            </div>
            {/* <div className="infoCont">
              <LocationCity className="icon" />
              <span className="info">NY | USA</span>
            </div> */}
          </div>
        </div>
        <div className="update">
          <span className="title">Edit</span>
          <form action="">
            <div className="left">
              <div className="item">
                <label>Username</label>
                <input
                  name="username"
                  type="text"
                  placeholder={user.username}
                  onChange={handleInputs}
                />
              </div>
              {/* <div className="item">
                <label>Full Name</label>
                <input type="text" placeholder={user.username} />
              </div> */}
              <div className="item">
                <label>Email</label>
                <input
                  name="email"
                  type="text"
                  placeholder={user.email}
                  onChange={handleInputs}
                />
              </div>
              {/* <div className="item">
                <label>Phone</label>
                <input type="text" placeholder="+1 123 456 67" />
              </div> */}
              {/* <div className="item">
                <label>Address</label>
                <input type="text" placeholder="NY | USA" />
              </div> */}
            </div>
            <div className="right">
              <div className="upload">
                <img
                  src={
                    (updatedImg ? URL.createObjectURL(updatedImg) : null) ||
                    user.img ||
                    "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"
                  }
                  alt=""
                />
                <label htmlFor="file">
                  {updatedImg ? (
                    <Cancel className="icon" />
                  ) : (
                    <Publish className="icon" />
                  )}
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setUpdatedImg(e.target.files[0])}
                />
              </div>
              <button className="updateButton" onClick={handleClick}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserSection;
