import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export const signup = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, { email, password });
  return response.data;
};

export const addData = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/data/add`, data);
  return response.data;
};

export const getData = async () => {
  const response = await axios.get(`${API_BASE_URL}/data/get`);
  return response.data;
};
