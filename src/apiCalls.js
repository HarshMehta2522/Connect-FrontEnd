import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  const BACKEND= process.env.REACT_APP_BACKEND_URL;
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(BACKEND+"/auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    console.log(err)
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
