import axios from "axios";

const QRImage = async (amount, addInfo) => {
  console.log("amount", amount);
  console.log("addInfo", addInfo);
  try {
    const response = await axios.get(
      `https://api.vietqr.io/image/970423-0978214001-nr88BUz.jpg?accountName=HO%20CHI%20TRUNG&amount=${amount}&addInfo=${addInfo}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export { QRImage };
