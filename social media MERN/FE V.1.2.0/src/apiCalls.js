
import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  
  const apiUrl = "http://localhost:8800"; 
  dispatch({ type: "LOGIN_START" });
  try {
    
    const res = await axios.post(`${apiUrl}/api/auth/login`, userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    return res
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};