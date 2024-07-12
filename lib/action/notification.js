import { api } from "./api";

const getAllNotifications = async () => {
  try {
    const response = await api.get(`/notificates/get-all`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getNotificationsByUserId = async (id) => {
  try {
    const reject = "Bill Rejected";
    const accecpt = "Bill Activated"
    const response = await api.get(`/notificates/search?userId=${id}&type=3&pageSize=100`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getNotificationsByUserId, getAllNotifications };
