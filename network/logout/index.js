// import firebase from "../../firebase/config";
import { Auth } from "../../Setup";

const LogOutUser = async () => {
  try {
    return await Auth().signOut();
  } catch (error) {
    return error;
  }
};

export default LogOutUser;
