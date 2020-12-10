

import { database, firebase } from "../../Setup";

export const senderMsg = async (msgValue, currentUserId, guestUserId, img,) => {
  try {
    return await 
      database()
      .ref('messeges/' + currentUserId)
      .child(guestUserId)
      .push({
        messege: {
          sender: currentUserId,
          reciever: guestUserId,
          msg: msgValue,
          img: img,
          createdAt:firebase.database.ServerValue.TIMESTAMP
         

        },
      });
  } catch (error) {
    return error;
  }
};

export const recieverMsg = async (
  msgValue,
  currentUserId,
  guestUserId,
  img,
) => {
  try {
    return await 
      database()
      .ref('messeges/' + guestUserId)
      .child(currentUserId)
      .push({
        messege: {
          sender: currentUserId,
          reciever: guestUserId,
          msg: msgValue,
          img: img,
          createdAt:firebase.database.ServerValue.TIMESTAMP
        },
      });
  } catch (error) {
    return error;
  }
};


