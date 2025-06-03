import axios from "axios";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const LOGOUT = "LOGOUT";

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      const user = response.data.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        dispatch({ type: LOGIN_SUCCESS, payload: user });
        localStorage.setItem("user", JSON.stringify(user));
        return true;
      } else {
        dispatch({ type: LOGIN_FAILED, payload: "Invalid email or password" });
        return false;
      }
    } catch (error) {
      dispatch({ type: LOGIN_FAILED, payload: error.message });
      return false;
    }
  };
};

export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/users",
        userData
      );
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
      return true;
    } catch (error) {
      dispatch({ type: REGISTER_FAILED, payload: error.message });
      return false;
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem("user");
    dispatch({ type: LOGOUT });
  };
};
