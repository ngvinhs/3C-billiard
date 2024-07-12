import AsyncStorage from "@react-native-async-storage/async-storage";
import { api, setAuthToken } from "./api";

const login = async (password, email) => {
  try {
    const response = await api.post("/users/login", {
      password: password,
      email: email,
    });

    const token = response?.data?.token;
    await AsyncStorage.setItem("token", token);
    setAuthToken();
    return response;
  } catch (error) {
    return error?.response?.data;
  }
};

const register = async (data) => {
  try {
    const response = await api.post("/users/register", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const registerAccount = async (data) => {
  try {
    const response = await api.post("/users/register", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const changePassword = async (value, otp, password) => {
  console.log("changePassword", value, otp, password);
  try {
    const response = await api.post(`/auth/validate-otp`, {
      email: value,
      otp: otp,
      password: password,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const logout = async () => {
  await AsyncStorage.removeItem("token");
  setAuthToken();
};

export { login, register, logout, changePassword, registerAccount };
