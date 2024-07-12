import { api } from "./api";

const getBidaTableById = async (id) => {
  try {
    const response = await api.get(`/bidatables/search?bidaClubId=${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getBidaTableByTableId = async (id) => {
  try {
    const response = await api.get(`/bidatables/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const createTableBida = async (data, config) => {
  console.log(
    "BidaCludId:",
    data.id,
    "Price:",
    data.price,
    "TableName:",
    data.name,
    " Image:",
    data.image,
    " Note:",
    data.type
  );
  try {
    const response = await api.post(
      "/bidatables/create",
      {
        BidaCludId: data.id,
        Price: data.price,
        TableName: data.name,
        Image: data.image,
        Note: data.type,
      },
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteTableBida = async (id) => {
  console.log("id", id);
  try {
    const response = await api.put(`/bidatables/delete/${id}`);
    console.log("response", response.status);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  getBidaTableById,
  createTableBida,
  deleteTableBida,
  getBidaTableByTableId,
};
