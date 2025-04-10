
import axios from "axios";
import { API_URL } from "../utils/constant";


axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization; 
  }
  return config;
}, (error) => Promise.reject(error));

export const fetchCandidates = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/candidates`);
    dispatch({ type: "FETCH_CANDIDATES", payload: res.data });
  } catch (err) {
    console.error("Fetch candidates error:", err);
    throw err; 
  }
};

export const addCandidate = (candidateData) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/candidates`, candidateData);
    dispatch(fetchCandidates()); 
    return res.data;
  } catch (err) {
    console.error("Add candidate error:", err);
    throw err;
  }
};

export const updateStatus = (id, status) => async (dispatch) => {
  try {
    await axios.put(`${API_URL}/candidates/${id}/status`, { status });
    dispatch({ type: "UPDATE_STATUS", payload: { id, status } });
  } catch (err) {
    console.error("Update status error:", err);
    throw err;
  }
};

export const deleteCandidate = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/candidates/${id}`);
    dispatch(fetchCandidates()); 
  } catch (err) {
    console.error("Delete candidate error:", err);
    throw err;
  }
};