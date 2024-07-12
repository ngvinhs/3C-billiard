import { api } from "./api";

const bookingHistory = async (userId) => {
  console.log("userId", userId);
  try {
    const response = await api.get(`/bills/search?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const billBookingHistory = async (userId) => {
  console.log("userId", userId);
  try {
    const response = await api.get(
      `/bills/search?userId=${userId}&pageSize=1000`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { bookingHistory, billBookingHistory };
