import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);

  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.get(
    `${base_url}user/getaOrder/${id}`, config
  );

  return response.data;
};


const getMonthlyOrder = async (id) => {
  const response = await axios.get(
    `${base_url}user/getMonthWiseOrderIncome`,config
  );

  return response.data;
};
const getYearlyState = async (id) => {
  const response = await axios.get(
    `${base_url}user/getYearlyTotalOrder`,config
  );

  return response.data;
};
const authService = {
  login,
  getOrders,
  getOrder,
  getMonthlyOrder,
  getYearlyState
};

export default authService;
