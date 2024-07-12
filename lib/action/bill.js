import { api } from "./api";
import { getBidaTableByTableId } from "./bidaTable";

const updateBillImage = async (billId, image) => {
  try {
    console.log("billId: ", billId, ", image: ", image);
    const formData = new FormData();

    formData.append("img", {
      uri: image,
      type: "image/png",
      name: "image.png",
    });
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
      transformRequest: () => {
        return formData;
      },
    };

    const response = await api.put(
      `/bills/update-bill-image/${billId}`,
      {
        img: image,
      },
      config
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.log(error.response.data);
      console.log(error);
    } else {
      console.log(error);
    }
  }
};

const acceptBill = async (billId) => {
  try {
    const response = await api.put(`/bills/activate/${billId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.log(error.response.data);
    } else {
      console.log(error);
    }
  }
};

const rejectBill = async (billId) => {
  try {
    const response = await api.put(`/bills/reject/${billId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.log(error.response.data);
    } else {
      console.log(error);
    }
  }
};

const getWaitingBills = async (clubId) => {
  try {
    const response = await api.get(
      `/bills/search?clubId=${clubId}&status=WAITING`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getBillsByOrderId = async (orderCode) => {
  try {
    const response = await api.get(`/bills/search?orderCode=${orderCode}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getBillsByClubId = async (clubId) => {
  try {
    const response = await api.get(
      `/bills/search?clubId=${clubId}&pageSize=1000&status=ACTIVE`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  updateBillImage,
  acceptBill,
  rejectBill,
  getWaitingBills,
  getBillsByOrderId,
  getBillsByClubId,
};
