import { UserLogin } from "../../helpers/types/login";
import axios from "axios";

export const loginApi = {
  loginUser: function (data: UserLogin) {
    const API_URL = process.env.REACT_APP_RESPONSE_API_URL;
    return axios.post(`${API_URL}/login`, {
      email: data.email,
      password: data.password,
    });
  },
};
