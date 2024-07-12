import { api } from "./api";

const bookingBidaSlot = async (userid, bookingDate, bookingTableSlotId) => {
  try {
    console.log(
      "id: ",
      userid,
      ", bookingDate: ",
      bookingDate,
      "slot: ",
      bookingTableSlotId
    );
    const response = await api.post(
      `/bookings/booking?userId=${userid}&bookingDate=${bookingDate}`,

      bookingTableSlotId
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const clubOwnerBookingBidaSlot = async (
  userid,
  bookingDate,
  bookingTableSlotId
) => {
  try {
    console.log(
      "id: ",
      userid,
      ", bookingDate: ",
      bookingDate,
      "slot: ",
      bookingTableSlotId
    );
    const response = await api.post(
      `/bookings/club-owner-book-slot?userId=${userid}&bookingDate=${bookingDate}`,

      bookingTableSlotId
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const bookingAndGenerateBill = async (
  userId,
  slotId,
  bookingDate,
  userForm,
  paymentMethods
) => {
  try {
    console.log(
      "id: ",
      userId,
      ", bookingDate: ",
      bookingDate,
      "slot: ",
      slotId,
      "bookerName: ",
      userForm.name,
      "bookerPhone: ",
      userForm.phone,
      "bookerEmail: ",
      userForm.email
    );
    const date = new Date(bookingDate).toISOString();
    console.log("bookingDate: ", bookingDate);

    const response = await api.post(`/bookings/book-and-generate-bill-v2`, {
      userId: userId,
      bT_SlotIds: slotId,
      bookingDate: date,
      orderCode: "string",
      paymentMethods: paymentMethods,
      bookerName: userForm.name || "",
      bookerPhone: userForm.phone || "",
      bookerEmail: userForm.email || "",
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.log(error.response.data);
    } else {
      console.log(error);
    }
  }
};

const deleteBooking = async (id) => {
  try {
    const response = await api.delete(`/bookings/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export {
  bookingBidaSlot,
  clubOwnerBookingBidaSlot,
  bookingAndGenerateBill,
  deleteBooking,
};
