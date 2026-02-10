import axios from "axios";

const AI_BASE_URL = "http://localhost:7000/api/ai"; // adjust if needed

export const fetchAISnapshot = async () => {
  const res = await axios.get(`${AI_BASE_URL}/snapshot`);
  return res.data;
};
