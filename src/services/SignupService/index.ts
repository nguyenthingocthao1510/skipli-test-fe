import { UserLogin } from "../../helpers/types/login";
import axios from "axios";

export const signupApi = {
  registerUser: function (data: UserLogin) {
    const API_URL = process.env.REACT_APP_RESPONSE_API_URL;
    return axios.post(`${API_URL}/signup`, {
      email: data.email,
      password: data.password,
    });
  },
};
