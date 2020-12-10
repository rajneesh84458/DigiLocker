// import firebase from "../../firebase/config";

import { Auth } from "../../Setup";

const phoneRequest = async (phoneNumber) => {
  try {
    return await Auth().signInWithPhoneNumber(phoneNumber);
  } catch (error) {
    return error;
  }
};

export default phoneRequest;
