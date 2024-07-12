import { api } from "./api";

const validateOTP = async (otp) => {
  try {
    const response = await api.post("/auth/validate-otp", {
      otp,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const forgotPassword = async (data) => {
  try {
    console.log(data);

    const response = await api.post("/auth/forgot-password", {
      email: data,
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export { validateOTP, forgotPassword };
