import { LocationResponse } from "../../utils/types/weatherType";
import { api } from "../config/axiosConfig";
const weatherApiUrl = "https://weatherapi-com.p.rapidapi.com";

const options = {
  headers: {
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_SECRET_KEY,
  },
};

const getLocation = async (
  latitude: number,
  longitude: number
): Promise<LocationResponse> => {
  const response = await api.get<LocationResponse>(
    `${weatherApiUrl}/current.json?q=${latitude}%2C${longitude}&lang=es`,
    options
  );

  return response.data;
};

export { getLocation };

