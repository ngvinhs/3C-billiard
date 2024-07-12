import { api } from "./api";

const getBidaTableSlot = async (id) => {
  try {
    const response = await api.get(`/bidatableslots/${id}/slot-ids`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getBidaTableSlotByTableId = async (id) => {
  try {
    const response = await api.get(`/bidatableslots/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getBidaTableSlotByDateAndTableId = async (date, id) => {
  console.log("date", date, "-id", id);

  try {
    const response = await api.get(`/bidatableslots/booked-slots`, {
      params: {
        bookingDate: date,
        bidaTableId: id,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getBidaTableSlotBySlotId = async (id) => {
  try {
    const response = await api.get(`/bidatableslots/bidaTableId/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getSlotBySlotId = async (id) => {
  try {
    const response = await api.get(`/bidatableslots/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  getBidaTableSlot,
  getBidaTableSlotByTableId,
  getBidaTableSlotByDateAndTableId,
  getBidaTableSlotBySlotId,
  getSlotBySlotId,
};
