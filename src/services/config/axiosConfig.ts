import axios from "axios";
import { getApiUrl } from "../../utils/utils";

const baseUrl = getApiUrl();
export const api = axios.create({ baseURL: baseUrl });
