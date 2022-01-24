import { useState } from "react";
import { useDispatch } from "react-redux";
import upload from "../firebase/upload";
import { addUsers } from "../redux/apiCall/users";
import TOKEN from "../TOKEN";

function NewUser() {
  const [userInfo, setUserInfo] = useState({});
  const [userImg, setUserImg] = useState(null);
  const dispatch = useDispatch();

  const handleInfo = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = (e) => {
    e.preventDefault();
    const token = TOKEN();
    upload(userImg, (imgUrl) => {
      const newUser = { ...userInfo, img: imgUrl };
      addUsers(dispatch, newUser, token);
      console.log("It should be finished");
    });
  };
  return (
    <div className="newUser">
      <h1 className="title">New User</h1>
      <form action="">
        <div className="item">
          <label>Profile Pitcure</label>
          <input
            style={userImg && { display: "none" }}
            id="file"
            type="file"
            onChange={(e) => setUserImg(e.target.files[0])}
          />
          {userImg && (
            <div className="uploaded">
              <img src={URL.createObjectURL(userImg)} />
            </div>
          )}
        </div>
        <div className="item">
          <label>Username</label>
          <input
            name="username"
            type="text"
            placeholder="John"
            onChange={handleInfo}
          />
        </div>
        {/* <div className="item">
          <label>Full Name</label>
          <input type="text" placeholder="John SMith" />
        </div> */}
        <div className="item">
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="John@gmail.com"
            onChange={handleInfo}
          />
        </div>
        <div className="item">
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={handleInfo}
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
        {/* <div className="item">
          <label>Gender</label>
          <div className="genderCont">
            <input type="radio" name="gender" id="male" value="male" />
            <label htmlFor="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label htmlFor="female">Female</label>
            <input type="radio" name="gender" id="others" value="others" />
            <label htmlFor="others">Others</label>
          </div>
        </div> */}
        {/* <div className="item">
          <label>Active</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div> */}
        <button className="createButton" onClick={handleClick}>
          Create
        </button>
      </form>
    </div>
  );
}

export default NewUser;
