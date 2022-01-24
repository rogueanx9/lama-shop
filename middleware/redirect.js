export const noUserRedirect = (user, pathname) => {
  const exception = ["/login", "/register"];
  if (!user && !exception.includes(pathname)) {
    return true;
  }
  return false;
};

export const homeRedirect = (user, pathname) => {
  if (user && (pathname === "/login" || pathname === "/register")) {
    return true;
  }
  return false;
};
