export default () =>
  JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
    .accessToken;
