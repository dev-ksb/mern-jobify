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
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from "./actions";
import { initialState } from "./appContext";

const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: "danger",
        alertText: "Please provide all values!",
      };
    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertType: "",
        alertText: "",
      };
    case REGISTER_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_USER_SUCCESS: {
      const { user, token } = action.payload;

      return {
        ...state,
        isLoading: false,
        token,
        user,
        userLocation: user.location,
        jobLocation: user.location,
        showAlert: true,
        alertType: "success",
        alertText: "User created! Redirecting...",
      };
    }
    case REGISTER_USER_ERROR: {
      const { msg } = action.payload;

      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: msg,
      };
    }
    case LOGIN_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_USER_SUCCESS: {
      const { user, token, location } = action.payload;

      return {
        ...state,
        isLoading: false,
        token,
        user,
        userLocation: location,
        jobLocation: location,
        showAlert: true,
        alertType: "success",
        alertText: "Login successfully! Redirecting...",
      };
    }
    case LOGIN_USER_ERROR: {
      const { msg } = action.payload;

      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: msg,
      };
    }

    case LOGOUT_USER:
      return {
        ...initialState,
        user: null,
        token: null,
        userLocation: "",
        jobLocation: "",
      };

    case UPDATE_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case UPDATE_USER_SUCCESS: {
      const { user, token, location } = action.payload;
      return {
        ...state,
        isLoading: false,
        user,
        token,
        userLocation: location,
        jobLocation: location,
        showAlert: true,
        alertType: "success",
        alertText: "User Profile Updated!",
      };
    }

    case UPDATE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.msg,
      };

    case TOGGLE_SIDEBAR:
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    default:
      return state;
  }
};

export default reducer;
