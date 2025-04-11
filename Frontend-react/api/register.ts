import axios from "axios";
import { api } from "./consts";
interface RegisterData {
  name: string;
  email: string;
  phone: string;
  cin: string;
  cnt: string;
  password: string;
}

export const apiRegister = async ({
  name,
  email,
  phone,
  cin,
  cnt,
  password,
}: RegisterData) => {
  try {
    const response = await axios.post(`${api}register`, {
      email,
      name,
      phone,
      cin,
      cnt,
      password,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error)
    console.error("Error during registration:", error);
    return error;
  }
};
