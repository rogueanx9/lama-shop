import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    userList: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //Get Users
    getUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUserSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.userList = action.payload;
    },
    getUserError: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //Delete Users
    deleteUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUserSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.userList.splice(
        state.userList.findIndex((item) => item.id === action.payload),
        1
      );
    },
    deleteUserError: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //Update Users
    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.userList[
        state.userList.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.user;
    },
    updateUserError: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //Add Users
    addUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addUserSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.userList.push(action.payload);
    },
    addUserError: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export default usersSlice.reducer;
export const {
  getUserError,
  getUserStart,
  getUserSuccess,
  deleteUserError,
  deleteUserStart,
  deleteUserSuccess,
  updateUserError,
  updateUserStart,
  updateUserSuccess,
  addUserError,
  addUserStart,
  addUserSuccess,
} = usersSlice.actions;
