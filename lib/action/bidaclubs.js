import { api } from "./api";

const getAllBidaClubs = async (district, search) => {
  try {
    console.log("district", district);
    console.log("search", search);
    const response = await api.get(
      `/bidaclubs/search?status=ACTIVE&address=${district}&bidaName=${search}`
    );
    return response.data;
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

const getBidaClubsByID = async (id) => {
  try {
    const response = await api.get(`/bidaclubs/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getBidaClubByUserID = async (id) => {
  try {
    const response = await api.get(`/bidaclubs/search?userId=${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const createBidaClub = async (data, config) => {
  console.log("data", data);
  try {
    const response = await api.post(
      "/bidaclubs/create",
      {
        UserId: data.userId,
        BidaName: data.bidaName,
        Image: data.image,
        Address: data.address,
        Email: data.email,
        Description: data.description,
        Phone: data.phone,
        OpenTime: data.openTime,
        CloseTime: data.closeTime,
        GoogleMapLink: data.googleMapLink,
      },
      config
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.log(error.response.data);
    } else {
      console.log(error);
    }
  }
};

const updateBidaClub = async (data, config) => {
  console.log("data", data);
  try {
    const response = await api.put(
      "/bidaclubs",
      {
        UserId: data.userId,
        BidaName: data.bidaName,
        Image: data.image,
        Address: data.address,
        Email: data.email,
        Description: data.description,
        Phone: data.phone,
        OpenTime: data.openTime,
        CloseTime: data.closeTime,
        GoogleMapLink: data.googleMapLink,
      },
      config
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.log(error.response.data);
    } else {
      console.log(error);
    }
  }
};

export {
  getAllBidaClubs,
  getBidaClubsByID,
  getBidaClubByUserID,
  createBidaClub,
  updateBidaClub,
};
