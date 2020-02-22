import axios from "axios";
const BACKEND_URL = "http://localhost:4000/";

export const apiCall = async (route, method, body) => {
  const url = `${BACKEND_URL}${route}`;
  const config = {
    method,
    url,
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (body) {
    config.data = JSON.stringify(body);
  }

  const response = await axios(config);
  return response.data;
};
