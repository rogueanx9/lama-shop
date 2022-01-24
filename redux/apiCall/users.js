import { userRequest } from "../../utilities/request";
import {
  addUserError,
  addUserStart,
  addUserSuccess,
  deleteUserError,
  deleteUserStart,
  deleteUserSuccess,
  getUserError,
  getUserStart,
  getUserSuccess,
  updateUserError,
  updateUserStart,
  updateUserSuccess,
} from "../usersRedux";

export const getUsers = async (dispatch, token) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest(token).get("/user/all");
    dispatch(getUserSuccess(res.data));
  } catch (e) {
    console.log(e);
    dispatch(getUserError());
  }
};

export const deleteUsers = async (dispatch, id, token) => {
  dispatch(deleteUserStart());
  try {
    //userRequest(token).delete("/user/"+id);
    dispatch(deleteUserSuccess(id));
  } catch (e) {
    console.log(e);
    dispatch(deleteUserError());
  }
};

export const updateUsers = async (dispatch, id, user, token) => {
  dispatch(updateUserStart());
  try {
    await userRequest(token).put("/user/" + id, user);
    dispatch(updateUserSuccess({ id: id, user: user }));
  } catch (e) {
    console.log(e);
    dispatch(updateUserError());
  }
};

export const addUsers = async (dispatch, user, token) => {
  dispatch(addUserStart());
  try {
    const res = await userRequest(token).post("/auth/register", user);
    dispatch(addUserSuccess(res.data));
  } catch (e) {
    console.log(e);
    dispatch(addUserError());
  }
};
