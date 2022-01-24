import { loginError, loginStart, loginSuccess, logout } from "../userRedux";

export const loginCall = async (dispacth, user) => {
  dispacth(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    if (res.data === "Incorrect username or password") throw "Login Error";
    dispacth(loginSuccess(res.data));
  } catch (e) {
    dispacth(loginError());
  }
};

export const logoutCall = (dispatch) => {
  dispatch(logout());
};
