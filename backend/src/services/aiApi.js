import axios from "axios";

export const fetchAISnapshot = async () => {
  const res = await axios.get("http://localhost:7000/api/ai/snapshot");
  return res.data;
};
