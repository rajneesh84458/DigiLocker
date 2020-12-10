// import firebase from "../../firebase/config";

import { Auth } from "../../Setup";



const loginRequest = async (email, password) => {
  try {
    return await Auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    return error;
  }
};

export default loginRequest;
