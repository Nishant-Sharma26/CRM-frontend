import axios from "axios";
import { API_URL } from "../utils/constant";

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

export const fetchCandidates = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/candidates`);
    dispatch({ type: "FETCH_CANDIDATES", payload: res.data });
  } catch (err) {
    console.error("Fetch candidates error:", err);
  }
};

export const addCandidate = (candidateData) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/candidates`, candidateData);
    dispatch(fetchCandidates()); // Refresh list after adding
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
  }
};

export const deleteCandidate = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/candidates/${id}`);
    dispatch(fetchCandidates()); // Refresh list after deletion
  } catch (err) {
    console.error("Delete candidate error:", err);
    throw err;
  }
};