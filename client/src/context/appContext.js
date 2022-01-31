import React, { useReducer, useContext } from "react";
import axios from "axios";
import reducer from "./reducer";
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
} from "./actions";

import {
  getUserInfoFromLocalStorage,
  removeUserFromLocalStorage,
  saveUserToLocalStorage,
} from "../utils/localstorage";

const { token, user, location: userLocation } = getUserInfoFromLocalStorage();

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user,
  token: token,
  userLocation: userLocation || "",
  jobLocation: userLocation || "",
  showSidebar: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({
      type: DISPLAY_ALERT,
    });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 3000);
  };

  const register = async (userData) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/register", userData);
      const { user, token } = response.data;

      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token },
      });

      // save to localstorage
      saveUserToLocalStorage({ user, token, location: user.location });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }

    clearAlert();
  };

  const login = async (userData) => {
    dispatch({
      type: LOGIN_USER_BEGIN,
    });

    try {
      const response = await axios.post("/api/v1/auth/login", userData);
      const { user, token, location } = response.data;

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, location },
      });

      // save to localstorage
      saveUserToLocalStorage({ user, token, location: user.location });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }

    clearAlert();
  };

  const logoutUser = () => {
    dispatch({
      type: LOGOUT_USER,
    });
    removeUserFromLocalStorage();
  };

  const toggleSidebar = () => {
    dispatch({
      type: TOGGLE_SIDEBAR,
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        register,
        login,
        toggleSidebar,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
