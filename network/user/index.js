// import firebase from "../../firebase/config";

import { database } from "../../Setup";

export const AddUser = async (name, email, uid, profileImg,mobile) => {
  try {
    return await 
      database()
      .ref("users/" + uid)
      .set({
        name: name,
        email: email,
        uuid: uid,
        profileImg: profileImg,
        mobile:mobile
      });
  } catch (error) {
    return error;
  }
};

export const UpdateUser = async (uuid, imgSource) => {
  try {
    return await 
      database()
      .ref("users/" + uuid)
      .update({
        profileImg: imgSource,
      });
  } catch (error) {
    return error;
  }
};
