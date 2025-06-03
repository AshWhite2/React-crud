const initialState = {
    user: null,
    error: null,
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN_SUCCESS":
        return { ...state, user: action.payload, error: null };
      case "LOGIN_FAILED":
        return { ...state, user: null, error: action.payload };
      case "REGISTER_SUCCESS":
        return { ...state, user: action.payload, error: null };
      case "REGISTER_FAILED":
        return { ...state, user: null, error: action.payload };
      case "LOGOUT":
        return { ...state, user: null, error: null };
      default:
        return state;
    }
  };