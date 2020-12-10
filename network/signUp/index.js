
 import { Auth } from "../../Setup";

const SignUpRequest = async (email, password) => {
  try {
    return await
      Auth()
      .createUserWithEmailAndPassword(email, password);
  } catch (error) {
    return error;
  }
};

export default SignUpRequest;
