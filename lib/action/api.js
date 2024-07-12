import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
  baseURL: "https://exe2013cbilliardapi.azurewebsites.net/api/v1.0",
});

const setAuthToken = async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export { api, setAuthToken };
