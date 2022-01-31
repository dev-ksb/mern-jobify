const saveUserToLocalStorage = ({ user, token, location }) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
  localStorage.setItem("location", location);
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("location");
};

const getUserInfoFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return {
    user: user ? JSON.parse(user) : null,
    token: localStorage.getItem("token"),
    location: localStorage.getItem("location"),
  };
};
export {
  saveUserToLocalStorage,
  removeUserFromLocalStorage,
  getUserInfoFromLocalStorage,
};
